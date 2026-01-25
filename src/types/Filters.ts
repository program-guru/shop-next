export type SortOption = "price-asc" | "price-desc" | "rating-desc" | null;

export interface FilterState {
  searchQuery: string;
  brands: string[];
  categories: string[];
  sizes: string[];
  minRating: number | null;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: SortOption;
}