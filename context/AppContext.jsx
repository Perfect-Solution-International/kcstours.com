'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EXCHANGE_RATES } from '@/lib/data';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kcs_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
  }, []);

  // Show Toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Currency Formatter
  const formatPrice = (amountUSD) => {
    const rateInfo = EXCHANGE_RATES[currency] || EXCHANGE_RATES.USD;
    const converted = Math.round(amountUSD * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  // Toggle Wishlist
  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter(w => w.id !== item.id);
        showToast('Removed from Wishlist', 'info');
      } else {
        updated = [...prev, item];
        showToast('Saved to your Sri Lanka Wishlist! ❤️', 'success');
      }
      try {
        localStorage.setItem('kcs_wishlist', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isInWishlist = (id) => wishlist.some(w => w.id === id);

  return (
    <AppContext.Provider value={{
      currency,
      setCurrency: (c) => {
        setCurrency(c);
        showToast(`Prices converted to ${c}`);
      },
      formatPrice,
      wishlist,
      toggleWishlist,
      isInWishlist,
      showToast,
      isSearchOpen,
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false)
    }}>
      {children}
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#002D59',
          color: '#ffffff',
          padding: '0.75rem 1.6rem',
          borderRadius: '9999px',
          fontSize: '0.9rem',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(0, 45, 89, 0.35)',
          border: '1px solid rgba(0, 163, 196, 0.4)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeInDown 0.3s ease'
        }}>
          <span>✨</span>
          <span>{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
