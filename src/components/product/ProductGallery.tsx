"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    alt: string;
}

const FALLBACK = "/images/products/product_1.webp";

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const list = images.length ? images : [FALLBACK];
    const [active, setActive] = useState(0);

    return (
        <div className="border-2 border-emerald-50 rounded-[2rem] bg-white shadow-sm overflow-hidden p-3">
            <div className="relative aspect-square overflow-hidden group mb-3 border rounded-2xl bg-[#fffcf5]">
                <Image
                    src={list[active]}
                    alt={alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {list.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                    {list.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative w-16 h-16 md:w-20 md:h-20 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                                active === i
                                    ? "border-emerald-600 ring-4 ring-emerald-50 scale-105"
                                    : "border-gray-100 hover:border-emerald-200"
                            }`}
                        >
                            <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="80px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
