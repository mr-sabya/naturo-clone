"use client";

import React from 'react';
import Link from 'next/link';
import {
    Search,
    ShoppingCart,
    Phone,
    HelpCircle,
    MapPin,
    Sparkles
} from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full font-sans">
            {/* --- TOP BAR (Very Dark Green) --- */}
            <div className="bg-[#00150a] text-white py-2 border-b border-white/5">
                <div className="container mx-auto px-4 flex justify-between items-center text-[12px] md:text-[13px] font-medium">
                    {/* Left: Phone */}
                    <div className="flex items-center gap-2">
                        <Phone size={14} className="text-white" />
                        <span>09639812525</span>
                    </div>

                    {/* Center: Promo Text */}
                    <div className="hidden md:flex items-center gap-2">
                        <Sparkles size={14} className="text-white" />
                        <span>Discover the Power of Nature with NaturoBD</span>
                    </div>

                    {/* Right: Help */}
                    <div className="flex items-center gap-2">
                        <HelpCircle size={14} className="text-white" />
                        <span>Customer Help</span>
                    </div>
                </div>
            </div>

            {/* --- MAIN HEADER (Forest Green) --- */}
            <div className="bg-[#002d17] text-white py-4 shadow-md">
                <div className="container mx-auto px-4 flex items-center justify-between gap-6">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 min-w-fit">
                        <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                            {/* Leaf Icon Placeholder to match image */}
                            <div className="w-6 h-6 bg-[#002d17] rounded-full flex items-center justify-center overflow-hidden">
                                <div className="w-3 h-5 bg-white rounded-tl-full rounded-br-full rotate-45"></div>
                            </div>
                        </div>
                        <div className="leading-none">
                            <div className="flex items-baseline">
                                <span className="text-2xl font-black tracking-tighter text-[#00AA4E]">NATURO</span>
                                <span className="text-[10px] font-bold ml-0.5">TM</span>
                            </div>
                            <p className="text-[9px] tracking-[0.2em] font-bold text-white uppercase opacity-90">Back to Nature</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <Search size={18} className="text-[#00AA4E]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search in Naturo..."
                            className="w-full bg-[#00150a]/50 border border-white/10 rounded-md py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#00AA4E] transition-all placeholder:text-gray-400"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-6">
                        {/* Cart */}
                        <div className="relative flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <ShoppingCart size={24} className="text-white" />
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-[#002d17]">
                                    0
                                </span>
                            </div>
                            <span className="text-sm font-semibold hidden lg:block">Cart</span>
                        </div>

                        {/* Order Track */}
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="flex flex-col items-center leading-none">
                                <MapPin size={22} className="text-white" />
                                <div className="w-4 h-[2px] bg-white mt-0.5 rounded-full"></div>
                            </div>
                            <span className="text-[11px] font-bold leading-tight">Order<br />Track</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;