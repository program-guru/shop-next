import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router";
import type { Product } from "../types/Product";

interface Props {
	product: Product;
}

export default function ProductDetails({ product }: Props) {
	const navigate = useNavigate();

	// UI State
	const [activeImage, setActiveImage] = useState<string>(product.mainImage);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);

	// Derived Data
	const sizes = product.stock ? Object.keys(product.stock) : [];

	return (
		<div className="max-w-6xl mx-auto px-6 py-10 animate-in fade-in duration-500">
			{/* Breadcrumb */}
			<nav className="text-sm text-text-muted mb-6 flex items-center gap-2 flex-wrap">
				<Link to="/" className="hover:text-text transition-colors">
					Home
				</Link>
				/
				<Link
					to="/products"
					className="hover:text-text transition-colors"
				>
					Products
				</Link>
				/
				<span className="text-primary font-medium truncate max-w-60">
					{product.name}
				</span>
			</nav>

			{/* Back Button (Mobile) */}
			<button
				onClick={() => navigate(-1)}
				className="mb-6 flex items-center gap-2 text-sm font-medium text-text-muted cursor-pointer"
			>
				<ArrowLeft className="w-4 h-4" />
				Back
			</button>

			<div className="flex flex-col lg:flex-row gap-14">
				{/* Image Gallery */}
				<div className="flex flex-col sm:flex-row gap-4 lg:sticky lg:top-24 h-fit">
					{/* Main Image */}
					<div className="w-full sm:w-md aspect-square bg-surface border border-border rounded-2xl overflow-hidden relative group">
						<img
							src={activeImage}
							alt={product.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>

					{/* Thumbnails */}
					<div
						className="
              flex sm:flex-col gap-3
              overflow-x-auto sm:overflow-visible
              scrollbar-hide
            "
					>
						{product.images.map((img, idx) => {
							const isActive = img === activeImage;

							return (
								<button
									key={idx}
									onClick={() => setActiveImage(img)}
									className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border transition-all duration-200
                    ${
					isActive
						? "border-primary ring-2 ring-primary/20"
						: "border-border hover:border-primary/50"
				}
                  `}
								>
									<img
										src={img}
										alt={`View ${idx + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							);
						})}
					</div>
				</div>

				{/* Product Info */}
				<div className="flex-1">
					<div className="space-y-1">
						<h2 className="text-sm font-semibold text-primary uppercase tracking-wide">
							{product.brand}
						</h2>
						<h1 className="text-3xl md:text-4xl font-heading font-semibold leading-tight text-text">
							{product.name}
						</h1>
					</div>

					{/* --- NEW: Category Chips --- */}
					<div className="flex flex-wrap gap-2 mt-4">
						{product.category.map((cat, idx) => (
							<span
								key={idx}
								className="
                  inline-flex items-center px-2.5 py-0.5 rounded-full 
                  text-xs font-medium 
                  bg-primary/10 text-primary border border-primary/20
                "
							>
								{cat}
							</span>
						))}
					</div>

					{/* Rating */}
					<div className="flex items-center gap-1 mt-4">
						<div className="flex">
							{Array.from({ length: 5 }).map((_, i) => (
								<span
									key={i}
									className={`text-lg ${
										i < Math.floor(product.rating)
											? "text-warning" // Make sure 'text-warning' is defined in your tailwind config or use 'text-yellow-400'
											: "text-border"
									}`}
								>
									★
								</span>
							))}
						</div>
						<span className="ml-2 text-sm text-text-muted font-medium">
							({product.rating} / 5.0)
						</span>
					</div>

					{/* Price */}
					<div className="mt-8 p-4 bg-surface rounded-xl border border-border inline-block min-w-52">
						<p className="text-sm text-text-muted mb-1">
							Price
						</p>
						<div className="flex items-baseline gap-2">
							<span className="text-3xl font-bold text-text">
								₹{product.price.toLocaleString()}
							</span>
						</div>
						<p className="text-xs text-success mt-1 font-medium">
							Inclusive of all taxes
						</p>
					</div>

					{/* Size Selector */}
					{sizes.length > 0 && (
						<div className="mt-8">
							<p className="text-sm font-medium text-text mb-3">
								Select Size
							</p>

							<div className="flex flex-wrap gap-3">
								{sizes.map((size) => {
									const isSelected =
										selectedSize === size;
									const stock = product.stock[size];
									const isOutOfStock = stock === 0;

									return (
										<button
											key={size}
											disabled={isOutOfStock}
											onClick={() =>
												setSelectedSize(
													isSelected
														? null
														: size,
												)
											}
											className={`
                        w-12 h-12 rounded-lg border text-sm font-medium
                        flex items-center justify-center transition-all duration-200
                        ${
						isOutOfStock
							? "bg-surface-hover/50 text-text-muted opacity-50 cursor-not-allowed border-dashed"
							: isSelected
								? "border-primary bg-primary text-text-inverse shadow-lg shadow-primary/25 scale-105"
								: "border-border text-text hover:border-primary hover:bg-surface-hover"
					}
                      `}
										>
											{size}
										</button>
									);
								})}
							</div>
						</div>
					)}

					{/* Description */}
					<div className="mt-8 prose prose-sm text-text-muted">
						<h3 className="text-text font-medium text-base mb-2">
							Description
						</h3>
						<p className="leading-relaxed">
							{product.description}
						</p>
					</div>

					{/* Actions */}
					<div className="mt-10 flex gap-4">
						<button
							disabled={sizes.length > 0 && !selectedSize}
							className="
                flex-1 py-3.5 rounded-xl font-medium
                bg-surface border border-border shadow-sm
                hover:bg-surface-hover hover:border-primary/50
                text-text transition-all active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
						>
							Add to cart
						</button>

						<button
							disabled={sizes.length > 0 && !selectedSize}
							className="
                flex-2 py-3.5 rounded-xl font-medium text-text-inverse
                bg-primary shadow-lg shadow-primary/25
                hover:bg-primary-dark transition-all active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
              "
						>
							Buy Now
						</button>
					</div>

					{sizes.length > 0 && !selectedSize && (
						<p className="mt-3 text-xs text-danger animate-pulse">
							Please select a size to proceed
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
