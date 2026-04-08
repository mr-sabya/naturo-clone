import React from "react";
import Link from "next/link";
import {
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    MapPin,
    Search,
    Clock,
    AlertCircle
} from "lucide-react";

export default function OrderTrackingPage() {
    // Mock tracking data - in a real app, you'd fetch this based on a query param
    const orderStatus = "shipped"; // options: 'processing', 'shipped', 'delivered'

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
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 ml-1">Order ID</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. PK-98765"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="nature@example.com"
                                        className="w-full px-5 py-4 bg-[#fdfbf7] border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <button className="md:col-span-2 mt-2 w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10">
                                    Track Status
                                </button>
                            </form>
                        </section>

                        {/* 2. Visual Tracking Timeline (Visible when order found) */}
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-emerald-100 shadow-[0_15px_40px_rgba(0,77,44,0.04)]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">Current Status</p>
                                        <h3 className="text-2xl font-serif text-emerald-900">In Transit</h3>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Expected Delivery</p>
                                        <p className="text-lg font-medium text-emerald-900">March 25, 2024</p>
                                    </div>
                                </div>

                                {/* Stepper Component */}
                                <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-50">

                                    {/* Step 1: Completed */}
                                    <div className="relative flex gap-6">
                                        <div className="z-10 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center ring-8 ring-white">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-900">Order Confirmed</h4>
                                            <p className="text-sm text-gray-500">March 20, 2024 • 10:30 AM</p>
                                            <p className="text-xs text-gray-400 mt-1 font-light italic text-pretty">Your organic products are being hand-picked from our farms.</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Completed */}
                                    <div className="relative flex gap-6">
                                        <div className="z-10 w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center ring-8 ring-white">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-900">Packed with Care</h4>
                                            <p className="text-sm text-gray-500">March 21, 2024 • 02:15 PM</p>
                                            <p className="text-xs text-gray-400 mt-1 font-light italic">Secured in plastic-free, biodegradable packaging.</p>
                                        </div>
                                    </div>

                                    {/* Step 3: Current */}
                                    <div className="relative flex gap-6">
                                        <div className="z-10 w-10 h-10 bg-emerald-900 text-white rounded-full flex items-center justify-center ring-8 ring-white animate-pulse">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-900">Out for Delivery</h4>
                                            <p className="text-sm text-emerald-700 font-medium">In Transit via Eco-Courier</p>
                                            <p className="text-xs text-gray-400 mt-1 font-light italic">Location: Central Sorting Facility, Kerala</p>
                                        </div>
                                    </div>

                                    {/* Step 4: Pending */}
                                    <div className="relative flex gap-6 opacity-40">
                                        <div className="z-10 w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center ring-8 ring-white">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Delivered</h4>
                                            <p className="text-sm text-gray-500">Awaiting arrival</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
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