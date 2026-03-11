"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";

interface ProductProps {
    name: string;
    price: string | number;
    originalPrice?: string | number;
    image: string;
    slug: string;
    isOutOfStock?: boolean; // New prop
    label?: string;         // New prop for "সিঙ্গেল পিস" etc.
}

const ProductCard = ({ name, price, originalPrice, image, slug, isOutOfStock, label }: ProductProps) => {
    return (
        <div className="bg-white border border-gray-100 rounded-md overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col h-full relative">

            {/* 1. PRODUCT IMAGE */}
            <Link href={`/product/${slug}`} className="block relative aspect-square bg-white shrink-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className={`object-contain p-4 group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'opacity-60 grayscale-[50%]' : ''}`}
                />

                {/* --- Out of Stock Badge --- */}
                {isOutOfStock && (
                    <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                        Out of Stock
                    </div>
                )}

                {/* --- Custom Label (e.g., সিঙ্গেল পিস) --- */}
                {label && (
                    <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-500 z-10">
                        {label}
                    </div>
                )}
            </Link>

            {/* 2. ACTION BAR */}
            <div className="grid grid-cols-2 border-y border-gray-100 bg-[#f8f9fa] shrink-0">
                <Link href={`/product/${slug}`} className="flex justify-center items-center py-2.5 hover:bg-white transition-colors border-r border-gray-100 group/icon">
                    <Eye size={18} className="text-gray-600 group-hover/icon:text-naturoGreen" />
                </Link>
                <button
                    disabled={isOutOfStock}
                    className={`flex justify-center items-center py-2.5 hover:bg-white transition-colors group/icon ${isOutOfStock ? 'cursor-not-allowed opacity-30' : ''}`}
                >
                    <ShoppingCart size={18} className="text-gray-600 group-hover/icon:text-naturoGreen" />
                </button>
            </div>

            {/* 3. PRODUCT DETAILS */}
            <div className="p-3 flex flex-col flex-1">
                <Link href={`/product/${slug}`}>
                    <h3 className="text-[#1a1a1a] font-bold text-[13px] md:text-[14px] leading-snug mb-2 hover:text-naturoGreen transition-colors line-clamp-2">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[18px] md:text-[20px] font-bold text-[#84b544]">
                        ৳{price}
                    </span>
                    {originalPrice && (
                        <span className="text-gray-400 line-through text-[13px] md:text-[14px]">
                            ৳{originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;