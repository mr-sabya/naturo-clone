"use client";

import React from "react";
import { Play } from "lucide-react";

const videoReviews = [
    {
        id: 1,
        title: "সম্মানিত কাস্টমার রিভিউ",
        youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube Video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
        id: 2,
        title: "সম্মানিত কাস্টমার রিভিউ",
        youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube Video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
        id: 3,
        title: "সম্মানিত গ্রাহক রিভিউ",
        youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube Video ID
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
];

export default function VideoReviewSection() {
    return (
        <section className="py-16 md:py-24 bg-white px-4">
            <div className="max-w-6xl mx-auto">

                {/* Section Heading */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#006400] leading-tight font-serif">
                        আমাদের অনেক কাস্টমার ভিডিও রিভিউ রয়েছে তার ভিতরে কিছু দেওয়া হল
                    </h2>
                    <div className="h-1.5 w-24 bg-[#ff8a00] mx-auto mt-4 rounded-full opacity-80" />
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoReviews.map((video) => (
                        <div
                            key={video.id}
                            className="group relative bg-black rounded-[2rem] overflow-hidden shadow-xl shadow-emerald-900/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-4 border-white"
                        >
                            {/* Aspect Ratio Container (16:9) */}
                            <div className="relative aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Bottom Label overlay (Optional - matches your screenshot style) */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                                <div className="w-10 h-10 rounded-full bg-white p-1 shadow-md">
                                    {/* Replace with your logo */}
                                    <div className="w-full h-full bg-emerald-700 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] text-white font-bold italic">PKZ</span>
                                    </div>
                                </div>
                                <div className="text-white drop-shadow-md">
                                    <p className="text-sm font-bold leading-none">{video.title}</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-tighter">Prakritiz • প্রাকৃতজ</p>
                                </div>
                            </div>

                            {/* Decorative Play Button (Shows only before interaction) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                <div className="w-16 h-16 bg-[#ff0000]/90 rounded-2xl flex items-center justify-center text-white shadow-2xl opacity-0 group-hover:opacity-10">
                                    <Play fill="currentColor" size={32} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
                        Trusted by 7,000+ Happy Customers
                    </p>
                </div>
            </div>
        </section>
    );
}