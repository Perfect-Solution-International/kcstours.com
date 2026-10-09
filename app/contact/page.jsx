'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    travelMonth: 'December 2026',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('🎉 Message sent! Our team will contact you shortly.');
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Contact Us</span>
        </div>

        <div className="section-header">
          <span className="section-tag">24/7 Island Concierge</span>
          <h1>Connect With Our Sri Lanka Travel Specialists</h1>
          <p>
            Whether planning a family safari, romantic honeymoon, or private airport transfer, our destination experts are here to assist 24 hours a day.
          </p>
        </div>

        <div className="contact-card-box" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid #E2E8F0',
          marginBottom: '4rem'
        }}>
          {/* Left Details */}
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#002D59', marginBottom: '1rem' }}>
              We're Here For You
            </h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '2rem' }}>
              Reach out directly on WhatsApp for an immediate answer or submit your travel inquiry below. We typically respond within 15–30 minutes during island operating hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="icon-btn" style={{ background: '#E8F5E9', color: '#10B981', fontSize: '1.3rem' }}>💬</div>
                <div>
                  <strong style={{ color: '#002D59', display: 'block' }}>WhatsApp 24/7 Concierge:</strong>
                  <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontWeight: 600 }}>
                    +94 77 123 4567 (Click to chat)
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="icon-btn" style={{ background: '#EBF4FC', color: '#005696', fontSize: '1.3rem' }}>📞</div>
                <div>
                  <strong style={{ color: '#002D59', display: 'block' }}>Direct International Hotline:</strong>
                  <a href="tel:+94771234567" style={{ color: '#005696' }}>+94 77 123 4567 / +94 11 234 5678</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="icon-btn" style={{ background: '#FEF3C7', color: '#B45309', fontSize: '1.3rem' }}>✉️</div>
                <div>
                  <strong style={{ color: '#002D59', display: 'block' }}>Email Support:</strong>
                  <a href="mailto:info@kcstours.com" style={{ color: '#B45309' }}>info@kcstours.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="icon-btn" style={{ background: '#F1F5F9', color: '#475569', fontSize: '1.3rem' }}>📍</div>
                <div>
                  <strong style={{ color: '#002D59', display: 'block' }}>Operations Center:</strong>
                  <span style={{ color: '#64748B' }}>Colombo & Negombo Coastal Hub, Sri Lanka</span>
                </div>
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              padding: '1.2rem',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              fontSize: '0.85rem',
              color: '#64748B'
            }}>
              🇱🇰 <strong>SLTDA Registered:</strong> License #SLTDA/SQA/TA/00892. Fully approved by the Sri Lanka Tourism Development Authority.
            </div>
          </div>

          {/* Right Form */}
          <div>
            {submitted ? (
              <div style={{
                background: '#E8F5E9',
                padding: '3rem 2rem',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #A7F3D0'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🎉</div>
                <h3 style={{ color: '#065F46', marginBottom: '0.4rem' }}>Message Received!</h3>
                <p style={{ color: '#047857', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you <strong>{formData.name}</strong>. A destination specialist has been assigned to your request and will contact you via email ({formData.email}) or WhatsApp.
                </p>
                <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Residence</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. United Kingdom"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Travel Month</label>
                  <select 
                    className="form-control"
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                  >
                    <option>November 2026</option>
                    <option>December 2026 (Peak Season)</option>
                    <option>January 2027</option>
                    <option>February 2027</option>
                    <option>March - May 2027</option>
                    <option>Summer 2027</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message or Trip Ideas *</label>
                  <textarea 
                    className="form-control" 
                    rows={4} 
                    placeholder="Tell us about the destinations you want to visit, group size, special requirements, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <span>Send Travel Inquiry</span>
                  <span>&rarr;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
