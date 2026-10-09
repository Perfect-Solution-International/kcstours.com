'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQS } from '@/lib/data';

export default function FAQPage() {
  const [filter, setFilter] = useState('all');
  const [activeFaq, setActiveFaq] = useState(0);

  const filtered = filter === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === filter);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Frequently Asked Questions</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Travel Knowledge</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Clear, transparent answers on booking policies, visas, transport inclusions, and traveling around Sri Lanka.
          </p>
        </div>

        {/* Filters */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Questions ({FAQS.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'booking' ? 'active' : ''}`}
            onClick={() => setFilter('booking')}
          >
            Bookings & Deposits
          </button>
          <button 
            className={`filter-btn ${filter === 'transport' ? 'active' : ''}`}
            onClick={() => setFilter('transport')}
          >
            Chauffeur Guides & Vehicles
          </button>
          <button 
            className={`filter-btn ${filter === 'visas' ? 'active' : ''}`}
            onClick={() => setFilter('visas')}
          >
            Visas & Entry
          </button>
          <button 
            className={`filter-btn ${filter === 'cancellation' ? 'active' : ''}`}
            onClick={() => setFilter('cancellation')}
          >
            Cancellations & Refunds
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-container">
          {filtered.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle-icon">
                  {activeFaq === idx ? '▲' : '▼'}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: '#F8FAFC',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          textAlign: 'center',
          maxWidth: '650px',
          margin: '4rem auto 0 auto'
        }}>
          <h3 style={{ fontSize: '1.4rem', color: '#002D59', marginBottom: '0.5rem' }}>
            Have a question not listed here?
          </h3>
          <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Our local destination specialists are online 24/7 on WhatsApp to answer any specific query about your upcoming trip.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Contact Concierge &rarr;
            </Link>
            <a 
              href="https://wa.me/94771234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
