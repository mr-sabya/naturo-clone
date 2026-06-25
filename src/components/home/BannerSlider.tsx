"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import type { Banner, BannerTitle } from "@/types";

function renderTitle(title: string | BannerTitle | undefined) {
    if (!title) return null;
    if (typeof title === "string") return <>{title}</>;
    return (
        <>
            {title.upper && (
                <span className="block text-3xl md:text-5xl lg:text-6xl">{title.upper}</span>
            )}
            {title.main && (
                <span className="block text-4xl md:text-6xl lg:text-7xl">{title.main}</span>
            )}
        </>
    );
}

export default function BannerSlider() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
        Autoplay({ delay: 6000, stopOnInteraction: false }),
    ]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hero-banners`, {
            headers: {
                Accept: "application/json",
                "X-Tenant-Id": process.env.NEXT_PUBLIC_TENANT_ID!,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                const list: Banner[] = Array.isArray(data) ? data : data.data ?? [];
                setBanners(list);
            })
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    if (!loaded) {
        return (
            <section className="relative overflow-hidden bg-[#f9f8f3] h-[500px] md:h-[650px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-naturoGreen border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    if (banners.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-[#f9f8f3]">
            <div className="w-full" ref={emblaRef}>
                <div className="flex">
                    {banners.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="min-w-0 shrink-0 grow-0 basis-full relative h-[500px] md:h-[650px] lg:h-[650px]"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={typeof slide.title === "string" ? slide.title : (slide.title?.main ?? "Banner")}
                                    fill
                                    priority={index === 0}
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/50 md:to-transparent" />
                            </div>

                            <div className="relative h-full container mx-auto px-6 md:px-14 flex flex-col justify-center">
                                <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                                    {slide.subtitle && (
                                        <span className="block text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-naturoOrange animate-fadeInUp">
                                            {slide.subtitle}
                                        </span>
                                    )}

                                    {slide.title && (
                                        <h1 className="font-serif font-bold leading-tight animate-fadeInUp delay-100">
                                            {renderTitle(slide.title)}
                                        </h1>
                                    )}

                                    {slide.description && (
                                        <p className="text-base md:text-lg text-gray-100 max-w-lg leading-relaxed animate-fadeInUp delay-200">
                                            {slide.description}
                                        </p>
                                    )}

                                    {slide.link && (
                                        <div className="flex flex-wrap gap-4 pt-4 animate-fadeInUp delay-300">
                                            <Link
                                                href={slide.link}
                                                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-8 py-3.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                                            >
                                                {slide.button_text ?? "Shop Now"}
                                                <ArrowRight size={18} />
                                            </Link>
                                            <Link
                                                href="/about-us"
                                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-full font-medium transition-all"
                                            >
                                                Our Story
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
