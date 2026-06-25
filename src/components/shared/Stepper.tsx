import React from "react";
import { Check } from "lucide-react";

const STEPS = [
    { label: "কেনাকাটা" },
    { label: "কার্ট" },
    { label: "চেকআউট" },
    { label: "পেমেন্ট" },
];

export default function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
    return (
        <div className="flex items-center justify-center py-6 px-4">
            {STEPS.map((s, idx) => {
                const n = idx + 1;
                const done = n < step;
                const active = n === step;
                return (
                    <React.Fragment key={n}>
                        <div className="flex flex-col items-center gap-1.5 min-w-0">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all
                                    ${done
                                        ? "bg-emerald-600 text-white"
                                        : active
                                        ? "bg-emerald-700 text-white ring-4 ring-emerald-200"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {done ? <Check size={16} strokeWidth={3} /> : n}
                            </div>
                            <span
                                className={`text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${
                                    active ? "text-emerald-700" : done ? "text-emerald-500" : "text-gray-300"
                                }`}
                            >
                                {s.label}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div
                                className={`flex-1 h-[2px] mx-2 mb-5 rounded-full transition-colors ${
                                    n < step ? "bg-emerald-500" : "bg-gray-100"
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
