"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { BundleSection } from "@/types";

export default function BundleBlock({ title, items }: BundleSection) {
    const addItem = useCartStore((s) => s.addItem);
    const [added, setAdded] = useState<Record<number, boolean>>({});

    if (!items || items.length === 0) return null;

    const handleAdd = (item: BundleSection["items"][number]) => {
        addItem({
            id: item.product_id,
            product_id: item.product_id,
            name: item.name ?? "Product",
            price: item.offer_price ?? item.price,
            image: item.image ?? "",
            slug: item.slug ?? "",
            variant_id: item.variant_id ?? undefined,
            variant_name: item.variant_name ?? undefined,
        });
        setAdded((prev) => ({ ...prev, [item.product_id]: true }));
    };

    return (
        <section className="bg-emerald-50 py-14 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 font-serif text-center mb-8">
                    {title}
                </h2>

                <div className="space-y-4">
                    {items.map((item) => {
                        const isAdded = added[item.product_id];
                        const hasOffer = item.offer_price !== null && item.offer_price < item.price;

                        return (
                            <div
                                key={item.product_id}
                                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm"
                            >
                                {item.image && (
                                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                                        <Image src={item.image} alt={item.name ?? "Product"} fill className="object-cover" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    {item.slug ? (
                                        <Link href={`/${item.slug}`} className="font-bold text-gray-800 hover:text-emerald-700 truncate block">
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span className="font-bold text-gray-800 truncate block">{item.name}</span>
                                    )}
                                    {item.variant_name && (
                                        <span className="text-xs text-gray-400">{item.variant_name}</span>
                                    )}
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="font-bold text-emerald-700">
                                            ৳{(item.offer_price ?? item.price).toFixed(0)}
                                        </span>
                                        {hasOffer && (
                                            <span className="text-sm text-gray-400 line-through">৳{item.price.toFixed(0)}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleAdd(item)}
                                    disabled={isAdded}
                                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
                                        isAdded
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-emerald-700 hover:bg-emerald-800 text-white hover:scale-105"
                                    }`}
                                >
                                    {isAdded ? <Check size={16} /> : <Plus size={16} />}
                                    {isAdded ? "Added" : "Add"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
