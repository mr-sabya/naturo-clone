"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Category } from "@/types";

export default function CategorySlider() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", slidesToScroll: 1, containScroll: "trimSnaps" },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/tab-categories`,
            {
                headers: {
                    Accept: "application/json",
                    "X-Tenant-Id": process.env.NEXT_PUBLIC_TENANT_ID!,
                },
                cache: "no-store",
            }
        )
            .then((r) => r.json())
            .then((data) => {
                const list: Category[] = Array.isArray(data) ? data : data.data ?? [];
                setCategories(list);
            })
            .catch(() => setCategories([]));
    }, []);

    if (categories.length === 0) return null;

    return (
        <section className="bg-[#cde7d8] py-6 border-y border-white/20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex select-none">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex-[0_0_20%] sm:flex-[0_0_14%] md:flex-[0_0_11%] lg:flex-[0_0_9%] min-w-0 px-1"
                            >
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className="flex flex-col items-center group cursor-pointer"
                                >
                                    <div className="w-14 h-14 md:w-15 md:h-15 bg-white/80 rounded-full flex items-center justify-center border border-white shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                        <div className="relative w-10 h-10 md:w-11 md:h-11">
                                            <Image
                                                src={cat.icon ?? cat.image ?? "/images/categories/all.png"}
                                                alt={cat.name}
                                                fill
                                                sizes="(max-width: 768px) 44px, 60px"
                                                className="object-contain p-0.5"
                                            />
                                        </div>
                                    </div>
                                    <span className="mt-1 text-[#002d17] group-hover:text-naturoGreen text-[12px] md:text-[13px] font-bold whitespace-nowrap transition-colors duration-300 text-center">
                                        {cat.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
