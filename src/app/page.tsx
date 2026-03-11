import BannerSlider from "@/components/home/BannerSlider";
import CategorySlider from "@/components/home/CategorySlider";
import ProductCarousel from "@/components/home/ProductCarousel";

const bestSellers = [
    {
        id: 1,
        name: "সরিষা মধু | Mustard Honey",
        price: "1,050",
        originalPrice: "1,300",
        image: "/images/products/product_1.webp",
        slug: "mustard-honey-box"
    },
    {
        id: 2,
        name: "আম্বর আশহাব | Ambor Ashab",
        price: "2,250",
        originalPrice: "3,500",
        image: "/images/products/product_1.webp",
        slug: "ambor-ashab"
    },
    {
        id: 3,
        name: "মিসওয়াক পাউডার | Miswak Powder",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_1.webp",
        slug: "miswak-powder"
    },
    {
        id: 4,
        name: "মধুময় বাদাম | Honey Nut",
        price: "1,250",
        originalPrice: "1,700",
        image: "/images/products/product_1.webp",
        slug: "honey-nut"
    },
    {
        id: 5,
        name: "পিংক সল্ট | Pink Salt",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_1.webp",
        slug: "pink-salt"
    }
];

export default function Home() {
    return (
        <main>
            {/* 1. The Banner Slider */}
            <BannerSlider />
            <CategorySlider />
            {/* Best Sellers Section */}
            <ProductCarousel title="OUR BEST SELLERS" products={bestSellers} />

            {/* You can reuse the same component for other sections like "New Arrivals" */}
            <ProductCarousel
                title="Wellness"
                products={bestSellers}
                viewAllLink="/category/wellness"
            />
            {/* 2. Other Sections (Products, Categories, etc.) */}
            <div className="container mx-auto py-10">
                {/* Your Product Grid will go here */}
            </div>
        </main>
    );
}