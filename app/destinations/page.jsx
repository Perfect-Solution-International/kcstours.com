'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS } from '@/lib/data';
import DestinationCard from '@/components/DestinationCard';

export default function DestinationsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.region === filter);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Destinations</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Explore Sri Lanka</span>
          <h1>Popular Sri Lankan Destinations</h1>
          <p>
            From the UNESCO ancient citadels of the Cultural Triangle to the emerald tea highlands and turquoise beaches of the southern coast.
          </p>
        </div>

        {/* Region Filter Nav */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Regions ({DESTINATIONS.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'cultural' ? 'active' : ''}`}
            onClick={() => setFilter('cultural')}
          >
            Cultural Triangle & Heritage
          </button>
          <button 
            className={`filter-btn ${filter === 'highlands' ? 'active' : ''}`}
            onClick={() => setFilter('highlands')}
          >
            Central Tea Highlands
          </button>
          <button 
            className={`filter-btn ${filter === 'coast' ? 'active' : ''}`}
            onClick={() => setFilter('coast')}
          >
            Southern & East Coasts
          </button>
          <button 
            className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
            onClick={() => setFilter('wildlife')}
          >
            Wildlife & Safari Parks
          </button>
        </div>

        {/* Grid */}
        <div className="destinations-grid">
          {filtered.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'var(--grad-primary)',
          color: '#ffffff',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
              Want to visit multiple destinations in one seamless trip?
            </h3>
            <p style={{ opacity: 0.9 }}>
              Our bespoke trip planner links your favorite spots into an optimized private chauffeur itinerary.
            </p>
          </div>
          <Link href="/custom-tour" className="btn btn-gold btn-lg">
            Build Multi-City Tour &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
