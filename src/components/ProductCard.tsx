import { useState } from "react";
import { useNavigate } from "react-router";
import type { Product } from "../types/Product";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/features/cart/cartSlice";
import { addNotification } from "../store/features/notification/notificationSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  function handleSizeSelect(size: string) {
    setSelectedSize((prev) => (prev === size ? null : size));
  }

  function handleAddToCart() {
    if (!selectedSize) return;

    dispatch(addToCart({ product, size: selectedSize }));

    dispatch(
      addNotification({
        id: Date.now().toString(),
        message: `${product.name} added to cart!`,
        type: "success",
      }),
    );
  }

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="
        flex flex-col md:flex-row
        bg-surface border border-border rounded-2xl overflow-hidden
        max-w-lg
        md:h-72
        hover:bg-surface-hover transition-colors
        cursor-pointer group relative
      "
    >
      {/* Product Image */}
      <img
        src={product.mainImage}
        alt={product.name}
        className="
          w-full md:w-64
          h-56 md:h-full
          object-cover object-center
          shrink-0
        "
      />

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text leading-tight line-clamp-2 group-hover:text-primary transition-colors">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSizeSelect(size);
                    }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
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
