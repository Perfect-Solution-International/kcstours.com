'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VEHICLES, AIRPORT_TRANSFERS } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function TransportPage() {
  const router = useRouter();
  const { formatPrice } = useApp();
  const [selectedDropoff, setSelectedDropoff] = useState('Colombo City Center');
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');

  const routeInfo = AIRPORT_TRANSFERS.find(r => r.to.toLowerCase().includes(selectedDropoff.toLowerCase())) || AIRPORT_TRANSFERS[1];
  const fare = selectedVehicle === 'van' ? routeInfo.vanUSD : routeInfo.sedanUSD;

  const handleBookTransfer = () => {
    router.push(`/book?type=transfer&dest=${encodeURIComponent(routeInfo.to)}&veh=${selectedVehicle}&fare=${fare}`);
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Transportation & Chauffeurs</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Island Fleet & Transfers</span>
          <h1>Private Vehicles & Dedicated Chauffeur Guides</h1>
          <p>
            Explore Sri Lanka safely and comfortably in modern air-conditioned vehicles with Tourist Board licensed chauffeur-guides.
          </p>
        </div>

        {/* Airport Transfer Calculator Box */}
        <div className="transfer-calculator-box" style={{ marginBottom: '4rem', padding: '2.5rem', background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.6rem' }}>✈️</span>
            <h2 style={{ fontSize: '1.5rem', color: '#002D59', margin: 0 }}>
              Colombo Airport (BIA / CMB) Fixed-Rate Transfer Calculator
            </h2>
          </div>
          <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.8rem' }}>
            Guaranteed flat rates. Your private chauffeur waits inside the arrivals terminal with a personalized name-board. Tolls, fuel, and flight delay tracking included.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Pickup Location</label>
              <select className="form-control" disabled>
                <option>Bandaranaike International Airport (CMB / BIA)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Destination City / Resort</label>
              <select 
                className="form-control"
                value={selectedDropoff}
                onChange={(e) => setSelectedDropoff(e.target.value)}
              >
                {AIRPORT_TRANSFERS.map((t, idx) => (
                  <option key={idx} value={t.to}>{t.to} ({t.duration})</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Vehicle Type</label>
              <select 
                className="form-control"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <option value="sedan">Luxury Sedan (1-3 Pax + 2 Large Bags)</option>
                <option value="van">High-Roof Van (4-8 Pax + 6 Large Bags)</option>
              </select>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px dashed #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Estimated Journey Time: <strong>{routeInfo.duration}</strong>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#002D59' }}>
                {formatPrice(fare)} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#64748B' }}>(Guaranteed Flat Fare)</span>
              </div>
            </div>
            <button className="btn btn-gold btn-lg" onClick={handleBookTransfer}>
              Book Airport Transfer Now &rarr;
            </button>
          </div>
        </div>

        {/* Private Fleet Showcase */}
        <h2 style={{ fontSize: '1.8rem', color: '#002D59', marginBottom: '1.5rem' }}>
          Our Private Chauffeur Vehicle Fleet
        </h2>
        <div className="vehicle-fleet-grid" style={{ marginBottom: '4rem' }}>
          {VEHICLES.map(veh => (
            <div key={veh.id} className="vehicle-card">
              <img src={veh.image} alt={veh.name} className="vehicle-card-img" loading="lazy" />
              <h3 style={{ fontSize: '1.25rem', color: '#002D59', marginBottom: '0.2rem' }}>{veh.name}</h3>
              <div style={{ fontSize: '0.82rem', color: '#00A3C4', fontWeight: 600, marginBottom: '0.8rem' }}>{veh.models}</div>
              
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.88rem', fontWeight: 600, color: '#1E293B', marginBottom: '1rem' }}>
                <span>👥 {veh.capacity}</span>
                <span>🧳 {veh.luggage}</span>
              </div>

              <ul className="vehicle-features">
                {veh.features.map((f, idx) => (
                  <li key={idx}><span style={{ color: '#10B981' }}>✓</span> {f}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Per Day (Chauffeur + Fuel)</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#002D59' }}>{formatPrice(veh.pricePerDayUSD)}</div>
                </div>
                <Link href={`/book?vehicle=${veh.id}`} className="btn btn-outline btn-sm">
                  Hire Vehicle
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Chauffeur Guarantees */}
        <div style={{
          background: 'var(--grad-primary)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '1rem' }}>
            Why Travel With a KCSTours Dedicated Chauffeur?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem', marginTop: '1.5rem' }}>
            <div>
              <h4 style={{ color: '#F59E0B', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Zero Hidden Surcharges</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Fuel, expressway tolls, parking tickets, and chauffeur meals/quarters are 100% covered.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#38BDF8', fontSize: '1.1rem', marginBottom: '0.4rem' }}>SLTDA Certified Drivers</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Experienced national tour drivers vetted by Sri Lanka Tourism Development Authority.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#F59E0B', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Flexible Daily Rhythm</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Stop for king coconuts, photo opportunities, and artisan tea shops anytime you desire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
