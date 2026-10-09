'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { HOTELS } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function HotelDetailPage() {
  const { id } = useParams();
  const { formatPrice, isInWishlist, toggleWishlist } = useApp();
  const hotel = HOTELS.find(h => h.id === id);

  if (!hotel) {
    return notFound();
  }

  const saved = isInWishlist(hotel.id);

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '420px',
        background: `#091322 url('${hotel.image}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem 0',
        color: '#ffffff'
      }}>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; 
            <Link href="/hotels" style={{ color: '#38BDF8' }}>Hotels</Link> &nbsp;/&nbsp; 
            <span>{hotel.name}</span>
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>★ {hotel.rating} • {hotel.type}</span>
          <h1 style={{ fontSize: '2.8rem', color: '#ffffff', marginBottom: '0.3rem' }}>{hotel.name}</h1>
          <p style={{ fontSize: '1.15rem', color: '#E2E8F0' }}>📍 {hotel.location}</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="detail-two-col-layout">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#002D59' }}>Property Overview</h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
              {hotel.description}
            </p>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#002D59' }}>Resort Facilities & Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', marginBottom: '2.5rem' }}>
              {hotel.amenities.map((amenity, idx) => (
                <div key={idx} style={{
                  background: '#F8FAFC',
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.92rem',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#10B981' }}>✓</span> {amenity}
                </div>
              ))}
            </div>

            <div style={{
              background: '#EBF4FC',
              padding: '1.5rem',
              borderRadius: '14px',
              border: '1px solid rgba(0, 86, 150, 0.2)'
            }}>
              <h4 style={{ color: '#002D59', marginBottom: '0.4rem' }}>Chauffeur Accommodation Note</h4>
              <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                When booking through KCSTours, complimentary quarters and meal allowances for your private driver are automatically arranged.
              </p>
            </div>
          </div>

          {/* Sticky Reservation Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Nightly from</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#002D59' }}>
                    {formatPrice(hotel.priceUSD)} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#64748B' }}>/ room</span>
                  </div>
                </div>
                <button 
                  className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
                  onClick={() => toggleWishlist(hotel)}
                  title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  style={{ position: 'static' }}
                >
                  {saved ? '❤️' : '🤍'}
                </button>
              </div>

              <Link 
                href={`/book?hotel=${hotel.id}`} 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                Reserve Stay with KCSTours &rarr;
              </Link>

              <Link 
                href={`/custom-tour?preferredHotel=${hotel.id}`} 
                className="btn btn-outline" 
                style={{ width: '100%', marginBottom: '1.5rem' }}
              >
                Include in Custom Tour
              </Link>

              <div style={{ fontSize: '0.82rem', color: '#64748B', textAlign: 'center' }}>
                ✓ Best rate guarantee with KCSTours partner privileges
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
