import { useState } from "react";
import { Link } from "react-router";
import {
	ShoppingBag,
	Trash2,
	Plus,
	Minus,
	MapPin,
	CreditCard,
	ArrowLeft,
	Package,
} from "lucide-react";
import type { CartItem } from "../types/Cart";

interface CartProps {
	items: CartItem[];
	totalPrice: number;
	totalItems: number;
	onUpdateQuantity: (id: string, quantity: number) => void;
	onRemoveItem: (id: string) => void;
}

export default function Cart({
	items,
	totalPrice,
	totalItems,
	onUpdateQuantity,
	onRemoveItem,
}: CartProps) {
	const [showAddress, setShowAddress] = useState(false);

	// Derived Calculations
	const shipping = 0;
	const tax = Math.round(totalPrice * 0.02);
	const grandTotal = totalPrice + shipping + tax;

	// Empty Cart State
	if (items.length === 0) {
		return (
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
				<div className="flex justify-center mb-6">
					<div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface border-2 border-border rounded-full flex items-center justify-center">
						<ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-text-muted" />
					</div>
				</div>
				<h1 className="text-2xl sm:text-3xl font-heading font-semibold mb-3 sm:mb-4">
					Your Cart is Empty
				</h1>
				<p className="text-text-muted mb-6 sm:mb-8 text-sm sm:text-base">
					Looks like you haven't added anything to your cart yet.
				</p>
				<Link
					to="/products"
					className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-primary text-text-inverse font-medium hover:bg-primary-dark transition-colors text-sm sm:text-base"
				>
					<ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
					Start Shopping
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-16">
			{/* Back Button - Mobile */}
			<Link
				to="/products"
				className="lg:hidden inline-flex items-center gap-2 text-primary font-medium hover:underline mb-4 text-sm"
			>
				<ArrowLeft className="w-4 h-4" />
				Continue Shopping
			</Link>

			<div className="flex flex-col lg:flex-row gap-6 lg:gap-16 animate-in fade-in duration-500">
				{/* Cart Items List */}
				<div className="flex-1">
					<div className="flex items-center justify-between mb-4 sm:mb-6">
						<h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold">
							Shopping Cart
						</h1>
						<span className="text-xs sm:text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
							{totalItems}{" "}
							{totalItems === 1 ? "Item" : "Items"}
						</span>
					</div>

					{/* Header - Desktop Only */}
					<div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-text-muted font-medium text-sm pb-3 border-b border-border">
						<p>Product Details</p>
						<p className="text-center">Total</p>
						<p className="text-center">Action</p>
					</div>

					{/* Items */}
					<div className="flex flex-col">
						{items.map((item) => (
							<div
								key={item.cartItemId}
								className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center gap-3 sm:gap-4 py-4 sm:py-6 border-b border-border last:border-0"
							>
								{/* Product Info */}
								<div className="flex gap-3 sm:gap-4 items-start sm:items-center">
									<Link
										to={`/products/${item.product.id}`}
										className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg border border-border bg-surface overflow-hidden hover:opacity-80 transition-opacity"
									>
										<img
											src={
												item.product
													.mainImage
											}
											alt={item.product.name}
											className="w-full h-full object-cover"
										/>
									</Link>

									<div className="flex-1 min-w-0">
										<Link
											to={`/products/${item.product.id}`}
											className="font-medium text-sm sm:text-base text-text hover:text-primary transition-colors line-clamp-2 sm:line-clamp-1 block mb-1 sm:mb-2"
										>
											{item.product.name}
										</Link>

										<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-text-muted">
											<div className="flex items-center gap-1.5">
												<Package className="w-3.5 h-3.5" />
												<span className="font-medium text-text">
													{
														item.selectedSize
													}
												</span>
											</div>

											{/* Quantity Controls - Mobile */}
											<div className="flex items-center gap-2 md:hidden">
												<span>Qty:</span>
												<div className="flex items-center border border-border rounded-lg overflow-hidden">
													<button
														onClick={() =>
															onUpdateQuantity(
																item.cartItemId,
																Math.max(
																	1,
																	item.quantity -
																		1,
																),
															)
														}
														className="p-1.5 hover:bg-surface-hover transition-colors"
														disabled={
															item.quantity <=
															1
														}
													>
														<Minus className="w-3.5 h-3.5" />
													</button>
													<span className="px-3 py-1 text-sm font-medium min-w-10 text-center">
														{
															item.quantity
														}
													</span>
													<button
														onClick={() =>
															onUpdateQuantity(
																item.cartItemId,
																Math.min(
																	10,
																	item.quantity +
																		1,
																),
															)
														}
														className="p-1.5 hover:bg-surface-hover transition-colors"
														disabled={
															item.quantity >=
															10
														}
													>
														<Plus className="w-3.5 h-3.5" />
													</button>
												</div>
											</div>

											{/* Quantity Select - Desktop */}
											<div className="hidden md:flex items-center gap-2">
												<span>Qty:</span>
												<select
													value={
														item.quantity
													}
													onChange={(
														e,
													) =>
														onUpdateQuantity(
															item.cartItemId,
															Number(
																e
																	.target
																	.value,
															),
														)
													}
													className="bg-surface border border-border rounded px-2 py-1 text-sm outline-none focus:border-primary cursor-pointer"
												>
													{Array.from({
														length: 10,
													}).map(
														(
															_,
															i,
														) => (
															<option
																key={
																	i
																}
																value={
																	i +
																	1
																}
															>
																{i +
																	1}
															</option>
														),
													)}
												</select>
											</div>

											{/* Price - Mobile Only */}
											<p className="md:hidden font-semibold text-text text-sm">
												₹
												{(
													item.product
														.price *
													item.quantity
												).toLocaleString()}
											</p>
										</div>
									</div>

									{/* Remove Button - Mobile (Top Right) */}
									<button
										onClick={() =>
											onRemoveItem(
												item.cartItemId,
											)
										}
										className="md:hidden text-text-muted hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-full transition-colors shrink-0"
										aria-label="Remove item"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>

								{/* Price - Desktop */}
								<div className="hidden md:flex justify-center items-center">
									<p className="font-medium text-text">
										₹
										{(
											item.product.price *
											item.quantity
										).toLocaleString()}
									</p>
								</div>

								{/* Remove Action - Desktop */}
								<div className="hidden md:flex justify-center">
									<button
										onClick={() =>
											onRemoveItem(
												item.cartItemId,
											)
										}
										className="text-text-muted hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"
										aria-label="Remove item"
									>
										<Trash2 className="w-5 h-5" />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Continue Shopping Link - Desktop */}
					<Link
						to="/products"
						className="hidden lg:inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline text-sm"
					>
						<ArrowLeft className="w-4 h-4" />
						Continue Shopping
					</Link>
				</div>

				{/* Order Summary */}
				<div className="w-full lg:w-96 shrink-0">
					<div className="bg-surface border border-border rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
						<h2 className="text-lg sm:text-xl font-heading font-semibold mb-4">
							Order Summary
						</h2>

						<hr className="border-border mb-4 sm:mb-5" />

						{/* Address Selection */}
						<div className="mb-4 sm:mb-6">
							<div className="flex items-center gap-2 mb-2">
								<MapPin className="w-4 h-4 text-text-muted" />
								<p className="text-xs sm:text-sm font-medium uppercase text-text">
									Delivery Address
								</p>
							</div>

							<div className="relative flex justify-between items-center mt-2">
								<p className="text-text-muted text-xs sm:text-sm truncate flex-1 pr-2">
									No address found
								</p>
								<button
									onClick={() =>
										setShowAddress(!showAddress)
									}
									className="text-primary text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
								>
									Change
								</button>

								{showAddress && (
									<div className="absolute top-8 right-0 w-48 bg-surface border border-border rounded-lg text-sm shadow-xl z-10 animate-in fade-in zoom-in-95 duration-200">
										<button
											onClick={() =>
												setShowAddress(
													false,
												)
											}
											className="w-full text-left px-4 py-2 text-text hover:bg-surface-hover first:rounded-t-lg"
										>
											Mumbai, India
										</button>
										<button
											onClick={() =>
												setShowAddress(
													false,
												)
											}
											className="w-full text-left px-4 py-2 text-primary font-medium bg-primary/5 hover:bg-primary/10 last:rounded-b-lg"
										>
											+ Add address
										</button>
									</div>
								)}
							</div>

							{/* Payment Method */}
							<div className="flex items-center gap-2 mb-2 mt-4 sm:mt-6">
								<CreditCard className="w-4 h-4 text-text-muted" />
								<p className="text-xs sm:text-sm font-medium uppercase text-text">
									Payment Method
								</p>
							</div>

							<select className="w-full mt-2 px-3 py-2 bg-surface border border-border rounded-lg text-xs sm:text-sm outline-none focus:border-primary transition-colors">
								<option>Cash On Delivery</option>
								<option>UPI / Net Banking</option>
								<option>Credit Card</option>
							</select>
						</div>

						<hr className="border-border" />

						{/* Totals Breakdown */}
						<div className="mt-4 space-y-2 text-xs sm:text-sm text-text-muted">
							<p className="flex justify-between">
								<span>Subtotal</span>
								<span className="font-medium">
									₹{totalPrice.toLocaleString()}
								</span>
							</p>
							<p className="flex justify-between">
								<span>Shipping</span>
								<span className="text-success font-medium">
									Free
								</span>
							</p>
							<p className="flex justify-between">
								<span>Tax (2%)</span>
								<span className="font-medium">
									₹{tax.toLocaleString()}
								</span>
							</p>

							<div className="flex justify-between text-base sm:text-lg font-semibold text-text mt-4 pt-4 border-t border-border">
								<span>Total</span>
								<span>
									₹{grandTotal.toLocaleString()}
								</span>
							</div>
						</div>

						{/* Checkout CTA */}
						<button
							className="
                w-full mt-4 sm:mt-6 py-2.5 sm:py-3 rounded-lg
                font-medium text-sm sm:text-base text-text-inverse
                bg-linear-to-br from-primary to-primary-dark
                hover:-translate-y-0.5
                hover:shadow-[0_10px_20px_var(--color-primary)/30]
                transition-all active:scale-[0.98]
              "
						>
							Place Order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
