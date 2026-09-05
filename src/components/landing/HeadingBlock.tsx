import type { HeadingSection } from "@/types";

const SIZE_CLASSES: Record<string, string> = {
    h1: "text-3xl md:text-5xl",
    h2: "text-2xl md:text-4xl",
    h3: "text-xl md:text-2xl",
};

const ALIGN_CLASSES: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

export default function HeadingBlock({ text, subtitle, size, alignment }: HeadingSection) {
    if (!text) return null;

    const sizeClass = SIZE_CLASSES[size ?? "h2"] ?? SIZE_CLASSES.h2;
    const alignClass = ALIGN_CLASSES[alignment ?? "center"] ?? ALIGN_CLASSES.center;

    return (
        <section className="bg-white py-10 px-4">
            <div className={`max-w-4xl mx-auto ${alignClass}`}>
                <h2 className={`${sizeClass} font-bold text-gray-900 font-serif`}>{text}</h2>
                {subtitle && <p className="mt-3 text-gray-500 text-base md:text-lg">{subtitle}</p>}
            </div>
        </section>
    );
}
