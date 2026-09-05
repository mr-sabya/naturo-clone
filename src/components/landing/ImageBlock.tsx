import Image from "next/image";
import Link from "next/link";
import type { ImageSection } from "@/types";

export default function ImageBlock({ image_url, alt, link_url }: ImageSection) {
    if (!image_url) return null;

    const img = (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
            <Image src={image_url} alt={alt || "Image"} fill className="object-cover" />
        </div>
    );

    return (
        <section className="bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {link_url ? <Link href={link_url}>{img}</Link> : img}
            </div>
        </section>
    );
}
