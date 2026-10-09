'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/data';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const art = ARTICLES.find(a => a.id === id);

  if (!art) {
    return notFound();
  }

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '380px',
        background: `#091322 url('${art.image}') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem 0',
        color: '#ffffff'
      }}>
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; 
            <Link href="/travel-guide" style={{ color: '#38BDF8' }}>Travel Guide</Link> &nbsp;/&nbsp; 
            <span>{art.category}</span>
          </div>
          <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>{art.category}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ffffff', marginBottom: '0.5rem' }}>
            {art.title}
          </h1>
          <div style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>
            {art.date} • {art.readTime}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px', marginTop: '3.5rem' }}>
        {/* Lead Quote */}
        <div style={{
          fontSize: '1.2rem',
          lineHeight: 1.8,
          color: '#002D59',
          fontWeight: 500,
          borderLeft: '4px solid #00A3C4',
          paddingLeft: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {art.summary}
        </div>

        {/* Content */}
        <div style={{
          fontSize: '1.05rem',
          lineHeight: 1.9,
          color: '#334155',
          whiteSpace: 'pre-line'
        }}>
          {art.content}
        </div>

        {/* Call to Action Box */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: '#EBF4FC',
          borderRadius: '20px',
          border: '1.5px solid rgba(0, 86, 150, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ color: '#002D59', fontSize: '1.4rem', marginBottom: '0.3rem' }}>
              Ready to experience Sri Lanka with local experts?
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
              We design tailor-made journeys around your exact schedule and interests.
            </p>
          </div>
          <Link href="/custom-tour" className="btn btn-primary btn-lg">
            Plan My Trip &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
