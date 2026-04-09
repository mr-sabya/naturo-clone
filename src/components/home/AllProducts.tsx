"use client";

import React from "react";
import ProductCard from "../product/ProductCard";

interface Product {
    id: string | number;
    name: string;
    price: string | number;
    originalPrice?: string | number;
    image: string;
    slug: string;
}

interface AllProductsProps {
    products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">

                {/* --- Section Title --- */}
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] relative pb-2 inline-block uppercase tracking-wide">
                        All Products
                        {/* The Underline */}
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1a1a1a]"></span>
                    </h2>
                </div>

                {/* --- Product Grid --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                slug={product.slug}
                            />
                        </div>
                    ))}
                </div>

                {/* Optional: Load More Button */}
                <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 bg-[#1a1a1a] text-white rounded-md font-bold hover:bg-naturoGreen transition-colors duration-300 uppercase text-sm tracking-widest">
                        Load More
                    </button>
                </div>
            </div>
        </section>
    );
}