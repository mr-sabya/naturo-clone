import ProductHero from "./ProductHero";
import ProductBenefitSection from "./ProductBenefitSection";
import FaqSection from "./FaqSection";
import CustomerReviewSlider from "./CustomerReviewSlider";
import VideoReviewSection from "./VideoReviewSection";
import HeadingBlock from "./HeadingBlock";
import RichTextBlock from "./RichTextBlock";
import ImageBlock from "./ImageBlock";
import GalleryBlock from "./GalleryBlock";
import ButtonBlock from "./ButtonBlock";
import BundleBlock from "./BundleBlock";
import type { LandingSection } from "@/types";

interface LandingSectionsProps {
    sections: LandingSection[];
    scrollToCheckoutHref: string;
}

/**
 * Renders the admin-configured, ordered block list from the landing page
 * builder (ProductLandingResource `sections`) — the 5 original section
 * types reuse their existing components untouched; heading/rich_text/
 * image/gallery/button/bundle are new. Falls back to nothing if a block's
 * data is empty (each leaf component already no-ops on empty content).
 */
export default function LandingSections({ sections, scrollToCheckoutHref }: LandingSectionsProps) {
    return (
        <>
            {sections.map((section, index) => {
                const key = `${section.type}-${index}`;

                switch (section.type) {
                    case "hero":
                        return <ProductHero key={key} data={section.hero} scrollToCheckoutHref={scrollToCheckoutHref} />;
                    case "faqs":
                        return <FaqSection key={key} faqs={section.faqs} scrollToCheckoutHref={scrollToCheckoutHref} />;
                    case "benefits":
                        return <ProductBenefitSection key={key} benefitData={section.benefits} scrollToCheckoutHref={scrollToCheckoutHref} />;
                    case "review_images":
                        return <CustomerReviewSlider key={key} reviews={section.reviews_gallery} />;
                    case "review_videos":
                        return <VideoReviewSection key={key} videos={section.video_reviews} />;
                    case "heading":
                        return <HeadingBlock key={key} {...section} />;
                    case "rich_text":
                        return <RichTextBlock key={key} {...section} />;
                    case "image":
                        return <ImageBlock key={key} {...section} />;
                    case "gallery":
                        return <GalleryBlock key={key} {...section} />;
                    case "button":
                        return <ButtonBlock key={key} {...section} />;
                    case "bundle":
                        return <BundleBlock key={key} {...section} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}
