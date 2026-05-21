import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: '0.00', item_count: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const add = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const { data } = await addToCart(productId, quantity);
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  const update = async (itemId, quantity) => {
    const { data } = await updateCartItem(itemId, quantity);
    setCart(data);
  };

  const remove = async (itemId) => {
    const { data } = await removeCartItem(itemId);
    setCart(data);
  };

  const clear = async () => {
    const { data } = await clearCart();
    setCart(data);
  };

  return (
    <CartContext.Provider value={{ cart, loading, add, update, remove, clear, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
