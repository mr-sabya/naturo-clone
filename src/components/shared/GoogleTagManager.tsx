import Script from "next/script";

interface GoogleTagManagerScriptProps {
    gtmId: string;
}

/** Belongs in <head> — this is the official GTM head snippet. */
export function GoogleTagManagerScript({ gtmId }: GoogleTagManagerScriptProps) {
    return (
        <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
    );
}

/** Belongs immediately after the opening <body> tag — the official GTM noscript fallback. */
export function GoogleTagManagerNoScript({ gtmId }: GoogleTagManagerScriptProps) {
    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>
    );
}
