"use client";

import React, { useState, useMemo, use } from "react";
import { Filter, X, LayoutGrid, List, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "../../components/product/ProductCard";

// 1. MOCK DATA (In production, you would fetch this from your API)
const ALL_PRODUCTS = [
    { id: 1, name: "সরিষা মধু | Mustard Honey", price: 1050, originalPrice: 1300, category: "Honey", image: "/images/products/product_1.webp", slug: "mustard-honey" },
    { id: 2, name: "হজম বুস্টার | Hojom Booster", price: 680, originalPrice: 850, category: "Wellness", image: "/images/products/product_1.webp", slug: "hojom-booster" },
    { id: 3, name: "লবঙ্গ তেল | Clove Oil", price: 1750, originalPrice: 2300, category: "Oil", image: "/images/products/product_1.webp", slug: "clove-oil" },
    { id: 4, name: "ঘি | Pure Ghee", price: 1200, originalPrice: 1500, category: "Ghee", image: "/images/products/product_1.webp", slug: "pure-ghee" },
    { id: 5, name: "বাদাম | Mixed Nuts", price: 950, originalPrice: 1100, category: "Nuts", image: "/images/products/product_1.webp", slug: "mixed-nuts" },
    { id: 6, name: "সিড শরবত | Seed Shorbot", price: 500, originalPrice: 600, category: "Wellness", image: "/images/products/product_1.webp", slug: "seed-shorbot" },
];

const CATEGORIES = ["All", "Honey", "Oil", "Nuts", "Wellness", "Super Food", "Ghee", "Herbs"];

export default function ShopPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    // 2. NEXT.JS 15 FIX: Unwrap params using React.use()
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    // 3. STATE MANAGEMENT
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Capitalize slug for UI
    const pageTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Shop";

    // 4. FILTERING & SORTING LOGIC
    const filteredProducts = useMemo(() => {
        let result = [...ALL_PRODUCTS];

        // Category Filter
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Sorting
        if (sortBy === "price-low") result.sort((a, b) => Number(a.price) - Number(b.price));
        if (sortBy === "price-high") result.sort((a, b) => Number(b.price) - Number(a.price));
        if (sortBy === "newest") result.sort((a, b) => Number(b.id) - Number(a.id));

        return result;
    }, [selectedCategory, sortBy]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* --- BREADCRUMBS --- */}
            <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-bold">{pageTitle}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* --- PAGE HEADER --- */}

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- SIDEBAR (Desktop) --- */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-5 text-gray-800 border-b pb-2">Categories</h3>
                            <ul className="space-y-1">
                                {CATEGORIES.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all ${selectedCategory === cat
                                                    ? "bg-naturoGreen text-white font-bold shadow-md scale-[1.02]"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Filter Placeholder */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-5 text-gray-800 border-b pb-2">Price Range</h3>
                            <input type="range" className="w-full accent-naturoGreen mt-2" min="0" max="5000" />
                            <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                                <span>৳0</span>
                                <span>৳5000+</span>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN GRID --- */}
                    <div className="flex-1">

                        {/* TOOLBAR */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-sm font-bold bg-gray-100 px-4 py-2 rounded-lg"
                            >
                                <Filter size={18} /> Filters
                            </button>

                            <div className="hidden md:flex items-center gap-4 text-gray-300">
                                <LayoutGrid size={22} className="text-naturoGreen" />
                                <List size={22} className="hover:text-gray-400 cursor-pointer" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase hidden sm:block">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-lg px-4 py-2 outline-none focus:border-naturoGreen transition-all cursor-pointer"
                                >
                                    <option value="default">Default Sorting</option>
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* PRODUCT GRID - 5 COLUMNS */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-2 items-stretch">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    image={product.image}
                                    slug={product.slug}
                                />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
                                <p className="text-gray-400 font-medium">No products found in this category.</p>
                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className="mt-4 text-naturoGreen font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MOBILE SIDEBAR DRAWER --- */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-gray-800">FILTERS</h3>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-10">
                            <div>
                                <h4 className="font-bold text-naturoGreen mb-5 uppercase text-xs tracking-[0.2em]">Categories</h4>
                                <ul className="space-y-2">
                                    {CATEGORIES.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => { setSelectedCategory(cat); setIsSidebarOpen(false); }}
                                                className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all ${selectedCategory === cat
                                                        ? "bg-naturoGreen text-white font-bold shadow-lg"
                                                        : "text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-100"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}