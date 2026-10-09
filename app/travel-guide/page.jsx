'use client';

import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data';

export default function TravelGuidePage() {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Sri Lanka Travel Guide</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Island Wisdom & Guides</span>
          <h1>Sri Lanka Travel Guide & Expert Insights</h1>
          <p>
            Essential guidance for first-time and returning travelers: weather patterns, ETA visas, cultural etiquette, and hidden treasures.
          </p>
        </div>

        <div className="articles-grid">
          {ARTICLES.map(art => (
            <Link key={art.id} href={`/travel-guide/${art.id}`} className="article-card">
              <div className="article-img-wrap">
                <img src={art.image} alt={art.title} loading="lazy" />
              </div>
              <div className="article-body">
                <div className="article-meta">
                  <span className="badge badge-blue">{art.category}</span>
                  <span>⏱️ {art.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>{art.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  {art.summary}
                </p>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#005696', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Read Complete Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
