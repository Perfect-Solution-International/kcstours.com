'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOURS } from '@/lib/data';
import TourCard from '@/components/TourCard';

export default function ToursPage() {
  const [category, setCategory] = useState('all');
  const [maxDays, setMaxDays] = useState(15);

  const filtered = TOURS.filter(t => {
    const matchesCat = category === 'all' || t.category === category;
    const matchesDays = t.daysCount <= maxDays;
    return matchesCat && matchesDays;
  });

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Tour Packages</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Handcrafted Ceylon Journeys</span>
          <h1>Sri Lanka Tour Packages & Private Itineraries</h1>
          <p>
            Private chauffeured tours tailored for international travelers. Flexible dates, handpicked boutique stays, and dedicated chauffeur-guides.
          </p>
        </div>

        {/* Category Filter Nav */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Itineraries ({TOURS.length})
          </button>
          <button 
            className={`filter-btn ${category === 'classic' ? 'active' : ''}`}
            onClick={() => setCategory('classic')}
          >
            Classic Highlights (7 Days)
          </button>
          <button 
            className={`filter-btn ${category === 'signature' ? 'active' : ''}`}
            onClick={() => setCategory('signature')}
          >
            Complete Odyssey (10 Days)
          </button>
          <button 
            className={`filter-btn ${category === 'luxury' ? 'active' : ''}`}
            onClick={() => setCategory('luxury')}
          >
            Ultra-Luxury Safari (12 Days)
          </button>
          <button 
            className={`filter-btn ${category === 'cultural' ? 'active' : ''}`}
            onClick={() => setCategory('cultural')}
          >
            Cultural & Train (5 Days)
          </button>
          <button 
            className={`filter-btn ${category === 'beach' ? 'active' : ''}`}
            onClick={() => setCategory('beach')}
          >
            Coastal & Whales (4 Days)
          </button>
        </div>

        {/* Tours Grid */}
        <div className="tours-grid">
          {filtered.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Custom Tour Teaser Callout */}
        <div style={{
          marginTop: '4rem',
          padding: '3rem',
          background: 'radial-gradient(circle at 10% 20%, #002D59 0%, #0A192F 90%)',
          color: '#ffffff',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>100% Tailored To You</span>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '0.6rem' }}>
              Want to customize any of these tours?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Swap hotels, add extra days on the beach, include scenic flights, or modify the travel pace. Our Sri Lanka travel team will tailor the entire journey around your preferences.
            </p>
          </div>
          <Link href="/custom-tour" className="btn btn-gold btn-lg">
            <span>✨ Launch Custom Trip Builder</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
