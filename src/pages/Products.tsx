import FilterSideBar from "../components/FilterSideBar";
import ProductCard from "../components/ProductCard";
import ProductsData from "../data/products.json";
import type { Product } from "../types/Product";

export default function Products() {
	const products: Product[] = ProductsData as Product[];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-8 items-start relative">
				<FilterSideBar />

				<main className="flex-1 w-full">
					<div className="mb-6">
						<p className="text-text-muted text-sm">
							{products.length} results found
						</p>
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
