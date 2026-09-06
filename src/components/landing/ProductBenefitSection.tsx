import Link from "next/link";
import { CheckSquare } from "lucide-react";
import OrderButton from "./OrderButton";
import type { ProductBenefits } from "@/types";

interface ProductBenefitSectionProps {
    benefitData: ProductBenefits | null | undefined;
    scrollToCheckoutHref: string;
}

export default function ProductBenefitSection({ benefitData, scrollToCheckoutHref }: ProductBenefitSectionProps) {
    if (!benefitData || !benefitData.is_active) return null;

    return (
        <section className="bg-white py-10 border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-6xl">
                {benefitData.benefits_list && benefitData.benefits_list.length > 0 && (
                    <div className="bg-emerald-50 p-6 rounded-[2.5rem]">
                        <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-5 flex items-center gap-2 font-serif">
                            <span className="text-2xl">{benefitData.section_icon}</span>
                            {benefitData.section_title}
                        </h2>
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

            <div className="flex justify-center mt-6">
                <Link href={scrollToCheckoutHref}>
                    <OrderButton />
                </Link>
            </div>
        </section>
    );
}
