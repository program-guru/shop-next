import { useState, useMemo, useEffect } from "react";
import { ChevronRight, X, Search, ChevronDown, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
	setSearchQuery,
	toggleBrand,
	toggleCategory,
	toggleSize,
	setPriceRange,
	setMinRating,
	setSortBy,
	resetFilters,
} from "../store/features/filters/filterSlice";
import {
	selectUniqueBrands,
	selectUniqueCategories,
	selectUniqueSizes,
} from "../store/features/products/productSelectors";
import type { SortOption } from "../types/Filters";

export default function Sidebar() {
	const dispatch = useAppDispatch();

	// Read Global State from Redux
	const {
		searchQuery,
		brands: selectedBrands,
		categories: selectedCategories,
		sizes: selectedSizes,
		minRating,
		priceRange,
		sortBy,
	} = useAppSelector((state) => state.filters);

	// Read Dynamic Data Options (Derived from Product List)
	const availableBrands = useAppSelector(selectUniqueBrands);
	const availableCategories = useAppSelector(selectUniqueCategories);
	const availableSizes = useAppSelector(selectUniqueSizes);

	// Local UI State
	const [isOpen, setIsOpen] = useState(false);
	const [hoverRating, setHoverRating] = useState<number | null>(null);
	const [localPrice, setLocalPrice] = useState(priceRange);
	const [localSearch, setLocalSearch] = useState(searchQuery);

	useEffect(() => {
		// Debounce search input by 500ms
		const handler = setTimeout(() => {
			dispatch(setSearchQuery(localSearch));
		}, 500);

		return () => clearTimeout(handler);
	}, [localSearch, dispatch]);

	// Sync local state if Redux changes 
	useEffect(() => {
		setLocalSearch(searchQuery);
	}, [searchQuery]);

	const MIN_PRICE_LIMIT = 0;
	const MAX_PRICE_LIMIT = 20000;

	useEffect(() => {
		// Debounce price range updates by 300ms
		const handler = setTimeout(() => {
			if (
				localPrice.min !== priceRange.min ||
				localPrice.max !== priceRange.max
			) {
				dispatch(setPriceRange(localPrice));
			}
		}, 300);

		return () => clearTimeout(handler);
	}, [localPrice, dispatch, priceRange]);

	// Sync local state if Redux changes 
	useEffect(() => {
		setLocalPrice(priceRange);
	}, [priceRange]);

	// Visual Helper: Sort selected chips to the top
	function sortChips(items: string[], selected: string[]) {
		return [...items].sort((a, b) => {
			const aSelected = selected.includes(a);
			const bSelected = selected.includes(b);
			if (aSelected === bSelected) return a.localeCompare(b);
			return aSelected ? -1 : 1;
		});
	}

	const sortedBrands = useMemo(
		() => sortChips(availableBrands, selectedBrands),
		[availableBrands, selectedBrands],
	);
	const sortedCategories = useMemo(
		() => sortChips(availableCategories, selectedCategories),
		[availableCategories, selectedCategories],
	);

	// Handlers for Local Price State
	function handleMinPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Math.min(Number(e.target.value), localPrice.max - 500);
		setLocalPrice((prev) => ({ ...prev, min: value }));
	}

	function handleMaxPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Math.max(Number(e.target.value), localPrice.min + 500);
		setLocalPrice((prev) => ({ ...prev, max: value }));
	}

	return (
		<>
			{/* Mobile Toggle Tab */}
			<button
				onClick={() => setIsOpen(true)}
				className={`
          md:hidden fixed left-0 top-24 z-40 
          bg-primary text-text-inverse 
          py-3 pl-2 pr-4 
          rounded-r-lg shadow-md border-y border-r border-white/20
          hover:bg-primary-dark active:scale-95 transition-all duration-300 ease-in-out
          ${isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
        `}
				aria-label="Open filters"
			>
				<ChevronRight className="w-5 h-5" strokeWidth={3} />
			</button>

			{/* Backdrop */}
			{isOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/60 z-55 backdrop-blur-sm transition-opacity"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          fixed md:sticky top-0 md:top-24 
          h-dvh md:h-[calc(100vh-8rem)] 
          w-[85vw] max-w-sm md:w-72 
          bg-surface border-r md:border border-border 
          md:rounded-2xl shadow-2xl md:shadow-sm 
          z-60 md:z-30 overflow-hidden
          transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          left-0
        `}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface shrink-0">
					<h2 className="font-heading font-semibold text-base text-text">
						Filters
					</h2>
					<div className="flex items-center gap-4">
						<button
							className="text-xs font-medium text-primary hover:text-primary-dark underline"
							onClick={() => dispatch(resetFilters())}
						>
							Reset
						</button>
						<button
							onClick={() => setIsOpen(false)}
							className="md:hidden p-1 rounded-full hover:bg-surface-hover text-text-muted transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Scrollable Content */}
				<div
					className="
          p-4 space-y-5 overflow-y-auto flex-1
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]
        "
				>
					{/* 1. Search */}
					<div className="space-y-2">
						<div className="relative">
							<input
								type="text"
								placeholder="Search..."
								value={localSearch}
								onChange={(e) =>
									setLocalSearch(e.target.value)
								}
								className="w-full pl-8 pr-3 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
							/>
							<Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-2.5" />
						</div>
					</div>

					<hr className="border-border/50" />

					{/* 2. Brands */}
					<div className="space-y-2">
						<label className="text-xs font-semibold text-text uppercase tracking-wider">
							Brands
						</label>
						<div className="flex flex-wrap gap-1.5">
							{sortedBrands.map((brand) => {
								const isSelected =
									selectedBrands.includes(brand);
								return (
									<button
										key={brand}
										onClick={() =>
											dispatch(
												toggleBrand(brand),
											)
										}
										className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all duration-200 ${
											isSelected
												? "bg-primary border-primary text-text-inverse shadow-sm"
												: "bg-surface border-border text-text hover:border-primary"
										}`}
									>
										{brand}
									</button>
								);
							})}
						</div>
					</div>

					{/* 3. Categories */}
					<div className="space-y-2">
						<label className="text-xs font-semibold text-text uppercase tracking-wider">
							Category
						</label>
						<div className="flex flex-wrap gap-1.5">
							{sortedCategories.map((cat) => {
								const isSelected =
									selectedCategories.includes(cat);
								return (
									<button
										key={cat}
										onClick={() =>
											dispatch(
												toggleCategory(cat),
											)
										}
										className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all duration-200 ${
											isSelected
												? "bg-primary border-primary text-text-inverse shadow-sm"
												: "bg-surface border-border text-text hover:border-primary"
										}`}
									>
										{cat}
									</button>
								);
							})}
						</div>
					</div>

					<hr className="border-border/50" />

					{/* 4. Price Range */}
					<div className="space-y-3">
						<label className="text-xs font-semibold text-text uppercase tracking-wider">
							Price Range
						</label>

						{/* Indicators */}
						<div className="flex justify-between items-center text-xs font-medium text-text-muted">
							<span>
								₹{localPrice.min.toLocaleString()}
							</span>
							<span>
								₹{localPrice.max.toLocaleString()}
							</span>
						</div>

						{/* Slider Controls */}
						<div className="relative w-full h-6 flex items-center select-none touch-none">
							<input
								type="range"
								min={MIN_PRICE_LIMIT}
								max={MAX_PRICE_LIMIT}
								step={500}
								value={localPrice.min}
								onChange={handleMinPriceChange}
								className="absolute z-20 w-full h-2 opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4"
							/>
							<input
								type="range"
								min={MIN_PRICE_LIMIT}
								max={MAX_PRICE_LIMIT}
								step={500}
								value={localPrice.max}
								onChange={handleMaxPriceChange}
								className="absolute z-20 w-full h-2 opacity-0 cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4"
							/>

							{/* Track Background */}
							<div className="relative w-full h-1 bg-border rounded-lg z-10">
								<div
									className="absolute h-full bg-primary rounded-lg"
									style={{
										left: `${(localPrice.min / MAX_PRICE_LIMIT) * 100}%`,
										right: `${100 - (localPrice.max / MAX_PRICE_LIMIT) * 100}%`,
									}}
								></div>
							</div>

							{/* Visual Thumbs*/}
							<div
								className="absolute w-3.5 h-3.5 bg-white border-[1.5px] border-primary rounded-full shadow z-10 pointer-events-none"
								style={{
									left: `calc(${(localPrice.min / MAX_PRICE_LIMIT) * 100}% - 7px)`,
								}}
							></div>
							<div
								className="absolute w-3.5 h-3.5 bg-white border-[1.5px] border-primary rounded-full shadow z-10 pointer-events-none"
								style={{
									left: `calc(${(localPrice.max / MAX_PRICE_LIMIT) * 100}% - 7px)`,
								}}
							></div>
						</div>
					</div>

					<hr className="border-border/50" />

					{/* 5. Rating */}
					<div className="space-y-2">
						<div className="flex justify-between items-baseline">
							<label className="text-xs font-semibold text-text uppercase tracking-wider">
								Rating
							</label>
							{minRating && (
								<span className="text-[10px] text-text-muted">
									{minRating}+ Stars
								</span>
							)}
						</div>

						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => {
								const isFilled =
									(hoverRating || minRating || 0) >=
									star;
								return (
									<button
										key={star}
										onClick={() =>
											dispatch(
												setMinRating(star),
											)
										}
										onMouseEnter={() =>
											setHoverRating(star)
										}
										onMouseLeave={() =>
											setHoverRating(null)
										}
										className="p-0.5 focus:outline-none transition-transform hover:scale-110"
									>
										<Star
											className={`w-6 h-6 transition-colors duration-200 ${
												isFilled
													? "text-yellow-400"
													: "text-border"
											}`}
											fill={
												isFilled
													? "currentColor"
													: "none"
											}
											strokeWidth={1.5}
										/>
									</button>
								);
							})}
						</div>
					</div>

					<hr className="border-border/50" />

					{/* 6. Sizes */}
					<div className="space-y-2">
						<label className="text-xs font-semibold text-text uppercase tracking-wider">
							Sizes
						</label>
						<div className="grid grid-cols-4 gap-1.5">
							{availableSizes.map((size) => {
								const isSelected =
									selectedSizes.includes(size);
								return (
									<button
										key={size}
										onClick={() =>
											dispatch(
												toggleSize(size),
											)
										}
										className={`h-8 w-full rounded text-xs font-medium border transition-colors ${
											isSelected
												? "bg-primary border-primary text-text-inverse"
												: "bg-transparent border-border text-text hover:border-primary"
										}`}
									>
										{size}
									</button>
								);
							})}
						</div>
					</div>

					<hr className="border-border/50" />

					{/* 7. Sorting */}
					<div className="space-y-2 pb-20 md:pb-0">
						<label className="text-xs font-semibold text-text uppercase tracking-wider">
							Sort By
						</label>
						<div className="relative">
							<select
								value={sortBy || ""}
								onChange={(e) =>
									dispatch(
										setSortBy(
											e.target
												.value as SortOption,
										),
									)
								}
								className="w-full appearance-none py-1.5 pl-3 pr-8 bg-background border border-border rounded-md text-xs text-text focus:outline-none focus:border-primary cursor-pointer"
							>
								<option value="">Featured</option>
								<option value="price-asc">
									Price: Low to High
								</option>
								<option value="price-desc">
									Price: High to Low
								</option>
								<option value="rating-desc">
									Top Rated
								</option>
							</select>
							<ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-text-muted pointer-events-none" />
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
