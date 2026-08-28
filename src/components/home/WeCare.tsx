import Image from "next/image";
import { Leaf, ShieldCheck, Heart, Sprout, BadgeCheck, Stethoscope, Truck, Star, Clock, Award, type LucideIcon } from "lucide-react";
import type { WeCareSection as WeCareSectionData, WeCareFeature } from "@/types";

// Keys match the fixed set offered in the admin's We Care Section screen —
// shared across every tenant, so all 8 must be mapped even though this
// tenant's own fallback content below only uses a few of them.
const ICON_MAP: Record<string, LucideIcon> = {
    "badge-check": BadgeCheck,
    stethoscope: Stethoscope,
    truck: Truck,
    "shield-check": ShieldCheck,
    heart: Heart,
    star: Star,
    clock: Clock,
    award: Award,
    leaf: Leaf,
    sprout: Sprout,
};

// Matches the original hardcoded content — used whenever the admin hasn't
// configured a "We Care" section yet, so the homepage never shows a blank gap.
const FALLBACK: WeCareSectionData = {
    eyebrow_text: "আমাদের অঙ্গীকার",
    heading: "প্রকৃতির যত্ন যত বেশি হবে,",
    heading_highlight: "ফলন তত চমৎকার হবে।",
    description:
        "আমরা বিশ্বাস করি, সুস্বাস্থ্য শুরু হয় মাটি থেকেই। প্রাকৃতিক ভারসাম্য রক্ষার মাধ্যমে আমরা নিশ্চিত করি যে প্রতিটি পণ্য আপনার কাছে পৌঁছায় পূর্ণ পুষ্টিগুণ সহ।",
    main_image: "/images/care/image4.png",
    floating_image_1: "/images/care/image1.png",
    floating_image_2: "/images/care/image2.png",
    features: [
        { icon: "leaf", title: "১০০% অর্গানিক", description: "কোনো রাসায়নিক সার বা কীটনাশক নেই, একদম খাঁটি প্রকৃতির ছোঁয়া।" },
        { icon: "heart", title: "সঠিক উৎস", description: "ন্যায্য মূল্যে সরাসরি প্রান্তিক কৃষকদের কাছ থেকে সংগৃহীত।" },
        { icon: "sprout", title: "পরিবেশবান্ধব", description: "পরিবেশের সুরক্ষায় আমরা ব্যবহার করি পুনর্ব্যবহারযোগ্য উপাদান।" },
        { icon: "shield-check", title: "সেরা মান", description: "প্রতিটি পণ্যে আমরা নিশ্চিত করি সর্বোচ্চ গুণগত মান ও বিশুদ্ধতা।" },
    ],
};

function FeatureIcon({ icon }: { icon: string }) {
    const Icon = ICON_MAP[icon] ?? ShieldCheck;
    return <Icon className="text-naturoGreen" size={24} />;
}

interface WeCareProps {
    data?: WeCareSectionData | null;
}

export default function WeCare({ data }: WeCareProps) {
    const section = data ?? FALLBACK;
    const features: WeCareFeature[] = section.features?.length ? section.features : FALLBACK.features;
    const mainImage = section.main_image ?? FALLBACK.main_image!;
    const floatingImage1 = section.floating_image_1 ?? FALLBACK.floating_image_1!;
    const floatingImage2 = section.floating_image_2 ?? FALLBACK.floating_image_2!;

    return (
        <section className="relative py-20 bg-[#f9fbf7] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* বাম পাশ: কন্টেন্ট */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {section.eyebrow_text && (
                                <span className="text-naturoOrange font-bold tracking-[0.2em] uppercase text-sm block">
                                    {section.eyebrow_text}
                                </span>
                            )}
                            {(section.heading || section.heading_highlight) && (
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1a12] leading-[1.3] md:leading-[1.4]">
                                    {section.heading}
                                    {section.heading && section.heading_highlight && <br />}
                                    <span className="text-naturoGreen italic">{section.heading_highlight}</span>
                                </h2>
                            )}
                            {section.description && (
                                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                    {section.description}
                                </p>
                            )}
                        </div>

                        {/* ভ্যালু কার্ডসমূহ */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <div className="mb-4 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FeatureIcon icon={feature.icon} />
                                    </div>
                                    <h4 className="font-bold text-[#0a1a12] mb-2">{feature.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {feature.description}
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
                                    src={mainImage}
                                    alt="অর্গানিক ফার্মিং"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ফ্লোটিং ছোট ইমেজ ১ */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden hidden md:block animate-bounce-slow">
                                <Image
                                    src={floatingImage1}
                                    alt="প্রকৃতি"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ফ্লোটিং ছোট ইমেজ ২ */}
                            <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden hidden md:block">
                                <Image
                                    src={floatingImage2}
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
