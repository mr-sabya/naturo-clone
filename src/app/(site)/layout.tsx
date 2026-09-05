import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/settings";

/**
 * Every "normal" route (home, shop, cart, checkout, product, static pages,
 * etc.) lives inside this route group and gets the site's Header/Footer.
 * The `[slug]` route (static policy pages today, product/landing pages once
 * that's wired up) sits outside this group at the app root.
 */
export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSettings();

    return (
        <>
            <Header logoUrl={settings.logo_url} siteName={settings.site_name} />
            <main className="min-h-screen">{children}</main>
            <Footer
                logoUrl={settings.logo_url}
                siteName={settings.site_name}
                footerDescription={settings.footer_description}
                footerPhone={settings.footer_phone}
                footerEmail={settings.footer_email}
                footerAddress={settings.footer_address}
                whatsappNumber={settings.whatsapp_number}
                socialFacebookUrl={settings.social_facebook_url}
                socialInstagramUrl={settings.social_instagram_url}
                socialYoutubeUrl={settings.social_youtube_url}
                copyrightText={settings.copyright_text}
            />
        </>
    );
}
