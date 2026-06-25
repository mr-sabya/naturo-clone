import Link from "next/link";
import { ChevronRight, CheckSquare, Heart } from "lucide-react";
import CheckoutSection from "@/components/landing/CheckoutSection";
import ImageGallerySection from "@/components/landing/ImageGallerySection";
import ProductCarousel from "@/components/home/ProductCarousel";
import CustomerReviewSlider from "@/components/landing/CustomerReviewSlider";
import VideoReviewSection from "@/components/landing/VideoReviewSection";
import OrderButton from "@/components/landing/OrderButton";
import FaqAccordion from "@/components/landing/FaqAccordion";
import type { Product, FAQ } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "X-Tenant-Id": TENANT_ID };

import { parsePrice, parseOriginalPrice } from "@/lib/api";

function normalizeProduct(p: Product) {
    const rawPrice = p.effective_price ?? p.sale_price ?? p.price;
    const rawOriginal = p.base_price ?? p.regular_price ?? p.original_price;
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: parsePrice(rawPrice),
        originalPrice: parseOriginalPrice(rawOriginal, rawPrice),
        image: p.main_image || p.image || "",
        category: p.category_name ?? p.category,
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let product: Product | null = null;
    let similarProducts: Product[] = [];

    try {
        const productRes = await fetch(`${API_BASE}/products/${slug}`, { headers: HEADERS, cache: "no-store" });
        if (productRes.ok) {
            const data = await productRes.json();
            // API returns { success, data: { product: {...}, related: [...] } }
            if (data?.data?.product) {
                product = data.data.product;
                similarProducts = Array.isArray(data.data.related) ? data.data.related : [];
            } else {
                product = data.data ?? data;
            }
        }
    } catch {}

    const galleryImages = product?.gallery?.filter(Boolean) ?? [];
    const images: string[] = galleryImages.length > 0
        ? galleryImages
        : product?.main_image
        ? [product.main_image]
        : product?.image
        ? [product.image]
        : ["/images/products/product_1.webp"];

    const faqs: FAQ[] = product?.faqs ?? [
        { question: "আপনাদের পণ্য কি খাঁটি?", answer: "হ্যাঁ, আমাদের সকল পণ্য ১০০% প্রাকৃতিক এবং খাঁটি।" },
        { question: "ডেলিভারি কতদিনে পাব?", answer: "ঢাকার ভেতরে ১-২ দিন এবং ঢাকার বাইরে ২-৪ কার্যদিবসের মধ্যে পাবেন।" },
        { question: "পণ্য পছন্দ না হলে কী করব?", answer: "আমাদের রিটার্ন পলিসি অনুযায়ী ৭ দিনের মধ্যে ফেরত দিতে পারবেন।" },
    ];

    const benefits: string[] = (product?.benefits && product.benefits.length > 0 ? product.benefits : null) ?? [
        "১০০% প্রাকৃতিক উপাদান",
        "কোনো কৃত্রিম সংযোজন নেই",
        "স্বাস্থ্যকর ও নিরাপদ",
        "নিয়মিত ব্যবহারে উপকারী",
    ];

    const scrollToCheckout = "#checkout";

    return (
        <div className="bg-[#fffcf5] min-h-screen scroll-smooth selection:bg-emerald-100">

            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-emerald-700">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/shop" className="hover:text-emerald-700">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{product?.name ?? slug}</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative bg-[#f4f4f4] py-12 px-4 overflow-hidden border-b border-gray-200">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                        {product?.name ?? "Product Details"}
                    </h1>
                    {product?.short_description && (
                        <p className="text-red-600 font-bold text-sm md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                            {product.short_description}
                        </p>
                    )}
                    <div className="mt-10">
                        <div className="flex justify-center">
                            <Link href={scrollToCheckout}>
                                <OrderButton />
                            </Link>
                        </div>
                        {product?.video_url && (
                            <div className="relative aspect-[16/9] mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white mt-10">
                                <iframe
                                    className="w-full h-full"
                                    src={product.video_url}
                                    title="Product Video"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ImageGallerySection images={images} />

            {/* FAQ Section */}
            <section className="bg-[#00703c] py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-white text-xl md:text-3xl font-bold text-center mb-12 leading-relaxed font-serif">
                        আমরা প্রতিনিয়ত যে প্রশ্নগুলো পেয়ে থাকি
                    </h2>
                    <FaqAccordion faqs={faqs} />
                </div>
                <div className="flex justify-center mt-10">
                    <Link href={scrollToCheckout}>
                        <OrderButton />
                    </Link>
                </div>
            </section>

            {/* Description / Benefits */}
            {((product?.long_description || product?.description) || benefits.length > 0) && (
                <section className="bg-white py-16 border-t border-gray-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {(product?.long_description || product?.description) && (
                            <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light mb-12">
                                <p>{product.long_description || product.description}</p>
                            </div>
                        )}
                        {benefits.length > 0 && (
                            <div className="bg-emerald-50 p-8 rounded-[2.5rem]">
                                <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                    <Heart size={20} className="fill-emerald-600 text-emerald-600" /> উপকারিতা
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center gap-3 text-emerald-800 font-medium">
                                            <CheckSquare size={18} className="text-emerald-600 shrink-0" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-10">
                        <Link href={scrollToCheckout}>
                            <OrderButton />
                        </Link>
                    </div>
                </section>
            )}

            <CustomerReviewSlider />
            <VideoReviewSection />

            <CheckoutSection product={product} />

            {similarProducts.length > 0 && (
                <ProductCarousel
                    title="Related Products"
                    products={similarProducts.map(normalizeProduct)}
                    viewAllLink="/shop"
                />
            )}
        </div>
    );
}
