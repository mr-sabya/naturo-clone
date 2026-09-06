import FaqAccordion from "./FaqAccordion";
import OrderButton from "./OrderButton";
import Link from "next/link";
import type { FAQ } from "@/types";

interface FaqSectionProps {
    faqs: FAQ[];
    scrollToCheckoutHref: string;
}

export default function FaqSection({ faqs, scrollToCheckoutHref }: FaqSectionProps) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="bg-[#00703c] py-14 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-white text-xl md:text-3xl font-bold text-center mb-8 leading-relaxed font-serif">
                    আমরা প্রতিনিয়ত যে প্রশ্নগুলো পেয়ে থাকি
                </h2>
                <FaqAccordion faqs={faqs} />
            </div>
            <div className="flex justify-center mt-6">
                <Link href={scrollToCheckoutHref}>
                    <OrderButton />
                </Link>
            </div>
        </section>
    );
}
