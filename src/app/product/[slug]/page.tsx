"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingBag, Minus, Plus, ChevronRight,
    CheckSquare, Facebook, Share2, ChevronDown,
    ChevronUp, ShieldCheck, PhoneCall, Coffee, Heart, Play,
    Check,
    Video
} from "lucide-react";
import CheckoutSection from "@/components/landing/CheckoutSection";
import ImageGallerySection from "@/components/landing/ImageGallerySection";
import ProductCarousel from "@/components/home/ProductCarousel";
import CustomerReviewSlider from "@/components/landing/CustomerReviewSlider";
import VideoReviewSection from "@/components/landing/VideoReviewSection";
import OrderButton from "@/components/landing/OrderButton";


const bestSellers = [
    {
        id: 1,
        name: "সরিষা মধু | Mustard Honey",
        price: "1,050",
        originalPrice: "1,300",
        image: "/images/products/product_1.webp",
        slug: "mustard-honey-box"
    },
    {
        id: 2,
        name: "আম্বর আশহাব | Ambor Ashab",
        price: "2,250",
        originalPrice: "3,500",
        image: "/images/products/product_2.webp",
        slug: "ambor-ashab"
    },
    {
        id: 3,
        name: "মিসওয়াক পাউডার | Miswak Powder",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_3.webp",
        slug: "miswak-powder"
    },
    {
        id: 4,
        name: "মধুময় বাদাম | Honey Nut",
        price: "1,250",
        originalPrice: "1,700",
        image: "/images/products/product_4.webp",
        slug: "honey-nut"
    },
    {
        id: 5,
        name: "পিংক সল্ট | Pink Salt",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_5.webp",
        slug: "pink-salt"
    }
];


