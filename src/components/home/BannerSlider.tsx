"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react"; // Install lucide-react if you haven't

const sliderData = [
  {
    id: 1,
    image: "/images/banners/slider_1.webp",
    subtitle: "100% ORGANIC & NATURAL",
    title: "Pure Honey From \n Nature's Heart",
    desc: "Experience the sweetness of purity with our ethically sourced, unpasteurized organic honey.",
    buttonText: "Shop Collection",
    link: "/category/honey",
  },
  {
    id: 2,
    image: "/images/banners/slider_2.webp",
    subtitle: "COLD PRESSED OILS",
    title: "Traditional Care \n for Modern Wellness",
    desc: "Nutrient-rich oils extracted using traditional wood-pressing methods to keep the goodness intact.",
    buttonText: "Explore More",
    link: "/category/oils",
  },
];

export default function BannerSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  return (
    <section className="relative overflow-hidden bg-[#f9f8f3]">
      <div className="w-full" ref={emblaRef}>
        <div className="flex">
          {sliderData.map((slide) => (
            <div
              key={slide.id}
              className="min-w-0 shrink-0 grow-0 basis-full relative h-[500px] md:h-[650px] lg:h-[650px]"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover object-center"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/50 md:to-transparent" />
              </div>

              {/* Content Container */}
              <div className="relative h-full container mx-auto px-6 md:px-14 flex flex-col justify-center">
                <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                  {/* Animated Subtitle */}
                  <span className="block text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-naturoOrange animate-fadeInUp">
                    {slide.subtitle}
                  </span>

                  {/* Main Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight whitespace-pre-line animate-fadeInUp delay-100">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-100 max-w-lg leading-relaxed animate-fadeInUp delay-200">
                    {slide.desc}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4 animate-fadeInUp delay-300">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-8 py-3.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
                    >
                      {slide.buttonText}
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-full font-medium transition-all"
                    >
                      Our Story
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      
    </section>
  );
}