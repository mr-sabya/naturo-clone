// 1. REMOVED "use client" so that 'async' is allowed
import React from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

// Sample Data 
const categoryProducts = [
    { id: 1, name: "রোজেল চা | Rosella Tea", price: "850", originalPrice: "1,100", image: "/images/products/product_1.webp", slug: "rosella-tea" },
    { id: 2, name: "মিসওয়াক কভার কম্বো | Miswak Cover Combo", price: "220", originalPrice: "300", image: "/images/products/product_2.webp", slug: "miswak-cover", label: "সিঙ্গেল পিস" },
    { id: 3, name: "ব্ল্যাক গার্লিক মাল্টি ক্লোভ | Black Garlic Multi Clove", price: "1,000", originalPrice: "1,250", image: "/images/products/product_3.webp", slug: "black-garlic", isOutOfStock: true },
    { id: 4, name: "ব্ল্যাক গার্লিক সিঙ্গেল ক্লোভ | Black Garlic Single Clove", price: "1,400", originalPrice: "1,600", image: "/images/products/product_4.webp", slug: "black-garlic-single" },
    { id: 5, name: "হাতে তৈরি লাল চিনি | Brown Sugar", price: "1,050", originalPrice: "1,200", image: "/images/products/product_5.webp", slug: "brown-sugar" },
];

export default async function CategoryPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    // 2. Await the params (Next.js 15 requirement)
    const { slug } = await params;

    // Capitalize the first letter of the slug for the title
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* --- 1. BREADCRUMBS (Light Gray Bar) --- */}
            <div className="bg-[#f5f5f5] py-3">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Categories</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-800 font-medium">{title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 md:mt-12">

                {/* --- 2. CATEGORY TITLE --- */}
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {title}
                    </h1>
                </div>

                {/* --- 3. PRODUCT GRID (5 columns on desktop) --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-stretch">
                    {categoryProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            slug={product.slug}
                            isOutOfStock={product.isOutOfStock}
                            label={product.label}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {categoryProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}