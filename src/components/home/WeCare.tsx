"use client";

import React from "react";
import Image from "next/image";
import { Leaf, ShieldCheck, Heart, Sprout } from "lucide-react";

const values = [
    {
        id: 1,
        title: "১০০% অর্গানিক",
        desc: "কোনো রাসায়নিক সার বা কীটনাশক নেই, একদম খাঁটি প্রকৃতির ছোঁয়া।",
        icon: <Leaf className="text-naturoGreen" size={24} />,
        image: "/images/care/image1.png",
    },
    {
        id: 2,
        title: "সঠিক উৎস",
        desc: "ন্যায্য মূল্যে সরাসরি প্রান্তিক কৃষকদের কাছ থেকে সংগৃহীত।",
        icon: <Heart className="text-naturoGreen" size={24} />,
        image: "/images/care/image2.png",
    },
    {
        id: 3,
        title: "পরিবেশবান্ধব",
        desc: "পরিবেশের সুরক্ষায় আমরা ব্যবহার করি পুনর্ব্যবহারযোগ্য উপাদান।",
        icon: <Sprout className="text-naturoGreen" size={24} />,
        image: "/images/care/image3.png",
    },
    {
        id: 4,
        title: "সেরা মান",
        desc: "প্রতিটি পণ্যে আমরা নিশ্চিত করি সর্বোচ্চ গুণগত মান ও বিশুদ্ধতা।",
        icon: <ShieldCheck className="text-naturoGreen" size={24} />,
        image: "/images/care/image4.png",
    },
];

export default function WeCare() {
    return (
        <section className="py-20 bg-[#f9fbf7] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* বাম পাশ: কন্টেন্ট */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-naturoOrange font-bold tracking-[0.2em] uppercase text-sm block">
                                আমাদের অঙ্গীকার
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1a12] leading-[1.3] md:leading-[1.4]">
                                প্রকৃতির যত্ন যত বেশি হবে, <br />
                                <span className="text-naturoGreen italic">ফলন তত চমৎকার হবে।</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                আমরা বিশ্বাস করি, সুস্বাস্থ্য শুরু হয় মাটি থেকেই। প্রাকৃতিক ভারসাম্য রক্ষার মাধ্যমে আমরা নিশ্চিত করি যে প্রতিটি পণ্য আপনার কাছে পৌঁছায় পূর্ণ পুষ্টিগুণ সহ।
                            </p>
                        </div>

                        {/* ভ্যালু কার্ডসমূহ */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {values.map((value) => (
                                <div key={value.id} className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <div className="mb-4 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h4 className="font-bold text-[#0a1a12] mb-2">{value.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ডান পাশ: ইমেজ কম্পোজিশন */}
                    <div className="relative">
                        {/* মেইন ইমেজ উইথ মফিং শেপ */}
                        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                            <div className="absolute inset-0 bg-naturoGreen/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-morph -rotate-12" />
                            <div className="relative h-full w-full rounded-[40%_60%_30%_70%/50%_40%_50%_60%] overflow-hidden border-8 border-white shadow-2xl">
                                <Image
                                    src="/images/care/image4.png"
                                    alt="অর্গানিক ফার্মিং"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ফ্লোটিং ছোট ইমেজ ১ */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden hidden md:block animate-bounce-slow">
                                <Image
                                    src="/images/care/image1.png"
                                    alt="প্রকৃতি"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ফ্লোটিং ছোট ইমেজ ২ */}
                            <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden hidden md:block">
                                <Image
                                    src="/images/care/image2.png"
                                    alt="যত্ন"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-naturoGreen/5 rounded-full blur-3xl" />
        </section>
    );
}