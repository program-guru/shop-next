import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store"; 
import type { Product } from "../../../types/Product";

// 1. Input Selectors 
const selectAllProducts = (state: RootState) => state.products.items;
const selectFilterState = (state: RootState) => state.filters;

// 2. Memoized Selector 
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilterState],
  (products, filters) => {
    // FILTERING
    let result = products.filter((product: Product) => {
      // 1. Search Query 
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      // 2. Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false;
      }

      // 3. Categories 
      if (filters.categories.length > 0) {
        const hasCategory = product.category.some((cat) => 
          filters.categories.includes(cat)
        );
        if (!hasCategory) return false;
      }

      // 4. Price Range
      if (
        product.price < filters.priceRange.min || 
        product.price > filters.priceRange.max
      ) {
        return false;
      }

      // 5. Rating
      if (filters.minRating !== null) {
        if (product.rating < filters.minRating) return false;
      }

      // 6. Sizes (Check if product has stock in ANY of the selected sizes)
      if (filters.sizes.length > 0) {
        // Assuming product.stock is { "7": 10, "8": 0 }
        const hasSize = filters.sizes.some((size: string) => {
          const stockCount = product.stock[size];
          return stockCount && stockCount > 0;
        });
        if (!hasSize) return false;
      }

      return true;
    });

    // SORTING
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-desc":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return result;
  }
);

// Selector to get total count 
export const selectProductCount = createSelector(
  [selectFilteredProducts],
  (products) => products.length
);

// Selector to get loading status
export const selectProductStatus = (state: RootState) => state.products.status;

// Extract Unique Brands
export const selectUniqueBrands = createSelector(
  [selectAllProducts],
  (products) => {
    const brands = products.map((p) => p.brand);
    return [...new Set(brands)].sort();
  }
);

// Extract Unique Categories
export const selectUniqueCategories = createSelector(
  [selectAllProducts],
  (products) => {
    const categories = products.flatMap((p) => p.category);
    return [...new Set(categories)].sort();
  }
);

// 3. Extract Unique Sizes from Stock Objects
export const selectUniqueSizes = createSelector(
  [selectAllProducts],
  (products) => {
    const allSizes = products.flatMap((p) => 
      p.stock ? Object.keys(p.stock) : []
    );
    
    return [...new Set(allSizes)].sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      // If both are numbers, subtract to sort numerically
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      // Otherwise use string comparison
      return a.localeCompare(b);
    });
  }
);