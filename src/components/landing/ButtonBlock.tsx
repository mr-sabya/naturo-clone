import Link from "next/link";
import type { ButtonSection } from "@/types";

const ALIGN_CLASSES: Record<string, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
};

export default function ButtonBlock({ text, url, style, alignment }: ButtonSection) {
    if (!text || !url) return null;

    const isPrimary = (style ?? "primary") === "primary";
    const alignClass = ALIGN_CLASSES[alignment ?? "center"] ?? ALIGN_CLASSES.center;
    const isAnchor = url.startsWith("#");

    const buttonClass = isPrimary
        ? "bg-emerald-700 hover:bg-emerald-800 text-white"
        : "bg-white border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50";

    return (
        <section className="bg-white py-8 px-4">
            <div className={`max-w-4xl mx-auto flex ${alignClass}`}>
                {isAnchor ? (
                    <a href={url} className={`inline-flex items-center px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg ${buttonClass}`}>
                        {text}
                    </a>
                ) : (
                    <Link href={url} className={`inline-flex items-center px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg ${buttonClass}`}>
                        {text}
                    </Link>
                )}
            </div>
        </section>
    );
}
