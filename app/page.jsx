'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DESTINATIONS, TOURS, HOTELS, ACTIVITIES, REVIEWS, FAQS } from '@/lib/data';
import TourCard from '@/components/TourCard';
import DestinationCard from '@/components/DestinationCard';
import HotelCard from '@/components/HotelCard';
import ActivityCard from '@/components/ActivityCard';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [searchDest, setSearchDest] = useState('all');
  const [searchMonth, setSearchMonth] = useState('December 2026');
  const [activeFaq, setActiveFaq] = useState(0);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    router.push(`/tours?dest=${searchDest}&month=${encodeURIComponent(searchMonth)}`);
    showToast('Loading matching Ceylon journeys! 🗺️');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span>🌴</span>
            <span>SRI LANKA’S PREMIER TAILOR-MADE TRAVEL PARTNER • SLTDA CERTIFIED</span>
          </div>
          <h1 className="hero-title">
            DISCOVER THE BEAUTY OF <span>SRI LANKA</span>
          </h1>
          <p className="hero-subtitle">
            Explore sun-drenched tropical coasts, ancient citadel kingdoms, untamed wildlife safaris, and misty emerald tea highlands with private dedicated chauffeurs.
          </p>

          <div className="hero-actions">
            <Link href="/tours" className="btn btn-gold btn-lg">
              <span>Explore Tour Packages</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/custom-tour" className="btn btn-outline-white btn-lg">
              <span>✨ Build Custom Itinerary</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Travel Search Engine */}
      <div className="container search-widget-container">
        <form className="search-widget" onSubmit={handleHeroSearch}>
          <div className="search-field">
            <label className="search-label" htmlFor="destSelect">
              <span>📍</span> Where do you want to go?
            </label>
            <select 
              id="destSelect" 
              className="search-select"
              value={searchDest}
              onChange={(e) => setSearchDest(e.target.value)}
            >
              <option value="all">All Sri Lanka (Island-wide)</option>
              <option value="sigiriya">Sigiriya & Cultural Triangle</option>
              <option value="ella">Ella & Misty Highlands</option>
              <option value="kandy">Kandy & Central Hills</option>
              <option value="galle">Galle & Southern Coast</option>
              <option value="yala">Yala Leopard Safari</option>
              <option value="mirissa">Mirissa & Whale Coast</option>
              <option value="nuwara-eliya">Nuwara Eliya Tea Valleys</option>
              <option value="trincomalee">Trincomalee & East Coast</option>
            </select>
          </div>

          <div className="search-field">
            <label className="search-label" htmlFor="monthSelect">
              <span>📅</span> Travel Window
            </label>
            <select 
              id="monthSelect" 
              className="search-select"
              value={searchMonth}
              onChange={(e) => setSearchMonth(e.target.value)}
            >
              <option>Next 30 Days</option>
              <option>November 2026</option>
              <option>December 2026 (Peak)</option>
              <option>January 2027</option>
              <option>February 2027</option>
              <option>March - May 2027</option>
              <option>Summer 2027</option>
            </select>
          </div>

          <div className="search-field">
            <label className="search-label" htmlFor="styleSelect">
              <span>🧭</span> Tour Style
            </label>
            <select id="styleSelect" className="search-select">
              <option>All Tour Styles</option>
              <option>Classic Highlights (7-10 Days)</option>
              <option>Luxury Safari & Beach (10-14 Days)</option>
              <option>Heritage & Temples (5-7 Days)</option>
              <option>Coastal & Whales (4-7 Days)</option>
            </select>
          </div>

          <div className="search-field">
            <label className="search-label" htmlFor="paxSelect">
              <span>👥</span> Travelers
            </label>
            <select id="paxSelect" className="search-select">
              <option>2 Adults (Couple)</option>
              <option>1 Adult (Solo Explorer)</option>
              <option>Family (2 Adults, 2 Kids)</option>
              <option>Small Group (4 - 8 Pax)</option>
              <option>Large Private Group (8+ Pax)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            <span>Search Tours</span>
          </button>
        </form>
      </div>

      {/* Trust Stats Bar */}
      <div className="trust-strip">
        <div className="container trust-strip-inner">
          <div className="trust-stat-item">
            <div className="trust-stat-icon">🇱🇰</div>
            <div className="trust-stat-info">
              <h4>SLTDA Certified</h4>
              <p>Official Sri Lanka Tourism Partner</p>
            </div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-icon">⭐</div>
            <div className="trust-stat-info">
              <h4>4.95 / 5 Rating</h4>
              <p>Over 1,400+ International Reviews</p>
            </div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-icon">🚗</div>
            <div className="trust-stat-info">
              <h4>Private Chauffeurs</h4>
              <p>Dedicated English & Multilingual Guides</p>
            </div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-icon">🛡️</div>
            <div className="trust-stat-info">
              <h4>100% Financial Protection</h4>
              <p>Flexible Booking & Zero Hidden Fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Iconic Ceylon Citadels & Coasts</span>
            <h2>Top Sri Lanka Destinations</h2>
            <p>From misty mountain peaks and UNESCO royal citadels to untamed savannahs and warm turquoise bays.</p>
          </div>

          <div className="destinations-grid">
            {DESTINATIONS.slice(0, 4).map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/destinations" className="btn btn-outline">
              <span>View All 8 Sri Lanka Regions &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tour Marketplace */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Handcrafted Journeys</span>
            <h2>Featured Tour Packages</h2>
            <p>100% customizable private tours with dedicated air-conditioned vehicles and handpicked 4-5★ stays.</p>
          </div>

          <div className="tours-grid">
            {TOURS.slice(0, 3).map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/tours" className="btn btn-primary btn-lg">
              <span>Browse All Tour Itineraries &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Trip Builder Teaser */}
      <section className="section builder-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Bespoke Travel Engineering</span>
            <h2 style={{ color: '#ffffff', fontSize: '2.6rem', marginBottom: '1rem' }}>
              BUILD YOUR PERFECT SRI LANKA TRIP
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Select your favorite destinations, duration, accommodation style, and pace. Our interactive trip planner calculates an instant estimate and crafts a personalized proposal in hours.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/custom-tour" className="btn btn-gold btn-lg">
                <span>Start Trip Builder Wizard &rarr;</span>
              </Link>
              <Link href="/contact" className="btn btn-outline-white btn-lg">
                <span>Talk to a Travel Specialist</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Handpicked Hotels Teaser */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Sanctuaries of Ceylon</span>
            <h2>Handpicked Luxury Resorts & Eco Villas</h2>
            <p>From converted 19th-century tea factories to ocean cliff sanctuaries.</p>
          </div>

          <div className="hotels-grid">
            {HOTELS.slice(0, 3).map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/hotels" className="btn btn-outline">
              <span>Explore All Hotels & Stays &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Curated Experiences */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Unforgettable Moments</span>
            <h2>Experiences & Activities</h2>
            <p>Private game drives, scenic mountain trains, whale watching, and village culinary masterclasses.</p>
          </div>

          <div className="activities-grid">
            {ACTIVITIES.slice(0, 3).map(act => (
              <ActivityCard key={act.id} activity={act} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/activities" className="btn btn-outline">
              <span>Discover All Experiences &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Transport Callout */}
      <section className="section" style={{ background: '#002D59', color: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>Door-to-Door Freedom</span>
            <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '1rem' }}>
              Private Chauffeur Fleet & Airport Transfers
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Enjoy transparent fixed-rate airport transfers from Colombo BIA and private daily vehicle hire with licensed, tourist-board certified English-speaking drivers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/transport" className="btn btn-gold">
                <span>Airport Fare Calculator &rarr;</span>
              </Link>
              <Link href="/transport" className="btn btn-outline-white">
                <span>View Vehicle Fleet</span>
              </Link>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury Sedan" 
              style={{ borderRadius: '16px', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
        </div>
      </section>

      {/* Traveler Reviews */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Trust & Experiences</span>
            <h2>What International Travelers Say</h2>
            <p>Verified reviews from guests across the UK, Germany, Australia, and France.</p>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                  <div>
                    <h4 className="reviewer-name">{rev.name}</h4>
                    <div className="reviewer-country">{rev.flag} {rev.country} • <span style={{ color: '#64748B' }}>{rev.date}</span></div>
                  </div>
                </div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>★★★★★</div>
                <h5 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#002D59' }}>"{rev.title}"</h5>
                <p className="review-quote">{rev.comment}</p>
                <div style={{ marginTop: 'auto' }}>
                  <span className="review-tour-tag">Booked: {rev.tour}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/reviews" className="btn btn-outline">
              <span>Read All Verified Traveler Reviews &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about planning and booking your Sri Lanka trip.</p>
          </div>

          <div className="faq-container">
            {FAQS.slice(0, 4).map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle-icon">▼</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/faq" className="btn btn-outline">
              <span>View Full Travel FAQ Directory &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-text">
              <h2>Ready to Explore Sri Lanka?</h2>
              <p>Subscribe to receive secret travel itineraries, seasonal discounts, and weather insights.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); showToast('🎉 Thank you for subscribing to KCSTours Ceylon dispatch!'); e.target.reset(); }}>
              <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-gold">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
