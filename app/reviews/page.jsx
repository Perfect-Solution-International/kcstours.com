'use client';

import React from 'react';
import Link from 'next/link';
import { REVIEWS } from '@/lib/data';

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Traveler Reviews</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Authentic Feedback</span>
          <h1>International Traveler Reviews & Testimonials</h1>
          <p>
            Real stories from travelers across the UK, Germany, Australia, and Europe who explored Sri Lanka with KCSTours.
          </p>
        </div>

        {/* Rating Scorecard Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #002D59 0%, #005696 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: 'var(--shadow-xl)',
          marginBottom: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Overall Trust Score
            </span>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F59E0B', margin: '0.2rem 0' }}>
              4.95 <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '1.1rem', color: '#F8FAFC' }}>★★★★★</div>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.4rem' }}>
              Based on 1,400+ verified customer reviews
            </p>
          </div>

          <div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                <span>Chauffeur Punctuality & Driving</span>
                <strong style={{ color: '#F59E0B' }}>5.0 / 5.0</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#F59E0B' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                <span>Vehicle Cleanliness & AC</span>
                <strong style={{ color: '#F59E0B' }}>4.98 / 5.0</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '99%', height: '100%', background: '#F59E0B' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                <span>Hotel Selection & Care</span>
                <strong style={{ color: '#F59E0B' }}>4.92 / 5.0</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '97%', height: '100%', background: '#F59E0B' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                <div>
                  <h4 className="reviewer-name">{rev.name}</h4>
                  <div className="reviewer-country">
                    {rev.flag} {rev.country} • <span style={{ color: '#64748B' }}>{rev.date}</span>
                  </div>
                </div>
              </div>
              <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>★★★★★</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', color: '#002D59' }}>"{rev.title}"</h3>
              <p className="review-quote">{rev.comment}</p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <span className="review-tour-tag">Tour: {rev.tour}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#002D59', marginBottom: '0.8rem' }}>
            Ready to create your own unforgettable Sri Lanka story?
          </h3>
          <Link href="/custom-tour" className="btn btn-primary btn-lg">
            Plan Your Journey With KCSTours &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
