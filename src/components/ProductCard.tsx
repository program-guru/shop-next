import { useState } from "react";
import type { Product } from "../types/Product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  function handleSizeSelect(size: string) {
    setSelectedSize((prev) => (prev === size ? null : size));
  }

  return (
    <div
      className="
        flex flex-col md:flex-row
        bg-surface border border-border rounded-2xl overflow-hidden
        max-w-lg
        h-88 md:h-72
        hover:bg-surface-hover transition-colors
      "
    >
      {/* Product Image */}
      <img
        src={product.mainImage}
        alt={product.name}
        className="
          w-full md:w-64
          h-64 md:h-full
          object-cover object-top
          shrink-0
        "
      />

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full flex-1">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text leading-tight line-clamp-2">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-text-muted line-clamp-2">
            {product.description}
          </p>

          <p className="mt-4 text-xl font-semibold text-text">
            ₹{product.price.toLocaleString()}
          </p>

          {/* Size Selector */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {product.stock &&
              Object.keys(product.stock).map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    aria-pressed={isSelected}
                    className={`
                      w-9 h-9 rounded-full
                      border text-xs font-medium
                      transition-all
                      ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-text-muted hover:border-primary"
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!selectedSize}
          className="
            mt-6 w-full py-2.5 rounded-lg
            text-sm font-medium text-text-inverse
            bg-linear-to-br from-primary to-primary-dark
            transition-all
            hover:-translate-y-0.5
            hover:shadow-[0_10px_20px_var(--color-primary)/30]
            disabled:opacity-50
            disabled:pointer-events-none
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
