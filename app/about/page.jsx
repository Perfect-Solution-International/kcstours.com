'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>About Us</span>
        </div>

        {/* Hero Story Section */}
        <div className="about-hero-story">
          <div>
            <span className="section-tag" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>About KCSTours</span>
            <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: '#002D59', margin: '0.4rem 0 1.2rem 0', lineHeight: 1.2 }}>
              Your Trusted Digital Gateway to Sri Lanka
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '1.2rem' }}>
              KCSTours was created with a heartfelt vision: to provide travelers worldwide with authentic, private, and deeply memorable Sri Lankan journeys without the stress of rigid schedules or middleman commissions.
            </p>
            <p style={{ fontSize: '0.98rem', color: '#64748B', lineHeight: 1.8, marginBottom: '2rem' }}>
              From welcoming you inside Colombo BIA Airport with a warm smile and fragrant garland, to navigating misty mountain curves through Ceylon tea plantations and tracking wild leopards in Yala, our dedicated team stands beside you every mile of the way.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '1.8rem', color: '#002D59', display: 'block' }}>10+ Years</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>Island Tour Excellence</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '1.8rem', color: '#00A3C4', display: 'block' }}>4.95 / 5</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>1,400+ International Reviews</span>
              </div>
            </div>

            <Link href="/custom-tour" className="btn btn-primary btn-lg" style={{ width: '100%', maxWidth: '340px', justifyContent: 'center' }}>
              Plan Your Dream Sri Lanka Tour &rarr;
            </Link>
          </div>

          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80" 
              alt="Sri Lanka Highlands" 
              style={{ borderRadius: '24px', boxShadow: 'var(--shadow-xl)', width: '100%' }}
            />
            <div className="about-badge-card">
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F59E0B' }}>🇱🇰 SLTDA</div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '0.2rem' }}>
                Sri Lanka Tourism Development Authority Accredited Partner.
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of KCSTours */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="section-header">
            <span className="section-tag">Core Values</span>
            <h2>How We Operate Differently</h2>
            <p>Built upon the values of integrity, guest safety, and deep local passion.</p>
          </div>

          <div className="trust-grid">
            <div className="trust-card" style={{ background: '#ffffff', border: '1px solid #E2E8F0', color: 'var(--text-main)' }}>
              <div className="trust-icon-wrap">🧭</div>
              <h3 style={{ color: '#002D59' }}>100% Tailor-Made Private Travel</h3>
              <p style={{ color: '#64748B' }}>
                No large tour buses or inflexible itineraries. You have your own private vehicle and dedicated chauffeur who adapts to your pace.
              </p>
            </div>
            <div className="trust-card" style={{ background: '#ffffff', border: '1px solid #E2E8F0', color: 'var(--text-main)' }}>
              <div className="trust-icon-wrap">🛡️</div>
              <h3 style={{ color: '#002D59' }}>Comprehensive Safety & Insurance</h3>
              <p style={{ color: '#64748B' }}>
                All vehicles carry full passenger liability coverage and undergo rigorous mechanical and safety checks before every journey.
              </p>
            </div>
            <div className="trust-card" style={{ background: '#ffffff', border: '1px solid #E2E8F0', color: 'var(--text-main)' }}>
              <div className="trust-icon-wrap">💬</div>
              <h3 style={{ color: '#002D59' }}>24/7 Island Emergency Support</h3>
              <p style={{ color: '#64748B' }}>
                Our operations team in Colombo is active around the clock to support you with flight changes, hospital contacts, or concierge requests.
              </p>
            </div>
            <div className="trust-card" style={{ background: '#ffffff', border: '1px solid #E2E8F0', color: 'var(--text-main)' }}>
              <div className="trust-icon-wrap">🌱</div>
              <h3 style={{ color: '#002D59' }}>Fair Community Tourism</h3>
              <p style={{ color: '#64748B' }}>
                We believe in fair wages for our chauffeurs and directly supporting small family-run guesthouses, artisan tea farmers, and local eateries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
