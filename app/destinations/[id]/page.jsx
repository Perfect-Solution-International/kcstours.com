'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { DESTINATIONS, TOURS, ACTIVITIES, HOTELS } from '@/lib/data';
import TourCard from '@/components/TourCard';
import HotelCard from '@/components/HotelCard';
import ActivityCard from '@/components/ActivityCard';
import { useApp } from '@/context/AppContext';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const { formatPrice } = useApp();
  const dest = DESTINATIONS.find(d => d.id === id);

  if (!dest) {
    return notFound();
  }

  // Linked tours that visit this destination
  const matchedTours = TOURS.filter(t => 
    t.route.some(r => r.toLowerCase().includes(dest.name.toLowerCase().split('&')[0].trim().toLowerCase())) ||
    t.description.toLowerCase().includes(dest.id)
  );

  // Linked activities
  const matchedActs = ACTIVITIES.filter(a => 
    a.location.toLowerCase().includes(dest.id) ||
    a.location.toLowerCase().includes(dest.name.toLowerCase().split('&')[0].trim().toLowerCase())
  );

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <div style={{
        position: 'relative',
        height: '420px',
        background: `#091322 url('${dest.image}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem 0',
        color: '#ffffff'
      }}>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; 
            <Link href="/destinations" style={{ color: '#38BDF8' }}>Destinations</Link> &nbsp;/&nbsp; 
            <span>{dest.name}</span>
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{dest.badge}</span>
          <h1 style={{ fontSize: '2.8rem', color: '#ffffff', marginBottom: '0.4rem' }}>{dest.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#E2E8F0', maxWidth: '750px' }}>{dest.tagline}</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Quick Facts Grid */}
        <div className="tour-specs-grid" style={{ marginBottom: '2.5rem' }}>
          <div className="spec-item">
            <span className="spec-label">Region</span>
            <span className="spec-val">📍 {dest.regionLabel}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Best Time to Visit</span>
            <span className="spec-val">☀️ {dest.bestTime}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Average Climate</span>
            <span className="spec-val">🌡️ {dest.climate}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Tours Starting From</span>
            <span className="spec-val" style={{ color: '#00A3C4' }}>{formatPrice(dest.startingPrice)}</span>
          </div>
        </div>

        {/* Overview & Highlights */}
        <div className="detail-two-col-layout" style={{ marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>About {dest.name}</h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {dest.description}
            </p>
            <Link href={`/custom-tour?dest=${dest.id}`} className="btn btn-primary">
              <span>Include {dest.name} in My Custom Trip &rarr;</span>
            </Link>
          </div>

          <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', color: '#002D59' }}>
              Signature Experiences in {dest.name}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {dest.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.95rem', color: '#334155' }}>
                  <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Tours Covering this Destination */}
        {matchedTours.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <span className="section-tag">Featured Itineraries</span>
              <h2>Tours Visiting {dest.name}</h2>
              <p>These private chauffeured packages include guided visits and stays in {dest.name}.</p>
            </div>
            <div className="tours-grid">
              {matchedTours.map(t => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        )}

        {/* Activities in this Destination */}
        {matchedActs.length > 0 && (
          <div>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <span className="section-tag">Experiences</span>
              <h2>Activities & Day Excursions in {dest.name}</h2>
            </div>
            <div className="activities-grid">
              {matchedActs.map(a => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
