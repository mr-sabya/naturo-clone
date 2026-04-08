"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Minus, Plus, ShoppingBag, ShieldCheck,
    PhoneCall, CheckCircle2, Truck, Info
} from "lucide-react";

export default function CheckoutSection() {
    // 1. DATA
    const images = [
        "/images/products/product_1.webp",
        "/images/products/product_2.webp",
        "/images/products/product_3.webp",
        "/images/products/product_3.webp",
    ];

    // 2. STATE MANAGEMENT
    const [quantity, setQuantity] = useState(1);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [selectedSize, setSelectedSize] = useState("৫০০ গ্রাম");
    const [mainImage, setMainImage] = useState(images[0]);

    const pricePerItem = 950;
    const subtotal = pricePerItem * quantity;
    const total = subtotal + deliveryCharge;

    return (
        <section className="py-12 bg-[#fdfbf7] min-h-screen px-4 scroll-smooth" id="checkout">
            <div className="max-w-6xl mx-auto">

                {/* --- PROFESSIONAL HEADER --- */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif mb-4">
                        অর্ডার সম্পন্ন করুন
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1 text-sm md:text-base">
                            <CheckCircle2 size={18} /> ১০০% ন্যাচারাল
                        </span>
                        <span className="flex items-center gap-1 text-sm md:text-base">
                            <Truck size={18} /> দ্রুত ডেলিভারি
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* --- LEFT COLUMN: GALLERY & PRODUCT INFO --- */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-emerald-50 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                                        <Info size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">অর্ডার করতে নিচের তথ্যগুলি দিন</h3>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">আপনার নাম</label>
                                            <input type="text" placeholder="পুরো নাম লিখুন" className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">মোবাইল নাম্বার</label>
                                            <input type="tel" placeholder="01XXXXXXXXX" className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">সম্পূর্ণ ঠিকানা</label>
                                            <textarea placeholder="আপনার বাসার নাম্বার, রোড নাম্বার ও জেলা" className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white min-h-[120px] transition-all" />
                                        </div>
                                    </div>

                                    {/* Delivery Selection */}
                                    <div className="space-y-4 pt-6">
                                        <p className="font-bold text-gray-900 flex items-center gap-2">
                                            <Truck size={20} className="text-emerald-600" /> ডেলিভারি এরিয়া
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { label: "ঢাকা সিটির ভেতরে", price: 50 },
                                                { label: "ঢাকা সিটির বাহিরে", price: 80 },
                                                { label: "ঢাকা জেলার বাহিরে", price: 100 },
                                            ].map((opt) => (
                                                <label
                                                    key={opt.price}
                                                    className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${deliveryCharge === opt.price
                                                        ? "border-emerald-600 bg-emerald-50 ring-4 ring-emerald-50/50"
                                                        : "border-gray-50 bg-gray-50/50 hover:border-emerald-100"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${deliveryCharge === opt.price ? "border-emerald-600 bg-emerald-600" : "border-gray-300 bg-white"}`}>
                                                            {deliveryCharge === opt.price && <div className="w-2 h-2 bg-white rounded-full" />}
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name="delivery"
                                                            className="hidden"
                                                            onChange={() => setDeliveryCharge(opt.price)}
                                                        />
                                                        <span className="font-bold text-gray-700">{opt.label}</span>
                                                    </div>
                                                    <span className="font-black text-emerald-800">৳{opt.price}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Financial Summary Card */}
                                    <div className="mt-10 p-8 rounded-[2.5rem] bg-emerald-900 text-white relative overflow-hidden">
                                        <div className="relative z-10 space-y-3">
                                            <div className="flex justify-between items-center opacity-80 text-sm">
                                                <span>সাবটোটাল ({quantity} আইটেম)</span>
                                                <span>৳{subtotal}</span>
                                            </div>
                                            <div className="flex justify-between items-center opacity-80 text-sm">
                                                <span>ডেলিভারি চার্জ</span>
                                                <span>৳{deliveryCharge}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-emerald-800/50 mt-2">
                                                <span className="text-xl font-bold text-emerald-300 font-serif">সর্বমোট</span>
                                                <span className="text-3xl font-black">৳{total}</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-40 shrink-0" />
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full bg-[#FA582D] hover:bg-[#e44d25] text-white py-6 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(250,88,45,0.3)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 group mt-8"
                                    >
                                        <ShieldCheck size={28} className="group-hover:rotate-12 transition-transform" />
                                        অর্ডার কনফার্ম করুন
                                    </button>

                                    <p className="text-center text-gray-400 text-sm italic mt-4">
                                        অর্ডার করার পর আমাদের প্রতিনিধি আপনাকে কল করে নিশ্চিত করবেন
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>


                    {/* --- RIGHT COLUMN: CHECKOUT FORM --- */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10">

                        {/* THE INTERACTIVE GALLERY */}
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                            {/* Main Display Image */}
                            <div className="border-2 border-emerald-50 rounded-[2rem] bg-white shadow-sm overflow-hidden p-3">
                            <div className="relative aspect-square  overflow-hidden group mb-3 border rounded-2xl">
                                <Image
                                    src={mainImage}
                                    alt="Product Main View"
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    priority
                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                        Premium Quality
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMainImage(img)}
                                        className={`relative w-20 h-20 md:w-24 md:h-24 border-2 rounded-2xl overflow-hidden transition-all duration-300 ${mainImage === img
                                            ? "border-emerald-600 ring-4 ring-emerald-50 scale-105"
                                            : "border-gray-100 hover:border-emerald-200"
                                            }`}
                                    >
                                        <Image src={img} alt={`Thumbnail ${i}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
                                    </button>
                                ))}
                            </div>
                            </div>
                        </div>

                        {/* PRODUCT INFO CARD */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                                    সিড শরবত | Seed Shorbot (Cold Pressed)
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-emerald-700">৳{pricePerItem}</span>
                                    <span className="text-gray-400 line-through">৳১,২০০</span>
                                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">Save 25%</span>
                                </div>
                            </div>

                            {/* Variant Selection */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">প্যাকেজ নির্বাচন করুন:</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {["২৫০ গ্রাম", "৫০০ গ্রাম", "১ কেজি"].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${selectedSize === size
                                                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                                : "border-gray-100 text-gray-500 hover:border-emerald-200"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Logic */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="font-bold text-gray-700">পরিমাণ:</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="text-xl font-black w-6 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hotline Card */}
                        <div className="bg-emerald-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-emerald-900/20">
                            <div>
                                <p className="text-emerald-300 text-xs font-bold uppercase mb-1 tracking-tighter">যেকোনো প্রয়োজনে কল করুন</p>
                                <p className="text-xl font-bold">09639812525</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center">
                                <PhoneCall size={24} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}