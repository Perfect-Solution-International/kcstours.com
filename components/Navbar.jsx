'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency, wishlist, openSearch, showToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Tours', href: '/tours' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Experiences', href: '/activities' },
    { name: 'Transport', href: '/transport' },
    { name: 'Custom Tour', href: '/custom-tour' },
    { name: 'Travel Guide', href: '/travel-guide' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-contact">
            <a href="tel:+94771234567"><span>📞</span> +94 77 123 4567</a>
            <a href="https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20would%20like%20to%20inquire%20about%20a%20Sri%20Lanka%20tour" target="_blank" rel="noopener noreferrer">
              <span>💬</span> WhatsApp 24/7 Island Concierge
            </a>
            <a href="mailto:info@kcstours.com"><span>✉️</span> info@kcstours.com</a>
          </div>

          <div className="top-bar-actions">
            {/* Language Selector */}
            <div className="language-selector">
              <span>🌐</span>
              <select className="language-select" aria-label="Select Language" onChange={(e) => showToast(`Language switched to ${e.target.value.toUpperCase()}`)}>
                <option value="en">English (EN)</option>
                <option value="de">Deutsch (DE)</option>
                <option value="fr">Français (FR)</option>
                <option value="es">Español (ES)</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="currency-selector">
              <span>💱</span>
              <select 
                className="currency-select" 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)} 
                aria-label="Select Currency"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="LKR">LKR (Rs)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="main-header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo-link" aria-label="KCSTours Home">
            <img 
              src="/images/logo.png" 
              alt="KCSTours - Sri Lanka Tourism Partner" 
              className="brand-logo-img" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="main-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isCustomTour = link.href === '/custom-tour';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''} ${isCustomTour ? 'custom-tour-pill' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="header-right">
            {/* Global Search Button */}
            <button className="icon-btn" onClick={openSearch} title="Search (Ctrl+K)" aria-label="Search">
              <span>🔍</span>
            </button>

            {/* Wishlist Link */}
            <Link href="/wishlist" className="icon-btn" title="View Saved Tours & Stays" aria-label="Wishlist">
              <span>❤️</span>
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Book Now Primary CTA */}
            <Link href="/book" className="btn btn-primary btn-sm btn-nav-book">
              <span>Book Now</span>
              <span className="btn-arrow">&rarr;</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className="hamburger-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-links-list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isCustomTour = link.href === '/custom-tour';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mob-drawer-link ${isActive ? 'active' : ''} ${isCustomTour ? 'mob-custom-tour' : ''}`}
                  >
                    <span>{link.name}</span>
                    {isCustomTour && <span className="mob-badge-chip">Popular</span>}
                    <span className="mob-drawer-arrow">&rsaquo;</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="mob-drawer-footer">
              <Link href="/book" className="btn btn-primary btn-sm mob-drawer-btn" onClick={() => setMobileMenuOpen(false)}>
                Book Now &rarr;
              </Link>
              <Link href="/wishlist" className="btn btn-outline btn-sm mob-drawer-btn" onClick={() => setMobileMenuOpen(false)}>
                ❤️ Wishlist ({wishlist.length})
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
