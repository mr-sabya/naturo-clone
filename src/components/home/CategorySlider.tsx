"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const categories = [
    { id: 1, name: "Ghee", icon: "/images/categories/ghee.png" },
    { id: 2, name: "Herbs", icon: "/images/categories/herbs.png" },
    { id: 3, name: "Honey", icon: "/images/categories/honey.png" },
    { id: 4, name: "Nuts", icon: "/images/categories/nuts.png" },
    { id: 5, name: "Oil", icon: "/images/categories/oil.png" },
    { id: 6, name: "Popular", icon: "/images/categories/popular.png" },
    { id: 7, name: "Super Food", icon: "/images/categories/superfood.png" },
    { id: 8, name: "Wellness", icon: "/images/categories/wellness.png" },
    { id: 9, name: "All", icon: "/images/categories/all.png" },
    { id: 10, name: "Combo", icon: "/images/categories/combo.png" },
    { id: 11, name: "Functional", icon: "/images/categories/functional.png" },
];

export default function CategorySlider() {
    // Config: slidesToScroll: 1 makes it move 1 item at a time
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1, // Moves 1 item per scroll
            containScroll: "trimSnaps"
        },
        [
            Autoplay({ delay: 3000, stopOnInteraction: false }) // Auto-scrolls every 3 seconds
        ]
    );

    return (
        <section className="bg-[#cde7d8] py-6 border-y border-white/20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex select-none">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                /* 
                                   1. Changed px-2 to px-1 (reduces gap from 16px to 8px)
                                   2. Updated percentages to show more items, which brings them closer together
                                */
                                className="flex-[0_0_20%] sm:flex-[0_0_14%] md:flex-[0_0_11%] lg:flex-[0_0_9%] min-w-0 px-1"
                            >
                                <div className="flex flex-col items-center group cursor-pointer">
                                    {/* Circular Icon Container */}
                                    <div className="w-14 h-14 md:w-15 md:h-15 bg-white/80 rounded-full flex items-center justify-center border border-white shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                        <div className="relative w-10 h-10 md:w-11 md:h-11">
                                            <Image
                                                src={cat.icon}
                                                alt={cat.name}
                                                fill
                                                className="object-contain p-0.5"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://via.placeholder.com/40";
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Category Name */}
                                    <span className="mt-1 text-[#002d17] group-hover:text-naturoGreen text-[12px] md:text-[13px] font-bold whitespace-nowrap transition-colors duration-300">
                                        {cat.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}