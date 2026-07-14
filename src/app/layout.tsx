import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import Footer from "../components/layout/Footer";
import CartHydrator from "../components/shared/CartHydrator";
import { getSettings, buildThemeCss } from "@/lib/settings";

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
    return {
        title: settings.site_name ? `${settings.site_name} | Organic & Natural Products` : "NaturoBD Clone | Organic & Natural Products",
        description: "Buy 100% pure and organic products in Bangladesh.",
        icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();
    const themeCss = buildThemeCss(settings);

    return (
        <html lang="en">
            <head>
                {/* Runtime theme overrides from the Settings API (rendered server-side, so no flash) */}
                {themeCss ? (
                    <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss }} />
                ) : null}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.className} antialiased bg-gray-50 text-gray-900`}
            >
                <CartHydrator />

                {/* All visible content MUST be inside the body */}
                <Header logoUrl={settings.logo_url} siteName={settings.site_name} />

                {/* Added a main tag with min-height to push footer down later */}
                <main className="min-h-screen">
                    {children}
                </main>

                <Footer logoUrl={settings.logo_url} siteName={settings.site_name} />
            </body>
        </html>
    );
}