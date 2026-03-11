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
}

const ProductCard = ({ name, price, originalPrice, image, slug }: ProductProps) => {
    return (
        /* h-full ensures all cards in a row have the same height */
        <div className="bg-white border border-gray-100 rounded-md overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col h-full">

            {/* 1. PRODUCT IMAGE - Fixed Aspect Ratio */}
            <Link href={`/product/${slug}`} className="block relative aspect-square bg-white shrink-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* 2. ACTION BAR */}
            <div className="grid grid-cols-2 border-y border-gray-100 bg-[#f8f9fa] shrink-0">
                <button className="flex justify-center items-center py-2 hover:bg-white transition-colors border-r border-gray-100">
                    <Eye size={18} className="text-gray-600" />
                </button>
                <button className="flex justify-center items-center py-2 hover:bg-white transition-colors">
                    <ShoppingCart size={18} className="text-gray-600" />
                </button>
            </div>

            {/* 3. PRODUCT DETAILS - flex-1 pushes content to fill space */}
            <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                    <Link href={`/product/${slug}`}>
                        {/* min-h and line-clamp ensure titles always take exactly 2 lines worth of space */}
                        <h3 className="text-[#1a1a1a] font-bold text-[13px] md:text-[14px] leading-snug mb-2 hover:text-naturoGreen transition-colors line-clamp-2">
                            {name}
                        </h3>
                    </Link>
                </div>

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