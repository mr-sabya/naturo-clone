"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        message: "কোল্ড প্রেস নারকেল তেল অনেক ভালো লেগেছে। কীটাও খাওয়া যায়। বাড়িতে আমার মা এবং স্ত্রী ব্যবহার করছে। অনেক ভালো। নিয়মিত ব্যবহার করলে চুলের কোন সমস্যা থাকবে না।",
        rating: 5,
        image: "/images/reviews/review-1.jpg" // Replace with actual cropped images
    },
    {
        id: 2,
        message: "আমার স্ত্রী ইতিপূর্বে ব্র্যান্ডের তেল ইউজ করত। এক মাস যাবত প্রকৃতিজের কোল্ড প্রেস নারকেল তেল ব্যবহার করছে। অনেক ভালো মনে হয়েছে। স্ত্রী বলল চুলের আগা ফাটা কমে গেছে এবং চুল লম্বা হচ্ছে ফিলকিনেস বেশি পাওয়া যাচ্ছে।",
        rating: 5,
        image: "/images/reviews/review-1.jpg"
    },
    {
        id: 3,
        message: "আমার আমার চার মাস যাবত চুল পড়ছিলো। এখন প্রকৃতিজের কোল্ড প্রেস নারকেল তেল ব্যবহার করে ৬ মাস যাবত ভালো আছে। ধন্যবাদ প্রকৃতিজ কে ❤️❤️",
        rating: 5,
        image: "/images/reviews/review-1.jpg"
    },
    {
        id: 3,
        message: "আমার আমার চার মাস যাবত চুল পড়ছিলো। এখন প্রকৃতিজের কোল্ড প্রেস নারকেল তেল ব্যবহার করে ৬ মাস যাবত ভালো আছে। ধন্যবাদ প্রকৃতিজ কে ❤️❤️",
        rating: 5,
        image: "/images/reviews/review-1.jpg"
    },
];

export default function CustomerReviewSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            slidesToScroll: 1,
        },
        [
            Autoplay({ delay: 4000, stopOnInteraction: false })
        ]
    );

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                        আমাদের অনেক কাস্টমার রিভিউ রয়েছে তার ভিতরে কিছু দেওয়া হল
                    </h2>
                    <Link href="#" className="text-emerald-700 font-bold hover:underline">
                        এখানে অর্ডার করুন
                    </Link>
                </div>

                <div className="overflow-hidden relative group">
                    <div className="embla" ref={emblaRef}>
                        <div className="flex select-none pb-5">
                            {reviews.map((review) => (
                                <div key={review.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 px-6 md:px-6">
                                    <div className="bg-white rounded-[1rem] p-6 md:p-8 border border-gray-100 shadow-md">

                                        {/* Mock Chat Bubble with Star Rating */}
                                        <div className="relative mb-6 text-left leading-relaxed">
                                            
                                            {/* actual feedback image will be inserted here! */}
                                            <div className="pt-5">
                                                <Image
                                                    src={review.image}
                                                    alt="feedback banner"
                                                    width={350}
                                                    height={300}
                                                />
                                            </div>
                                        </div>

                                        {/* Yellow Stars */}
                                        <div className="flex items-center justify-center gap-0.5 mt-1 border-t pt-4 border-gray-200">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={20} className="text-yellow-500" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}