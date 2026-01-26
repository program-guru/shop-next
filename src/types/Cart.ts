import type { Product } from "./Product";

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
