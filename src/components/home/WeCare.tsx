"use client";

import React from "react";
import Image from "next/image";

const items = [
    { id: 1, src: "/images/care/image1.png", alt: "We care image 1", z: "z-10" },
    { id: 2, src: "/images/care/image2.png", alt: "We care image 2", z: "z-20" },
    { id: 3, src: "/images/care/image3.png", alt: "We care image 3", z: "z-30" },
    { id: 4, src: "/images/care/image4.png", alt: "We care image 4", z: "z-40" },
];

export default function WeCare() {
    return (
        <div className="bg-[#3DC673] py-12 flex flex-col items-center">

            {/* Title */}
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
                WE CARE
            </h2>

            {/* Subtitle */}
            <p className="text-white text-center mb-8 font-semibold max-w-xl">
                The More We Care For The Earth, The Better Our Product
            </p>

            {/* Overlapping Images */}
            <div className="flex justify-center relative">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`relative ${item.z} ${index !== 0 ? "-ml-20" : ""}`}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={300}
                            height={300}
                            className="rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}