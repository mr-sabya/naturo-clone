"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../product/ProductCard"; // Reuse your existing card

interface SideCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
    // Mock Cart Data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "মধুময় বাদাম | Honey Nut",
            price: 1250,
            quantity: 1,
            image: "/images/products/product_1.webp",
        },
    ]);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* --- BACKDROP --- */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                    />

                    {/* --- CART DRAWER --- */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        {/* --- HEADER --- */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <button
                                onClick={onClose}
                                className="flex items-center gap-1 text-[#2d4a8a] text-sm font-medium hover:underline"
                            >
                                <ChevronLeft size={18} /> Continue Shopping
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                            <div className="relative">
                                <span className="flex items-center justify-center w-7 h-7 border-2 border-[#2d4a8a] text-[#2d4a8a] rounded-full font-bold text-sm">
                                    {cartItems.length}
                                </span>
                            </div>
                        </div>

                        {/* --- SCROLLABLE CONTENT --- */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Cart Items List */}
                            <div className="p-4 space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 relative">
                                        <div className="w-20 h-20 relative border border-gray-100 rounded bg-white">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start pr-6">
                                                <h3 className="text-sm font-bold text-gray-800 leading-tight">
                                                    {item.name}
                                                </h3>
                                                <button className="text-gray-400 hover:text-red-500 absolute right-0 top-0">
                                                    <Trash2 size={20} strokeWidth={1.5} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-200 rounded">
                                                    <button className="p-1 px-2 text-gray-400 hover:bg-gray-50"><Minus size={14} /></button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button className="p-1 px-2 text-gray-400 hover:bg-gray-50"><Plus size={14} /></button>
                                                </div>
                                                <span className="font-bold text-gray-800">৳{item.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Upsell Section (You'll also love) */}
                            <div className="bg-gray-50/50 p-4 mt-8 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">You'll also love</h3>
                                    <div className="flex gap-1">
                                        <button className="p-1 bg-gray-200/50 rounded hover:bg-gray-200"><ChevronLeft size={18} /></button>
                                        <button className="p-1 bg-gray-200/50 rounded hover:bg-gray-200"><ChevronRight size={18} /></button>
                                    </div>
                                </div>

                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {/* Mock Upsell Items */}
                                    {[1, 2].map((i) => (
                                        <div key={i} className="min-w-[200px] bg-white border border-gray-100 rounded-lg p-3">
                                            <div className="relative aspect-square mb-2">
                                                <Image src="/images/products/product_3.webp" alt="upsell" fill className="object-contain" />
                                                <span className="absolute top-0 right-0 bg-black text-white text-[10px] px-1.5 rounded">Out of Stock</span>
                                            </div>
                                            <h4 className="text-xs font-bold leading-tight mb-2">প্রিমিয়াম বিটরুট পাউডার | Beetroot</h4>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-naturoGreen font-bold">৳700</span>
                                                <span className="text-[10px] text-gray-400 line-through">৳1,200</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- STICKY FOOTER --- */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold">৳{total.toLocaleString()}</span>
                            </div>
                            <button className="w-full bg-[#9ACD32] hover:bg-[#8bbd2d] text-white py-4 rounded font-bold text-lg transition-colors">
                                অর্ডার করুন
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}