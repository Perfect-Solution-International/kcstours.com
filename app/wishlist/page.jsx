'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, formatPrice } = useApp();

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Wishlist</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Saved Journeys</span>
          <h1>Your Sri Lanka Wishlist</h1>
          <p>
            Review and organize your favorite tour packages, boutique hotels, and authentic experiences.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌴</div>
            <h3 style={{ fontSize: '1.4rem', color: '#002D59', marginBottom: '0.5rem' }}>
              Your Wishlist is Empty
            </h3>
            <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '2rem' }}>
              Explore our curated tours, stays, and activities. Click the heart icon (🤍) on any item to save it for easy access!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/tours" className="btn btn-primary">
                Browse Tour Packages &rarr;
              </Link>
              <Link href="/destinations" className="btn btn-outline">
                Explore Destinations
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="tours-grid" style={{ marginBottom: '3rem' }}>
              {wishlist.map(item => (
                <div key={item.id} className="tour-card">
                  <div className="tour-card-header">
                    <img 
                      src={item.heroImage || item.image} 
                      alt={item.title || item.name} 
                      className="tour-card-img" 
                    />
                    <button 
                      className="tour-wishlist-btn active"
                      onClick={() => toggleWishlist(item)}
                      title="Remove from Wishlist"
                    >
                      ❤️
                    </button>
                    <div className="tour-badge-top">
                      <span className="badge badge-teal">{item.type || 'Experience'}</span>
                    </div>
                  </div>

                  <div className="tour-card-body">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                      {item.title || item.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.2rem' }}>
                      {item.subtitle || item.tagline || item.location}
                    </p>

                    <div style={{
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #E2E8F0'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>From</span>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002D59' }}>
                          {formatPrice(item.priceUSD || item.startingPrice || 450)}
                        </div>
                      </div>
                      <Link 
                        href={`/book?${item.type || 'tour'}=${item.id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        Book Now &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '2.5rem',
              background: '#EBF4FC',
              borderRadius: '20px',
              border: '1px solid rgba(0, 86, 150, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div>
                <h3 style={{ color: '#002D59', fontSize: '1.4rem', marginBottom: '0.3rem' }}>
                  Combine your saved items into a custom itinerary
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
                  Our trip builder can link all your wishlist items into a seamless private tour route.
                </p>
              </div>
              <Link href="/custom-tour" className="btn btn-gold btn-lg">
                Build Trip with Saved Items &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
