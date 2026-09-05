"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Product } from "@/types";

interface SideCartProps {
    isOpen: boolean;
    onClose: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export default function SideCart({ isOpen, onClose }: SideCartProps) {
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const totalPrice = useCartStore((s) => s.totalPrice);
    const totalItems = useCartStore((s) => s.totalItems);

    const [upsellProducts, setUpsellProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!isOpen) return;
        fetch(`${API_BASE}/affordable-suggestions`, {
            headers: { Accept: "application/json", "X-Tenant-Id": TENANT_ID },
        })
            .then((r) => r.json())
            .then((data) => setUpsellProducts(Array.isArray(data) ? data : data.data ?? []))
            .catch(() => {});
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <button
                                onClick={onClose}
                                className="flex items-center gap-1 text-[#2d4a8a] text-sm font-medium hover:underline"
                            >
                                <ChevronLeft size={18} /> Continue Shopping
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                            <span className="flex items-center justify-center w-7 h-7 border-2 border-[#2d4a8a] text-[#2d4a8a] rounded-full font-bold text-sm">
                                {totalItems()}
                            </span>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Cart Items */}
                            <div className="p-4 space-y-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-16 text-gray-400">
                                        <p className="text-lg font-medium">আপনার কার্ট খালি</p>
                                        <p className="text-sm mt-1">পণ্য যোগ করুন</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={`${item.product_id}-${item.variant_id ?? 0}`} className="flex gap-4 relative">
                                            <div className="w-20 h-20 relative border border-gray-100 rounded bg-white shrink-0">
                                                <Image
                                                    src={item.image || "/images/products/product_1.webp"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start pr-6">
                                                    <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.product_id, item.variant_id)}
                                                        className="text-gray-400 hover:text-red-500 absolute right-0 top-0 transition-colors"
                                                    >
                                                        <Trash2 size={20} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                {item.variant_name && (
                                                    <p className="text-xs text-gray-400">{item.variant_name}</p>
                                                )}
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border border-gray-200 rounded">
                                                        <button
                                                            onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.variant_id)}
                                                            className="p-1 px-2 text-gray-400 hover:bg-gray-50"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.variant_id)}
                                                            className="p-1 px-2 text-gray-400 hover:bg-gray-50"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-gray-800">
                                                        ৳{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Upsell Section */}
                            {upsellProducts.length > 0 && (
                                <div className="bg-gray-50/50 p-4 mt-4 border-t border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">You&apos;ll also love</h3>
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {upsellProducts.slice(0, 4).map((p) => (
                                            <Link
                                                key={p.id}
                                                href={p.has_active_landing_page ? `/${p.slug}` : `/product/${p.slug}`}
                                                onClick={onClose}
                                                className="min-w-[180px] bg-white border border-gray-100 rounded-lg p-3 hover:border-naturoGreen transition-colors"
                                            >
                                                <div className="relative aspect-square mb-2">
                                                    <Image
                                                        src={p.main_image || p.image || "/images/products/product_1.webp"}
                                                        alt={p.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <h4 className="text-xs font-bold leading-tight mb-2 line-clamp-2">{p.name}</h4>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-naturoGreen font-bold">৳{parsePrice(p.effective_price ?? p.sale_price ?? p.price)}</span>
                                                    {parseOriginalPrice(p.base_price ?? p.regular_price ?? p.original_price, p.effective_price ?? p.sale_price ?? p.price) && (
                                                        <span className="text-[10px] text-gray-400 line-through">৳{parseOriginalPrice(p.base_price ?? p.regular_price ?? p.original_price, p.effective_price ?? p.sale_price ?? p.price)}</span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        {items.length > 0 && (
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold">৳{totalPrice().toLocaleString()}</span>
                                </div>
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="block w-full text-center bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 active:scale-[0.98]"
                                >
                                    অর্ডার করুন
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
