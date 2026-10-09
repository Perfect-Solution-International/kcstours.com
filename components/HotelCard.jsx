'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function HotelCard({ hotel }) {
  const { formatPrice, isInWishlist, toggleWishlist } = useApp();
  const saved = isInWishlist(hotel.id);

  return (
    <div className="hotel-card">
      <div className="hotel-card-img-wrap">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          ★ {hotel.rating}
        </span>
        <button 
          className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(hotel);
          }}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="hotel-card-body">
        <div style={{ fontSize: '0.8rem', color: '#00A3C4', fontWeight: 700, textTransform: 'uppercase' }}>
          {hotel.type}
        </div>
        <Link href={`/hotels/${hotel.id}`}>
          <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>{hotel.name}</h3>
        </Link>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>📍 {hotel.location}</p>
        <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '0.6rem' }}>{hotel.description}</p>
        
        <div className="hotel-amenities-tags">
          {hotel.amenities.slice(0, 4).map((a, idx) => (
            <span key={idx} className="amenity-tag">{a}</span>
          ))}
        </div>

        <div className="hotel-card-footer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <div className="hotel-price-box">
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Nightly from</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002D59' }}>{formatPrice(hotel.priceUSD)}</div>
          </div>
          <div className="hotel-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <Link href={`/hotels/${hotel.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <Link href={`/book?hotel=${hotel.id}`} className="btn btn-primary btn-sm">
              Reserve
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
