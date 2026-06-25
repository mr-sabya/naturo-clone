"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Filter, X, LayoutGrid, List, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "../../components/product/ProductCard";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Product, Category, PaginatedProducts } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "X-Tenant-Id": TENANT_ID };

interface NormalizedProduct {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    slug: string;
}

function normalize(p: Product): NormalizedProduct {
    const rawPrice = p.effective_price ?? p.sale_price ?? p.price;
    const rawOriginal = p.base_price ?? p.regular_price ?? p.original_price;
    return {
        id: Number(p.id),
        name: p.name,
        price: parsePrice(rawPrice),
        originalPrice: parseOriginalPrice(rawOriginal, rawPrice),
        category: p.category_name ?? p.category ?? "Other",
        image: p.main_image || p.image || "",
        slug: p.slug,
    };
}

export default function ShopPage() {
    const [allProducts, setAllProducts] = useState<NormalizedProduct[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const fetchPage = useCallback(async (pageNum: number, replace: boolean) => {
        try {
            const res = await fetch(`${API_BASE}/products?page=${pageNum}`, { headers: HEADERS });
            if (!res.ok) return;
            const data: PaginatedProducts | Product[] = await res.json();
            const list = (Array.isArray(data) ? data : data.data ?? []).map(normalize);
            const lp = Array.isArray(data) ? 1 : data.last_page;
            setLastPage(lp);
            setAllProducts((prev) => replace ? list : [...prev, ...list]);
            setPage(pageNum);
        } finally {
            setInitialLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        setInitialLoading(true);
        fetchPage(1, true);

        fetch(`${API_BASE}/categories`, { headers: HEADERS })
            .then((r) => r.json())
            .then((data: Category[] | { data: Category[] }) => {
                const list: Category[] = Array.isArray(data) ? data : data.data ?? [];
                setCategories(["All", ...list.map((c) => c.name)]);
            })
            .catch(() => {});
    }, [fetchPage]);

    const loadMore = async () => {
        setLoadingMore(true);
        await fetchPage(page + 1, false);
    };

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];
        if (selectedCategory !== "All") {
            result = result.filter((p) =>
                p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
        if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
        if (sortBy === "newest") result.sort((a, b) => b.id - a.id);
        return result;
    }, [allProducts, selectedCategory, sortBy]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-bold">Shop</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-5 text-gray-800 border-b pb-2">Categories</h3>
                            <ul className="space-y-1">
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all ${
                                                selectedCategory === cat
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
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
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

                        {initialLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl aspect-[3/4] animate-pulse border border-gray-100" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-2 items-stretch">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            name={product.name}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            image={product.image}
                                            slug={product.slug}
                                            category={product.category}
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

                                {selectedCategory === "All" && page < lastPage && (
                                    <div className="flex justify-center mt-10">
                                        <button
                                            onClick={loadMore}
                                            disabled={loadingMore}
                                            className="px-8 py-3 bg-[#1a1a1a] text-white rounded-md font-bold hover:bg-naturoGreen transition-colors uppercase text-sm tracking-widest disabled:opacity-60"
                                        >
                                            {loadingMore ? "Loading..." : "Load More"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Drawer */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-gray-800">FILTERS</h3>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-10">
                            <div>
                                <h4 className="font-bold text-naturoGreen mb-5 uppercase text-xs tracking-[0.2em]">Categories</h4>
                                <ul className="space-y-2">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => { setSelectedCategory(cat); setIsSidebarOpen(false); }}
                                                className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all ${
                                                    selectedCategory === cat
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
