"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Minus,
    Plus,
    ShoppingBag,
    PhoneCall,
    ShieldCheck,
    Truck,
    Leaf
} from "lucide-react";

export default function MainProductSection() {
    // 1. Local State (In a real app, these might come from a parent or context)
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("৫০০ গ্রাম");

    const images = [
        "https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/Raisins A_KMGjqdcxh.webp",
        "https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/25gm_KMGo8hjy5.webp",
        "https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/Raisins A_KMGjqdcxh.webp",
    ];

    const [mainImage, setMainImage] = useState(images[0]);
    const pricePerItem = 950;

    // Function to handle smooth scroll to checkout form
    const scrollToCheckout = () => {
        const element = document.getElementById("checkout");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* --- LEFT: PRODUCT GALLERY --- */}
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                        {/* Main Display Image */}
                        <div className="relative aspect-square border-2 border-emerald-50 rounded-[2rem] overflow-hidden bg-[#fdfbf7] shadow-sm group">
                            <Image
                                src={mainImage}
                                alt="Product Main View"
                                fill
                                priority
                                className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                    Premium Quality
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 px-2">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`relative w-20 h-20 md:w-24 md:h-24 border-2 rounded-2xl overflow-hidden transition-all duration-300 ${mainImage === img
                                            ? "border-emerald-600 ring-4 ring-emerald-50 scale-105"
                                            : "border-gray-100 hover:border-emerald-200"
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: PRODUCT CONTENT --- */}
                    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-700">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
                                <Leaf size={14} /> 100% Organic
                            </div>
                            <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
                                <Truck size={14} /> Fast Shipping
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
                            সিড শরবত | Seed Shorbot <br />
                            <span className="text-emerald-800 text-2xl md:text-3xl font-normal">(Cold Pressed)</span>
                        </h1>

                        {/* Pricing Section */}
                        <div className="flex items-center gap-5 mb-8 bg-gray-50 p-4 rounded-2xl w-fit">
                            <div className="flex flex-col">
                                <span className="text-gray-400 line-through text-sm font-medium">৳১,২০০</span>
                                <span className="text-4xl font-black text-[#FF5E33]">৳{pricePerItem}</span>
                            </div>
                            <div className="h-10 w-px bg-gray-200 mx-2" />
                            <div className="flex flex-col">
                                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase mb-1">Save 25%</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Limited Time Offer</span>
                            </div>
                        </div>

                        {/* Variant Selector */}
                        <div className="mb-8">
                            <p className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                                পরিমাণ নির্ধারণ করুন <span className="h-px w-8 bg-gray-200" />
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["২৫০ গ্রাম", "৫০০ গ্রাম", "১ কেজি"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 border-2 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 ${selectedSize === size
                                                ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                                                : "border-gray-100 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Order Row */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Counter */}
                            <div className="flex items-center border-2 border-gray-100 rounded-2xl h-16 bg-white overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-6 h-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="w-12 text-center font-black text-2xl text-gray-800">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-6 h-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            {/* Order Button */}
                            <button
                                onClick={scrollToCheckout}
                                className="flex-1 bg-[#FF5E33] hover:bg-[#e4532d] text-white py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-orange-100 transition-all active:scale-[0.98] group"
                            >
                                <ShoppingBag size={24} className="group-hover:animate-bounce" />
                                অর্ডার করুন
                            </button>
                        </div>

                        {/* Hotline & Security */}
                        <div className="space-y-4">
                            <a
                                href="tel:09639812525"
                                className="w-full flex items-center justify-center gap-3 border-2 border-gray-900 py-4 rounded-2xl font-black text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                                <PhoneCall size={20} /> হটলাইন: ০৯৬৩৯৮১২৫২৫
                            </a>

                            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                    <ShieldCheck size={14} className="text-emerald-600" /> Secure Checkout
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                    <Truck size={14} className="text-emerald-600" /> Cash on Delivery
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}