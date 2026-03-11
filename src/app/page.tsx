import AllProducts from "../components/home/AllProducts";
import BannerSlider from "../components/home/BannerSlider";
import CategorySlider from "../components/home/CategorySlider";
import ProductCarousel from "../components/home/ProductCarousel";
import WeCare from "../components/home/WeCare";

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
        image: "/images/products/product_2.webp",
        slug: "ambor-ashab"
    },
    {
        id: 3,
        name: "মিসওয়াক পাউডার | Miswak Powder",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_3.webp",
        slug: "miswak-powder"
    },
    {
        id: 4,
        name: "মধুময় বাদাম | Honey Nut",
        price: "1,250",
        originalPrice: "1,700",
        image: "/images/products/product_4.webp",
        slug: "honey-nut"
    },
    {
        id: 5,
        name: "পিংক সল্ট | Pink Salt",
        price: "550",
        originalPrice: "800",
        image: "/images/products/product_5.webp",
        slug: "pink-salt"
    }
];

const allProductsData = [
    {
        id: 1,
        name: "শুক্রপুষ্টি | Sukro Pusti",
        price: "1,500",
        originalPrice: "2,250",
        image: "/images/products/product_5.webp",
        slug: "sukro-pusti"
    },
    {
        id: 2,
        name: "হজম বুস্টার | Hojom Booster",
        price: "680",
        originalPrice: "850",
        image: "/images/products/product_5.webp",
        slug: "hojom-booster"
    },
    // ... add all 10 products here
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

            <AllProducts products={allProductsData} />

            {/* Best Sellers Section */}
            <ProductCarousel title="Recently Viewed" products={bestSellers} />

            <WeCare />

        
        </main>
    );
}