"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Smartphone, CreditCard, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import Stepper from "@/components/shared/Stepper";
import { trackPurchase } from "@/lib/gtm";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Tenant-Id": TENANT_ID,
};

interface OrderResponse {
    order_number?: string;
    data?: { order_number?: string };
}

export default function PaymentPage() {
    const router = useRouter();

    const items = useCartStore((s) => s.items);
    const subtotal = useCartStore((s) => s.subtotal);
    const clearCart = useCartStore((s) => s.clearCart);

    const hydrate = useCheckoutStore((s) => s.hydrate);
    const clearCheckout = useCheckoutStore((s) => s.clear);
    const setPaymentMethod = useCheckoutStore((s) => s.setPaymentMethod);

    const name = useCheckoutStore((s) => s.name);
    const phone = useCheckoutStore((s) => s.phone);
    const address = useCheckoutStore((s) => s.address);
    const deliveryCharge = useCheckoutStore((s) => s.deliveryCharge);
    const paymentMethod = useCheckoutStore((s) => s.paymentMethod);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        hydrate();
        setHydrated(true);
    }, [hydrate]);

    useEffect(() => {
        if (hydrated && !name) {
            router.replace("/checkout");
        }
    }, [hydrated, name, router]);

    // Same three tiers as checkout/page.tsx's DELIVERY_OPTIONS, resolved to
    // descriptive location-name strings — the backend's real order validator
    // (OrderController::store) wants division_name/district_name/city_name
    // strings, not ids (there's no division/district/city selector anymore,
    // see PRODUCT_PAGE_PARITY.md §3.7/§3.8 — same pattern CheckoutSection.tsx
    // already uses for the single-product landing-page checkout).
    const derivedLocation =
        deliveryCharge >= 130
            ? { division: "Outside Dhaka", district: "Outside Dhaka District", city: "Outside Dhaka District" }
            : deliveryCharge >= 100
            ? { division: "Dhaka", district: "Outside Dhaka City", city: "Outside Dhaka City" }
            : { division: "Dhaka", district: "Dhaka City", city: "Dhaka" };

    const handleConfirm = async () => {
        if (submitting || items.length === 0) return;
        setSubmitting(true);
        setError("");

        try {
            let orderNumber = `ORD-${Date.now()}`;

            // One flat, single-item call per cart line — mirrors
            // OrderController::store's real validation rules exactly
            // (product_id/variant_id/quantity/delivery_fee/division_name/
            // district_name/city_name as top-level fields, not an `items[]`
            // wrapper the backend never reads).
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const payload = {
                    name,
                    phone,
                    address,
                    product_id: item.product_id,
                    variant_id: item.variant_id ?? null,
                    quantity: item.quantity,
                    delivery_fee: i === 0 ? deliveryCharge : 0,
                    division_name: derivedLocation.division,
                    district_name: derivedLocation.district,
                    city_name: derivedLocation.city,
                };

                const res = await fetch(`${API_BASE}/orders/checkout`, {
                    method: "POST",
                    headers: HEADERS,
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errData = (await res.json().catch(() => ({}))) as { message?: string };
                    throw new Error(errData.message ?? "অর্ডার সাবমিট করতে সমস্যা হয়েছে");
                }

                if (i === 0) {
                    const data = (await res.json()) as OrderResponse;
                    orderNumber =
                        data.order_number ?? data.data?.order_number ?? orderNumber;
                }
            }

            trackPurchase({
                transactionId: orderNumber,
                items,
                value: subtotal + deliveryCharge,
                shipping: deliveryCharge,
            });

            clearCart();
            clearCheckout();
            router.push(`/order-success/${orderNumber}`);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।"
            );
            setSubmitting(false);
        }
    };

    if (!hydrated || !name) {
        return (
            <div className="min-h-screen bg-[#fffcf5] flex flex-col items-center justify-center gap-4">
                <div className="max-w-md w-full px-4">
                    <Stepper step={4} />
                </div>
                <p className="text-gray-400 text-sm">রিডাইরেক্ট হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf5] pb-20">
            <div className="max-w-5xl mx-auto px-4 pt-4">
                <Stepper step={4} />

                <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-900 mb-8 text-center">
                    পেমেন্ট পদ্ধতি
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Delivery recap + Payment options */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Delivery Recap */}
                        <section className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
                            <div className="flex items-center justify-between border-b border-emerald-50 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-emerald-700" />
                                    <h2 className="text-lg font-serif font-semibold text-emerald-900">
                                        ডেলিভারি তথ্য
                                    </h2>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="text-emerald-600 hover:text-emerald-800 text-xs font-bold hover:underline transition-colors"
                                >
                                    সম্পাদনা করুন
                                </Link>
                            </div>
                            <dl className="space-y-2.5 text-sm">
                                <div className="flex gap-2">
                                    <dt className="text-gray-400 w-24 shrink-0">নাম:</dt>
                                    <dd className="font-semibold text-emerald-900">{name}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-gray-400 w-24 shrink-0">মোবাইল:</dt>
                                    <dd className="font-semibold text-emerald-900">{phone}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-gray-400 w-24 shrink-0">ঠিকানা:</dt>
                                    <dd className="font-semibold text-emerald-900">{address}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-gray-400 w-24 shrink-0">ডেলিভারি:</dt>
                                    <dd className="font-semibold text-emerald-900">৳{deliveryCharge}</dd>
                                </div>
                            </dl>
                        </section>

                        {/* Payment Method */}
                        <section className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
                            <h2 className="text-lg font-serif font-semibold text-emerald-900 border-b border-emerald-50 pb-3 mb-5">
                                পেমেন্ট পদ্ধতি বেছে নিন
                            </h2>
                            <div className="space-y-3">
                                <label
                                    className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                                        paymentMethod === "cod"
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-gray-100 hover:border-emerald-200 bg-[#fdfbf7]"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4 accent-emerald-700"
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    <Smartphone size={22} className="text-emerald-700 shrink-0" />
                                    <div>
                                        <p className="font-bold text-emerald-900 text-sm">
                                            ক্যাশ অন ডেলিভারি (COD)
                                        </p>
                                        <p className="text-xs text-gray-400">পণ্য পেয়ে পরিশোধ করুন</p>
                                    </div>
                                </label>

                                <label
                                    className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                                        paymentMethod === "online"
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-gray-100 hover:border-emerald-200 bg-[#fdfbf7]"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4 accent-emerald-700"
                                        checked={paymentMethod === "online"}
                                        onChange={() => setPaymentMethod("online")}
                                    />
                                    <CreditCard size={22} className="text-emerald-700 shrink-0" />
                                    <div>
                                        <p className="font-bold text-emerald-900 text-sm">অনলাইন পেমেন্ট</p>
                                        <p className="text-xs text-gray-400">বিকাশ / নগদ / কার্ড</p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary + Confirm */}
                    <div className="lg:col-span-5">
                        <div className="bg-emerald-900 text-white p-6 rounded-[2rem] sticky top-24 shadow-xl shadow-emerald-900/20">
                            <h2 className="text-xl font-serif font-bold mb-4 border-b border-emerald-800 pb-4">
                                অর্ডার সামারি
                            </h2>

                            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <div
                                        key={`${item.product_id}-${item.variant_id ?? 0}`}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-800 shrink-0 bg-white/10">
                                            <Image
                                                src={item.image || "/images/products/product_1.webp"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-0.5"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-emerald-300">×{item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold shrink-0">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 text-sm text-emerald-200 border-t border-emerald-800 pt-3">
                                <div className="flex justify-between">
                                    <span>সাবটোটাল</span>
                                    <span className="font-bold">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span className="font-bold">৳{deliveryCharge}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-white text-lg font-bold border-t border-emerald-800 pt-3 mt-2">
                                <span>সর্বমোট</span>
                                <span>৳{(subtotal + deliveryCharge).toLocaleString()}</span>
                            </div>

                            {error && (
                                <div className="mt-4 bg-red-900/30 border border-red-700/40 text-red-300 text-sm p-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="mt-5 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
                            >
                                {submitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        প্রক্রিয়া হচ্ছে...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={18} /> অর্ডার নিশ্চিত করুন
                                    </>
                                )}
                            </button>

                            <Link
                                href="/checkout"
                                className="mt-3 block text-center text-emerald-300 hover:text-white text-sm transition-colors"
                            >
                                ← চেকআউটে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
