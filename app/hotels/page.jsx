'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HOTELS } from '@/lib/data';
import HotelCard from '@/components/HotelCard';

export default function HotelsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? HOTELS
    : HOTELS.filter(h => h.category === filter);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Hotels & Luxury Resorts</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Sanctuaries of Ceylon</span>
          <h1>Boutique Hotels, Colonial Estates & Luxury Lodges</h1>
          <p>
            Personally inspected and handpicked properties offering genuine Sri Lankan warmth, breathtaking views, and exceptional comfort.
          </p>
        </div>

        {/* Filter Nav */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Stays ({HOTELS.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'eco' ? 'active' : ''}`}
            onClick={() => setFilter('eco')}
          >
            Eco Luxury & Mountain Lodges
          </button>
          <button 
            className={`filter-btn ${filter === 'heritage' ? 'active' : ''}`}
            onClick={() => setFilter('heritage')}
          >
            Colonial Tea Estates & Townhouses
          </button>
          <button 
            className={`filter-btn ${filter === 'beachfront' ? 'active' : ''}`}
            onClick={() => setFilter('beachfront')}
          >
            5-Star Cliffside & Beachfront
          </button>
          <button 
            className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
            onClick={() => setFilter('wildlife')}
          >
            Safari Glamping
          </button>
        </div>

        {/* Hotels Grid */}
        <div className="hotels-grid">
          {filtered.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
