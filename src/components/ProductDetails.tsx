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
  const [sizeError, setSizeError] = useState(false);

  const sizes = product.stock ? Object.keys(product.stock) : [];

  function handleAddToCart() {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return false;
    }

    // Add to Cart
    dispatch(addToCart({ product, size: selectedSize || "" }));

    // Show Success Toast
    dispatch(
      addNotification({
        id: Date.now().toString(),
        message: `Added ${product.name} ${selectedSize ? `(Size ${selectedSize})` : ''} to cart`,
        type: "success",
      }),
    );

    setSelectedSize(null);
    setSizeError(false);

    return true;
  }

  function handleBuyNow() {
    if(handleAddToCart()) {
      navigate("/cart");
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Breadcrumb - Hidden on mobile */}
        <nav className="hidden sm:flex text-sm text-text-muted mb-4 flex-wrap gap-2">
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
          className="mb-4 flex items-center gap-2 text-sm text-text-muted hover:text-text"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="w-full lg:flex-1">
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              {/* Main Image - Shows first on mobile */}
              <div className="w-full sm:flex-1 order-1 sm:order-2">
                <div className="aspect-square bg-surface border border-border rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnails - Horizontal scroll on mobile, vertical on desktop */}
              <div className="flex sm:flex-col gap-2 shrink-0 order-2 sm:order-1 overflow-x-auto sm:overflow-visible w-full sm:w-auto pb-2 sm:pb-0">
                {product.images.map((img, idx) => {
                  const isActive = img === activeImage;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-square w-16 sm:w-14 md:w-16 border rounded overflow-hidden shrink-0
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
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:flex-1 text-left flex flex-col justify-start">
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold">
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
              <p className="text-xl sm:text-2xl font-semibold">
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
                        onClick={() => {
                          setSelectedSize(isSelected ? null : size);
                          setSizeError(false);
                        }}
                        className={`w-12 h-12 sm:w-10 sm:h-10 rounded border text-sm font-medium
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
                {sizeError && (
                  <p className="text-sm text-red-500 mt-2">
                    Please select a size before adding to cart
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mt-6 text-sm text-text-muted">
              <p>{product.description}</p>
            </div>

            {/* Actions - Fixed at bottom on mobile */}
            <div className="mt-8 lg:mt-auto">
              <div className="flex gap-3 sm:gap-4">
                <button
                  className="flex-1 py-3 sm:py-3 rounded-lg border bg-surface hover:bg-surface-hover text-sm sm:text-base font-medium"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart();
                  }}
                >
                  Add to cart
                </button>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleBuyNow();
                  }}
                  className="flex-1 py-3 sm:py-3 rounded-lg bg-primary text-text-inverse hover:bg-primary-dark text-sm sm:text-base font-medium"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}