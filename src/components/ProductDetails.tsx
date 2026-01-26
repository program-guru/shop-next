import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/features/cart/cartSlice";
import type { Product } from "../types/Product";
import { addNotification } from "../store/features/notification/notificationSlice";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = product.stock ? Object.keys(product.stock) : [];

  function handleAddToCart() {
    if (!selectedSize) return;

    // Add to Cart
    dispatch(addToCart({ product, size: selectedSize }));

    // Show Success Toast
    dispatch(
      addNotification({
        id: Date.now().toString(),
        message: `Added ${product.name} (Size ${selectedSize}) to cart`,
        type: "success",
      }),
    );

    setSelectedSize(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 min-h-[calc(100vh-4rem)]">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-4 flex flex-wrap gap-2">
        <Link to="/" className="hover:text-text">
          Home
        </Link>{" "}
        /
        <Link to="/products" className="hover:text-text">
          Products
        </Link>{" "}
        /
        <span className="text-primary font-medium truncate max-w-60">
          {product.name}
        </span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-text-muted"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex gap-3 items-start">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2 shrink-0">
            {product.images.map((img, idx) => {
              const isActive = img === activeImage;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square w-14 sm:w-16 border rounded overflow-hidden
                    ${
                      isActive
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Main Image */}
          <div className="flex-1 max-h-[60vh] aspect-square bg-surface border border-border rounded-xl overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 text-left flex flex-col justify-start">
          <h1 className="text-3xl font-heading font-semibold">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-base ${
                  i < Math.floor(product.rating)
                    ? "text-warning"
                    : "text-border"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-text-muted">
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-text-muted text-sm">MRP:</p>
            <p className="text-2xl font-semibold">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-xs text-success">Inclusive of all taxes</p>
          </div>

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const isOutOfStock = product.stock[size] === 0;

                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(isSelected ? null : size)}
                      className={`w-10 h-10 rounded border text-sm
                        ${
                          isOutOfStock
                            ? "opacity-40 cursor-not-allowed"
                            : isSelected
                              ? "bg-primary text-text-inverse border-primary"
                              : "border-border hover:border-primary"
                        }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-6 text-sm text-text-muted max-w-md">
            <p>{product.description}</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              disabled={sizes.length > 0 && !selectedSize}
              className="flex-1 py-3 rounded-lg border bg-surface hover:bg-surface-hover disabled:opacity-50"
              onClick={(event) => {
                event.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to cart
            </button>

            <button
              disabled={sizes.length > 0 && !selectedSize}
              className="flex-1 py-3 rounded-lg bg-primary text-text-inverse hover:bg-primary-dark disabled:opacity-50"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
