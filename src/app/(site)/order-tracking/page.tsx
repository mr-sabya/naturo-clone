"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    MapPin,
    Search,
    Clock,
    XCircle,
    Loader2,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Tenant-Id": TENANT_ID,
};

interface TrackedItem {
    product_id: number;
    name: string;
    image: string | null;
    quantity: number;
    price: number;
    total: number;
}

interface TrackedOrder {
    order_number: string;
    status: string;
    placed_at: string | null;
    name: string;
    phone: string;
    address: string;
    payment_method: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    items: TrackedItem[];
}

// Matches the OrderStatus enum used by OrderController on the backend.
const STATUS_STEPS = [
    { key: "pending", label: "Order Confirmed", icon: CheckCircle2, desc: "We've received your order." },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2, desc: "Our team has confirmed your order." },
    { key: "processing", label: "Packed with Care", icon: Package, desc: "Your order is being prepared." },
    { key: "shipped", label: "Out for Delivery", icon: Truck, desc: "Your order is on its way." },
    { key: "delivered", label: "Delivered", icon: MapPin, desc: "Your order has arrived." },
];

function formatDate(iso: string | null) {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" });
    } catch {
        return iso;
    }
}

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState<TrackedOrder | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) {
            setError("অর্ডার নম্বর দিন।");
            return;
        }
        setLoading(true);
        setError("");
        setOrder(null);
        try {
            const res = await fetch(`${API_BASE}/orders/track`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({
                    order_number: orderNumber.trim(),
                    phone: phone.trim() || undefined,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.success) {
                setError(data.message || "অর্ডারটি খুঁজে পাওয়া যায়নি।");
                return;
            }
            setOrder(data.data);
        } catch {
            setError("সার্ভারে সমস্যা হচ্ছে, দয়া করে পরে চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const isCancelled = order?.status === "cancelled";
    const currentStepIndex = order ? STATUS_STEPS.findIndex((s) => s.key === order.status) : -1;

    return (
        <div className="min-h-screen bg-[#fffcf5] selection:bg-emerald-100 selection:text-emerald-900">
            {/* Header: Breadcrumbs */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">Track Order</span>
                </div>
            </div>

            {/* Title Section */}
            <div className="text-center pt-16 px-6">
                <h1 className="text-4xl md:text-5xl font-serif font-semibold text-emerald-900 mb-4">
                    Track Your Journey
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Follow your organic essentials from our farm to your doorstep.
                </p>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">

                    {/* Left Column: Tracking Content */}
                    <div className="space-y-10">

                        {/* 1. Search Box */}
                        <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-[0_15px_40px_rgba(0,77,44,0.04)]">
                            <h2 className="text-xl font-serif text-emerald-900 mb-6 flex items-center gap-2">
                                <Search size={20} className="text-emerald-700" />
                                Find Your Order
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 ml-1">Order Number</label>
                                    <input
                                        type="text"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        placeholder="e.g. ORD-20260714-ABC123"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="01XXXXXXXXX"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                {error && (
                                    <p className="md:col-span-2 text-red-600 text-sm font-medium">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="md:col-span-2 mt-2 w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10 disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                                    {loading ? "খোঁজা হচ্ছে..." : "Track Status"}
                                </button>
                            </form>
                        </section>

                        {/* 2. Result */}
                        {order && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-emerald-100 shadow-[0_15px_40px_rgba(0,77,44,0.04)]">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">Order {order.order_number}</p>
                                            <h3 className="text-2xl font-serif text-emerald-900">
                                                {isCancelled ? "Cancelled" : STATUS_STEPS[Math.max(currentStepIndex, 0)]?.label ?? order.status}
                                            </h3>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Placed On</p>
                                            <p className="text-lg font-medium text-emerald-900">{formatDate(order.placed_at)}</p>
                                        </div>
                                    </div>

                                    {isCancelled ? (
                                        <div className="flex items-center gap-4 p-6 bg-red-50 border border-red-100 rounded-2xl">
                                            <XCircle size={28} className="text-red-500 shrink-0" />
                                            <p className="text-red-700 font-medium">This order has been cancelled.</p>
                                        </div>
                                    ) : (
                                        <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-50">
                                            {STATUS_STEPS.map((step, idx) => {
                                                const Icon = step.icon;
                                                const done = currentStepIndex >= 0 && idx < currentStepIndex;
                                                const current = idx === currentStepIndex;
                                                const pending = currentStepIndex >= 0 && idx > currentStepIndex;
                                                return (
                                                    <div key={step.key} className={`relative flex gap-6 ${pending ? "opacity-40" : ""}`}>
                                                        <div
                                                            className={`z-10 w-10 h-10 rounded-full flex items-center justify-center ring-8 ring-white ${
                                                                current
                                                                    ? "bg-emerald-900 text-white animate-pulse"
                                                                    : done
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-gray-100 text-gray-400"
                                                            }`}
                                                        >
                                                            <Icon size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 className={`font-bold ${pending ? "text-gray-900" : "text-emerald-900"}`}>{step.label}</h4>
                                                            <p className="text-xs text-gray-400 mt-1 font-light italic">{step.desc}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Order details */}
                                    <div className="mt-12 pt-8 border-t border-emerald-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Delivery Info</p>
                                            <p className="font-bold text-emerald-900">{order.name}</p>
                                            <p className="text-sm text-gray-600">{order.phone}</p>
                                            <p className="text-sm text-gray-600">{order.address}</p>
                                            <p className="text-xs text-gray-400 mt-1 uppercase">{order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Items</p>
                                            <div className="space-y-3">
                                                {order.items.map((item) => (
                                                    <div key={item.product_id} className="flex justify-between text-sm">
                                                        <span className="text-gray-700">{item.name} × {item.quantity}</span>
                                                        <span className="font-bold text-emerald-900">৳{item.total.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-emerald-50 space-y-1 text-sm">
                                                <div className="flex justify-between text-gray-500">
                                                    <span>Subtotal</span><span>৳{order.subtotal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-500">
                                                    <span>Delivery Fee</span><span>৳{order.delivery_fee.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-emerald-900 text-base pt-1">
                                                    <span>Total</span><span>৳{order.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="relative">
                        <div className="sticky top-10 space-y-6">

                            {/* Need Help Card */}
                            <div className="p-8 bg-white rounded-[2rem] border border-emerald-100 shadow-[0_20px_50px_rgba(0,77,44,0.05)] relative overflow-hidden group">
                                <div className="absolute -top-4 -right-4 text-emerald-50 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                                    <Package size={150} />
                                </div>

                                <h4 className="font-serif text-2xl text-emerald-900 mb-4">Issues with Delivery?</h4>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed font-light">
                                    If your package is delayed or arrives damaged, our nature-loving support team is here to help.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href="/contact-us"
                                        className="block w-full text-center bg-emerald-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all duration-300"
                                    >
                                        Report an Issue
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="block w-full text-center text-emerald-800 py-3 text-sm font-bold hover:text-emerald-600 transition-colors"
                                    >
                                        Shipping Policy
                                    </Link>
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="px-8 py-6 bg-emerald-900 rounded-[2rem] text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock size={16} className="text-emerald-400" />
                                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Standard Delivery</p>
                                </div>
                                <p className="text-xs text-emerald-100/70 leading-relaxed font-light">
                                    Most deliveries arrive within 3-5 business days. Remote areas may take slightly longer as we ensure your products stay fresh.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Branding Footer */}
            <footer className="bg-white py-20 border-t border-emerald-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="text-2xl grayscale opacity-20">🍃</div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                            Freshness Tracked • Quality Guaranteed
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
