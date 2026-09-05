"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Zap, Star, CheckCircle2, PhoneCall, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import { trackViewItem } from "@/lib/gtm";
import type { Product } from "@/types";

interface ProductBuyBoxProps {
    product: Product;
}

export default function ProductBuyBox({ product }: ProductBuyBoxProps) {
    const router = useRouter();
    const addItem = useCartStore((s) => s.addItem);

    const variants = product.variants ?? [];
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(variants[0]?.id ?? null);
    const [quantity, setQuantity] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    const selectedVariant = variants.find((v) => v.id === selectedVariantId);

    const rawPrice = product.effective_price ?? product.sale_price ?? product.price;
    const rawOriginal = product.regular_price ?? product.base_price ?? product.original_price;
    const basePrice = parsePrice(rawPrice);
    const originalPrice = parseOriginalPrice(rawOriginal, rawPrice);
    const effectivePrice = selectedVariant ? parsePrice(selectedVariant.effective_price ?? selectedVariant.price) || basePrice : basePrice;

    const discount = originalPrice && originalPrice > effectivePrice
        ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)
        : null;

    const stock = selectedVariant?.stock ?? product.stock ?? 0;
    const isOutOfStock = stock <= 0;

    const reviews = product.reviews;

    // Fires once per page view, with the price shown at first paint — a
    // later variant switch is a configuration change, not a new page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { trackViewItem(product, effectivePrice); }, [product.id]);

    const buildCartItem = () => ({
        id: product.id,
        product_id: product.id,
        name: product.name,
        price: effectivePrice,
        image: product.main_image || product.image || "",
        slug: product.slug,
        variant_id: selectedVariant?.id,
        variant_name: selectedVariant?.display_name,
    });

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        for (let i = 0; i < quantity; i++) addItem(buildCartItem());
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    const handleBuyNow = () => {
        if (isOutOfStock) return;
        for (let i = 0; i < quantity; i++) addItem(buildCartItem());
        router.push("/checkout");
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-6">
            {/* Trust badges */}
            <div className="flex items-center gap-4 text-emerald-700 font-semibold">
                <span className="flex items-center gap-1 text-xs md:text-sm">
                    <CheckCircle2 size={16} /> ১০০% জেনুইন
                </span>
                <span className="flex items-center gap-1 text-xs md:text-sm">
                    <Truck size={16} /> দ্রুত ডেলিভারি
                </span>
            </div>

            <div>
                {product.brand && (
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{product.brand.name}</span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mt-1 mb-2">{product.name}</h1>

                {reviews && reviews.total > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < Math.round(reviews.average) ? "text-yellow-500 fill-yellow-500" : "text-gray-200"} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">{reviews.average} ({reviews.total} reviews)</span>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-emerald-700">৳{effectivePrice.toFixed(0)}</span>
                    {originalPrice && originalPrice > effectivePrice && (
                        <span className="text-gray-400 line-through">৳{originalPrice.toFixed(0)}</span>
                    )}
                    {discount && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">Save {discount}%</span>
                    )}
                </div>
            </div>

            {product.short_description && (
                <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-6">{product.short_description}</p>
            )}

            {variants.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">প্যাকেজ নির্বাচন করুন:</p>
                    <div className="grid grid-cols-3 gap-2">
                        {variants.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedVariantId(v.id)}
                                className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                                    selectedVariantId === v.id
                                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                        : "border-gray-100 text-gray-500 hover:border-emerald-200"
                                }`}
                            >
                                {v.display_name ?? v.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="font-bold text-gray-700">পরিমাণ:</span>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="text-xl font-black w-6 text-center">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
            <p className={`-mt-3 text-sm font-bold text-right ${isOutOfStock ? "text-red-600" : "text-emerald-700"}`}>
                {isOutOfStock ? "স্টকে নেই" : `স্টকে আছে (${stock})`}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3.5 rounded-2xl transition-colors"
                >
                    <ShoppingCart size={18} />
                    {justAdded ? "যোগ করা হয়েছে!" : "কার্টে যোগ করুন"}
                </button>
                <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#FA582D] hover:bg-[#e44d25] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-2xl shadow-[0_20px_40px_rgba(250,88,45,0.3)] transition-all transform active:scale-[0.98] group"
                >
                    <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                    এখনই কিনুন
                </button>
            </div>

            {(product.category_name ?? product.category) && (
                <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                    ক্যাটাগরি: <span className="text-emerald-700 font-semibold">{product.category_name ?? product.category}</span>
                </p>
            )}

            {/* Hotline */}
            <div className="bg-emerald-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-emerald-900/20">
                <div>
                    <p className="text-emerald-300 text-xs font-bold uppercase mb-1 tracking-tighter">যেকোনো প্রয়োজনে কল করুন</p>
                    <p className="text-xl font-bold">09639812525</p>
                </div>
                <div className="w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center">
                    <PhoneCall size={24} />
                </div>
            </div>
        </div>
    );
}
