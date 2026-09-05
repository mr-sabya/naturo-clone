"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

const footerLinks = [
    { name: "About Us", slug: "/about-us" },
    { name: "Privacy Policy", slug: "/privacy-policy" },
    { name: "Terms & Conditions", slug: "/terms-and-conditions" },
    { name: "Return & Refund", slug: "/return-and-refund" },
];

const customerService = [
    { name: "Order Tracking", slug: "/order-tracking" },
    { name: "Contact Us", slug: "/contact-us" },
    { name: "How to Order", slug: "/how-to-order" },
    { name: "FAQ", slug: "/faq" },
];

interface FooterProps {
    logoUrl?: string;
    siteName?: string;
    footerDescription?: string;
    footerPhone?: string;
    footerEmail?: string;
    footerAddress?: string;
    whatsappNumber?: string;
    socialFacebookUrl?: string;
    socialInstagramUrl?: string;
    socialYoutubeUrl?: string;
    copyrightText?: string;
}

export default function Footer({
    logoUrl,
    siteName = "Naturo",
    footerDescription = "Bringing you the purest gifts from nature, processed traditionally to keep all nutrients intact for your wellness.",
    footerPhone = "09639812525",
    footerEmail = "hello@naturo.com",
    footerAddress = "Level-5, Noor Tower, 110 Bir Uttam CR Dutta Rd, Dhaka",
    whatsappNumber,
    socialFacebookUrl,
    socialInstagramUrl,
    socialYoutubeUrl,
    copyrightText = "Crafting Health with Nature.",
}: FooterProps) {
    // Only real, admin-configured links render — no dead "#" placeholders.
    const socialLinks = [
        socialFacebookUrl && { Icon: Facebook, href: socialFacebookUrl, label: "Facebook" },
        socialInstagramUrl && { Icon: Instagram, href: socialInstagramUrl, label: "Instagram" },
        socialYoutubeUrl && { Icon: Youtube, href: socialYoutubeUrl, label: "YouTube" },
        whatsappNumber && { Icon: MessageCircle, href: `https://wa.me/${whatsappNumber}`, label: "WhatsApp" },
    ].filter(Boolean) as { Icon: typeof Facebook; href: string; label: string }[];

    return (
        <footer className="relative bg-[#0a1a12] text-white pt-20 overflow-hidden">

            {/* MAIN GRID SECTION */}
            <div className="container mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* Brand Identity */}
                    <div className="md:col-span-5 space-y-8">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={logoUrl || "/images/logo.png"}
                                    alt={`${siteName} Logo`}
                                    width={160}
                                    height={48}
                                    unoptimized
                                    className="h-12 w-auto"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 leading-relaxed text-lg max-w-md">
                            {footerDescription}
                        </p>
                        {socialLinks.length > 0 && (
                            <div className="flex gap-4">
                                {socialLinks.map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-[#84b544] hover:text-white transition-all duration-300"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-naturoOrange font-bold uppercase tracking-widest text-xs">Explore</h4>
                            <ul className="space-y-4">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.slug} className="text-white/50 hover:text-white transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-naturoOrange font-bold uppercase tracking-widest text-xs">Support</h4>
                            <ul className="space-y-4">
                                {customerService.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.slug} className="text-white/50 hover:text-white transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 lg:col-span-1 space-y-6">
                            <h4 className="text-naturoOrange font-bold uppercase tracking-widest text-xs">Connect</h4>
                            <div className="space-y-4">
                                {footerPhone && (
                                    <a href={`tel:${footerPhone}`} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                                        <Phone size={16} className="text-naturoOrange" />
                                        <span className="text-sm font-bold">{footerPhone}</span>
                                    </a>
                                )}
                                {footerEmail && (
                                    <a href={`mailto:${footerEmail}`} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                                        <Mail size={16} className="text-naturoOrange" />
                                        <span className="text-sm">{footerEmail}</span>
                                    </a>
                                )}
                                {footerAddress && (
                                    <div className="flex items-start gap-3 text-white/50">
                                        <MapPin size={16} className="text-naturoOrange shrink-0" />
                                        <span className="text-sm leading-relaxed">
                                            {footerAddress}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-white/30 font-medium text-center md:text-left">
                        <p>© {new Date().getFullYear()} <span className="text-white/60">{siteName}</span> — {copyrightText}</p>

                    </div>

                    {/* developer info */}
                    <div className="text-xs text-white/30 font-medium text-center md:text-right">
                        <p className="mt-1">
                            Developed by{" "}
                            <a
                                href="https://sabyaroy.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-naturoOrange hover:text-white transition-colors font-semibold"
                            >
                                Sabya Roy
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}