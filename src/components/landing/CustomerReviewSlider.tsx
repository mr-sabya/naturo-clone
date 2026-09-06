"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import type { ReviewImage } from "@/types";

interface CustomerReviewSliderProps {
    reviews: ReviewImage[];
}

export default function CustomerReviewSlider({ reviews }: CustomerReviewSliderProps) {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "center", slidesToScroll: 1 },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    // If no reviews are uploaded in the backend, don't show the section
    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="py-14 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                        আমাদের অনেক কাস্টমার রিভিউ রয়েছে তার ভিতরে কিছু দেওয়া হল
                    </h2>
                    <Link href="#checkout" className="text-emerald-700 font-bold hover:underline">
                        এখানে অর্ডার করুন
                    </Link>
                </div>

                <div className="overflow-hidden relative" ref={emblaRef}>
                    <div className="flex select-none pb-5">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 px-4"
                            >
                                <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-gray-100 shadow-md">
                                    <div className="pt-2 flex justify-center">
                                        <Image
                                            src={review.image}
                                            alt={`Customer Review ${review.id}`}
                                            width={350}
                                            height={300}
                                            unoptimized
                                            className="rounded-lg object-contain"
                                        />
                                    </div>

                                    <div className="flex items-center justify-center gap-0.5 mt-4 border-t pt-4 border-gray-100">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
