import React from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- static export slugs ---
export function generateStaticParams() {
    return [
        { slug: "tea" },
        { slug: "miswak" },
        { slug: "garlic" },
        { slug: "sugar" },
        { slug: "honey" }, // add all slugs you want to export
    ];
}

// --- sample product data ---
const categoryProducts = [
    {
        id: 1,
        name: "রোজেল চা | Rosella Tea",
        price: "850",
        originalPrice: "1100",
        image: "/images/products/product_1.webp",
        slug: "rosella-tea",
    },
    {
        id: 2,
        name: "মিসওয়াক কভার",
        price: "220",
        originalPrice: "300",
        image: "/images/products/product_2.webp",
        slug: "miswak-cover",
    },
    {
        id: 3,
        name: "Honey Natural",
        price: "500",
        originalPrice: "700",
        image: "/images/products/product_3.webp",
        slug: "honey",
    },
];

// --- Category Page Component ---
export default function CategoryPage({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params?.slug;

    // --- handle unknown slug gracefully ---
    if (!slug) {
        notFound(); // triggers 404
    }

    // title formatting safely
    const title =
        (slug?.charAt(0).toUpperCase() ?? "") +
        (slug?.slice(1)?.replace("-", " ") ?? "Category");

    // filter products for this category (example: filter by slug contains category name)
    const products = categoryProducts.filter((p) =>
        p.slug.toLowerCase().includes(slug.toLowerCase())
    );

    // if no products found for the slug, you can 404 or show empty
    if (products.length === 0) {
        notFound(); // optional: trigger 404 for empty category
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* breadcrumb */}
            <div className="bg-[#f5f5f5] py-3">
                <div className="container mx-auto px-4">
                    <nav className="flex gap-2 text-sm text-gray-500">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span className="text-gray-800">{title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-10">
                <h1 className="text-3xl font-bold text-center mb-10">{title}</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
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
            </div>
        </div>
    );
}