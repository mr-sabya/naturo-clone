import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CheckoutSection from "@/components/landing/CheckoutSection";
import ImageGallerySection from "@/components/landing/ImageGallerySection";
import ProductCarousel from "@/components/home/ProductCarousel";
import CustomerReviewSlider from "@/components/landing/CustomerReviewSlider";
import VideoReviewSection from "@/components/landing/VideoReviewSection";
import OrderButton from "@/components/landing/OrderButton";
import FaqAccordion from "@/components/landing/FaqAccordion";
import ProductHero from "@/components/landing/ProductHero";
import ProductBenefitSection from "@/components/landing/ProductBenefitSection";
import type { Product } from "@/types";
import { parsePrice, parseOriginalPrice } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "X-Tenant-Id": TENANT_ID };

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
            // Backend returns { success, product: {...}, related: [...] } flat — not nested under `data`.
            if (data?.success) {
                product = data.product ?? null;
                similarProducts = Array.isArray(data.related) ? data.related : [];
            }
        }
    } catch {}

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffcf5] px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি খুঁজে পাওয়া যায়নি।</h1>
                <Link href="/shop" className="bg-emerald-700 text-white px-6 py-2 rounded-full">শপে ফিরে যান</Link>
            </div>
        );
    }

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
                    <span className="text-gray-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            {/* Hero Section */}
            {product.hero && (
                <ProductHero data={product.hero} scrollToCheckoutHref={scrollToCheckout} />
            )}

            {/* Gallery */}
            <ImageGallerySection images={product.gallery ?? []} />

            {/* FAQ Section */}
            {product.faqs && product.faqs.length > 0 && (
                <section className="bg-[#00703c] py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-white text-xl md:text-3xl font-bold text-center mb-12 leading-relaxed font-serif">
                            আমরা প্রতিনিয়ত যে প্রশ্নগুলো পেয়ে থাকি
                        </h2>
                        <FaqAccordion faqs={product.faqs} />
                    </div>
                    <div className="flex justify-center mt-10">
                        <Link href={scrollToCheckout}>
                            <OrderButton />
                        </Link>
                    </div>
                </section>
            )}

            {/* Description / Benefits */}
            <ProductBenefitSection benefitData={product.benefits} scrollToCheckoutHref={scrollToCheckout} />

            {/* Reviews */}
            <CustomerReviewSlider reviews={product.reviews_gallery ?? []} />
            <VideoReviewSection videos={product.video_reviews ?? []} />

            {/* Checkout */}
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
