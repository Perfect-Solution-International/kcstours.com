'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound, useRouter } from 'next/navigation';
import { TOURS } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function TourDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { formatPrice, isInWishlist, toggleWishlist, showToast } = useApp();
  const [activeDay, setActiveDay] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const tour = TOURS.find(t => t.id === id);

  if (!tour) {
    return notFound();
  }

  const saved = isInWishlist(tour.id);
  const baseRate = tour.priceUSD;
  const estimatedTotal = (baseRate * adults) + (baseRate * 0.5 * children);

  const handleBookNow = () => {
    router.push(`/book?tour=${tour.id}&adults=${adults}&children=${children}&date=${startDate}`);
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero Banner */}
      <div style={{
        position: 'relative',
        minHeight: '460px',
        background: `#091322 url('${tour.heroImage}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem 0',
        color: '#ffffff'
      }}>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1.2rem' }}>
            <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; 
            <Link href="/tours" style={{ color: '#38BDF8' }}>Tours</Link> &nbsp;/&nbsp; 
            <span>{tour.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span className={`badge ${tour.badge?.includes('VIP') ? 'badge-gold' : 'badge-teal'}`}>
              {tour.badge}
            </span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
              ★ {tour.rating} ({tour.reviewsCount} verified reviews)
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            {tour.title}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#E2E8F0', maxWidth: '850px' }}>
            {tour.subtitle}
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Quick Facts Bar */}
        <div className="tour-specs-grid">
          <div className="spec-item">
            <span className="spec-label">Duration</span>
            <span className="spec-val">⏱️ {tour.duration}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Group Style</span>
            <span className="spec-val">👥 {tour.groupType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Pace & Difficulty</span>
            <span className="spec-val">🥾 {tour.difficulty}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Guide Language</span>
            <span className="spec-val">🗣️ English / German</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Rate From</span>
            <span className="spec-val" style={{ color: '#00A3C4' }}>{formatPrice(tour.priceUSD)} / pax</span>
          </div>
        </div>

        {/* Route Steps */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          margin: '1.5rem 0 2.5rem 0',
          padding: '1.2rem',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          <strong style={{ color: '#002D59', marginRight: '0.5rem', fontSize: '0.9rem' }}>Route:</strong>
          {tour.route.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className="route-step">{step}</span>
              {idx < tour.route.length - 1 && <span className="route-arrow">➔</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="detail-two-col-layout">
          {/* Left Column */}
          <div style={{ minWidth: 0 }}>
            {/* Overview */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#002D59' }}>Experience Overview</h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {tour.description}
            </p>

            {/* Signature Highlights */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: '#002D59' }}>Signature Highlights</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem', marginBottom: '3rem' }}>
              {tour.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.95rem', color: '#334155' }}>
                  <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Day-by-Day Accordion */}
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', color: '#002D59' }}>
              Day-by-Day Detailed Itinerary
            </h2>
            <div className="itinerary-accordion" style={{ marginBottom: '3rem' }}>
              {tour.itinerary.map((day, idx) => (
                <div key={idx} className={`itinerary-accordion-day ${activeDay === idx ? 'active' : ''}`}>
                  <div 
                    className="day-header"
                    onClick={() => setActiveDay(activeDay === idx ? -1 : idx)}
                  >
                    <span>Day 0{day.day}: {day.title}</span>
                    <span style={{ color: '#00A3C4', fontSize: '0.8rem' }}>
                      {activeDay === idx ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="day-body">
                    <p style={{ marginBottom: '0.8rem', lineHeight: 1.6 }}>{day.summary}</p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#64748B' }}>
                      <span>🏨 <strong>Stay:</strong> {day.stay}</span>
                      <span>🍽️ <strong>Meals:</strong> {day.meals}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* What's Included / Excluded */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              background: '#F8FAFC',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              marginBottom: '3rem'
            }}>
              <div>
                <h4 style={{ color: '#10B981', fontSize: '1.1rem', marginBottom: '0.8rem' }}>✓ What's Included</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {tour.included.map((inc, i) => (
                    <li key={i}>• {inc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#EF4444', fontSize: '1.1rem', marginBottom: '0.8rem' }}>✕ What's Not Included</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {tour.excluded.map((exc, i) => (
                    <li key={i}>• {exc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Starting from</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#002D59' }}>
                    {formatPrice(tour.priceUSD)} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#64748B' }}>/ adult</span>
                  </div>
                </div>
                <button 
                  className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
                  onClick={() => toggleWishlist(tour)}
                  title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  style={{ position: 'static' }}
                >
                  {saved ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Date & Guests Picker */}
              <div className="form-group">
                <label className="form-label">Preferred Start Date</label>
                <input 
                  type="date" 
                  className="form-control"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Adults (12+)</label>
                  <select 
                    className="form-control"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Children (Under 12)</label>
                  <select 
                    className="form-control"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Cost Breakdown */}
              <div className="price-summary-box">
                <div className="price-summary-row">
                  <span>{adults} Adults × {formatPrice(baseRate)}</span>
                  <span>{formatPrice(baseRate * adults)}</span>
                </div>
                {children > 0 && (
                  <div className="price-summary-row">
                    <span>{children} Children (50% off)</span>
                    <span>{formatPrice(baseRate * 0.5 * children)}</span>
                  </div>
                )}
                <div className="price-summary-row total">
                  <span>Total Estimate:</span>
                  <span>{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', marginBottom: '1rem' }}
                onClick={handleBookNow}
              >
                Proceed to Book Tour &rarr;
              </button>

              <Link 
                href={`/custom-tour?baseTour=${tour.id}`} 
                className="btn btn-outline" 
                style={{ width: '100%', marginBottom: '1.2rem' }}
              >
                Customize This Itinerary
              </Link>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
                🔒 20% Deposit to secure • Free cancellation up to 21 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
