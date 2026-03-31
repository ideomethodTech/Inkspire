'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      // TODO: Implement add logic
      return state;
    case 'REMOVE_ITEM':
      // TODO: Implement remove logic
      return state;
    case 'UPDATE_QUANTITY':
      // TODO: Implement update logic
      return state;
    case 'CLEAR_CART':
      return { ...state, items: [], appliedCoupon: null };
    case 'SET_COUPON':
      return { ...state, appliedCoupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, appliedCoupon: null };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], appliedCoupon: null });

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, qty) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const setCoupon = (coupon) => dispatch({ type: 'SET_COUPON', payload: coupon });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  const cartCount = state.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems: state.items, 
      cartCount, 
      cartTotal, 
      appliedCoupon: state.appliedCoupon,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      setCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
