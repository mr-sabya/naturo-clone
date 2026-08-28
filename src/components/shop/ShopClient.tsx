"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Filter, X, LayoutGrid, List } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import { trackSearch } from "@/lib/gtm";
import type { Category, Product, PaginatedProducts } from "@/types";

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

interface ShopClientProps {
    initialProducts: Product[];
    initialLastPage: number;
    initialCategories: Category[];
}

// Initial products + categories are fetched server-side (see
// app/(site)/shop/page.tsx) and passed in as props, so the shop grid is
// present in the very first HTML response instead of behind a loading
// skeleton — this component only owns the interactive filtering/sorting/
// pagination on top of that initial data.
export default function ShopClient({ initialProducts, initialLastPage, initialCategories }: ShopClientProps) {
    const [allProducts, setAllProducts] = useState<NormalizedProduct[]>(initialProducts.map(normalize));
    const [categories] = useState<string[]>(["All", ...initialCategories.map((c) => c.name)]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

    // Category icons elsewhere on the site (CategorySlider, "View All" links)
    // point at /shop?category=<slug>; the header search box points at
    // /shop?search=<query>. Both are read client-side via a plain effect
    // (not next/navigation's useSearchParams(), which requires a Suspense
    // boundary) so /shop keeps rendering its full product grid in the
    // static/ISR HTML — a Suspense fallback is what a static page actually
    // serves, which would otherwise blank the grid until hydration.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const slug = params.get("category");
        const match = initialCategories.find((c) => c.slug === slug);
        if (match) setSelectedCategory(match.name);

        const query = params.get("search")?.trim();
        if (query) {
            setSearchQuery(query);
            setSearching(true);
            trackSearch(query);
            fetch(`${API_BASE}/products?search=${encodeURIComponent(query)}`, { headers: HEADERS })
                .then((r) => (r.ok ? r.json() : []))
                .then((data: PaginatedProducts | Product[]) => {
                    const list = (Array.isArray(data) ? data : data.data ?? []).map(normalize);
                    setAllProducts(list);
                })
                .finally(() => setSearching(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clearSearch = () => {
        setSearchQuery("");
        setAllProducts(initialProducts.map(normalize));
        window.history.replaceState(null, "", "/shop");
    };

    const [sortBy, setSortBy] = useState("default");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage] = useState(initialLastPage);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchPage = useCallback(async (pageNum: number) => {
        try {
            const res = await fetch(`${API_BASE}/products?page=${pageNum}`, { headers: HEADERS });
            if (!res.ok) return;
            const data: PaginatedProducts | Product[] = await res.json();
            const list = (Array.isArray(data) ? data : data.data ?? []).map(normalize);
            setAllProducts((prev) => [...prev, ...list]);
            setPage(pageNum);
        } finally {
            setLoadingMore(false);
        }
    }, []);

    const loadMore = async () => {
        setLoadingMore(true);
        await fetchPage(page + 1);
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
                    {searchQuery && (
                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                            <p className="text-sm text-gray-600">
                                {searching ? (
                                    "Searching..."
                                ) : (
                                    <>Showing results for <span className="font-bold text-gray-900">&ldquo;{searchQuery}&rdquo;</span> ({filteredProducts.length} found)</>
                                )}
                            </p>
                            <button onClick={clearSearch} className="text-sm font-bold text-naturoGreen hover:underline shrink-0 ml-4">
                                Clear search
                            </button>
                        </div>
                    )}

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

                    {!searching && filteredProducts.length === 0 && (
                        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
                            <p className="text-gray-400 font-medium">
                                {searchQuery ? `No products match "${searchQuery}".` : "No products found in this category."}
                            </p>
                            <button
                                onClick={() => (searchQuery ? clearSearch() : setSelectedCategory("All"))}
                                className="mt-4 text-naturoGreen font-bold hover:underline"
                            >
                                {searchQuery ? "Clear search" : "Clear all filters"}
                            </button>
                        </div>
                    )}

                    {!searchQuery && selectedCategory === "All" && page < lastPage && (
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
