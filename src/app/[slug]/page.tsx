import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";

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
};

/** 
 * 3. SEO METADATA
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = contentMap[slug];
    return {
        title: data ? `${data.title} | Prakritiz` : "Page Not Found",
        description: data?.description || "Nature-inspired organic living.",
    };
}

export async function generateStaticParams() {
    return Object.keys(contentMap).map((slug) => ({ slug }));
}

/** 
 * 4. COMPONENT
 */
export default async function DynamicPolicyPage({ params }: PageProps) {
    const { slug } = await params;
    const data = contentMap[slug];

    if (!data) notFound();

    return (
        <div className="min-h-screen bg-[#fffcf5] selection:bg-emerald-100 selection:text-emerald-900">
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

            {/* Aesthetic Footer Branding */}
            <footer className="bg-white py-24 border-t border-emerald-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-12 h-px bg-emerald-100" />
                        <div className="text-3xl grayscale opacity-30">🌿</div>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.4em]">
                            Rooted in Nature • Grown with Integrity
                        </p>
                        <p className="text-gray-300 text-[10px] font-light max-w-xs">
                            © 2024 Prakritiz Organic Solutions. All rights reserved. Nature is our only shareholder.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}