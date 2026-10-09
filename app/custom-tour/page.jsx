'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function CustomTourPage() {
  const { formatPrice, showToast } = useApp();
  const [step, setStep] = useState(1);

  // Wizard state
  const [selectedDests, setSelectedDests] = useState(['sigiriya', 'kandy', 'ella']);
  const [durationDays, setDurationDays] = useState(7);
  const [travelMonth, setTravelMonth] = useState('December 2026');
  const [travelerType, setTravelerType] = useState('couple');
  const [hotelTier, setHotelTier] = useState('superior');
  const [interests, setInterests] = useState(['wildlife', 'scenic_train', 'culture']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic estimate calculation
  const baseRate = { standard: 110, superior: 155, luxury: 285 }[hotelTier] || 155;
  const activitiesTotal = interests.length * 35;
  const costPerPerson = Math.round((baseRate * durationDays) + activitiesTotal);

  const toggleDest = (id) => {
    setSelectedDests(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const toggleInterest = (id) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your name and email address to receive your custom proposal.');
      return;
    }
    setSubmitted(true);
    showToast('🎉 Custom trip request received! Our destination team will prepare your itinerary.');
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem', background: '#091322', color: '#ffffff', minHeight: '90vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#38BDF8' }}>Home</Link> &nbsp;/&nbsp; <span>Custom Trip Builder</span>
        </div>

        <div className="section-header" style={{ color: '#ffffff' }}>
          <span className="section-tag" style={{ color: '#38BDF8' }}>Interactive Trip Engineering</span>
          <h1 style={{ color: '#ffffff' }}>BUILD YOUR PERFECT SRI LANKA TRIP</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            Tell us where you want to go and how you love to travel. Receive a personalized itinerary and guaranteed direct quote.
          </p>
        </div>

        {submitted ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #00A3C4',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '0.6rem' }}>
              Custom Journey Request Dispatched!
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Ayubowan <strong>{name}</strong>! We have received your {durationDays}-day custom Sri Lanka journey requirements. A senior destination specialist is assembling your day-by-day itinerary proposal and hotel vouchers. We will send the PDF quote to <strong>{email}</strong> within 2 hours.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-gold">
                Back to Homepage
              </Link>
              <a 
                href={`https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20just%20submitted%20a%20custom%20trip%20request%20for%20${name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                💬 Chat With Us on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="builder-box">
            {/* Steps Indicator */}
            <div className="builder-steps-indicator">
              {[
                { num: 1, label: 'Destinations' },
                { num: 2, label: 'Duration' },
                { num: 3, label: 'Who\'s Traveling' },
                { num: 4, label: 'Style & Stays' },
                { num: 5, label: 'Your Proposal' }
              ].map(s => (
                <div 
                  key={s.num}
                  className={`step-node ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
                  onClick={() => setStep(s.num)}
                >
                  <div className="step-circle">{step > s.num ? '✓' : s.num}</div>
                  <span className="step-title">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Step 1: Destinations */}
            {step === 1 && (
              <div className="builder-step-content active">
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  Which destinations would you love to include?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
                  Select all that inspire you. We will optimize the driving route with your chauffeur.
                </p>

                <div className="builder-grid-select" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.2rem' }}>
                  {DESTINATIONS.map(dest => {
                    const isSelected = selectedDests.includes(dest.id);
                    return (
                      <div 
                        key={dest.id}
                        className={`builder-dest-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleDest(dest.id)}
                      >
                        <div className="builder-dest-image-wrap">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="builder-dest-img" 
                            loading="lazy" 
                          />
                          <div className="builder-dest-img-overlay"></div>
                          {isSelected && (
                            <span className="builder-dest-selected-check" title="Destination selected">
                              ✓
                            </span>
                          )}
                          <span className="builder-dest-duration-badge">
                            ⏱️ {dest.estimatedStay}
                          </span>
                        </div>
                        <div className="builder-dest-content">
                          <h4>{dest.name}</h4>
                          <p>{dest.tagline}</p>
                          <div className="builder-dest-meta">
                            <span>Explore: {dest.visitDuration}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="builder-nav-btns">
                  <div></div>
                  <button className="btn btn-gold btn-lg" onClick={() => setStep(2)}>
                    Next: Journey Duration &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Duration */}
            {step === 2 && (
              <div className="builder-step-content active">
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  How long is your ideal holiday?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
                  Choose your duration and approximate travel window.
                </p>

                <div className="builder-grid-select">
                  {[
                    { days: 5, icon: '⚡', title: '5 Days', desc: 'Short Break / Highlights' },
                    { days: 7, icon: '⭐', title: '7 Days', desc: 'Classic 1 Week (Popular)' },
                    { days: 10, icon: '🌟', title: '10 Days', desc: 'Complete Ceylon Odyssey' },
                    { days: 14, icon: '👑', title: '14+ Days', desc: 'Deep Island Immersion' }
                  ].map(item => (
                    <div 
                      key={item.days}
                      className={`builder-choice-card ${durationDays === item.days ? 'selected' : ''}`}
                      onClick={() => setDurationDays(item.days)}
                    >
                      <div className="builder-choice-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ maxWidth: '350px', marginTop: '1.5rem' }}>
                  <label className="form-label" style={{ color: '#ffffff' }}>Approximate Travel Month</label>
                  <select 
                    className="form-control" 
                    value={travelMonth} 
                    onChange={(e) => setTravelMonth(e.target.value)}
                  >
                    <option>November 2026</option>
                    <option>December 2026 (Peak Season)</option>
                    <option>January 2027</option>
                    <option>February 2027</option>
                    <option>March - May 2027</option>
                    <option>Summer 2027</option>
                  </select>
                </div>

                <div className="builder-nav-btns">
                  <button className="btn btn-outline-white" onClick={() => setStep(1)}>&larr; Back</button>
                  <button className="btn btn-gold btn-lg" onClick={() => setStep(3)}>Next: Who's Traveling &rarr;</button>
                </div>
              </div>
            )}

            {/* Step 3: Traveling Party */}
            {step === 3 && (
              <div className="builder-step-content active">
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  Who is traveling on this journey?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
                  We tailor vehicle sizes, child amenities, and romantic touches accordingly.
                </p>

                <div className="builder-grid-select">
                  {[
                    { id: 'couple', icon: '💑', title: 'Couple / Honeymoon', desc: 'Private luxury sedan & romantic dinners' },
                    { id: 'family', icon: '👨‍👩‍👧‍👦', title: 'Family with Kids', desc: 'High-roof van, spacious comfort & pools' },
                    { id: 'solo', icon: '🎒', title: 'Solo Explorer', desc: 'Private driver safety & full flexibility' },
                    { id: 'friends', icon: '🥂', title: 'Friends Group', desc: 'Adventure safaris & shared memories' }
                  ].map(item => (
                    <div 
                      key={item.id}
                      className={`builder-choice-card ${travelerType === item.id ? 'selected' : ''}`}
                      onClick={() => setTravelerType(item.id)}
                    >
                      <div className="builder-choice-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="builder-nav-btns">
                  <button className="btn btn-outline-white" onClick={() => setStep(2)}>&larr; Back</button>
                  <button className="btn btn-gold btn-lg" onClick={() => setStep(4)}>Next: Stays & Style &rarr;</button>
                </div>
              </div>
            )}

            {/* Step 4: Stays & Style */}
            {step === 4 && (
              <div className="builder-step-content active">
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  What accommodation style suits you?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
                  All properties include daily breakfast and verified high standards.
                </p>

                <div className="builder-grid-select">
                  {[
                    { id: 'standard', icon: '🌿', title: '3★ Boutique & Eco', desc: 'Charming, authentic & atmospheric' },
                    { id: 'superior', icon: '✨', title: '4★ Superior Comfort', desc: 'Infinity pools, spas & great views (Most Popular)' },
                    { id: 'luxury', icon: '💎', title: '5★ Luxury & Heritage', desc: 'Relais & Châteaux, Tea Trails & Ocean Villas' }
                  ].map(item => (
                    <div 
                      key={item.id}
                      className={`builder-choice-card ${hotelTier === item.id ? 'selected' : ''}`}
                      onClick={() => setHotelTier(item.id)}
                    >
                      <div className="builder-choice-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '1.5rem 0 0.8rem 0' }}>
                  Must-Include Experiences
                </h4>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'wildlife', label: '🐆 Leopard / Elephant Safari' },
                    { id: 'scenic_train', label: '🚂 Iconic Blue Mountain Train' },
                    { id: 'culture', label: '🛕 Sigiriya & Temple of Tooth' },
                    { id: 'whales', label: '🐋 Mirissa Blue Whale Cruise' },
                    { id: 'cooking', label: '🥘 Village Cooking Masterclass' },
                    { id: 'ayurveda', label: '💆 Authentic Herbal Spa' }
                  ].map(int => (
                    <button
                      key={int.id}
                      type="button"
                      className={`filter-btn ${interests.includes(int.id) ? 'active' : ''}`}
                      onClick={() => toggleInterest(int.id)}
                      style={{ background: interests.includes(int.id) ? '#00A3C4' : 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      {int.label}
                    </button>
                  ))}
                </div>

                <div className="builder-nav-btns">
                  <button className="btn btn-outline-white" onClick={() => setStep(3)}>&larr; Back</button>
                  <button className="btn btn-gold btn-lg" onClick={() => setStep(5)}>Review & Get Quote &rarr;</button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <div className="builder-step-content active">
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  Your Custom Journey Summary
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
                  Here is an instant live quote estimate based on your selections.
                </p>

                <div className="builder-summary-card">
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                      Estimated Starting Price Per Person
                    </div>
                    <div className="builder-estimate-price">
                      {formatPrice(costPerPerson)}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>
                      Includes {durationDays} days private vehicle, dedicated driver, fuel, tolls, {hotelTier} hotels & breakfast.
                    </div>
                  </div>
                  <span className="badge badge-gold">SLTDA Protected Direct Rate</span>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#ffffff' }}>Your Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. David Henderson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#ffffff' }}>Email Address *</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="e.g. david@example.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#ffffff' }}>WhatsApp / Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="+44 7911 123456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#ffffff' }}>Special Wishes or Flight Details</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Honeymoon upgrade, child seat needed"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="builder-nav-btns">
                    <button type="button" className="btn btn-outline-white" onClick={() => setStep(4)}>&larr; Back</button>
                    <button type="submit" className="btn btn-gold btn-lg">
                      Request My Custom Itinerary Proposal ✨
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
