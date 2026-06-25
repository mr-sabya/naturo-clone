import React from "react";
import ProductCard from "../../../components/product/ProductCard";
import Link from "next/link";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Product } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

    let products: Product[] = [];
    try {
        const res = await fetch(`${API_BASE}/category/${slug}`, {
            headers: { Accept: "application/json", "X-Tenant-Id": TENANT_ID },
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            products = Array.isArray(data)
                ? data
                : Array.isArray(data.products)
                ? data.products
                : data.data ?? [];
        }
    } catch {}

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="bg-[#f5f5f5] py-3">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/shop" className="hover:text-naturoGreen transition-colors">Categories</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-800 font-medium">{title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 md:mt-12">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{title}</h1>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-stretch">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={Number(product.id)}
                                name={product.name}
                                price={parsePrice(product.effective_price ?? product.sale_price ?? product.price)}
                                originalPrice={parseOriginalPrice(product.base_price ?? product.regular_price ?? product.original_price, product.effective_price ?? product.sale_price ?? product.price)}
                                image={product.main_image || product.image || ""}
                                slug={product.slug}
                                isOutOfStock={product.stock === 0}
                                label={product.label}
                                category={product.category_name ?? product.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">No products found in this category.</p>
                        <Link href="/shop" className="mt-4 inline-block text-naturoGreen font-bold hover:underline">
                            Browse all products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
