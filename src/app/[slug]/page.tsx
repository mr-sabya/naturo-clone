import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutSection from "@/components/landing/CheckoutSection";
import ImageGallerySection from "@/components/landing/ImageGallerySection";
import ProductCarousel from "@/components/home/ProductCarousel";
import CustomerReviewSlider from "@/components/landing/CustomerReviewSlider";
import VideoReviewSection from "@/components/landing/VideoReviewSection";
import ProductHero from "@/components/landing/ProductHero";
import ProductBenefitSection from "@/components/landing/ProductBenefitSection";
import FaqSection from "@/components/landing/FaqSection";
import LandingSections from "@/components/landing/LandingSections";
import { getSettings } from "@/lib/settings";
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

async function fetchProductBySlug(slug: string): Promise<{ product: Product | null; related: Product[] }> {
    try {
        const res = await fetch(`${API_BASE}/products/${slug}`, {
            headers: HEADERS,
            next: { revalidate: 120, tags: ["products", `product:${slug}`] },
        });
        if (!res.ok) return { product: null, related: [] };
        const data = await res.json();
        if (!data?.success) return { product: null, related: [] };
        return { product: data.product ?? null, related: Array.isArray(data.related) ? data.related : [] };
    } catch {
        return { product: null, related: [] };
    }
}

/**
 * 1. TYPES
 */
