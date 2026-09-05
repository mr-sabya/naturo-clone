"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/types";

interface ProductInfoTabsProps {
    product: Product;
}

type Tab = "description" | "specifications" | "reviews";

export default function ProductInfoTabs({ product }: ProductInfoTabsProps) {
    const specGroups = Object.entries(product.specifications ?? {});
    const reviews = product.reviews;

    const tabs: { id: Tab; label: string }[] = [
        { id: "description", label: "Description" },
        ...(specGroups.length ? [{ id: "specifications" as Tab, label: "Specifications" }] : []),
        { id: "reviews", label: `Reviews${reviews?.total ? ` (${reviews.total})` : ""}` },
    ];

    const [active, setActive] = useState<Tab>("description");

    return (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${
                            active === tab.id
                                ? "border-emerald-600 text-emerald-700"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6 md:p-8">
                {active === "description" && (
                    product.long_description ? (
                        <div
                            className="prose prose-emerald max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: product.long_description }}
                        />
                    ) : (
                        <p className="text-gray-400">No description available.</p>
                    )
                )}

                {active === "specifications" && (
                    <div className="space-y-6">
                        {specGroups.map(([group, specs]) => (
                            <div key={group}>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">{group}</h4>
                                <dl className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                                    {specs.map((spec, i) => (
                                        <div key={i} className="flex justify-between px-4 py-3 text-sm odd:bg-gray-50">
                                            <dt className="text-gray-500">{spec.key}</dt>
                                            <dd className="font-semibold text-gray-800">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ))}
                    </div>
                )}

                {active === "reviews" && (
                    reviews && reviews.total > 0 ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                                <span className="text-4xl font-black text-gray-900">{reviews.average}</span>
                                <div>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < Math.round(reviews.average) ? "text-yellow-500 fill-yellow-500" : "text-gray-200"} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Based on {reviews.total} reviews</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {reviews.list.map((review) => (
                                    <div key={review.id} className="pb-5 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-gray-800 text-sm">{review.name}</span>
                                            <span className="text-xs text-gray-400">{review.created_at}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={13} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-200"} />
                                            ))}
                                        </div>
                                        {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No reviews yet.</p>
                    )
                )}
            </div>
        </section>
    );
}
