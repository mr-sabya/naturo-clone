import Link from "next/link";
import { CheckSquare, Heart } from "lucide-react";
import OrderButton from "./OrderButton";
import type { ProductBenefits } from "@/types";

interface ProductBenefitSectionProps {
    benefitData: ProductBenefits | null | undefined;
    scrollToCheckoutHref: string;
}

export default function ProductBenefitSection({ benefitData, scrollToCheckoutHref }: ProductBenefitSectionProps) {
    if (!benefitData || !benefitData.is_active) return null;

    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">{benefitData.section_icon}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">
                        {benefitData.section_title}
                    </h2>
                </div>

                {/* Render HTML Content from Laravel Editor */}
                <div
                    className="space-y-6 text-gray-700 leading-relaxed text-lg font-light prose prose-emerald max-w-none"
                    dangerouslySetInnerHTML={{ __html: benefitData.long_description }}
                />

                {benefitData.benefits_list && benefitData.benefits_list.length > 0 && (
                    <div className="mt-12 bg-emerald-50 p-8 rounded-[2.5rem]">
                        <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                            <Heart size={20} className="fill-emerald-600 text-emerald-600" />
                            উপকারিতা
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefitData.benefits_list.map((benefit: string, index: number) => (
                                <li key={index} className="flex items-center gap-3 text-emerald-800 font-medium">
                                    <CheckSquare size={18} className="text-emerald-600 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-10">
                <Link href={scrollToCheckoutHref}>
                    <OrderButton />
                </Link>
            </div>
        </section>
    );
}
