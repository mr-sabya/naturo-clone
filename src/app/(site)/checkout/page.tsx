"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Truck, User, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import Stepper from "@/components/shared/Stepper";
import { trackBeginCheckout } from "@/lib/gtm";

const DELIVERY_OPTIONS = [
    { label: "ঢাকা সিটির ভেতরে", sublabel: "Inside Dhaka City", charge: 60 },
    { label: "ঢাকা সিটির বাহিরে", sublabel: "Outside Dhaka City", charge: 100 },
    { label: "ঢাকা জেলার বাহিরে", sublabel: "Outside Dhaka District", charge: 130 },
];

export default function CheckoutPage() {
    const router = useRouter();
    const items = useCartStore((s) => s.items);
    const subtotal = useCartStore((s) => s.subtotal);
    const hasHydrated = useCartStore((s) => s.hasHydrated);
    const setDelivery = useCheckoutStore((s) => s.setDelivery);
    const saveToSession = useCheckoutStore((s) => s.saveToSession);

    const trackedRef = useRef(false);
    useEffect(() => {
        if (hasHydrated && !trackedRef.current && items.length > 0) {
            trackBeginCheckout(items, subtotal);
            trackedRef.current = true;
        }
    }, [hasHydrated, items, subtotal]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState(0);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = "নাম আবশ্যক";
        if (!phone.trim() || !/^01[0-9]{9}$/.test(phone.trim()))
            errs.phone = "সঠিক মোবাইল নাম্বার দিন (01XXXXXXXXX)";
        if (!address.trim()) errs.address = "ঠিকানা আবশ্যক";
        if (!deliveryCharge) errs.delivery = "ডেলিভারি এরিয়া সিলেক্ট করুন";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleProceed = () => {
        if (!validate()) return;
        setDelivery({
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            note: note.trim(),
            deliveryCharge,
        });
        saveToSession();
        router.push("/payment");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#fffcf5] flex flex-col items-center justify-center gap-4 py-20">
                <div className="max-w-md w-full px-4">
                    <Stepper step={3} />
                </div>
                <p className="text-xl font-serif font-bold text-emerald-900">কার্ট খালি</p>
                <Link
                    href="/shop"
                    className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-800 transition-colors"
                >
                    কেনাকাটা করুন
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf5] pb-20">
            <div className="max-w-5xl mx-auto px-4 pt-4">
                <Stepper step={3} />

                <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-900 mb-8 text-center">
                    শিপিং তথ্য দিন
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Form */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Personal Info */}
                        <section className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm space-y-5">
                            <div className="flex items-center gap-2 border-b border-emerald-50 pb-3">
                                <User size={18} className="text-emerald-700" />
                                <h2 className="text-lg font-serif font-semibold text-emerald-900">ব্যক্তিগত তথ্য</h2>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-emerald-900">
                                    আপনার নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="পুরো নাম লিখুন"
                                    className="w-full px-4 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-emerald-900">
                                    মোবাইল নাম্বার <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    className="w-full px-4 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-emerald-900">
                                    সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows={3}
                                    placeholder="গ্রাম/রোড নং, পাড়া/মহল্লা, জেলা"
                                    className="w-full px-4 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-emerald-900">বিশেষ নোট (অপশনাল)</label>
                                <input
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    type="text"
                                    placeholder="স্পেশাল মেসেজ লিখুন"
                                    className="w-full px-4 py-3 bg-[#fdfbf7] border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </section>

                        {/* Delivery Area */}
                        <section className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-emerald-50 pb-3 mb-5">
                                <Truck size={18} className="text-emerald-700" />
                                <h2 className="text-lg font-serif font-semibold text-emerald-900">ডেলিভারি এরিয়া</h2>
                            </div>
                            <div className="space-y-3">
                                {DELIVERY_OPTIONS.map((opt) => (
                                    <label
                                        key={opt.charge}
                                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                                            deliveryCharge === opt.charge
                                                ? "border-emerald-600 bg-emerald-50"
                                                : "border-gray-100 hover:border-emerald-200 bg-[#fdfbf7]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                className="w-4 h-4 accent-emerald-700"
                                                checked={deliveryCharge === opt.charge}
                                                onChange={() => setDeliveryCharge(opt.charge)}
                                            />
                                            <div>
                                                <p className="font-semibold text-emerald-900 text-sm">{opt.label}</p>
                                                <p className="text-xs text-gray-400">{opt.sublabel}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-emerald-900">৳{opt.charge}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.delivery && <p className="text-red-500 text-xs mt-2">{errors.delivery}</p>}
                        </section>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-emerald-900 text-white p-6 rounded-[2rem] sticky top-24 shadow-xl shadow-emerald-900/20">
                            <h2 className="text-xl font-serif font-bold mb-4 border-b border-emerald-800 pb-4">
                                অর্ডার পর্যালোচনা
                            </h2>

                            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <div
                                        key={`${item.product_id}-${item.variant_id ?? 0}`}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-800 shrink-0 bg-white/10">
                                            <Image
                                                src={item.image || "/images/products/product_1.webp"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-0.5"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium line-clamp-1 text-white">{item.name}</p>
                                            <p className="text-xs text-emerald-300">×{item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold shrink-0">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 text-sm text-emerald-200 border-t border-emerald-800 pt-3">
                                <div className="flex justify-between">
                                    <span>সাবটোটাল</span>
                                    <span className="font-bold">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span className="font-bold">
                                        {deliveryCharge > 0 ? `৳${deliveryCharge}` : "—"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between text-white text-lg font-bold border-t border-emerald-800 pt-3 mt-2">
                                <span>সর্বমোট</span>
                                <span>৳{(subtotal + deliveryCharge).toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleProceed}
                                className="mt-5 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
                            >
                                পেমেন্টে যান <ArrowRight size={18} />
                            </button>

                            <Link
                                href="/cart"
                                className="mt-3 block text-center text-emerald-300 hover:text-white text-sm transition-colors"
                            >
                                ← কার্টে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
