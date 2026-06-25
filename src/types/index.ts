export type RawPrice = string | number | { main?: unknown; upper?: unknown } | null | undefined;

export interface Product {
    id: number;
    name: string;
    slug: string;
    // real API list fields
    effective_price?: number;
    sale_price?: number;
    base_price?: number;
    main_image?: string;
    gallery?: string[];
    short_description?: string | null;
    long_description?: string;
    stock?: number;
    sold_count?: number;
    discount_percent?: number | null;
    // real API single-product fields
    regular_price?: number;
    // legacy / fallback field names (may not exist in API)
    price?: RawPrice;
    original_price?: RawPrice;
    image?: string;
    images?: string[];
    category?: string;
    category_name?: string;
    description?: string;
    is_out_of_stock?: boolean;
    label?: string;
    variants?: Variant[];
    faqs?: FAQ[];
    benefits?: string[] | null;
    video_url?: string;
}

export interface Variant {
    id: number;
    name: string;
    price: RawPrice;
    original_price?: RawPrice;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    image?: string;
}

export interface BannerTitle {
    upper?: string;
    main?: string;
}

export interface Banner {
    id: number;
    image: string;
    title?: string | BannerTitle;
    subtitle?: string;
    description?: string;
    button_text?: string;
    link?: string;
    search_placeholder?: string;
    tags?: string[];
}

export interface Division {
    id: number;
    name: string;
}

export interface District {
    id: number;
    name: string;
    division_id: number;
}

export interface City {
    id: number;
    name: string;
    district_id: number;
}

export interface OrderPayload {
    name: string;
    phone: string;
    address: string;
    division_id: number | null;
    district_id: number | null;
    city_id: number | null;
    delivery_charge: number;
    items: OrderItem[];
    note?: string;
}

export interface OrderItem {
    product_id: number;
    quantity: number;
    variant_id?: number;
}

export interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export interface CartItem {
    id: number;
    product_id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
    quantity: number;
    variant_id?: number;
    variant_name?: string;
}
