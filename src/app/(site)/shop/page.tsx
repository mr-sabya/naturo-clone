import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ShopClient from "@/components/shop/ShopClient";
import type { Category, PaginatedProducts, Product } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "X-Tenant-Id": TENANT_ID };
const REVALIDATE_SECONDS = 120;

async function fetchProducts(page = 1): Promise<{ products: Product[]; lastPage: number }> {
    try {
        const res = await fetch(`${API_BASE}/products?page=${page}`, {
            headers: HEADERS,
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

async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_BASE}/categories`, {
            headers: HEADERS,
            next: { revalidate: REVALIDATE_SECONDS, tags: ["categories"] },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data.data ?? [];
    } catch {
        return [];
    }
}

export default async function ShopPage() {
    const [{ products, lastPage }, categories] = await Promise.all([
        fetchProducts(1),
        fetchCategories(),
    ]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-[#f5f5f5] py-3 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Link href="/" className="hover:text-naturoGreen transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-gray-800 font-bold">Shop</span>
                    </nav>
                </div>
            </div>

            <ShopClient
                initialProducts={products}
                initialLastPage={lastPage}
                initialCategories={categories}
            />
        </div>
    );
}
