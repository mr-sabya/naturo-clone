"use client";

import React, { useEffect, useState } from "react";

interface VideoReview {
    id: number;
    title?: string;
    youtube_id?: string;
    youtubeId?: string;
    video_url?: string;
    thumbnail?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export default function VideoReviewSection() {
    const [videos, setVideos] = useState<VideoReview[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/video-reviews`, {
            headers: { Accept: "application/json", "X-Tenant-Id": TENANT_ID },
        })
            .then((r) => r.json())
            .then((data) => {
                const list: VideoReview[] = Array.isArray(data) ? data : data.data ?? [];
                setVideos(list);
            })
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    if (!loaded || videos.length === 0) return null;

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
                        const ytId = video.youtube_id ?? video.youtubeId ?? "";
                        const embedUrl = video.video_url ?? (ytId ? `https://www.youtube.com/embed/${ytId}?modestbranding=1&rel=0` : "");
                        if (!embedUrl) return null;
                        return (
                            <div
                                key={video.id}
                                className="group relative bg-black rounded-[2rem] overflow-hidden shadow-xl shadow-emerald-900/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-4 border-white"
                            >
                                <div className="relative aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={embedUrl}
                                        title={video.title ?? "Customer Review"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
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
