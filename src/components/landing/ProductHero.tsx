import Link from "next/link";
import OrderButton from "./OrderButton";
import type { ProductHeroData } from "@/types";

interface ProductHeroProps {
    data: ProductHeroData;
    scrollToCheckoutHref: string;
}

export default function ProductHero({ data, scrollToCheckoutHref }: ProductHeroProps) {
    // Helper to format YouTube URL for Iframe
    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return (
        <section className="relative bg-[#f4f4f4] py-12 px-4 overflow-hidden border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Highlight Title */}
                    <h2 className="text-2xl md:text-5xl font-bold text-emerald-700 mb-4 font-serif">
                        {data.highlight_title}
                    </h2>

                    {/* Main Title */}
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                        {data.main_title}
                    </h1>

                    {/* Description */}
                    <p className="text-red-600 font-bold text-sm md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        {data.description}
                    </p>

                    <div className="mt-10">
                        <div className="flex justify-center">
                            <Link href={scrollToCheckoutHref}>
                                <OrderButton />
                            </Link>
                        </div>

                        {/* Video Section */}
                        {data.video_url && (
                            <div className="relative aspect-[16/9] mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white group mt-10">
                                <iframe
                                    className="w-full h-full"
                                    src={getEmbedUrl(data.video_url)}
                                    title="Product Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
