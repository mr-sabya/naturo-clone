"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    ShoppingCart,
    Phone,
    HelpCircle,
    MapPin,
    Sparkles,
    Menu
} from 'lucide-react';
import SideCart from './SideCart'; // Import the SideCart we created

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className="w-full font-sans sticky top-0 z-[80]">
                {/* --- TOP BAR (Very Dark Green) --- */}
                <div className="bg-[#00150a] text-white py-2 border-b border-white/5">
                    <div className="container mx-auto px-4 flex justify-between items-center text-[11px] md:text-[13px] font-medium">
                        {/* Left: Phone */}
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#00AA4E]" />
                            <a href="tel:09639812525" className="hover:text-[#00AA4E] transition-colors">09639812525</a>
                        </div>

                        {/* Center: Promo Text */}
                        <div className="hidden md:flex items-center gap-2">
                            <Sparkles size={14} className="text-yellow-400" />
                            <span className="tracking-wide">Discover the Power of Nature with NaturoBD</span>
                        </div>

                        {/* Right: Help */}
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2 cursor-pointer hover:text-[#00AA4E] transition-colors">
                                <HelpCircle size={14} />
                                <span>Customer Help</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN HEADER (Forest Green) --- */}
                <div className="bg-[#002d17] text-white py-3 md:py-3 shadow-lg">
                    <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-6">

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden p-1">
                            <Menu size={24} />
                        </button>

                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-2 min-w-fit">
                            <img src="/images/logo.png" alt="Naturo Logo" className="h-12 w-auto" />
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl relative mx-4">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <Search size={18} className="text-[#00AA4E]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products (e.g. Honey, Nuts...)"
                                className="w-full bg-[#00150a]/40 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AA4E]/50 focus:border-[#00AA4E] transition-all placeholder:text-gray-500"
                            />
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Order Track (Hidden on mobile) */}
                            <Link href="/track-order" className="hidden sm:flex items-center gap-2 cursor-pointer group">
                                <div className="flex flex-col items-center">
                                    <MapPin size={22} className="group-hover:text-[#00AA4E] transition-colors" />
                                    <div className="w-4 h-[2px] bg-[#00AA4E] mt-0.5 rounded-full"></div>
                                </div>
                                <span className="text-[10px] font-bold leading-tight uppercase tracking-tighter">Order<br />Track</span>
                            </Link>

                            {/* Cart Trigger */}
                            <div
                                onClick={() => setIsCartOpen(true)}
                                className="relative flex items-center gap-2 cursor-pointer group"
                            >
                                <div className="relative p-1">
                                    <ShoppingCart size={26} className="group-hover:text-[#00AA4E] transition-colors" />
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#002d17]">
                                        1
                                    </span>
                                </div>
                                <div className="hidden lg:block leading-none">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Your Cart</p>
                                    <p className="text-sm font-bold">৳1,250</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search (Only visible on small screens) */}
                <div className="md:hidden bg-[#002d17] px-4 pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Naturo..."
                            className="w-full bg-[#00150a]/40 border border-white/10 rounded-md py-2 px-10 text-sm"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </header>

            {/* Side Cart Drawer Component */}
            <SideCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};

export default Header;