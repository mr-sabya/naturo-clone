"use client";

import React, { useState } from "react";
import ProductCard from "../product/ProductCard";

interface NormalizedProduct {
    id: string | number;
    name: string;
    price: string | number;
    originalPrice?: string | number;
    image: string;
    slug: string;
    category?: string;
    hasActiveLandingPage?: boolean;
}

interface AllProductsProps {
    initialProducts: NormalizedProduct[];
    initialLastPage: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export default function AllProducts({ initialProducts, initialLastPage }: AllProductsProps) {
    const [products, setProducts] = useState<NormalizedProduct[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [lastPage] = useState(initialLastPage);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        const nextPage = page + 1;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/products?page=${nextPage}`, {
                headers: { Accept: "application/json", "X-Tenant-Id": TENANT_ID },
            });
            if (!res.ok) return;
            const data = await res.json();
            const newProducts = (Array.isArray(data) ? data : data.data ?? []).map(
                (p: { id: number; name: string; slug: string; effective_price?: number; sale_price?: number; price?: string | number; base_price?: number; regular_price?: number; original_price?: string | number; main_image?: string; image?: string; category_name?: string; category?: string; stock?: number; has_active_landing_page?: boolean }) => {
                    const rawPrice = p.effective_price ?? p.sale_price ?? p.price;
                    const rawOriginal = p.base_price ?? p.regular_price ?? p.original_price;
                    return {
                        id: p.id,
                        name: p.name,
                        slug: p.slug,
                        price: typeof rawPrice === "number" ? rawPrice : parseFloat(String(rawPrice || "0")) || 0,
                        originalPrice: rawOriginal ? (typeof rawOriginal === "number" ? rawOriginal : parseFloat(String(rawOriginal)) || undefined) : undefined,
                        image: p.main_image || p.image || "",
                        category: p.category_name ?? p.category,
                        hasActiveLandingPage: p.has_active_landing_page ?? false,
                    };
                }
            );
            setProducts((prev) => [...prev, ...newProducts]);
            setPage(nextPage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] relative pb-2 inline-block uppercase tracking-wide">
                        All Products
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1a1a1a]"></span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <div key={`${product.id}`} className="h-full">
                            <ProductCard
                                id={typeof product.id === "number" ? product.id : Number(product.id)}
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                slug={product.slug}
                                category={product.category}
                                hasActiveLandingPage={product.hasActiveLandingPage}
                            />
                        </div>
                    ))}
                </div>

                {page < lastPage && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="px-8 py-3 bg-[#1a1a1a] text-white rounded-md font-bold hover:bg-naturoGreen transition-colors duration-300 uppercase text-sm tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
