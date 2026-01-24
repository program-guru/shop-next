import Features from "../components/Features";
import Carousel from "../components/Carousel";
import ProductsData from "../data/products.json";
import type { Product } from "../types/Product";
import ProductFAQ from "../components/ProductFAQ";

export default function Home() {
	const allProducts: Product[] = ProductsData as Product[];
	const filteredProducts: Product[] = allProducts.filter(
		(product) => product.isFeatured,
	);

	return (
		<div className="space-y-12">
			<Carousel products={filteredProducts} autoSlideInterval={3000} />
			<Features />
			<ProductFAQ />
		</div>
	);
}
