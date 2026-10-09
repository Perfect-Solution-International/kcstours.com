'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <img src="/images/logo.png" alt="KCSTours" className="brand-logo-img" />
            <p>
              KCSTours is Sri Lanka’s premier digital tourism partner, offering bespoke chauffeur-guided itineraries, boutique stays, wildlife expeditions, and airport transfers.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              SLTDA Registration: SLTDA/SQA/TA/00892<br />
              Sri Lanka Tourism Development Authority
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-col footer-col-explore">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link href="/destinations">Popular Destinations</Link></li>
              <li><Link href="/tours">Tour Packages</Link></li>
              <li><Link href="/hotels">Hotels & Villas</Link></li>
              <li><Link href="/activities">Experiences</Link></li>
              <li><Link href="/transport">Private Vehicles</Link></li>
              <li><Link href="/custom-tour">Custom Trip Builder</Link></li>
            </ul>
          </div>

          {/* Travel Resources */}
          <div className="footer-col footer-col-resources">
            <h4>Travel Resources</h4>
            <ul className="footer-links">
              <li><Link href="/travel-guide">Sri Lanka Travel Guide</Link></li>
              <li><Link href="/travel-guide/guide-best-time">Best Time to Visit</Link></li>
              <li><Link href="/travel-guide/guide-first-timers">Visa & Etiquette</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
              <li><Link href="/reviews">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="footer-col footer-col-company">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About KCSTours</Link></li>
              <li><Link href="/contact">Contact Concierge</Link></li>
              <li><Link href="/book">Online Booking</Link></li>
              <li><Link href="/wishlist">Saved Favorites</Link></li>
              <li><Link href="/faq">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-col footer-contact-col">
            <h4>Contact & Support</h4>
            <ul className="footer-contact-links">
              <li>
                <a href="tel:+94771234567" className="footer-contact-link footer-tel-link" title="Call Island Concierge Direct">
                  <span className="contact-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span className="contact-text">+94 77 123 4567</span>
                  <span className="contact-badge">Direct</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20would%20like%20to%20inquire%20about%20a%20Sri%20Lanka%20holiday" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-link footer-wa-link"
                  title="Chat with Concierge on WhatsApp (24/7)"
                >
                  <span className="contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.97.57 3.805 1.558 5.352L2.05 21.95l4.723-1.488A9.972 9.972 0 0 0 12.03 22c5.536 0 10.032-4.496 10.032-10.031C22.063 6.496 17.567 2 12.031 2zm0 18.283c-1.748 0-3.37-.5-4.757-1.365l-.341-.212-2.8 1.054.89-2.73-.223-.356a8.23 8.23 0 0 1-1.277-4.643c0-4.57 3.716-8.286 8.286-8.286 4.57 0 8.286 3.716 8.286 8.286 0 4.57-3.716 8.286-8.286 8.286z"/>
                    </svg>
                  </span>
                  <span className="contact-text">WhatsApp 24/7 Concierge</span>
                  <span className="contact-badge">
                    <span className="contact-badge-dot"></span>
                    Online
                  </span>
                </a>
              </li>
              <li className="footer-email-item">
                <a href="mailto:info@kcstours.com" className="footer-contact-link footer-mail-link" title="Email Inquiries">
                  <span className="contact-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <span className="contact-text">info@kcstours.com</span>
                  <span className="contact-badge">Email</span>
                </a>
              </li>
              <li className="footer-contact-address">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Colombo • Kandy • Galle • Negombo</span>
              </li>
            </ul>
            
            <div className="social-links">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon facebook" 
                title="Follow KCSTours on Facebook"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon instagram" 
                title="Follow KCSTours on Instagram"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon youtube" 
                title="Watch KCSTours on YouTube"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon tiktok" 
                title="Follow KCSTours on TikTok"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 KCSTours. Sri Lanka Tourism Partner. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <span>🔒 256-bit SSL Secure Checkout</span>
            <span>💳 Visa • MasterCard • Amex • Bank Wire</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
