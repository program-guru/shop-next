import { useState } from "react";
import { Link } from "react-router"; 
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
  onRemoveItem 
}: CartProps) {
  const [showAddress, setShowAddress] = useState(false);

  // Derived Calculations
  const shipping = 0; 
  const tax = Math.round(totalPrice * 0.02); 
  const grandTotal = totalPrice + shipping + tax;

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-heading font-semibold mb-4">Your Cart is Empty</h1>
        <p className="text-text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="inline-block px-8 py-3 rounded-xl bg-primary text-text-inverse font-medium hover:bg-primary-dark transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16 animate-in fade-in duration-500">
      {/* Cart Items List */}
      <div className="flex-1">
        <h1 className="text-3xl font-heading font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary font-medium">
            {totalItems} Items
          </span>
        </h1>

        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-text-muted font-medium pb-3 border-b border-border">
          <p>Product Details</p>
          <p className="text-center">Total</p>
          <p className="text-center">Action</p>
        </div>

        {/* Items */}
        <div className="flex flex-col">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center gap-4 py-6 border-b border-border last:border-0"
            >
              {/* Product Info */}
              <div className="flex gap-4 items-center">
                <Link to={`/products/${item.product.id}`} className="w-24 h-24 shrink-0 rounded-lg border border-border bg-surface overflow-hidden hover:opacity-80 transition-opacity">
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div>
                  <Link to={`/products/${item.product.id}`} className="font-medium text-text hover:text-primary transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <div className="text-text-muted text-sm mt-1 space-y-1">
                    <p>
                      Size:{" "}
                      <span className="font-medium text-text">{item.selectedSize}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <span>Qty:</span>
                      <select 
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.cartItemId, Number(e.target.value))}
                        className="bg-surface border border-border rounded px-2 py-1 outline-none focus:border-primary cursor-pointer"
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="flex justify-between md:justify-center items-center">
                <span className="md:hidden text-text-muted text-sm">Total:</span>
                <p className="font-medium text-text">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Remove Action */}
              <div className="flex justify-center">
                <button 
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="text-text-muted hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping Link */}
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:underline">
          ← Continue Shopping
        </Link>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-96 shrink-0 bg-surface border border-border rounded-xl p-6 h-fit sticky top-24">
        <h2 className="text-xl font-heading font-semibold mb-4">
          Order Summary
        </h2>

        <hr className="border-border mb-5" />

        {/* Address Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-text">
            Delivery Address
          </p>

          <div className="relative flex justify-between mt-2">
            <p className="text-text-muted text-sm truncate max-w-37.5">
              No address found
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-8 right-0 w-48 bg-surface border border-border rounded-lg text-sm shadow-xl z-10 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setShowAddress(false)}
                  className="w-full text-left px-4 py-2 text-text hover:bg-surface-hover first:rounded-t-lg"
                >
                  Mumbai, India
                </button>
                <button
                  onClick={() => setShowAddress(false)}
                  className="w-full text-left px-4 py-2 text-primary font-medium bg-primary/5 hover:bg-primary/10 last:rounded-b-lg"
                >
                  + Add address
                </button>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <p className="text-sm font-medium uppercase text-text mt-6">
            Payment Method
          </p>

          <select className="w-full mt-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors">
            <option>Cash On Delivery</option>
            <option>UPI / Net Banking</option>
            <option>Credit Card</option>
          </select>
        </div>

        <hr className="border-border" />

        {/* Totals Breakdown */}
        <div className="mt-4 space-y-2 text-sm text-text-muted">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </p>

          <div className="flex justify-between text-lg font-semibold text-text mt-4 pt-4 border-t border-border">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Checkout CTA */}
        <button
          className="
            w-full mt-6 py-3 rounded-lg
            font-medium text-text-inverse
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
  );
}