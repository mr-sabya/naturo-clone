"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const sliderData = [
    {
        id: 1,
        image: "/images/banners/slider_1.webp", // Path starts from the public folder
        title: "Pure Honey",
        desc: "100% Organic and Natural",
    },
    {
        id: 2,
        image: "/images/banners/slider_2.webp",
        title: "Natural Oils",
        desc: "Pressed with care",
    },
];

export default function BannerSlider() {
    // Initialize Embla with Autoplay
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    return (
        <section className="overflow-hidden bg-gray-100">
            <div className="w-full mx-auto">
                <div className="relative w-full" ref={emblaRef}>
                    <div className="flex">
                        {sliderData.map((slide) => (
                            <div
                                key={slide.id}
                                className="min-w-0 shrink-0 grow-0 basis-full relative"
                            >
                                {/* The Container with responsive heights */}
                                <div className="relative md:h-[600px] sm:h-[400px] h-[230px] w-full flex flex-col justify-center px-6 md:px-14">

                                    {/* Background Image */}
                                    <Image
                                        src={slide.image}
                                        alt={`Banner ${slide.id}`}
                                        fill
                                        priority={slide.id === 1}
                                        className="object-cover z-0"
                                    />

                                    
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Optional: Add navigation dots here if needed */}
                </div>
            </div>
        </section>
    );
}