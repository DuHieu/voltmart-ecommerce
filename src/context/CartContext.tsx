'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { ProductType } from '../types';
import * as cartService from '@/services/cart/cartService';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export interface CartItem extends ProductType {
  quantity: number;
  cart_item_id?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductType, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, amount: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
}

const GUEST_CART_KEY = 'voltmart_guest_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCartId, setActiveCartId] = useState<number | null>(null);
  const { user } = useAuth();
  const prevUserRef = useRef<string | null>(null);

  // Recalculate totals whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);

    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(itemCount);
  }, [cartItems]);

  // Load cart on auth change
  useEffect(() => {
    async function initCart() {
      setIsLoading(true);

      if (!user) {
        // Guest user: load from localStorage
        try {
          const stored = localStorage.getItem(GUEST_CART_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setCartItems(parsed);
            }
          } else {
            setCartItems([]);
          }
        } catch (e) {
          console.error('Error reading guest cart:', e);
          setCartItems([]);
        }
        setActiveCartId(null);
        setIsLoading(false);
        prevUserRef.current = null;
        return;
      }

      // User logged in: load from Supabase database
      try {
        const cart = await cartService.getOrCreateCart();
        if (cart) {
          setActiveCartId(cart.id);
          const items = await cartService.getCartItems(cart.id);

          const formattedItems: CartItem[] = items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
            cart_item_id: item.id,
          }));

          // Merge any guest cart items if user just logged in
          let mergedItems = [...formattedItems];
          const storedGuest = localStorage.getItem(GUEST_CART_KEY);
          if (storedGuest) {
            try {
              const guestItems: CartItem[] = JSON.parse(storedGuest);
              if (Array.isArray(guestItems) && guestItems.length > 0) {
                for (const gItem of guestItems) {
                  const existingIdx = mergedItems.findIndex(
                    (m) => m.product_id === gItem.product_id
                  );
                  if (existingIdx !== -1) {
                    const newQty = Math.min(
                      mergedItems[existingIdx].quantity + gItem.quantity,
                      mergedItems[existingIdx].stock || 99
                    );
                    if (mergedItems[existingIdx].cart_item_id) {
                      await cartService.updateCartItemQuantity(
                        mergedItems[existingIdx].cart_item_id!,
                        newQty
                      );
                    }
                    mergedItems[existingIdx].quantity = newQty;
                  } else {
                    const added = await cartService.addItemToCart(
                      cart.id,
                      gItem.product_id,
                      gItem.price,
                      gItem.quantity
                    );
                    if (added) {
                      mergedItems.push({
                        ...gItem,
                        cart_item_id: added.id,
                      });
                    }
                  }
                }
                localStorage.removeItem(GUEST_CART_KEY);
              }
            } catch (e) {
              console.error('Error merging guest cart:', e);
            }
          }

          setCartItems(mergedItems);
        }
      } catch (error) {
        console.error('Error loading user cart:', error);
      } finally {
        setIsLoading(false);
        prevUserRef.current = user.id;
      }
    }

    initCart();
  }, [user]);

  // Persist guest cart to localStorage
  const saveGuestCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving guest cart:', e);
    }
  }, []);

  const addToCart = async (product: ProductType, quantityToAdd: number = 1) => {
    if (quantityToAdd <= 0) return;

    // Stock validation
    if (product.stock <= 0) {
      toast.error('This product is currently out of stock');
      return;
    }

    const existingItem = cartItems.find((i) => i.product_id === product.product_id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantityToAdd > product.stock) {
      toast.error(`Only ${product.stock} units available in stock`);
      return;
    }

    // Guest mode
    if (!user) {
      let updated: CartItem[];
      if (existingItem) {
        updated = cartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        updated = [...cartItems, { ...product, quantity: quantityToAdd }];
      }
      setCartItems(updated);
      saveGuestCart(updated);
      toast.success(
        quantityToAdd > 1
          ? `Added ${quantityToAdd} items to cart`
          : 'Added to cart'
      );
      return;
    }

    // Authenticated mode: Sync with Supabase
    try {
      let cartId = activeCartId;
      if (!cartId) {
        const newCart = await cartService.createCart();
        if (!newCart) {
          toast.error('Failed to initialize cart');
          return;
        }
        cartId = newCart.id;
        setActiveCartId(cartId);
      }

      const result = await cartService.addItemToCart(
        cartId,
        product.product_id,
        product.price,
        quantityToAdd
      );

      if (result) {
        if (existingItem) {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product_id === product.product_id
                ? {
                    ...item,
                    quantity: item.quantity + quantityToAdd,
                    cart_item_id: result.id,
                  }
                : item
            )
          );
        } else {
          setCartItems((prev) => [
            ...prev,
            { ...product, quantity: quantityToAdd, cart_item_id: result.id },
          ]);
        }
        toast.success(
          quantityToAdd > 1
            ? `Added ${quantityToAdd} items to cart`
            : 'Added to cart'
        );
      }
    } catch (error) {
      console.error('Error adding to user cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    // Guest mode
    if (!user) {
      const updated = cartItems.filter((item) => item.product_id !== productId);
      setCartItems(updated);
      saveGuestCart(updated);
      toast.success('Item removed from cart');
      return;
    }

    // Authenticated mode
    const itemToRemove = cartItems.find((i) => i.product_id === productId);
    if (itemToRemove?.cart_item_id) {
      try {
        const ok = await cartService.removeCartItem(itemToRemove.cart_item_id);
        if (ok) {
          setCartItems((prev) =>
            prev.filter((item) => item.product_id !== productId)
          );
          toast.success('Item removed from cart');
        }
      } catch (error) {
        console.error('Error removing item:', error);
        toast.error('Failed to remove item from cart');
      }
    } else {
      setCartItems((prev) =>
        prev.filter((item) => item.product_id !== productId)
      );
    }
  };

  const updateQuantity = async (productId: string, amount: number) => {
    const item = cartItems.find((i) => i.product_id === productId);
    if (!item) return;

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (amount > 0 && newQuantity > item.stock) {
      toast.error(`Cannot exceed available stock of ${item.stock}`);
      return;
    }

    // Guest mode
    if (!user) {
      const updated = cartItems.map((i) =>
        i.product_id === productId ? { ...i, quantity: newQuantity } : i
      );
      setCartItems(updated);
      saveGuestCart(updated);
      return;
    }

    // Authenticated mode
    if (!item.cart_item_id) return;
    try {
      const result = await cartService.updateCartItemQuantity(
        item.cart_item_id,
        newQuantity
      );
      if (result) {
        setCartItems((prev) =>
          prev.map((i) =>
            i.product_id === productId ? { ...i, quantity: newQuantity } : i
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCartItems([]);
      localStorage.removeItem(GUEST_CART_KEY);
      toast.success('Cart cleared');
      return;
    }

    if (activeCartId) {
      try {
        const ok = await cartService.clearCart(activeCartId);
        if (ok) {
          setCartItems([]);
          toast.success('Cart cleared');
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart');
      }
    } else {
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}