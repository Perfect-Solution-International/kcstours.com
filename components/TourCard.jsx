'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function TourCard({ tour }) {
  const { formatPrice, isInWishlist, toggleWishlist } = useApp();
  const saved = isInWishlist(tour.id);

  return (
    <div className="tour-card">
      <div className="tour-card-header">
        <img src={tour.heroImage} alt={tour.title} className="tour-card-img" loading="lazy" />
        <div className="tour-badge-top">
          <span className={`badge ${tour.badge?.includes('VIP') ? 'badge-gold' : 'badge-teal'}`}>
            {tour.badge}
          </span>
        </div>
        <button 
          className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(tour);
          }}
          title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
        <div className="tour-card-meta-bar">
          <span>⏱️ {tour.duration}</span>
          <span>👥 {tour.groupType}</span>
        </div>
      </div>

      <div className="tour-card-body">
        <div className="tour-rating-row">
          <div className="tour-stars">
            ★ {tour.rating} <span style={{ color: '#64748B', fontWeight: 'normal' }}>({tour.reviewsCount} reviews)</span>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{tour.difficulty}</span>
        </div>

        <Link href={`/tours/${tour.id}`}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>
            {tour.title}
          </h3>
        </Link>
        <p className="tour-subtitle">{tour.subtitle}</p>

        <div className="tour-route-tags">
          {tour.route.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className="route-step">{step}</span>
              {idx < tour.route.length - 1 && <span className="route-arrow">➔</span>}
            </React.Fragment>
          ))}
        </div>

        <ul className="tour-inclusions-list">
          <li><span>✓</span> Dedicated English Chauffeur-Guide</li>
          <li><span>✓</span> Handpicked Boutique / 4-5★ Stays</li>
          <li><span>✓</span> All Tolls, Fuel & Chauffeur Stays</li>
        </ul>

        <div className="tour-card-footer">
          <div className="tour-price-box">
            <span className="price-sub">From Per Person</span>
            <span className="price-amount">{formatPrice(tour.priceUSD)}</span>
          </div>
          <div className="tour-card-actions">
            <Link href={`/tours/${tour.id}`} className="btn btn-outline btn-sm">
              View Itinerary
            </Link>
            <Link href={`/book?tour=${tour.id}`} className="btn btn-primary btn-sm">
              Book Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
