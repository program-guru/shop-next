import { useState } from "react";
import type { Product } from "../types/Product";

export default function ProductCard({ product }: { product: Product }) {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);

  function handleSizeSelect(size: string) {
    if (selectedSize === size) {
      setSelectedSize(null);
      return;
    }

    setSelectedSize(size);
  }

	return (
		<div className="flex flex-col md:flex-row bg-surface border border-border rounded-2xl overflow-hidden max-w-lg hover:bg-surface-hover transition-colors">

			{/* Product Image */}
			<img
				className="w-full md:w-64 h-80 object-cover object-top"
				src={product.mainImage}
				alt={product.name}
			/>

			{/* Content */}
			<div className="p-5 flex flex-col justify-between">
				<div>
					<div className="flex items-start justify-between gap-3">
						<h3 className="text-lg font-heading font-semibold text-text leading-tight">
							{product.name}
						</h3>
					</div>

					<p className="mt-2 text-sm text-text-muted">
						{product.description}
					</p>

					<p className="mt-4 text-xl font-semibold text-text">
						₹{product.price.toLocaleString()}
					</p>

					{/* Size Selector */}
					<div className="mt-5 flex flex-wrap items-center gap-3">
						{product.stock && Object.keys(product.stock).map((size) => {
							const isSelected = selectedSize === size;

							return (
								<button
									key={size}
									type="button"
									onClick={() => handleSizeSelect(size)}
									className={`relative flex items-center justify-center w-9 h-9 rounded-full border text-sm font-medium transition-all
										${isSelected
											? "border-primary bg-primary/10 text-primary"
											: "border-border text-text-muted hover:border-primary"
										}`}
									aria-pressed={isSelected}
								>
									{size}
								</button>
							);
						})}
					</div>
				</div>

				{/* CTA */}
				<button
					className="mt-6 w-full py-2.5 rounded-lg text-sm font-medium text-text-inverse
						bg-linear-to-br from-primary to-primary-dark
						transition-all hover:-translate-y-0.5
						hover:shadow-[0_10px_20px_var(--color-primary)/30]
						disabled:opacity-50 disabled:pointer-events-none"
					disabled={!selectedSize}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}