interface PageContent {
    title: string;
    lastUpdated?: string;
    description: string;
    content: React.ReactNode;
    category: string; // Added for professional tagging
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * 2. CONTENT DATA
 */
const contentMap: Record<string, PageContent> = {
    "privacy-policy": {
        category: "Legal Information",
        title: "Privacy Policy",
        description: "How Prakritiz protects and manages your personal data.",
        lastUpdated: "March 20, 2024",
        content: (
            <>
                <p>At <strong>Prakritiz</strong>, we prioritize the protection of our community. This policy outlines our commitment to transparency and nature-first data ethics.</p>
                <h2>1. Data Collection</h2>
                <p>We collect only the essential information required to deliver our organic products to your doorstep, such as your shipping address and contact details.</p>
                <h2>2. How We Use Data</h2>
                <p>Your data is used solely to enhance your experience. We never sell your personal information to third parties. Every byte of data is guarded with forest-grade security protocols.</p>
            </>
        ),
    },
    "terms-and-conditions": {
        category: "Legal Information",
        title: "Terms and Conditions",
        description: "The rules and regulations for using the Prakritiz platform.",
        content: (
            <>
                <p>By accessing <strong>Prakritiz</strong>, you agree to embrace a lifestyle of sustainability and respect for the natural origin of our products.</p>
                <h2>1. User Agreement</h2>
                <p>Users must be 18 years or older to purchase our organic botanical extracts. By using this site, you represent that you meet this requirement.</p>
                <h2>2. Intellectual Property</h2>
                <p>All nature-inspired photography and content on this site are the property of Prakritiz and protected by international copyright laws.</p>
            </>
        ),
    },
    "return-and-refund": {
        category: "Customer Care",
        title: "Return & Refund",
        description: "Our policy on returning nature-made organic goods.",
        content: (
            <>
                <p>We take pride in our quality. Because our products are organic and perishable, we maintain a strict but fair return policy to ensure safety for all customers.</p>
                <h2>1. Eligibility</h2>
                <p>If a product arrives damaged or incorrect, we offer a hassle-free 7-day return policy. Items must be in their original eco-friendly packaging.</p>
            </>
        ),
    },
    "how-to-order": {
        category: "Customer Care",
        title: "How to Order",
        description: "A step-by-step guide to ordering from Naturo.",
        content: (
            <>
                <p>Ordering with us is simple — no account required.</p>
                <h2>1. Browse & Select</h2>
                <p>Pick a product from the Shop page or a category, choose a variant if available, and set your quantity.</p>
                <h2>2. Checkout</h2>
                <p>Enter your name, mobile number, and delivery address. Choose your delivery area to see the shipping charge.</p>
                <h2>3. Confirm Your Order</h2>
                <p>Select Cash on Delivery or Online Payment and confirm. You&apos;ll get an order number right away — save it to track your order.</p>
                <h2>4. Delivery</h2>
                <p>Our representative will call to confirm your order before it ships. Pay on delivery if you chose Cash on Delivery.</p>
            </>
        ),
    },
    "faq": {
        category: "Customer Care",
        title: "FAQ",
        description: "Answers to common questions about ordering from Naturo.",
        content: (
            <>
                <h2>Are your products genuinely organic?</h2>
                <p>Yes — every product is sourced and processed to keep it free of synthetic additives.</p>
                <h2>How long does delivery take?</h2>
                <p>Inside Dhaka City, most orders arrive within 1-2 days. Outside Dhaka, delivery typically takes 2-4 business days.</p>
                <h2>Can I pay on delivery?</h2>
                <p>Yes, Cash on Delivery is available on every order alongside online payment.</p>
                <h2>How do I track my order?</h2>
                <p>Use the Order Tracking page with your order number and the mobile number you ordered with.</p>
                <h2>What if I&apos;m not satisfied with a product?</h2>
                <p>See our Return &amp; Refund policy — most items are eligible for return within 7 days in original packaging.</p>
            </>
        ),
    },
};

/**
 * 3. SEO METADATA
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = contentMap[slug];
    if (data) {
        return {
            title: `${data.title} | Prakritiz`,
            description: data.description,
        };
    }

    const { product } = await fetchProductBySlug(slug);
    if (product) {
        return {
            title: product.meta?.title || product.name,
            description: product.meta?.description || product.short_description || undefined,
        };
    }

    return { title: "Page Not Found" };
}

export async function generateStaticParams() {
    return Object.keys(contentMap).map((slug) => ({ slug }));
}

/**
 * 4. COMPONENT
 */
export default async function SlugPage({ params }: PageProps) {
    const { slug } = await params;
    const data = contentMap[slug];

    const settings = await getSettings();
    const headerFooterProps = {
        header: { logoUrl: settings.logo_url, siteName: settings.site_name },
        footer: {
            logoUrl: settings.logo_url,
            siteName: settings.site_name,
            footerDescription: settings.footer_description,
            footerPhone: settings.footer_phone,
            footerEmail: settings.footer_email,
            footerAddress: settings.footer_address,
            whatsappNumber: settings.whatsapp_number,
            socialFacebookUrl: settings.social_facebook_url,
            socialInstagramUrl: settings.social_instagram_url,
            socialYoutubeUrl: settings.social_youtube_url,
            copyrightText: settings.copyright_text,
        },
    };

    if (data) {
        return (
            <div className="min-h-screen bg-[#fffcf5] selection:bg-emerald-100 selection:text-emerald-900">
                <Header {...headerFooterProps.header} />
                <PolicyPage data={data} />
                <Footer {...headerFooterProps.footer} />
            </div>
        );
    }

    return <ProductLandingPage slug={slug} headerFooterProps={headerFooterProps} />;
}

function PolicyPage({ data }: { data: PageContent }) {
    return (
        <>
            {/* Header: Refined & Minimal */}
            <div className="bg-gray-50 py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                    <Link href="/" className="hover:text-naturoGreen">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{data.title}</span>
                </div>
            </div>

            {/* title */}
            <div className="text-center pt-16 px-6">
                <h1 className="text-4xl md:text-5xl font-serif font-semibold text-emerald-900 mb-4">
                    {data.title}
                </h1>
                {data.lastUpdated && (
                    <p className="text-sm text-gray-500 mb-6">
                        Last Updated: {data.lastUpdated}
                    </p>
                )}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {data.description}
                </p>
            </div>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-6 py-16 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 xl:gap-24">

                    {/* Article Section */}
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <article className="prose prose-emerald lg:prose-xl max-w-none
                            prose-headings:font-serif prose-headings:text-emerald-900 prose-headings:font-normal
                            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light
                            prose-strong:text-emerald-900 prose-strong:font-semibold
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6">
                            {data.content}
                        </article>
                    </section>

                    {/* Sidebar: Trust Card */}
                    <aside className="relative">
                        <div className="sticky top-32 space-y-6">
                            <div className="p-8 bg-white rounded-[2rem] border border-emerald-100 shadow-[0_20px_50px_rgba(0,77,44,0.05)] relative overflow-hidden group">
                                {/* Decorative leaf icon */}
                                <div className="absolute -top-4 -right-4 text-emerald-50 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                    <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,11 14,9 14,9C14,9 17.19,11.24 15,13C12.81,14.76 11,12 11,12C11,12 10.5,13.5 8.5,12.5C6.5,11.5 8,10 8,10C8,10 9,10.5 10.5,9C12,7.5 11,6 11,6C11,6 9,8 7,8C5,8 3,3 3,3C3,3 8,8 17,8Z" /></svg>
                                </div>

                                <h4 className="font-serif text-2xl text-emerald-900 mb-4">Questions?</h4>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed font-light">
                                    Our team is dedicated to ensuring you have a transparent and organic experience with us.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href="/contact-us"
                                        className="block w-full text-center bg-emerald-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 transition-all duration-300"
                                    >
                                        Message Support
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="block w-full text-center text-emerald-800 py-3 text-sm font-bold hover:text-emerald-600 transition-colors"
                                    >
                                        Browse FAQs
                                    </Link>
                                </div>
                            </div>

                            {/* Document Meta for Mobile */}
                            <div className="px-8 py-6 bg-emerald-900 rounded-[2rem] text-white">
                                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Prakritiz Guarantee</p>
                                <p className="text-xs text-emerald-100/70 leading-relaxed font-light">
                                    All policies are reviewed annually by our sustainability and legal board.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

interface HeaderFooterProps {
    header: { logoUrl?: string; siteName?: string };
    footer: {
        logoUrl?: string;
        siteName?: string;
        footerDescription?: string;
        footerPhone?: string;
        footerEmail?: string;
        footerAddress?: string;
        whatsappNumber?: string;
        socialFacebookUrl?: string;
        socialInstagramUrl?: string;
        socialYoutubeUrl?: string;
        copyrightText?: string;
    };
}

/**
 * Not a static policy slug — try it as a product/landing page slug instead.
 * Site Header/Footer are rendered here (not in a shared layout) specifically
 * so they can be turned off per-page via the admin's `show_header_footer`
 * flag on the landing page.
 */
async function ProductLandingPage({ slug, headerFooterProps }: { slug: string; headerFooterProps: HeaderFooterProps }) {
    const { product, related: similarProducts } = await fetchProductBySlug(slug);

    if (!product) notFound();

    // The root /{slug} URL is reserved for the ad-funnel landing page — a
    // product with none flagged (is_product_page) doesn't get a blank
    // landing-page shell here, it redirects to its permanent catalog page.
    if (!product.has_active_landing_page) {
        redirect(`/product/${slug}`);
    }

    const showChrome = product.show_header_footer !== false;
    const scrollToCheckout = "#checkout";

    return (
        <>
            {showChrome && <Header {...headerFooterProps.header} />}

            <div className="bg-[#fffcf5] min-h-screen scroll-smooth selection:bg-emerald-100">
                {/* Breadcrumbs — hidden along with the header/footer, since its
                    Home/Shop links would defeat a "focused" funnel page with
                    no other way to browse away */}
                {showChrome && (
                    <div className="bg-gray-50 py-3 border-b border-gray-100">
                        <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
                            <Link href="/" className="hover:text-emerald-700">Home</Link>
                            <ChevronRight size={14} />
                            <Link href="/shop" className="hover:text-emerald-700">Shop</Link>
                            <ChevronRight size={14} />
                            <span className="text-gray-900 font-medium truncate">{product.name}</span>
                        </div>
                    </div>
                )}

                {product.sections && product.sections.length > 0 ? (
                    // Admin-configured, ordered blocks from the landing page builder —
                    // includes hero/faqs/benefits/reviews plus heading/rich_text/image/button/bundle.
                    <LandingSections sections={product.sections} scrollToCheckoutHref={scrollToCheckout} />
                ) : (
                    // Fixed fallback layout for a product with no blocks configured —
                    // the same 5-ish-section layout naturo's PDP used to render inline.
                    <>
                        {product.hero && (
                            <ProductHero data={product.hero} scrollToCheckoutHref={scrollToCheckout} />
                        )}
                        <ImageGallerySection images={product.gallery ?? []} />
                        <FaqSection faqs={product.faqs ?? []} scrollToCheckoutHref={scrollToCheckout} />
                        <ProductBenefitSection benefitData={product.benefits} scrollToCheckoutHref={scrollToCheckout} />
                        <CustomerReviewSlider reviews={product.reviews_gallery ?? []} />
                        <VideoReviewSection videos={product.video_reviews ?? []} />
                    </>
                )}

                {/* Gallery (product's own images — always shown, independent of block order) */}
                {product.sections && product.sections.length > 0 && (
                    <ImageGallerySection images={product.gallery ?? []} />
                )}

                {/* Checkout */}
                <CheckoutSection product={product} />

                {product.show_related_products !== false && similarProducts.length > 0 && (
                    <ProductCarousel
                        title="Related Products"
                        products={similarProducts.map(normalizeProduct)}
                        viewAllLink="/shop"
                    />
                )}
            </div>

            {showChrome && <Footer {...headerFooterProps.footer} />}
        </>
    );
}