export default function ProductDetails() {
    // 1. STATE MANAGEMENT
    const [quantity, setQuantity] = useState(1);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [selectedSize, setSelectedSize] = useState("৫০০ গ্রাম");

    // Remote images allowed in next.config.js
    const images = [
        "/images/products/product_1.webp",
        "/images/products/product_2.webp",
        "/images/products/product_3.webp",
        "/images/products/product_4.webp",
        "/images/products/product_5.webp",
    ];
    const [mainImage, setMainImage] = useState(images[0]);

    const pricePerItem = 950;
    const total = (pricePerItem * quantity) + deliveryCharge;

    // 2. HELPER FUNCTIONS
    const scrollToCheckout = () => {
        document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    };

    const faqs = [
        {
            q: "আপনাদের তেল খাঁটি তো? 👉",
            a: "আপনি শতভাগ আস্থা রাখতে পারেন। আমরা নিজস্ব তত্ত্বাবধানে নারকেল সংগ্রহ করে কোল্ড প্রেস কাঠের ঘানিতে উৎপাদন করে থাকি। আমাদের হাজার হাজার গ্রাহক কোল্ড প্রেস নারকেল তেল নিয়ে স্যাটিসফাইড।"
        },
        {
            q: "চুল পড়া কি সত্যিই বন্ধ হবে? 👉",
            a: "হ্যাঁ, আমাদের এই স্পেশাল কোল্ড প্রেস তেল নিয়মিত ব্যবহারে চুলের গোড়া মজবুত হয় এবং নতুন চুল গজাতে সাহায্য করে।"
        },
        {
            q: "কেন আমাদের থেকে নিবেন? 👉",
            a: "আমাদের লোকেশন বাগেরহাট। বাংলাদেশের ৭০% নারকেল এখান থেকেই উৎপাদিত হয়। আমরা সরাসরি কৃষকের থেকে নারকেল সংগ্রহ করে তেল তৈরি করি।"
        }
    ];

    return (
        <div className="bg-[#fffcf5] min-h-screen scroll-smooth selection:bg-emerald-100">

            {/* --- 1. BREADCRUMBS --- */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-emerald-700">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/shop" className="hover:text-emerald-700">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">কোল্ড প্রেস নারকেল তেল</span>
                </div>
            </div>

            {/* --- 2. LANDING HEADER SECTION --- */}
            <section className="relative bg-[#f4f4f4] py-12 px-4 overflow-hidden border-b border-gray-200">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-5xl font-bold text-[#008000] mb-4 font-serif">
                        এক বছরের ক্যাশব্যাক গ্যারান্টি ইনশাআল্লাহ
                    </h2>
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                        ৭ হাজার+ গ্রাহকের চুলের সমস্যায় কোল্ড প্রেস নারকেল তেল
                    </h1>
                    <p className="text-red-600 font-bold text-sm md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        চুল পড়া, চুলের আগা ফাটা, চুল পাতলা হয়ে যাওয়া, নতুন চুল না গজানো, অতিরিক্ত খুশকি, হেয়ার ড্যামেজ হতে শুরু করা প্রাকৃতিক সমাধান
                    </p>

                    <div className="mt-10">
                        <div className="flex justify-center">
                            <OrderButton onClick={scrollToCheckout} />
                        </div>
                        <div className="relative aspect-[16/9] mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white group mt-10">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Product Video"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            <ImageGallerySection images={images} />

            {/* --- 4. FAQ SECTION (EMERALD BG) --- */}
            <section className="bg-[#00703c] py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-white text-xl md:text-3xl font-bold text-center mb-12 leading-relaxed font-serif">
                        আমরা প্রতিনিয়ত যে প্রশ্নগুলো পেয়ে থাকি সে প্রশ্ন এবং তার উত্তর দেওয়া হল আশা করি আপনার প্রশ্নের উত্তরও এখানে পেয়ে যাবেন
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border-b border-emerald-500/50 pb-4">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex justify-between items-center text-left text-white font-bold text-lg md:text-xl py-4 hover:text-emerald-200 transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {openFaq === idx && (
                                    <div className="text-emerald-50 pb-4 text-base md:text-lg leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <OrderButton onClick={scrollToCheckout} />
                </div>
            </section>


            {/* --- 6. DESCRIPTION SECTION --- */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-3xl">🌿</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">সিড শরবত - প্রাকৃতিক ডিটক্স</h2>
                    </div>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light">
                        <p>সিড শরবত হলো এক অনন্য স্বাস্থ্যকর পানীয়, যেখানে একসাথে মিশে আছে তোকমা, তুলসি, হালিম, ইসবগুল ও চিয়া বীজের প্রাকৃতিক গুণ। এই ভেষজ বীজগুলো একদিকে যেমন শরীরকে ভেতর থেকে শীতল রাখে, তেমনি হজমশক্তি উন্নত করে, এনার্জি যোগায় এবং রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে।</p>
                        <p>গ্রীষ্মকালে কিংবা রোজার সময় ইফতারে সিড শরবত দেহকে দেয় প্রশান্তি, ঠান্ডাভাব এবং এনার্জির জোগান। এটি একটি প্রাকৃতিক ডিটক্স পানীয় যা শরীর থেকে টক্সিন বের করে দেয়।</p>
                    </div>

                    <div className="mt-12 bg-emerald-50 p-8 rounded-[2.5rem]">
                        <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                            <Heart size={20} className="fill-emerald-600 text-emerald-600" /> উপকারিতা
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "শরীরে শীতলতা এনে গরমের ক্লান্তি দূর করে",
                                "হজমশক্তি উন্নত করে ও কোষ্ঠকাঠিন্য কমায়",
                                "শরীর থেকে টক্সিন বের করে প্রাকৃতিক ডিটক্স করে",
                                "এনার্জি যোগায় ও শরীরকে সতেজ রাখে",
                                "রক্তশূন্যতা কমাতে ও হাড় মজবুত করতে সহায়ক",
                                "রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
                            ].map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3 text-emerald-800 font-medium">
                                    <CheckSquare size={18} className="text-emerald-600 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <OrderButton onClick={scrollToCheckout} />
                </div>
            </section>

            <CustomerReviewSlider />

            <VideoReviewSection />

            <CheckoutSection />

            <ProductCarousel title="Related Products" products={bestSellers} viewAllLink="/shop" />


        </div>
    );
}