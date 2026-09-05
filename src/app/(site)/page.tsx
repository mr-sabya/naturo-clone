import dynamic from "next/dynamic";
import AllProducts from "@/components/home/AllProducts";
import BannerSlider from "@/components/home/BannerSlider";
import CategorySlider from "@/components/home/CategorySlider";
import ProductCarousel from "@/components/home/ProductCarousel";
import WeCare from "@/components/home/WeCare";
import { parsePrice, parseOriginalPrice } from "@/lib/api";
import type { Banner, Category, HomepageCategorySection, Product, PaginatedProducts, WeCareSection } from "@/types";

// Deferred (fetches its own data 1.5s after mount, invisible until then) —
// splitting it into its own chunk keeps its code out of the home page's
// initial JS instead of shipping it before it can possibly be needed.
const SpinWheelModal = dynamic(() => import("@/components/shared/SpinWheelModal"));

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

const headers = {
    Accept: "application/json",
    "X-Tenant-Id": TENANT_ID,
};

// Read-mostly public content — served from Next's data cache and refreshed
// in the background every 2 minutes instead of hitting the origin on every
// single page view.
const REVALIDATE_SECONDS = 120;

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
        hasActiveLandingPage: p.has_active_landing_page ?? false,
    };
}

async function fetchProducts(page = 1): Promise<{ products: Product[]; lastPage: number }> {
    try {
        const res = await fetch(`${API_BASE}/products?page=${page}`, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["products"] },
        });
        if (!res.ok) return { products: [], lastPage: 1 };
        const data: PaginatedProducts | Product[] = await res.json();
        if (Array.isArray(data)) return { products: data, lastPage: 1 };
        return { products: data.data, lastPage: data.last_page };
    } catch {
        return { products: [], lastPage: 1 };
    }
}

async function fetchBanners(): Promise<Banner[]> {
    try {
        const res = await fetch(`${API_BASE}/hero-banners`, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["hero-banners"] },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data.data ?? [];
    } catch {
        return [];
    }
}

async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_BASE}/tab-categories`, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["categories"] },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data.data ?? [];
    } catch {
        return [];
    }
}

// The admin-curated homepage carousel sections (Category.show_products_on_homepage,
// in the admin's chosen sort_order) — each one a real category with its own
// products, replacing the old hardcoded "Wellness" section that was just
// products.slice(0, 6) with zero real connection to any category.
async function fetchHomepageCategorySections(): Promise<HomepageCategorySection[]> {
    try {
        const res = await fetch(`${API_BASE}/homepage-categories`, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["categories", "products"] },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data : [];
    } catch {
        return [];
    }
}

async function fetchWeCareSection(): Promise<WeCareSection | null> {
    try {
        const res = await fetch(`${API_BASE}/we-care`, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["we-care"] },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json?.data ?? null;
    } catch {
        return null;
    }
}

export default async function Home() {
    // Fetched in parallel rather than sequentially — none of these depend on
    // each other's result.
    const [{ products, lastPage }, banners, categories, categorySections, weCareSection] = await Promise.all([
        fetchProducts(1),
        fetchBanners(),
        fetchCategories(),
        fetchHomepageCategorySections(),
        fetchWeCareSection(),
    ]);

    const bestSellers = products.slice(0, 8).map(normalizeProduct);

    return (
        <main>
            <BannerSlider banners={banners} />
            <CategorySlider categories={categories} />

            <ProductCarousel title="OUR BEST SELLERS" products={bestSellers} />

            {categorySections.map((section) => (
                <ProductCarousel
                    key={section.id}
                    title={section.name}
                    products={section.products.map(normalizeProduct)}
                    viewAllLink={`/shop?category=${section.slug}`}
                />
            ))}

            <AllProducts initialProducts={products.map(normalizeProduct)} initialLastPage={lastPage} />

            <WeCare data={weCareSection} />

            <SpinWheelModal />
        </main>
    );
}
