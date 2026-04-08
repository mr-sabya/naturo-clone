"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; // 1. Import Autoplay
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallerySection({ images }: ImageGalleryProps) {
    // 2. Initialize Embla with Autoplay Plugin
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            slidesToScroll: 1,
            loop: true,
        },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false, // Keeps playing even after user clicks
                stopOnMouseEnter: true    // Pauses when user hovers mouse
            })
        ]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    // Control Logic
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 bg-white px-4">
            <div className="max-w-6xl mx-auto relative group">

                {/* Navigation Header */}
                

                {/* Slider Viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4"> {/* Negative margin to offset padding */}
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                            >
                                <div className="rounded-2xl overflow-hidden border-[3px] border-[#ff8a00] shadow-xl hover:shadow-2xl transition-all duration-500 group relative">
                                    <div className="relative aspect-square">
                                        <Image
                                            src={img}
                                            alt={`Gallery Image ${i + 1}`}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Subtle decorative overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Progress Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`h-2 transition-all duration-500 rounded-full ${selectedIndex === index ? "w-8 bg-[#ff8a00]" : "w-2 bg-emerald-100"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}