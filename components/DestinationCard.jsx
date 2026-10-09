'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function DestinationCard({ destination }) {
  const { formatPrice } = useApp();

  return (
    <Link href={`/destinations/${destination.id}`} className="dest-card">
      <img src={destination.image} alt={destination.name} className="dest-card-img" loading="lazy" />
      <div className="dest-card-overlay"></div>
      <div className="dest-card-badge">{destination.badge}</div>
      <div className="dest-card-content">
        <h3>{destination.name}</h3>
        <p className="dest-card-tagline">{destination.tagline}</p>
        <div className="dest-card-bottom">
          <div className="dest-card-price">
            Tours from <strong>{formatPrice(destination.startingPrice)}</strong>
          </div>
          <span className="dest-card-btn">Explore &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
