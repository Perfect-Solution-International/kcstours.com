'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ActivityCard({ activity }) {
  const { formatPrice, isInWishlist, toggleWishlist } = useApp();
  const saved = isInWishlist(activity.id);

  return (
    <div className="activity-card">
      <div className="act-card-img-wrap">
        <img src={activity.image} alt={activity.title} loading="lazy" />
        <span className="badge badge-teal" style={{ position: 'absolute', top: '0.8rem', left: '0.8rem' }}>
          {activity.categoryLabel}
        </span>
        <button 
          className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(activity);
          }}
          style={{ position: 'absolute', top: '0.8rem', right: '0.8rem' }}
          title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="act-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748B', marginBottom: '0.4rem' }}>
          <span>📍 {activity.location}</span>
          <span>⏱️ {activity.duration}</span>
        </div>
        <Link href={`/activities/${activity.id}`}>
          <h4 style={{ fontSize: '1.1rem', lineHeight: 1.3, marginBottom: '0.6rem' }}>{activity.title}</h4>
        </Link>
        <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>{activity.description}</p>
        
        <div className="activity-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid #E2E8F0' }}>
          <div className="activity-price-box" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#002D59' }}>
            {formatPrice(activity.priceUSD)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748B' }}>/ person</span>
          </div>
          <div className="activity-card-actions" style={{ display: 'flex', gap: '0.4rem' }}>
            <Link href={`/activities/${activity.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <Link href={`/book?activity=${activity.id}`} className="btn btn-primary btn-sm">
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
