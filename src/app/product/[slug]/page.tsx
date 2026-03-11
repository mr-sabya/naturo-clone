import ProductDetails from "./ProductDetails";

export function generateStaticParams() {
    return [
        { slug: "seed-shorbot" },
        { slug: "honey" },
        { slug: "nuts" },
        { slug: "ghee" },
        { slug: "oil" },
        { slug: "turmeric" },
    ];
}

export default function Page({
    params,
}: {
    params: { slug: string };
}) {
    return <ProductDetails slug={params.slug} />;
}