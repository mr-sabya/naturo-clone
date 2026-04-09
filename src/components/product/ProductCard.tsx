"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Heart } from "lucide-react";

interface ProductProps {
  name: string;
  price: string | number;
  originalPrice?: string | number;
  image: string;
  slug: string;
  isOutOfStock?: boolean;
  label?: string;
  category?: string; // Added for better hierarchy
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  slug,
  isOutOfStock,
  label,
  category = "Organic",
}: ProductProps) => {
  // Calculate discount percentage if original price exists
  const discount = originalPrice 
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100) 
    : null;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500  flex flex-col h-full border border-gray-100/50 shadow">
      
      {/* 1. IMAGE SECTION */}
      <div className="relative aspect-[4/4] overflow-hidden bg-[#fbfbf9] border-b border-gray-100/50">
        <Link href={`/product/${slug}`} className="block h-full w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className={`object-contain transition-transform duration-700 ease-out group-hover:scale-110 ${
              isOutOfStock ? "opacity-50 grayscale" : ""
            }`}
          />
        </Link>

        {/* --- Badges --- */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && !isOutOfStock && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
          {label && (
            <span className="bg-white/90 backdrop-blur-md text-gray-700 text-[10px] font-semibold px-2 py-1 rounded-full border border-gray-100 shadow-sm">
              {label}
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}

        {/* --- Floating Actions (Visible on Hover) --- */}
        {!isOutOfStock && (
          <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button className="p-2.5 bg-white hover:bg-naturoGreen hover:text-white text-gray-600 rounded-full shadow-lg transition-colors duration-300">
              <Heart size={18} />
            </button>
            <Link 
              href={`/product/${slug}`}
              className="p-2.5 bg-white hover:bg-naturoGreen hover:text-white text-gray-600 rounded-full shadow-lg transition-colors duration-300"
            >
              <Eye size={18} />
            </Link>
          </div>
        )}
      </div>

      {/* 2. PRODUCT DETAILS */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1">
          {category}
        </span>

        {/* Title */}
        <Link href={`/product/${slug}`} className="mb-2">
          <h3 className="text-gray-800 font-semibold text-sm md:text-base leading-tight hover:text-naturoGreen transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Price & Cart Row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-gray-400 line-through text-xs">
                ৳{originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ৳{price}
            </span>
          </div>

          <button
            disabled={isOutOfStock}
            className={`
              flex items-center justify-center p-3 rounded-xl transition-all duration-300
              ${isOutOfStock 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-naturoGreen/10 text-naturoGreen hover:bg-naturoGreen hover:text-white active:scale-95'
              }
            `}
          >
            <ShoppingCart size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;