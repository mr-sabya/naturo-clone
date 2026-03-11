"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import ProductCard from "../product/ProductCard";
import Link from "next/link";

interface Product {
    id: string | number;
    name: string;
    price: string | number;
    originalPrice?: string | number;
    image: string;
    slug: string;
}

interface ProductCarouselProps {
    title: string;
    products: Product[];
    viewAllLink?: string; // New prop for the "View more" link
}

export default function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((emblaApi: any) => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-6 md:py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="w-full">

                    {/* --- Updated Header Section --- */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                                {title}
                            </h2>
                            {viewAllLink && (
                                <Link
                                    href={viewAllLink}
                                    className="flex items-center gap-1 text-gray-500 hover:text-naturoGreen text-sm md:text-base transition-colors"
                                >
                                    View more <ChevronRightIcon size={16} />
                                </Link>
                            )}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                className={`w-8 h-8 flex items-center justify-center rounded border border-gray-100 transition-all ${canScrollPrev ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : "opacity-40 cursor-not-allowed"
                                    }`}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                className={`w-8 h-8 flex items-center justify-center rounded border border-gray-100 transition-all ${canScrollNext ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : "opacity-40 cursor-not-allowed"
                                    }`}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* --- Carousel Body --- */}
                    <div className="overflow-hidden px-1" ref={emblaRef}>
                        <div className="flex -ml-3 md:-ml-4 items-stretch">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="min-w-0 shrink-0 grow-0 pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                                >
                                    <ProductCard
                                        name={product.name}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        slug={product.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}