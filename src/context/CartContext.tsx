'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { product, quantity: 1, size }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lux-noir-cart');
      if (stored) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(stored) });
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('lux-noir-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, size: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size } });

  const removeItem = (id: string, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });

  const updateQuantity = (id: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
