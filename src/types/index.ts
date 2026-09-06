export type RawPrice = string | number | { main?: unknown; upper?: unknown } | null | undefined;

export interface Product {
    id: number;
    name: string;
    slug: string;
    sku?: string;
    type?: "normal" | "variable";
    // real API list fields (ProductResource)
    effective_price?: number;
    sale_price?: number;
    base_price?: number;
    main_image?: string;
    gallery?: ProductImage[];
    short_description?: string | null;
    long_description?: string;
    stock?: number;
    sold_count?: number;
    discount_percent?: number | null;
    // real API single-product fields (ProductLandingResource, GET /products/{slug})
    regular_price?: number;
    hero?: ProductHeroData;
    faqs?: FAQ[];
    benefits?: ProductBenefits | null;
    reviews_gallery?: ReviewImage[];
    video_reviews?: VideoReview[];
    // Ordered, admin-configured block list from the landing page builder —
    // additive alongside the fixed keys above. See LandingSection below.
    sections?: LandingSection[];
    // Whether the frontend should render the site Header/Footer around this
    // landing page (admin-configurable per funnel) — defaults to true.
    show_header_footer?: boolean;
    // Whether to render the "Related Products" carousel at the bottom —
    // also admin-configurable per funnel, defaults to true.
    show_related_products?: boolean;
    meta?: { title?: string | null; description?: string | null };
    // Whether a landing page is actively serving this product's own root
    // URL right now — the [slug] route reads this to decide whether to
    // render the funnel or redirect to the catalog page at /product/{slug}.
    has_active_landing_page?: boolean;
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
    video_url?: string;
    brand?: { name: string; slug: string } | null;
    // Grouped by SpecificationKey.group (e.g. "General", "Formulation").
    specifications?: Record<string, { key: string; value: string }[]>;
    // Real Review-model data (rating/comment) — distinct from
    // `reviews_gallery` (customer review screenshots, a landing-page block).
    reviews?: {
        average: number;
        total: number;
        stars: Record<string, number>;
        list: { id: number; name: string; rating: number; comment: string | null; created_at: string | null }[];
    };
}

export interface ProductImage {
    id: number;
    url: string;
    is_th?: boolean;
}

export interface ProductHeroData {
    highlight_title: string;
    main_title: string;
    description: string;
    video_url: string;
    button_text?: string;
}

export interface ProductBenefits {
    section_icon: string;
    section_title: string;
    long_description: string;
    benefits_list: string[];
    is_active: boolean;
}

export interface ReviewImage {
    id: number;
    image: string;
    rating: number;
}

export interface VideoReview {
    id: number;
    title: string;
    video_url: string;
}

export interface Variant {
    id: number;
    name: string;
    price: RawPrice;
    original_price?: RawPrice;
    // real API single-product fields (ProductLandingResource variants[])
    sku?: string;
    weight?: number;
    weight_unit?: string;
    regular_price?: number;
    sale_price?: number;
    effective_price?: number;
    stock?: number;
    image?: string;
    display_name?: string;
}

export interface FAQ {
    q: string;
    a: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    image?: string;
}

export interface HomepageCategorySection {
    id: number;
    name: string;
    slug: string;
    products: Product[];
}

export interface WeCareFeature {
    icon: string;
    title: string;
    description: string;
}

export interface WeCareSection {
    eyebrow_text: string | null;
    heading: string | null;
    heading_highlight: string | null;
    description: string | null;
    main_image: string | null;
    floating_image_1: string | null;
    floating_image_2: string | null;
    features: WeCareFeature[];
}

export interface BannerTitle {
    upper?: string;
    main?: string;
}

export interface Banner {
    id: number;
    image: string;
    display_mode?: "content" | "image_only";
    title?: string | BannerTitle;
    subtitle?: string;
    description?: string;
    button_text?: string;
    link?: string;
    search_placeholder?: string;
    tags?: string[];
}

// Matches OrderController::store's validation rules in the em-group backend exactly:
// a flat, single-item payload keyed by location *names* (not ids), `delivery_fee`
// (not `delivery_charge`), no `items[]` wrapper.
export interface OrderPayload {
    name: string;
    phone: string;
    email?: string;
    address: string;
    bundle_items?: { product_id: number; variant_id?: number | null; quantity?: number }[];
    address_id?: number | null;
    user_id?: number | null;
    product_id: number;
    variant_id?: number | null;
    quantity: number;
    delivery_fee: number;
    payment_method?: "cod" | "online";
    division_name?: string | null;
    district_name?: string | null;
    city_name?: string | null;
    latitude?: number | null;
    longitude?: number | null;
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

export interface DeliveryOption {
    id: number;
    label: string;
    sublabel?: string | null;
    price: number;
}

// --- Landing page builder blocks (ProductLandingResource `sections`) ---

export interface HeroSection {
    type: "hero";
    hero: ProductHeroData;
}

export interface FaqsSection {
    type: "faqs";
    faqs: FAQ[];
}

export interface BenefitsSection {
    type: "benefits";
    benefits: ProductBenefits | null;
}

export interface ReviewImagesSection {
    type: "review_images";
    reviews_gallery: ReviewImage[];
}

export interface ReviewVideosSection {
    type: "review_videos";
    video_reviews: VideoReview[];
}

export interface HeadingSection {
    type: "heading";
    text: string;
    subtitle?: string;
    size?: "h1" | "h2" | "h3" | string;
    alignment?: "left" | "center" | "right" | string;
}

export interface RichTextSection {
    type: "rich_text";
    html: string;
}

export interface ImageSection {
    type: "image";
    image_url: string | null;
    alt?: string;
    link_url?: string;
}

export interface ButtonSection {
    type: "button";
    text: string;
    url: string;
    style?: "primary" | "secondary" | string;
    alignment?: "left" | "center" | "right" | string;
}

export interface GalleryImage {
    image_url: string;
    alt?: string;
    link_url?: string;
}

export interface GallerySection {
    type: "gallery";
    images: GalleryImage[];
}

export interface BundleItem {
    product_id: number;
    name: string | null;
    slug: string | null;
    image: string | null;
    variant_id: number | null;
    variant_name?: string | null;
    price: number;
    offer_price: number | null;
}

export interface BundleSection {
    type: "bundle";
    title: string;
    items: BundleItem[];
}

export type LandingSection =
    | HeroSection
    | FaqsSection
    | BenefitsSection
    | ReviewImagesSection
    | ReviewVideosSection
    | HeadingSection
    | RichTextSection
    | ImageSection
    | GallerySection
    | ButtonSection
    | BundleSection;

export interface SpinWheelSegment {
    id: number;
    label: string;
    color: string | null;
    sort_order: number;
}

export interface SpinWheelConfig {
    id: number;
    title: string;
    subtitle?: string | null;
    button_text: string;
    segments: SpinWheelSegment[];
}

export interface SpinResult {
    segment_id: number | null;
    label: string | null;
    color: string | null;
}
