import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import FilterSideBar from "../components/FilterSideBar";
import ProductCard from "../components/ProductCard";

// Redux Integration
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/features/products/productSlice";
import { 
  selectFilteredProducts, 
  selectProductStatus 
} from "../store/features/products/productSelectors";

export default function Products() {
  const dispatch = useAppDispatch();
  
  // 1. Select Data from Store (Memoized)
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(selectProductStatus);
  const error = useAppSelector((state) => state.products.error);

  // 2. Fetch Data on Mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        <FilterSideBar />

        <main className="flex-1 w-full min-h-125">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-text-muted text-sm">
              {status === 'loading' 
                ? 'Updating results...' 
                : `${products.length} results found`
              }
            </p>
          </div>

          {/* STATE: Loading */}
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-text-muted">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p>Loading curated products...</p>
            </div>
          )}

          {/* STATE: Error */}
          {status === "failed" && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">Failed to load products</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* STATE: Empty (No matches for filter) */}
          {status === "succeeded" && products.length === 0 && (
            <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-border">
              <p className="text-lg font-medium text-text">No products found</p>
              <p className="text-text-muted mt-1">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* STATE: Success (Grid) */}
          {status === "succeeded" && products.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}