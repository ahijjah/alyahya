import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alyahya_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('alyahya_cart', JSON.stringify(cart));
  }, [cart]);

  const parsePrice = (priceStr: string): number => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numeric) ? 100 : numeric; // Default 100 if "متعدد الأسعار"
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, selectedPrice: parsePrice(product.normal_price) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal };
}
