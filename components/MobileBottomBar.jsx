'use client';

import React from 'react';
import Link from 'next/link';

export default function MobileBottomBar() {
  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile Quick Actions">
      <div className="mobile-bottom-inner">
        <a href="tel:+94771234567" className="mob-action-btn mob-btn-call" title="Call Concierge">
          <span className="mob-icon">📞</span>
          <span className="mob-label">Call Us</span>
        </a>

        <a 
          href="https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20would%20like%20to%20inquire%20about%20a%20tour" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mob-action-btn mob-btn-whatsapp"
          title="Chat on WhatsApp"
        >
          <span className="mob-icon">💬</span>
          <span className="mob-label">WhatsApp</span>
        </a>

        <Link href="/custom-tour" className="mob-action-btn mob-btn-plan" title="Build Custom Tour">
          <span className="mob-icon">✨</span>
          <span className="mob-label">Plan Trip</span>
          <span className="mob-arrow">&rarr;</span>
        </Link>
      </div>
    </nav>
  );
}
