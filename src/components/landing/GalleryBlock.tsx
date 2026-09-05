import Image from "next/image";
import Link from "next/link";
import type { GallerySection } from "@/types";

export default function GalleryBlock({ images }: GallerySection) {
    if (!images || images.length === 0) return null;

    return (
        <section className="bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img, index) => {
                    const tile = (
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md">
                            <Image src={img.image_url} alt={img.alt || "Gallery image"} fill className="object-cover" />
                        </div>
                    );

                    return (
                        <div key={`${img.image_url}-${index}`}>
                            {img.link_url ? <Link href={img.link_url}>{tile}</Link> : tile}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
