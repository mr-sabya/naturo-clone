import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Update these for better SEO (Search Engine Optimization)
export const metadata: Metadata = {
    title: "NaturoBD Clone | Organic & Natural Products",
    description: "Buy 100% pure and organic products in Bangladesh.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
            >
                {/* All visible content MUST be inside the body */}
                <Header />

                {/* Added a main tag with min-height to push footer down later */}
                <main className="min-h-screen">
                    {children}
                </main>

                {/* You can add a Footer component here later */}
            </body>
        </html>
    );
}