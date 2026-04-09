"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = [
    { name: "About Us", slug: "/about-us" },
    { name: "Privacy Policy", slug: "/privacy-policy" },
    { name: "Terms & Conditions", slug: "/terms-and-conditions" },
    { name: "Return & Refund", slug: "/return-refund-policy" },
];

const customerService = [
    { name: "Order Tracking", slug: "/order-tracking" },
    { name: "Contact Us", slug: "/contact-us" },
    { name: "How to Order", slug: "/how-to-order" },
    { name: "FAQ", slug: "/faq" },
];

export default function Footer() {
    return (
        <footer className="relative bg-[#0a1a12] text-white pt-20 overflow-hidden">

            {/* MAIN GRID SECTION */}
            <div className="container mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* Brand Identity */}
                    <div className="md:col-span-5 space-y-8">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-3">
                                <img src="/images/logo.png" alt="Naturo Logo" className="h-12 w-auto" />
                            </div>
                        </Link>
                        <p className="text-white/60 leading-relaxed text-lg max-w-md">
                            Bringing you the purest gifts from nature, processed traditionally to keep all nutrients intact for your wellness.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-[#84b544] hover:text-white transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
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
                                <a href="tel:09639812525" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                                    <Phone size={16} className="text-naturoOrange" />
                                    <span className="text-sm font-bold">09639812525</span>
                                </a>
                                <a href="mailto:hello@naturo.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                                    <Mail size={16} className="text-naturoOrange" />
                                    <span className="text-sm">hello@naturo.com</span>
                                </a>
                                <div className="flex items-start gap-3 text-white/50">
                                    <MapPin size={16} className="text-naturoOrange shrink-0" />
                                    <span className="text-sm leading-relaxed">
                                        Level-5, Noor Tower, 110 Bir Uttam CR Dutta Rd, Dhaka
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-white/30 font-medium text-center md:text-left">
                        <p>© {new Date().getFullYear()} <span className="text-white/60">Prakritiz</span> — Crafting Health with Nature.</p>

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