import AllProducts from "../components/home/AllProducts";
import BannerSlider from "../components/home/BannerSlider";
import CategorySlider from "../components/home/CategorySlider";
import ProductCarousel from "../components/home/ProductCarousel";
import WeCare from "../components/home/WeCare";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Product, PaginatedProducts } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

const headers = {
    Accept: "application/json",
    "X-Tenant-Id": TENANT_ID,
};

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
        isOutOfStock: p.stock === 0,
    };
}

async function fetchProducts(page = 1): Promise<{ products: Product[]; lastPage: number }> {
    try {
        const res = await fetch(`${API_BASE}/products?page=${page}`, {
            headers,
            cache: "no-store",
        });
        if (!res.ok) return { products: [], lastPage: 1 };
        const data: PaginatedProducts | Product[] = await res.json();
        if (Array.isArray(data)) return { products: data, lastPage: 1 };
        return { products: data.data, lastPage: data.last_page };
    } catch {
        return { products: [], lastPage: 1 };
    }
}

export default async function Home() {
    const { products, lastPage } = await fetchProducts(1);

    const bestSellers = products.slice(0, 8).map(normalizeProduct);
    const wellnessProducts = products.slice(0, 6).map(normalizeProduct);

    return (
        <main>
            <BannerSlider />
            <CategorySlider />

            <ProductCarousel title="OUR BEST SELLERS" products={bestSellers} />

            <ProductCarousel
                title="Wellness"
                products={wellnessProducts}
                viewAllLink="/category/wellness"
            />

            <AllProducts initialProducts={products.map(normalizeProduct)} initialLastPage={lastPage} />

            <WeCare />
        </main>
    );
}
