"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQ } from "@/types";

interface FaqAccordionProps {
    faqs: FAQ[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-emerald-500/50 pb-4">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex justify-between items-center text-left text-white font-bold text-lg md:text-xl py-4 hover:text-emerald-200 transition-colors"
                    >
                        <span>{faq.q}</span>
                        {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {openIndex === idx && (
                        <div className="text-emerald-50 pb-4 text-base md:text-lg leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
