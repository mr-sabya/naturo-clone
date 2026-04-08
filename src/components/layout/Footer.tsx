"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, MessageCircle } from "lucide-react";


const footerLinks = [
    { name: "About Us", slug: "/about-us" },
    { name: "Privacy Policy", slug: "/privacy-policy" },
    { name: "Terms & Conditions", slug: "/terms-and-conditions" },
    { name: "Return & Refund", slug: "/return-refund-policy" },
    { name: "Cookie Policy", slug: "/cookie-policy" },
    { name: "Sitemap", slug: "/sitemap" },
];

const footerLinksSecondRow = [
    { name: "Order Tracking", slug: "/order-tracking" },
    { name: "Contact Us", slug: "/contact-us" },
    { name: "How to Order", slug: "/how-to-order" },
    { name: "Product Returns", slug: "/product-returns" },
    { name: "FAQ", slug: "/faq" },
];


export default function Footer() {
    return (
        /* Using the Deep Forest Green background to match the header */
        <footer className="bg-[#002d17] text-white/90 border-t border-white/5">
            <div className="container mx-auto px-4">

                {/* --- Top Section --- */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* 1. Logo + Contact Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-2">
                                <div className="bg-white rounded-full p-1 w-10 h-10 flex items-center justify-center">
                                    <div className="w-5 h-7 bg-[#002d17] rounded-tl-full rounded-br-full rotate-45"></div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter text-[#00AA4E]">NATURO<span className="text-white">BD</span></h2>
                                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/70">Back to Nature</p>
                                </div>
                            </div>
                        </Link>

                        <div className="space-y-5">
                            {/* Phone / Hotline */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#00AA4E]/10 p-2.5 rounded-lg text-[#00AA4E]">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Hotline 24/7</p>
                                    <a href="tel:09639812525" className="text-xl md:text-2xl font-black text-[#00AA4E] hover:text-white transition-colors">
                                        09639812525
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#00AA4E]/10 p-2.5 rounded-lg text-[#00AA4E]">
                                    <MapPin size={20} />
                                </div>
                                <address className="not-italic text-sm leading-relaxed text-white/70">
                                    Level-5, Noor Tower, 110 Bir Uttam <br />
                                    CR Dutta Rd, Dhaka 1205
                                </address>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#00AA4E]/10 p-2.5 rounded-lg text-[#00AA4E]">
                                    <Mail size={20} />
                                </div>
                                <a href="mailto:naturo@gmail.com" className="text-sm text-white/70 hover:text-[#00AA4E] transition-colors">
                                    naturo@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. Useful Links */}
                    <div>
                        <h2 className="text-lg font-bold mb-6 relative pb-2 inline-block">
                            Useful Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00AA4E]"></span>
                        </h2>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.slug}
                                        className="text-sm text-white/60 hover:text-[#00AA4E] hover:translate-x-1 transition-all inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Help Center */}
                    <div>
                        <h2 className="text-lg font-bold mb-6 relative pb-2 inline-block">
                            Help Center
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00AA4E]"></span>
                        </h2>
                        <ul className="space-y-3">
                            {footerLinksSecondRow.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.slug} className="text-sm text-white/60 hover:text-[#00AA4E] hover:translate-x-1 transition-all inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Social Media */}
                    <div>
                        <h2 className="text-lg font-bold mb-6 relative pb-2 inline-block">
                            Follow Us
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00AA4E]"></span>
                        </h2>
                        <p className="text-sm text-white/60 mb-6 leading-relaxed">
                            Stay updated with our latest organic products and offers.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#3b5998] text-white transition-all hover:-translate-y-1">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#25D366] text-white transition-all hover:-translate-y-1">
                                <MessageCircle size={20} />
                            </a>
                        </div>

                        {/* Payment Methods Placeholder */}
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-3">Secure Payments</p>
                            <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                <div className="w-8 h-5 bg-white rounded-sm"></div>
                                <div className="w-8 h-5 bg-white rounded-sm"></div>
                                <div className="w-8 h-5 bg-white rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Section --- */}
                <div className="border-t border-white/5 py-8 flex flex-col md:row justify-between items-center gap-4 text-xs text-white/40">
                    <p>© 2026 <span className="text-[#00AA4E] font-bold">NATURO BD</span>. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}