"use client";

import React from "react";
import type { VideoReview } from "@/types";

interface VideoReviewSectionProps {
    videos: VideoReview[];
}

export default function VideoReviewSection({ videos }: VideoReviewSectionProps) {
    // video_url is a raw YouTube watch URL — extract the ID for the embed src
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (!videos || videos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#006400] leading-tight font-serif">
                        আমাদের অনেক কাস্টমার ভিডিও রিভিউ রয়েছে তার ভিতরে কিছু দেওয়া হল
                    </h2>
                    <div className="h-1.5 w-24 bg-[#ff8a00] mx-auto mt-4 rounded-full opacity-80" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => {
                        const youtubeId = getYouTubeId(video.video_url);

                        return (
                            <div
                                key={video.id}
                                className="group relative bg-black rounded-[2rem] overflow-hidden shadow-xl shadow-emerald-900/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-4 border-white"
                            >
                                <div className="relative aspect-video">
                                    {youtubeId ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                            Invalid Video URL
                                        </div>
                                    )}
                                </div>

                                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                                    <div className="w-10 h-10 rounded-full bg-white p-1 shadow-md">
                                        <div className="w-full h-full bg-emerald-700 rounded-full flex items-center justify-center">
                                            <span className="text-[8px] text-white font-bold italic">PKZ</span>
                                        </div>
                                    </div>
                                    {video.title && (
                                        <div className="text-white drop-shadow-md">
                                            <p className="text-sm font-bold leading-none">{video.title}</p>
                                            <p className="text-[10px] opacity-80 uppercase tracking-tighter">Prakritiz • প্রাকৃতজ</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
                        Trusted by 7,000+ Happy Customers
                    </p>
                </div>
            </div>
        </section>
    );
}
