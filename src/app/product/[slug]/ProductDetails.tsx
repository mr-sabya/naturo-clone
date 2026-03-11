"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ShoppingBag,
    Minus,
    Plus,
    Coffee,
    Heart,
    CheckSquare,
    Facebook,
    Share2,
    ChevronRight,
} from "lucide-react";

import ProductCarousel from "@/components/home/ProductCarousel";

export default function ProductDetails({ slug }: { slug: string }) {

    const [selectedSize, setSelectedSize] = useState("500g");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("/images/products/product_1.webp");

    const images = [
        "/images/products/product_1.webp",
        "/images/products/product_2.webp",
        "/images/products/product_3.webp",
    ];

    const relatedProducts = [
        { id: 1, name: "মধু | Honey", price: 850, image: "/images/products/product_1.webp", slug: "honey" },
        { id: 2, name: "বাদাম | Mixed Nuts", price: 1200, image: "/images/products/product_1.webp", slug: "nuts" },
        { id: 3, name: "ঘি | Pure Ghee", price: 1500, image: "/images/products/product_1.webp", slug: "ghee" },
        { id: 4, name: "তেল | Black Seed Oil", price: 450, image: "/images/products/product_1.webp", slug: "oil" },
        { id: 5, name: "হলুদ | Turmeric", price: 200, image: "/images/products/product_1.webp", slug: "turmeric" },
    ];

    const title = slug
        ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
        : "Product";

    return (
        <div className="bg-white min-h-screen pb-20 md:pb-0">

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/shop">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium capitalize">{title}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* LEFT IMAGE */}
                    <div className="space-y-4">

                        <div className="relative aspect-square border rounded-lg overflow-hidden bg-white">
                            <Image
                                src={mainImage}
                                alt="product"
                                fill
                                className="object-contain p-4"
                            />
                        </div>

                        <div className="flex gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`relative w-20 h-20 border-2 rounded-md overflow-hidden
                  ${mainImage === img ? "border-green-600" : "border-gray-200"}`}
                                >
                                    <Image src={img} alt="thumb" fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        <h1 className="text-3xl font-bold mb-4 capitalize">{title}</h1>

                        <div className="flex gap-3 mb-6">
                            <span className="line-through text-gray-400">৳600</span>
                            <span className="text-3xl font-bold text-orange-500">৳500</span>
                        </div>

                        {/* SIZE */}
                        <div className="mb-6">

                            <p className="font-bold mb-3 text-sm">বাছাই করুন:</p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => setSelectedSize("500g")}
                                    className={`px-4 py-2 border rounded-md
                  ${selectedSize === "500g" ? "border-green-600" : "border-gray-200"}`}
                                >
                                    ৫০০ গ্রাম
                                </button>

                                <button
                                    onClick={() => setSelectedSize("1kg")}
                                    className={`px-4 py-2 border rounded-md
                  ${selectedSize === "1kg" ? "border-green-600" : "border-gray-200"}`}
                                >
                                    ১ কেজি
                                </button>

                            </div>

                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3 mb-8">

                            <div className="flex border rounded-md h-12">

                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 border-r"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="w-12 flex items-center justify-center font-bold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 border-l"
                                >
                                    <Plus size={16} />
                                </button>

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="grid grid-cols-2 gap-4 mb-6">

                            <button className="border-2 border-black py-3 rounded-md font-bold">
                                কার্টে যোগ করুন
                            </button>

                            <button className="bg-orange-500 text-white py-3 rounded-md font-bold flex items-center justify-center gap-2">
                                <ShoppingBag size={18} />
                                অর্ডার করুন
                            </button>

                        </div>

                        <button className="w-full border-2 border-black py-3 rounded-md font-bold mb-6">
                            কল অর্ডার: 09639812525
                        </button>

                    </div>

                </div>
            </div>

            {/* DESCRIPTION */}

            <section className="bg-white py-10 border-t mt-12">

                <div className="container mx-auto px-4 max-w-4xl">

                    <h2 className="text-xl font-bold mb-4">পণ্যের বিবরণ</h2>

                    <p className="text-gray-700 leading-relaxed">
                        সিড শরবত হলো এক অনন্য স্বাস্থ্যকর পানীয় যেখানে তোকমা, তুলসি, হালিম,
                        ইসবগুল এবং চিয়া বীজের প্রাকৃতিক গুণ রয়েছে।
                    </p>

                    <div className="mt-8">

                        <h3 className="font-bold mb-4">উপকারিতা</h3>

                        <ul className="space-y-2">

                            {[
                                "শরীরে শীতলতা আনে",
                                "হজমশক্তি উন্নত করে",
                                "ডিটক্স করে",
                                "এনার্জি যোগায়",
                                "রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
                            ].map((item, i) => (

                                <li key={i} className="flex gap-2 items-center">
                                    <CheckSquare size={18} />
                                    {item}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            </section>

            {/* RELATED */}

            <div className="bg-gray-50">
                <ProductCarousel
                    title="Related Products"
                    products={relatedProducts}
                    viewAllLink="/shop"
                />
            </div>

        </div>
    );
}