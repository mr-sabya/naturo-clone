"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

interface Review {
    id: number;
    message?: string;
    content?: string;
    rating?: number;
    image?: string;
    customer_name?: string;
    name?: string;
}

const STATIC_REVIEWS: Review[] = [
    {
        id: 1,
        message: "কোল্ড প্রেস নারকেল তেল অনেক ভালো লেগেছে। নিয়মিত ব্যবহার করলে চুলের কোনো সমস্যা থাকবে না।",
        rating: 5,
        image: "/images/reviews/review-1.jpg",
        customer_name: "সন্তুষ্ট ক্রেতা",
    },
    {
        id: 2,
        message: "এক মাস যাবত কোল্ড প্রেস নারকেল তেল ব্যবহার করছে। অনেক ভালো মনে হয়েছে। চুলের আগা ফাটা কমে গেছে।",
        rating: 5,
        image: "/images/reviews/review-1.jpg",
        customer_name: "সন্তুষ্ট ক্রেতা",
    },
    {
        id: 3,
        message: "চার মাস যাবত চুল পড়ছিলো। এখন প্রকৃতিজের পণ্য ব্যবহার করে ৬ মাস যাবত ভালো আছি। ধন্যবাদ প্রকৃতিজ কে ❤️",
        rating: 5,
        image: "/images/reviews/review-1.jpg",
        customer_name: "সন্তুষ্ট ক্রেতা",
    },
];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export default function CustomerReviewSlider() {
    const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);

    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "center", slidesToScroll: 1 },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        fetch(`${API_BASE}/reviews`, {
            headers: { Accept: "application/json", "X-Tenant-Id": TENANT_ID },
        })
            .then((r) => r.json())
            .then((data) => {
                const list: Review[] = Array.isArray(data) ? data : data.data ?? [];
                if (list.length > 0) setReviews(list);
            })
            .catch(() => {});
    }, []);

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
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
                                <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-gray-100 shadow-md h-full flex flex-col">
                                    {review.image ? (
                                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                                            <Image
                                                src={review.image}
                                                alt={review.customer_name ?? review.name ?? "Customer Review"}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed flex-1 mb-4">
                                            &ldquo;{review.message ?? review.content}&rdquo;
                                        </p>
                                    )}

                                    {review.customer_name || review.name ? (
                                        <p className="text-sm font-bold text-emerald-800 mb-3">
                                            — {review.customer_name ?? review.name}
                                        </p>
                                    ) : null}

                                    <div className="flex items-center justify-center gap-0.5 border-t pt-4 border-gray-100 mt-auto">
                                        {[...Array(review.rating ?? 5)].map((_, i) => (
                                            <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
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
