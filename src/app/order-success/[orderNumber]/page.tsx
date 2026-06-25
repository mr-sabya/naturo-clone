import React from "react";
import Link from "next/link";
import { CheckCircle, Package, Phone } from "lucide-react";

export default async function OrderSuccessPage({
    params,
}: {
    params: Promise<{ orderNumber: string }>;
}) {
    const { orderNumber } = await params;

    return (
        <div className="min-h-screen bg-[#fffcf5] flex flex-col items-center justify-center px-4 py-20">
            <div className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-600" />
                </div>

                <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-900 mb-2">
                    অর্ডার সফলভাবে সম্পন্ন!
                </h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    আপনার অর্ডার গ্রহণ করা হয়েছে।
                    <br />
                    আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>

                <div className="bg-emerald-50 rounded-2xl p-5 mb-8 border border-emerald-100">
                    <div className="flex items-center justify-center gap-2 text-emerald-700">
                        <Package size={20} />
                        <p className="font-bold text-base">
                            অর্ডার নম্বর:{" "}
                            <span className="text-emerald-900 tracking-wider">{orderNumber}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-8">
                    <Phone size={14} />
                    <span>
                        যেকোনো প্রয়োজনে কল করুন:{" "}
                        <a
                            href="tel:09639812525"
                            className="text-emerald-700 font-bold hover:underline"
                        >
                            09639812525
                        </a>
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/shop"
                        className="flex-1 border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 py-3 rounded-2xl font-bold transition-colors text-sm"
                    >
                        আরও কেনাকাটা করুন
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl font-bold transition-colors text-sm"
                    >
                        হোমপেজে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}
