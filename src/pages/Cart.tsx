import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  selectCartContents, 
  selectCartTotalItems, 
  selectCartTotalPrice 
} from "../store/features/cart/cartSelectors";
import { 
  removeFromCart, 
  updateQuantity 
} from "../store/features/cart/cartSlice";
import CartView from "../components/Cart"; 

export default function CartPage() {
  const dispatch = useAppDispatch();
  
  // Select Data from Store
  const items = useAppSelector(selectCartContents);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItems = useAppSelector(selectCartTotalItems);

  // Define Handlers
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Render View
  return (
    <CartView 
      items={items}
      totalPrice={totalPrice}
      totalItems={totalItems}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
    />
  );
}