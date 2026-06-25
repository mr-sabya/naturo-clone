"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Stepper from "@/components/shared/Stepper";

export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const count = useCartStore((s) => s.count);
    const subtotal = useCartStore((s) => s.subtotal);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);

    if (count === 0) {
        return (
            <div className="min-h-screen bg-[#fffcf5] flex flex-col items-center justify-center gap-6 py-20">
                <div className="max-w-md w-full px-4">
                    <Stepper step={2} />
                </div>
                <ShoppingBag size={64} className="text-gray-200" />
                <p className="text-2xl font-serif font-bold text-emerald-900">আপনার কার্ট খালি</p>
                <p className="text-gray-400">কিছু পণ্য যোগ করুন এবং ফিরে আসুন</p>
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
                <Stepper step={2} />

                <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-900 mb-8 text-center">
                    আপনার কার্ট ({count} টি পণ্য)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-7 space-y-4">
                        {items.map((item) => (
                            <div
                                key={`${item.product_id}-${item.variant_id ?? 0}`}
                                className="bg-white rounded-[1.5rem] border border-emerald-50 p-4 flex gap-4 shadow-sm"
                            >
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-emerald-50 shrink-0">
                                    <Image
                                        src={item.image || "/images/products/product_1.webp"}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0 pr-2">
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="font-bold text-emerald-900 text-sm hover:underline line-clamp-2"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.variant_name && (
                                                <p className="text-xs text-gray-400 mt-0.5">{item.variant_name}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product_id, item.variant_id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center border border-emerald-100 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product_id, item.quantity - 1, item.variant_id)
                                                }
                                                className="px-3 py-1.5 hover:bg-emerald-50 transition-colors"
                                            >
                                                <Minus size={13} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-emerald-900">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product_id, item.quantity + 1, item.variant_id)
                                                }
                                                className="px-3 py-1.5 hover:bg-emerald-50 transition-colors"
                                            >
                                                <Plus size={13} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-emerald-900">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-emerald-900 text-white p-6 rounded-[2rem] sticky top-24 shadow-xl shadow-emerald-900/20">
                            <h2 className="text-xl font-serif font-bold mb-5 border-b border-emerald-800 pb-4">
                                অর্ডার সামারি
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-emerald-200">
                                    <span>মোট পণ্য</span>
                                    <span className="font-bold">{count} টি</span>
                                </div>
                                <div className="flex justify-between text-emerald-200">
                                    <span>সাবটোটাল</span>
                                    <span className="font-bold">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-emerald-200">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span className="text-yellow-300 font-medium">পরবর্তী ধাপে</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-white text-lg font-bold border-t border-emerald-800 pt-4 mt-4">
                                <span>সর্বমোট</span>
                                <span>৳{subtotal.toLocaleString()}+</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="mt-6 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
                            >
                                অর্ডার করতে এগিয়ে যান <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/shop"
                                className="mt-3 block text-center text-emerald-300 hover:text-white text-sm transition-colors"
                            >
                                ← কেনাকাটা চালিয়ে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
