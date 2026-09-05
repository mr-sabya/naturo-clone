import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import ProductCarousel from "@/components/home/ProductCarousel";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Product } from "@/types";

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
        hasActiveLandingPage: p.has_active_landing_page ?? false,
    };
}

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let product: Product | null = null;
    let related: Product[] = [];

    try {
        const res = await fetch(`${API_BASE}/products/${slug}`, {
            headers: HEADERS,
            next: { revalidate: 60, tags: ["products", `product:${slug}`] },
        });
        if (res.ok) {
            const data = await res.json();
            if (data?.success) {
                product = data.product ?? null;
                related = Array.isArray(data.related) ? data.related : [];
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

    const images = (product.gallery ?? [])
        .map((g) => g.url)
        .filter(Boolean)
        .concat(product.main_image ? [product.main_image] : []);
    const uniqueImages = Array.from(new Set(images));

    return (
        <div className="bg-[#fffcf5] min-h-screen">
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

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5 lg:sticky lg:top-10 self-start">
                        <ProductGallery images={uniqueImages} alt={product.name} />
                    </div>
                    <div className="lg:col-span-7">
                        <ProductBuyBox product={product} />
                    </div>
                </div>

                <div className="mt-12">
                    <ProductInfoTabs product={product} />
                </div>
            </div>

            {related.length > 0 && (
                <ProductCarousel
                    title="Related Products"
                    products={related.map(normalizeProduct)}
                    viewAllLink="/shop"
                />
            )}
        </div>
    );
}
