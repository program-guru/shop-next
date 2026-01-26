import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, SortOption } from "../../../types/Filters";

const initialState: FilterState = {
	searchQuery: "",
	brands: [],
	categories: [],
	sizes: [],
	minRating: null,
	priceRange: {
		min: 0,
		max: 20000,
	},
	sortBy: null,
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},

		toggleBrand: (state, action: PayloadAction<string>) => {
			const brand = action.payload;
			if (state.brands.includes(brand)) {
				state.brands = state.brands.filter((b) => b !== brand);
			} else {
				state.brands.push(brand);
			}
		},

		toggleCategory: (state, action: PayloadAction<string>) => {
			const category = action.payload;
			if (state.categories.includes(category)) {
				state.categories = state.categories.filter(
					(c) => c !== category,
				);
			} else {
				state.categories.push(category);
			}
		},

		toggleSize: (state, action: PayloadAction<string>) => {
			const size = action.payload;
			if (state.sizes.includes(size)) {
				state.sizes = state.sizes.filter((s) => s !== size);
			} else {
				state.sizes.push(size);
			}
		},

		setPriceRange: (
			state,
			action: PayloadAction<{ min: number; max: number }>,
		) => {
			state.priceRange = action.payload;
		},

		setMinRating: (state, action: PayloadAction<number | null>) => {
			// If clicking the same rating, unselect it
			if (state.minRating === action.payload) {
				state.minRating = null;
			} else {
				state.minRating = action.payload;
			}
		},

		setSortBy: (state, action: PayloadAction<SortOption>) => {
			state.sortBy = action.payload;
		},

		resetFilters: () => initialState,
	},
});

export const {
	setSearchQuery,
	toggleBrand,
	toggleCategory,
	toggleSize,
	setPriceRange,
	setMinRating,
	setSortBy,
	resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
