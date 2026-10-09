'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DESTINATIONS, TOURS, HOTELS, ACTIVITIES } from '@/lib/data';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, formatPrice } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedTours = q ? TOURS.filter(t => t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)) : [];
  const matchedDests = q ? DESTINATIONS.filter(d => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)) : [];
  const matchedHotels = q ? HOTELS.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)) : [];
  const matchedActs = q ? ACTIVITIES.filter(a => a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q)) : [];

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}>
      <div className="modal-dialog" style={{ maxWidth: '650px' }}>
        <button className="modal-close-btn" onClick={closeSearch}>&times;</button>
        <div style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-navy)' }}>
            Search KCSTours Sri Lanka
          </h3>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search destination, tour, hotel, or activity (e.g. Sigiriya, Safari, Train)..." 
              style={{ fontSize: '1.1rem', padding: '0.85rem 1.2rem' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {!q && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                Type any destination (e.g. Sigiriya, Ella, Galle), tour type, hotel, or activity...
              </div>
            )}

            {matchedTours.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#00A3C4', margin: '0.5rem 0' }}>
                  Tour Packages ({matchedTours.length})
                </div>
                {matchedTours.map(t => (
                  <Link 
                    key={t.id} 
                    href={`/tours/${t.id}`}
                    onClick={closeSearch}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.7rem 0.9rem',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      marginBottom: '0.4rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#002D59' }}>{t.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>⏱️ {t.duration} • from {formatPrice(t.priceUSD)}</div>
                    </div>
                    <span className="btn btn-outline btn-sm">View Tour &rarr;</span>
                  </Link>
                ))}
              </div>
            )}

            {matchedDests.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#00A3C4', margin: '0.5rem 0' }}>
                  Destinations ({matchedDests.length})
                </div>
                {matchedDests.map(d => (
                  <Link 
                    key={d.id} 
                    href={`/destinations/${d.id}`}
                    onClick={closeSearch}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.7rem 0.9rem',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      marginBottom: '0.4rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#002D59' }}>📍 {d.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{d.tagline}</div>
                    </div>
                    <span className="btn btn-outline btn-sm">Explore &rarr;</span>
                  </Link>
                ))}
              </div>
            )}

            {matchedHotels.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#00A3C4', margin: '0.5rem 0' }}>
                  Hotels & Resorts ({matchedHotels.length})
                </div>
                {matchedHotels.map(h => (
                  <Link 
                    key={h.id} 
                    href={`/hotels/${h.id}`}
                    onClick={closeSearch}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.7rem 0.9rem',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      marginBottom: '0.4rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#002D59' }}>🏨 {h.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>📍 {h.location} • from {formatPrice(h.priceUSD)}/night</div>
                    </div>
                    <span className="btn btn-outline btn-sm">View &rarr;</span>
                  </Link>
                ))}
              </div>
            )}

            {q && matchedTours.length === 0 && matchedDests.length === 0 && matchedHotels.length === 0 && matchedActs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                No results found for "{query}". Try searching for 'Sigiriya', 'Safari', or 'Train'.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
