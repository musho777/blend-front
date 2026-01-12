"use client";
import { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext(null);

const CART_STORAGE_KEY = "wellfood_cart";

const initialCart = {
  items: [],
  updatedAt: new Date().toISOString(),
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(initialCart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsedCart = JSON.parse(saved);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Calculate item count
  const itemCount = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart.items]);

  // Grand total (can add tax/shipping later)
  const grandTotal = useMemo(() => {
    return subtotal;
  }, [subtotal]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    // Check if product has stock available
    const availableStock = product.stock || 0;

    if (availableStock === 0) {
      console.warn("Product is out of stock");
      return false;
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      const currentQuantity = existingItem.quantity;
      const newQuantity = currentQuantity + quantity;

      // Check if already at stock limit
      if (currentQuantity >= availableStock) {
        console.warn(`Cannot add more. Stock limit of ${availableStock} reached.`);
        return false;
      }

      // Check if new quantity would exceed stock
      if (newQuantity > availableStock) {
        console.warn(`Cannot add ${quantity} items. Only ${availableStock - currentQuantity} more available in stock.`);
        return false;
      }
    }

    setCart((prev) => {
      const existingItemIndex = prev.items.findIndex(
        (item) => item.productId === product.id
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prev.items];
        const currentQuantity = updatedItems[existingItemIndex].quantity;
        const newQuantity = currentQuantity + quantity;

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
          stock: availableStock,
        };

        return {
          items: updatedItems,
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Add new item
        const newItem = {
          productId: product.id,
          name: product.name || product.title,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrls?.[0] || "",
          slug: product.slug || "",
          stock: availableStock,
        };

        return {
          items: [...prev.items, newItem],
          updatedAt: new Date().toISOString(),
        };
      }
    });

    return true;
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prev) => ({
      items: prev.items.filter((item) => item.productId !== productId),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.productId === productId) {
          // Check stock limit
          const availableStock = item.stock || 99;
          const validQuantity = Math.min(quantity, availableStock);

          if (validQuantity < quantity) {
            console.warn(`Cannot set quantity to ${quantity}. Only ${availableStock} items available in stock.`);
          }

          return { ...item, quantity: validQuantity };
        }
        return item;
      });

      return {
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart(initialCart);
  };

  // Modal controls
  const openCartModal = () => setIsModalOpen(true);
  const closeCartModal = () => setIsModalOpen(false);

  const value = {
    cart,
    itemCount,
    subtotal,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isModalOpen,
    openCartModal,
    closeCartModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
