import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import CartHydrator from "../components/shared/CartHydrator";
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from "../components/shared/GoogleTagManager";
import RouteChangeTracker from "../components/shared/RouteChangeTracker";
import { getSettings, buildThemeCss } from "@/lib/settings";
import { getPixelSettings } from "@/lib/pixels";
import { getSeoSettings } from "@/lib/seo";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
    subsets: ["bengali", "latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    const seo = await getSeoSettings();

    const siteName = settings.site_name || "NaturoBD Clone";
    const tagline = settings.site_tagline || "Organic & Natural Products";
    const title = seo.metaTitle || `${siteName} | ${tagline}`;
    const description = settings.meta_description || "Buy 100% pure and organic products in Bangladesh.";

    return {
        title,
        description,
        keywords: seo.metaKeywords ? seo.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
        icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
        robots: seo.robots || undefined,
        alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
        verification: seo.googleSiteVerification ? { google: seo.googleSiteVerification } : undefined,
        openGraph: {
            title: seo.ogTitle || title,
            description: seo.ogDescription || description,
            siteName,
            type: "website",
            url: seo.canonicalUrl || undefined,
            images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
        },
    };
}

/**
 * Deliberately minimal — no Header/Footer here. Every "normal" route gets
 * them via `(site)/layout.tsx`; the `[slug]` route (static policy pages
 * today, product/landing pages once that's wired up) sits outside that
 * group and renders its own chrome. Everything every route needs
 * regardless of chrome — fonts, theme CSS, cart hydration — stays here.
 */
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();
    const themeCss = buildThemeCss(settings);
    const pixels = await getPixelSettings();
    const gtmActive = pixels.googleEnabled && !!pixels.googleGtmId;

    return (
        <html lang="en">
            <head>
                {/* Runtime theme overrides from the Settings API (rendered server-side, so no flash) */}
                {themeCss ? (
                    <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss }} />
                ) : null}
                {gtmActive && <GoogleTagManagerScript gtmId={pixels.googleGtmId!} />}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.className} antialiased bg-gray-50 text-gray-900`}
                suppressHydrationWarning
            >
                {gtmActive && <GoogleTagManagerNoScript gtmId={pixels.googleGtmId!} />}
                {gtmActive && (
                    <Suspense fallback={null}>
                        <RouteChangeTracker />
                    </Suspense>
                )}
                <CartHydrator />
                {children}
            </body>
        </html>
    );
}