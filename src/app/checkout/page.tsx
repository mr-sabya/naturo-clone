"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    Minus,
    Plus,
    MapPin,
    Phone,
    User,
    Mail,
    ClipboardList,
    ShieldCheck,
    Truck
} from 'lucide-react';

const CheckoutPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const itemPrice = 950;
    const subtotal = itemPrice * quantity;

    return (
        <div className="min-h-screen bg-[#fffcf5] pb-20">
            {/* Breadcrumb */}
            <div className="bg-white/50 py-4 border-b border-emerald-50">
                <div className="container mx-auto px-6 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-emerald-700">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-emerald-900 font-medium">অর্ডার সম্পন্ন করুন</span>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 mt-10">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-emerald-900 mb-8 text-center md:text-left">
                    অর্ডার করুন - ক্যাশ অন ডেলিভারিতে
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-4">
                                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                    <User size={20} />
                                </div>
                                <h2 className="text-xl font-serif font-semibold text-emerald-900">শিপিং তথ্য দিন</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                                        আপনার নাম <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="পুরো নাম লিখুন"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                                        মোবাইল নাম্বার <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="01XXXXXXXXX"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                                        সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="গ্রাম/রোড নং, থানা, জেলা"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                    ></textarea>
                                </div>

                                {/* Optional Email & Note */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-emerald-900">ইমেইল (অপশনাল)</label>
                                        <input
                                            type="email"
                                            placeholder="email@example.com"
                                            className="w-full px-5 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-emerald-900">অর্ডার নোট (অপশনাল)</label>
                                        <input
                                            type="text"
                                            placeholder="স্পেশাল মেসেজ"
                                            className="w-full px-5 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Delivery Selection */}
                        <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="text-emerald-700" size={24} />
                                <h2 className="text-xl font-serif font-semibold text-emerald-900">ডেলিভারি এরিয়া সিলেক্ট করুন</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { label: "Inside Dhaka (ঢাকা সিটির ভেতরে)", price: 50 },
                                    { label: "Outside Dhaka City (ঢাকা সিটির বাহিরে)", price: 80 },
                                    { label: "Outside Dhaka District (ঢাকা জেলার বাহিরে)", price: 100 },
                                ].map((option) => (
                                    <label
                                        key={option.price}
                                        className={`flex items-center justify-between p-5 border rounded-2xl cursor-pointer transition-all ${deliveryCharge === option.price
                                                ? 'border-emerald-600 bg-emerald-50'
                                                : 'border-gray-100 hover:border-emerald-200 bg-[#fdfbf7]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                className="w-5 h-5 accent-emerald-700"
                                                onChange={() => setDeliveryCharge(option.price)}
                                            />
                                            <span className="font-medium text-emerald-900 text-sm md:text-base">{option.label}</span>
                                        </div>
                                        <span className="font-bold text-emerald-900">৳{option.price}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] sticky top-10 shadow-xl shadow-emerald-900/20">
                            <h2 className="text-2xl font-serif mb-6 border-b border-emerald-800 pb-4">অর্ডার সামারি</h2>

                            {/* Product Info */}
                            <div className="flex gap-4 mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-white overflow-hidden flex-shrink-0 border-2 border-emerald-800">
                                    <img
                                        src="https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/Raisins A_KMGjqdcxh.webp"
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-serif text-lg leading-tight">কিসমিস | Raisins</p>
                                    <p className="text-emerald-400 font-bold mt-1">৳{itemPrice}</p>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full border border-emerald-700 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold w-4 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-8 rounded-full border border-emerald-700 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Price Calculation */}
                            <div className="space-y-4 border-t border-emerald-800 pt-6">
                                <div className="flex justify-between text-emerald-200">
                                    <span>সাবটোটাল</span>
                                    <span className="font-bold">৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-emerald-200">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span className="font-bold">
                                        {deliveryCharge > 0 ? `৳${deliveryCharge}` : "সিলেক্ট করুন"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-white text-xl font-bold border-t border-emerald-800 pt-4">
                                    <span>সর্বমোট</span>
                                    <span>৳{subtotal + deliveryCharge}</span>
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-3 animate-pulse">
                                <ShieldCheck />
                                অর্ডার কনফার্ম করুন ৳{subtotal + deliveryCharge}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-emerald-300">
                                <Phone size={14} />
                                <span>অর্ডার করতে কল করুন: 01XXX-XXXXXX</span>
                            </div>

                            <p className="mt-4 text-[10px] text-center text-emerald-400 italic">
                                আমাদের প্রতিনিধি কল করে আপনার অর্ডারটি কনফার্ম করবেন।
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="bg-white p-6 rounded-3xl border border-emerald-50 flex items-center justify-around">
                            <div className="text-center space-y-1">
                                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">100% Organic</p>
                            </div>
                            <div className="text-center space-y-1">
                                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                                    <Truck size={20} />
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Fast Delivery</p>
                            </div>
                            <div className="text-center space-y-1">
                                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                                    <ClipboardList size={20} />
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Quality Check</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;