'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWishlist as fetchWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist, clearWishlist as apiClearWishlist } from '@/api/wishlist';
import { useAuthContext } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWishlist();
      if (res?.success) {
        setWishlistItems(res.data?.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const addToWishlist = async (productId) => {
    try {
      const res = await apiAddToWishlist(productId);
      if (res?.success) {
        refreshWishlist();
        return { success: true };
      }
      return { success: false, message: res?.message };
    } catch (err) {
      return { success: false, message: "Something went wrong" };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await apiRemoveFromWishlist(productId);
      if (res?.success) {
        refreshWishlist();
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  };

  const clearWishlist = async () => {
    try {
      const res = await apiClearWishlist();
      if (res?.success) {
        setWishlistItems([]);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item._id || item.id) === productId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      wishlistCount: wishlistItems.length,
      loading,
      refreshWishlist,
      addToWishlist, 
      removeFromWishlist, 
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
