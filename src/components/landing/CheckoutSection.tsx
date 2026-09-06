"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Minus, Plus, ShieldCheck,
    PhoneCall, CheckCircle2, Truck, Info
} from "lucide-react";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import { trackViewItem } from "@/lib/gtm";
import { getCartSessionId } from "@/lib/session";
import { useLeadCapture } from "@/lib/orderTracking";
import { useDeliveryOptions } from "@/lib/deliveryOptions";
import { validatePhone, validateEmail } from "@/lib/validation";
import type { Product, OrderPayload } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "X-Tenant-Id": TENANT_ID };

interface OrderResponse {
    order_number?: string;
    data?: { order_number?: string };
}

interface CheckoutSectionProps {
    product?: Product | null;
}

export default function CheckoutSection({ product }: CheckoutSectionProps) {
    const router = useRouter();
    const images: string[] = useMemo(() => {
        const FALLBACK_IMAGES = ["/images/products/product_1.webp", "/images/products/product_2.webp", "/images/products/product_3.webp"];
        const galleryRaw = product?.gallery?.map((g) => g.url).filter(Boolean) ?? product?.images?.filter(Boolean) ?? [];
        const rawImages: string[] = galleryRaw.length > 0
            ? galleryRaw
            : product?.main_image
            ? [product.main_image]
            : product?.image
            ? [product.image]
            : [];
        return rawImages.length ? rawImages : FALLBACK_IMAGES;
    }, [product]);

    const rawPrice = product ? (product.effective_price ?? product.sale_price ?? product.price) : undefined;
    const rawOriginal = product ? (product.base_price ?? product.regular_price ?? product.original_price) : undefined;
    const pricePerItem = parsePrice(rawPrice) || 950;
    const originalPrice = parseOriginalPrice(rawOriginal, rawPrice) ?? null;

    // Variant / size
    const variants = product?.variants ?? [];
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        variants[0]?.id ?? null
    );
    const selectedVariant = variants.find((v) => v.id === selectedVariantId);
    const effectivePrice = selectedVariant ? parsePrice(selectedVariant.price) || pricePerItem : pricePerItem;

    // Gallery
    const [mainImage, setMainImage] = useState(images[0]);
    useEffect(() => { setMainImage(images[0]); }, [images]);

    // Fires once per page view, with the price shown at first paint — a
    // later variant switch is a configuration change, not a new page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (product) trackViewItem(product, effectivePrice); }, [product?.id]);

    // Order form state
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    // Delivery options — admin-managed (Admin > Website > Delivery Options),
    // no longer hard-coded. Auto-selects the first option once loaded so the
    // form always has a valid default, matching the old hard-coded behavior.
    const { options: deliveryOptions } = useDeliveryOptions();
    const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);
    useEffect(() => {
        if (deliveryOptions.length > 0 && selectedDeliveryId === null) {
            setSelectedDeliveryId(deliveryOptions[0].id);
        }
    }, [deliveryOptions, selectedDeliveryId]);
    const selectedDeliveryOption = deliveryOptions.find((o) => o.id === selectedDeliveryId);
    const deliveryCharge = selectedDeliveryOption?.price ?? 0;

    // Order submission state
    const [submitting, setSubmitting] = useState(false);
    const [orderError, setOrderError] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useLeadCapture({
        phone: phone.trim(),
        name: name.trim() || null,
        address: address.trim() || null,
        product_id: product?.id ?? null,
        variant_id: selectedVariantId,
        quantity,
    });

    const subtotal = effectivePrice * quantity;
    const total = subtotal + deliveryCharge;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = "নাম আবশ্যক";
        const phoneError = validatePhone(phone);
        if (phoneError) errs.phone = phoneError;
        const emailError = validateEmail(email);
        if (emailError) errs.email = emailError;
        if (!address.trim()) errs.address = "ঠিকানা আবশ্যক";
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            setOrderError("");
            return;
        }

        setSubmitting(true);
        setOrderError("");
        // Flat, single-item payload matching OrderController::store's validation rules on the
        // backend exactly: location *names* (not ids), `delivery_fee` (not `delivery_charge`),
        // no `items[]` wrapper — the backend only ever reads one product per call.
        // division_name/district_name/city_name are all set to the selected Delivery
        // Option's own label — there's no separate location selector.
        const payload: OrderPayload = {
            name: name.trim(),
            phone: phone.trim(),
            ...(email.trim() ? { email: email.trim() } : {}),
            address: address.trim(),
            product_id: Number(product?.id ?? 0),
            variant_id: selectedVariantId ?? null,
            quantity,
            delivery_fee: deliveryCharge,
            division_name: selectedDeliveryOption?.label ?? null,
            district_name: selectedDeliveryOption?.label ?? null,
            city_name: selectedDeliveryOption?.label ?? null,
        };
        try {
            const res = await fetch(`${API_BASE}/orders/checkout`, {
                method: "POST",
                headers: { ...HEADERS, "Content-Type": "application/json", "X-Cart-Session": getCartSessionId() },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Order failed");
            const data = (await res.json().catch(() => ({}))) as OrderResponse;
            const orderNumber = data.order_number ?? data.data?.order_number ?? `ORD-${Date.now()}`;
            router.push(`/order-success/${orderNumber}`);
        } catch {
            setOrderError("অর্ডার সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 bg-[#fdfbf7] min-h-screen px-4 scroll-smooth" id="checkout">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif mb-4">
                        অর্ডার সম্পন্ন করুন
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1 text-sm md:text-base">
                            <CheckCircle2 size={18} /> ১০০% ন্যাচারাল
                        </span>
                        <span className="flex items-center gap-1 text-sm md:text-base">
                            <Truck size={18} /> দ্রুত ডেলিভারি
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left: Order Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-emerald-50 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                                        <Info size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">অর্ডার করতে নিচের তথ্যগুলি দিন</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">আপনার নাম *</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="পুরো নাম লিখুন"
                                                required
                                                className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">মোবাইল নাম্বার *</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="01XXXXXXXXX"
                                                required
                                                className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">ইমেইল (অপশনাল)</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">সম্পূর্ণ ঠিকানা *</label>
                                            <textarea
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="আপনার বাসার নাম্বার, রোড নাম্বার ও এলাকা"
                                                required
                                                className="w-full p-4 bg-gray-50 border-gray-100 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white min-h-[100px] transition-all"
                                            />
                                            {errors.address && <p className="text-red-500 text-xs ml-1">{errors.address}</p>}
                                        </div>
                                    </div>

                                    {/* Delivery Selection */}
                                    <div className="space-y-4 pt-4">
                                        <p className="font-bold text-gray-900 flex items-center gap-2">
                                            <Truck size={20} className="text-emerald-600" /> ডেলিভারি এরিয়া
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {deliveryOptions.map((opt) => (
                                                <label
                                                    key={opt.id}
                                                    className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                                                        selectedDeliveryId === opt.id
                                                            ? "border-emerald-600 bg-emerald-50 ring-4 ring-emerald-50/50"
                                                            : "border-gray-50 bg-gray-50/50 hover:border-emerald-100"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                selectedDeliveryId === opt.id
                                                                    ? "border-emerald-600 bg-emerald-600"
                                                                    : "border-gray-300 bg-white"
                                                            }`}
                                                        >
                                                            {selectedDeliveryId === opt.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                                        </div>
                                                        <input type="radio" name="delivery" className="hidden" onChange={() => setSelectedDeliveryId(opt.id)} />
                                                        <span className="font-bold text-gray-700">{opt.label}</span>
                                                    </div>
                                                    <span className="font-black text-emerald-800">৳{opt.price}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Financial Summary */}
                                    <div className="mt-10 p-8 rounded-[2.5rem] bg-emerald-900 text-white relative overflow-hidden">
                                        <div className="relative z-10 space-y-3">
                                            <div className="flex justify-between items-center opacity-80 text-sm">
                                                <span>সাবটোটাল ({quantity} আইটেম)</span>
                                                <span>৳{subtotal}</span>
                                            </div>
                                            <div className="flex justify-between items-center opacity-80 text-sm">
                                                <span>ডেলিভারি চার্জ</span>
                                                <span>৳{deliveryCharge}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-emerald-800/50 mt-2">
                                                <span className="text-xl font-bold text-emerald-300 font-serif">সর্বমোট</span>
                                                <span className="text-3xl font-black">৳{total}</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-40 shrink-0" />
                                    </div>

                                    {orderError && (
                                        <p className="text-red-600 font-bold text-center text-sm">{orderError}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#FA582D] hover:bg-[#e44d25] text-white py-6 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(250,88,45,0.3)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 group mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <ShieldCheck size={28} className="group-hover:rotate-12 transition-transform" />
                                        {submitting ? "প্রক্রিয়া করা হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                                    </button>

                                    <p className="text-center text-gray-400 text-sm italic mt-4">
                                        অর্ডার করার পর আমাদের প্রতিনিধি আপনাকে কল করে নিশ্চিত করবেন
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Right: Gallery & Product Info */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10">
                        {/* Gallery */}
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                            <div className="border-2 border-emerald-50 rounded-[2rem] bg-white shadow-sm overflow-hidden p-3">
                                <div className="relative aspect-square overflow-hidden group mb-3 border rounded-2xl">
                                    <Image
                                        src={mainImage || "/images/products/product_1.webp"}
                                        alt="Product Main View"
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority
                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            Premium Quality
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMainImage(img)}
                                            className={`relative w-16 h-16 md:w-20 md:h-20 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                                                mainImage === img
                                                    ? "border-emerald-600 ring-4 ring-emerald-50 scale-105"
                                                    : "border-gray-100 hover:border-emerald-200"
                                            }`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${i}`} fill sizes="80px" className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                                    {product?.name ?? "পণ্যের নাম"}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-emerald-700">৳{effectivePrice}</span>
                                    {originalPrice && (
                                        <span className="text-gray-400 line-through">৳{originalPrice}</span>
                                    )}
                                    {originalPrice && (
                                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                            Save {Math.round(((originalPrice - effectivePrice) / originalPrice) * 100)}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Variants */}
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
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="font-bold text-gray-700">পরিমাণ:</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="text-xl font-black w-6 text-center">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:text-emerald-600 transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

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
                </div>
            </div>
        </section>
    );
}
