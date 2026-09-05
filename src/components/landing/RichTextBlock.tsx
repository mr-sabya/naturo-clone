import type { RichTextSection } from "@/types";

export default function RichTextBlock({ html }: RichTextSection) {
    if (!html) return null;

    return (
        <section className="bg-white py-10 px-4">
            <div
                className="max-w-4xl mx-auto prose prose-emerald text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    );
}
