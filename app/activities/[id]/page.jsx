'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ACTIVITIES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const { formatPrice, isInWishlist, toggleWishlist } = useApp();
  const act = ACTIVITIES.find(a => a.id === id);

  if (!act) {
    return notFound();
  }

  const saved = isInWishlist(act.id);

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '420px',
        background: `#091322 url('${act.image}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem 0',
        color: '#ffffff'
      }}>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; 
            <Link href="/activities" style={{ color: '#38BDF8' }}>Experiences</Link> &nbsp;/&nbsp; 
            <span>{act.title}</span>
          </div>
          <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>{act.categoryLabel}</span>
          <h1 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '0.4rem', lineHeight: 1.2 }}>{act.title}</h1>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0' }}>📍 {act.location} • ⏱️ {act.duration}</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="detail-two-col-layout">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#002D59' }}>Experience Details</h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
              {act.description}
            </p>

            <div style={{
              background: '#F8FAFC',
              padding: '1.8rem',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', color: '#002D59', marginBottom: '0.8rem' }}>What's Included in this Experience</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem', color: '#475569' }}>
                <li>✓ Certified licensed specialist guide or naturalist</li>
                <li>✓ All entrance permits and sanctuary fees</li>
                <li>✓ Chilled mineral water and safety equipment</li>
                <li>✓ Private transport pickup from your hotel</li>
              </ul>
            </div>
          </div>

          {/* Sticky Booking Card */}
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
                  <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Price per person</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#002D59' }}>
                    {formatPrice(act.priceUSD)}
                  </div>
                </div>
                <button 
                  className={`tour-wishlist-btn ${saved ? 'active' : ''}`}
                  onClick={() => toggleWishlist(act)}
                  title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  style={{ position: 'static' }}
                >
                  {saved ? '❤️' : '🤍'}
                </button>
              </div>

              <Link 
                href={`/book?activity=${act.id}`} 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                Book This Experience &rarr;
              </Link>

              <Link 
                href={`/custom-tour?interest=${act.category}`} 
                className="btn btn-outline" 
                style={{ width: '100%' }}
              >
                Add to Custom Itinerary
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
