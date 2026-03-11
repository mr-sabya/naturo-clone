"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingBag, Minus, Plus, PhoneCall, Sun, Sparkles,
    Coffee, Heart, CheckSquare, Facebook, Share2, ChevronRight
} from "lucide-react";
import ProductCarousel from "../../../components/home/ProductCarousel"; // Assuming this exists

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("500g");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("/images/products/product_1.webp");

    const images = [
        "/images/products/product_1.webp",
        "/images/products/product_2.webp",
        "/images/products/product_3.webp",
    ];

    // Sample data for Related Products
    const relatedProducts = [
        { id: 1, name: "মধু | Honey", price: 850, image: "/images/products/product_1.webp", slug: "honey" },
        { id: 2, name: "বাদাম | Mixed Nuts", price: 1200, image: "/images/products/product_1.webp", slug: "nuts" },
        { id: 3, name: "ঘি | Pure Ghee", price: 1500, image: "/images/products/product_1.webp", slug: "ghee" },
        { id: 4, name: "তেল | Black Seed Oil", price: 450, image: "/images/products/product_1.webp", slug: "oil" },
        { id: 5, name: "হলুদ | Turmeric", price: 200, image: "/images/products/product_1.webp", slug: "turmeric" },
    ];

    return (
        <div className="bg-white min-h-screen pb-20 md:pb-0">
            {/* --- 1. BREADCRUMBS --- */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-naturoGreen">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/shop" className="hover:text-naturoGreen">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">সিড শরবত | Seed Shorbot</span>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* --- LEFT: Image Section --- */}
                    <div className="space-y-4">
                        <div className="relative aspect-square border border-gray-100 rounded-lg overflow-hidden bg-white group">
                            <Image
                                src={mainImage}
                                alt="Product Image"
                                fill
                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded">
                                সিড শরবত | Seed Shorbot
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`relative w-20 h-20 border-2 rounded-md overflow-hidden bg-gray-50 transition-all ${mainImage === img ? "border-naturoGreen" : "border-transparent"
                                        }`}
                                >
                                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: Content Section --- */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            সিড শরবত | Seed Shorbot
                        </h1>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-gray-400 line-through text-lg">৳600</span>
                            <span className="text-3xl font-bold text-[#FF5E33]">৳500</span>
                            <span className="bg-[#FF5E33] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                16% OFF
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold text-gray-800 mb-3 text-sm">বাছাই করুন:</p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedSize("500g")}
                                    className={`flex items-center gap-3 px-4 py-2 border-2 rounded-md transition-all ${selectedSize === "500g" ? "border-naturoGreen ring-1 ring-naturoGreen" : "border-gray-100"
                                        }`}
                                >
                                    <span className="font-bold text-sm">৫০০ গ্রাম</span>
                                    <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-bold uppercase">16% OFF</span>
                                </button>

                                <button
                                    onClick={() => setSelectedSize("1kg")}
                                    className={`flex items-center gap-3 px-4 py-2 border-2 rounded-md transition-all ${selectedSize === "1kg" ? "border-naturoGreen ring-1 ring-naturoGreen" : "border-gray-100"
                                        }`}
                                >
                                    <span className="font-bold text-sm">১ কেজি</span>
                                    <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-bold uppercase">20% OFF</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center border rounded-md h-12">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 h-full hover:bg-gray-100 text-gray-400 border-r"
                                >
                                    <Minus size={16} />
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center font-bold text-gray-700 outline-none"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 h-full hover:bg-gray-100 text-gray-400 border-l"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <button className="flex items-center justify-center gap-2 border-2 border-black py-3 rounded-md font-bold text-black hover:bg-gray-50 transition-all uppercase text-sm tracking-wide">
                                কার্টে যোগ করুন
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#FF5E33] py-3 rounded-md font-bold text-white hover:bg-[#e4532d] transition-all uppercase text-sm tracking-wide shadow-lg">
                                <ShoppingBag size={18} />
                                অর্ডার করুন
                            </button>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 border-2 border-black py-3 rounded-md font-bold text-black hover:bg-gray-50 transition-all text-sm mb-6 uppercase">
                            কল অর্ডার: 09639812525
                        </button>

                        <div className="flex flex-col gap-4 border-t pt-6">
                            <p className="text-gray-500 text-sm">
                                <span className="font-medium text-gray-400">ক্যাটাগরি:</span> Super Food
                            </p>
                            {/* --- 2. SOCIAL SHARING --- */}
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 uppercase">Share:</span>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition"><Facebook size={16} /></button>
                                    <button className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-80 transition"><Share2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DESCRIPTION SECTION --- */}
            <section className="bg-white py-10 border-t border-gray-100 mt-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl">🥤</span>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">সিড শরবত | Seed Shorbot</h2>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-[15px] md:text-base">
                        <p>সিড শরবত হলো এক অনন্য স্বাস্থ্যকর পানীয়, যেখানে একসাথে মিশে আছে তোকমা, তুলসি, হালিম, ইসবগুল ও চিয়া বীজের প্রাকৃতিক গুণ। এই ভেষজ বীজগুলো একদিকে যেমন শরীরকে ভেতর থেকে শীতল রাখে, তেমনি হজমশক্তি উন্নত করে, এনার্জি যোগায় এবং রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে।</p>

                        <p>গ্রীষ্মকালে কিংবা রোজার সময় ইফতারে সিড শরবত দেহকে দেয় প্রশান্তি, ঠান্ডাভাব এবং এনার্জির জোগান। এটি একটি প্রাকৃতিক ডিটক্স পানীয় যা শরীর থেকে টক্সিন বের করে দেয় এবং হালকা অনুভূতি আনে।</p>
                        <p>গ্রীষ্মকালে কিংবা রোজার সময় ইফতারে...</p>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">উপাদানসমূহ</h3>
                        <ul className="space-y-3">
                            {[
                                { title: "তোকমা দানা", desc: "হজমে সহায়ক ও শরীরে শীতলতা আনে" },
                                { title: "তুলসি বীজ", desc: "রোগ প্রতিরোধ ক্ষমতা বাড়ায়" },
                                { title: "হালিম বীজ", desc: "অ্যানিমিয়া প্রতিরোধ ও হাড়ের স্বাস্থ্যে কার্যকর" },
                                { title: "ইসবগুল", desc: "কোষ্ঠকাঠিন্য দূর করে ও পেট পরিষ্কার রাখে" },
                                { title: "চিয়া সিড", desc: "মেটাবলিজম বাড়ায় ও শরীরকে এনার্জেটিক রাখে" },
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckSquare className="text-naturoGreen mt-1 shrink-0" size={18} fill="#D1FAE5" />
                                    <p className="text-gray-700 font-medium">
                                        <span className="font-bold">{item.title}</span> – {item.desc}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="text-naturoGreen" size={20} fill="#D1FAE5" />
                            <h3 className="text-lg font-bold text-gray-800">উপকারিতা</h3>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                            {[
                                "শরীরে শীতলতা এনে গরমের ক্লান্তি দূর করে",
                                "হজমশক্তি উন্নত করে ও কোষ্ঠকাঠিন্য কমায়",
                                "শরীর থেকে টক্সিন বের করে প্রাকৃতিক ডিটক্স করে",
                                "এনার্জি যোগায় ও শরীরকে সতেজ রাখে",
                                "রক্তশূন্যতা কমাতে ও হাড় মজবুত করতে সহায়ক",
                                "রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
                            ].map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Coffee className="text-gray-600" size={20} />
                            <h3 className="text-lg font-bold text-gray-800">ব্যবহার বিধি</h3>
                        </div>
                        <div className="space-y-2 text-gray-700 text-sm md:text-base pl-1">
                            <p>১ গ্লাস পানিতে ১ চা চামচ ন্যাচারো সিড শরবত ভিজিয়ে নিন। ৫ থেকে ১০ মিনিট পর পান করুন।</p>
                            <p>পরিমান: এক চা চামচ করে দিনে দুই থেকে তিন বার।</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. RELATED PRODUCTS --- */}
            <div className="bg-gray-50">
                <ProductCarousel title="Related Products" products={relatedProducts} viewAllLink="/shop" />
            </div>
            <div className="bg-gray-50">
                <ProductCarousel title="Recently Viewed" products={relatedProducts} viewAllLink="/shop" />
            </div>

            {/* --- 4. STICKY MOBILE CTA --- */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex gap-3">
                <div className="flex items-center border rounded-md h-12 bg-gray-50">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 border-r"><Minus size={14} /></button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 border-l"><Plus size={14} /></button>
                </div>
                <button className="flex-1 bg-[#FF5E33] text-white font-bold rounded-md flex items-center justify-center gap-2 shadow-lg">
                    অর্ডার করুন
                </button>
            </div>
        </div>
    );
}