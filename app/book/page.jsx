'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TOURS, HOTELS, ACTIVITIES, VEHICLES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

function BookingContent() {
  const searchParams = useSearchParams();
  const { formatPrice, showToast } = useApp();

  const tourParam = searchParams.get('tour');
  const hotelParam = searchParams.get('hotel');
  const actParam = searchParams.get('activity');
  const vehParam = searchParams.get('vehicle');
  const transferParam = searchParams.get('type') === 'transfer';

  // Determine item
  let initialItem = TOURS[0];
  let itemType = 'tour';

  if (tourParam) {
    const found = TOURS.find(t => t.id === tourParam);
    if (found) { initialItem = found; itemType = 'tour'; }
  } else if (hotelParam) {
    const found = HOTELS.find(h => h.id === hotelParam);
    if (found) { initialItem = found; itemType = 'hotel'; }
  } else if (actParam) {
    const found = ACTIVITIES.find(a => a.id === actParam);
    if (found) { initialItem = found; itemType = 'activity'; }
  } else if (vehParam) {
    const found = VEHICLES.find(v => v.id === vehParam);
    if (found) { initialItem = found; itemType = 'vehicle'; }
  } else if (transferParam) {
    const dest = searchParams.get('dest') || 'Colombo City Center';
    const fare = parseInt(searchParams.get('fare')) || 45;
    initialItem = { title: `BIA Airport to ${dest} Transfer`, priceUSD: fare, heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80' };
    itemType = 'transfer';
  }

  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [adults, setAdults] = useState(parseInt(searchParams.get('adults')) || 2);
  const [children, setChildren] = useState(parseInt(searchParams.get('children')) || 0);
  const [addons, setAddons] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('deposit_20');
  const [bookingRef, setBookingRef] = useState('');

  const basePrice = selectedItem.priceUSD || selectedItem.pricePerDayUSD || 450;
  const subtotal = (basePrice * adults) + (basePrice * 0.5 * children);
  const addonsTotal = addons.reduce((acc, curr) => acc + curr.price, 0);
  const grandTotal = subtotal + addonsTotal;
  const depositAmount = Math.round(grandTotal * 0.20);

  const toggleAddon = (id, label, price, checked) => {
    if (checked) setAddons(prev => [...prev, { id, label, price }]);
    else setAddons(prev => prev.filter(a => a.id !== id));
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your full name and email to proceed.');
      return;
    }
    setStep(4);
  };

  const handleConfirmBooking = () => {
    const ref = `KCS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setStep(5);
    showToast('🎉 Booking confirmed! Your voucher is generated.');
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Online Booking Engine</span>
        </div>

        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Direct Confirmation</span>
          <h1>Reserve Your Sri Lanka Experience</h1>
          <p>Official booking partner of the Sri Lanka Tourism Development Authority.</p>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div className="booking-header">
            <h3>Booking: {selectedItem.title || selectedItem.name}</h3>
            <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>
              Dedicated Chauffeur • Handpicked Stays • 24/7 Island Concierge
            </p>
          </div>

          {/* Stepper */}
          <div className="booking-stepper">
            <span className={`booking-step-badge ${step >= 1 ? 'active' : ''}`}>1. Guests & Date</span>
            <span className={`booking-step-badge ${step >= 2 ? 'active' : ''}`}>2. VIP Upgrades</span>
            <span className={`booking-step-badge ${step >= 3 ? 'active' : ''}`}>3. Traveler Info</span>
            <span className={`booking-step-badge ${step >= 4 ? 'active' : ''}`}>4. Payment Choice</span>
            <span className={`booking-step-badge ${step >= 5 ? 'active' : ''}`}>5. Voucher</span>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="booking-form-body">
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '1.2rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'center'
              }}>
                <img 
                  src={selectedItem.heroImage || selectedItem.image} 
                  alt={selectedItem.title || selectedItem.name} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <div>
                  <span className="badge badge-teal" style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    {itemType}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', color: '#002D59', margin: '0.2rem 0' }}>
                    {selectedItem.title || selectedItem.name}
                  </h4>
                  <div style={{ fontSize: '0.88rem', color: '#64748B' }}>
                    Base rate: <strong>{formatPrice(basePrice)}</strong> / adult
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Start Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Adult Travelers (12+ yrs)</label>
                  <select 
                    className="form-control"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Children (Under 12 yrs, 50% discount)</label>
                  <select 
                    className="form-control"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Chauffeur Guide Language</label>
                  <select className="form-control">
                    <option>English Speaking Licensed Chauffeur Guide</option>
                    <option>German Speaking Chauffeur Guide (+ $25/day)</option>
                    <option>French Speaking Chauffeur Guide (+ $25/day)</option>
                  </select>
                </div>
              </div>

              <div className="price-summary-box">
                <div className="price-summary-row">
                  <span>{adults} Adults × {formatPrice(basePrice)}</span>
                  <span>{formatPrice(basePrice * adults)}</span>
                </div>
                {children > 0 && (
                  <div className="price-summary-row">
                    <span>{children} Children (50% off) × {formatPrice(basePrice * 0.5)}</span>
                    <span>{formatPrice(basePrice * 0.5 * children)}</span>
                  </div>
                )}
                <div className="price-summary-row total">
                  <span>Estimated Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
                  Next: VIP Upgrades &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Addons */}
          {step === 2 && (
            <div className="booking-form-body">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#002D59' }}>
                Enhance Your Sri Lankan Journey
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Select optional VIP upgrades to make your trip effortless.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { id: 'vip_lounge', title: 'Colombo Airport VIP Silk Route Lounge', desc: 'Fast-track immigration, customs clearance, and executive lounge access', price: 60 },
                  { id: 'hotel_upgrade', title: '5-Star Luxury Room & Villa Upgrade', desc: 'Upgrade to superior ocean-view suites and heritage colonial bungalows', price: 220 },
                  { id: 'ayurveda_pack', title: 'Full 90-Minute Ayurvedic Body Massage', desc: 'Herbal oils, herbal steam bath, and relaxation treatment by certified doctor', price: 45 }
                ].map(opt => (
                  <label 
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.2rem',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      background: addons.some(a => a.id === opt.id) ? '#EBF4FC' : '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="checkbox"
                        checked={addons.some(a => a.id === opt.id)}
                        onChange={(e) => toggleAddon(opt.id, opt.title, opt.price, e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <div>
                        <strong style={{ color: '#002D59' }}>{opt.title}</strong>
                        <div style={{ fontSize: '0.82rem', color: '#64748B' }}>{opt.desc}</div>
                      </div>
                    </div>
                    <strong style={{ color: '#005696' }}>+{formatPrice(opt.price)}</strong>
                  </label>
                ))}
              </div>

              <div className="price-summary-box">
                <div className="price-summary-row">
                  <span>Base Package:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="price-summary-row">
                  <span>VIP Upgrades:</span>
                  <span>{formatPrice(addonsTotal)}</span>
                </div>
                <div className="price-summary-row total">
                  <span>Grand Total:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>&larr; Back</button>
                <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>Next: Lead Traveler &rarr;</button>
              </div>
            </div>
          )}

          {/* Step 3: Traveler Info */}
          {step === 3 && (
            <div className="booking-form-body">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#002D59' }}>
                Lead Traveler Contact Details
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Required to issue your official SLTDA travel voucher and coordinate airport pickup.
              </p>

              <form onSubmit={handleNextToPayment}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name (as in Passport) *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. John Henderson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="john@example.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Mobile Phone *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="+44 7911 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Residence *</label>
                    <select 
                      className="form-control"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option>United Kingdom 🇬🇧</option>
                      <option>Germany 🇩🇪</option>
                      <option>Australia 🇦🇺</option>
                      <option>United States 🇺🇸</option>
                      <option>France 🇫🇷</option>
                      <option>Canada 🇨🇦</option>
                      <option>Switzerland 🇨🇭</option>
                      <option>Other International</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests (Dietary, Bedding, Flight Numbers)</label>
                  <textarea 
                    className="form-control" 
                    rows={2} 
                    placeholder="e.g. Flight QR664 arriving 08:30 AM, vegetarian breakfast"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>&larr; Back</button>
                  <button type="submit" className="btn btn-primary btn-lg">Next: Payment & Confirm &rarr;</button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Payment Choice */}
          {step === 4 && (
            <div className="booking-form-body">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#002D59' }}>
                Select Flexible Payment Option
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Lock in your travel dates today with total peace of mind.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  border: `1.5px solid ${paymentMethod === 'deposit_20' ? '#005696' : '#E2E8F0'}`,
                  background: paymentMethod === 'deposit_20' ? '#EBF4FC' : '#ffffff',
                  borderRadius: '14px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="deposit_20" 
                    checked={paymentMethod === 'deposit_20'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginTop: '0.3rem' }}
                  />
                  <div>
                    <strong style={{ color: '#002D59' }}>Pay 20% Deposit Now ({formatPrice(depositAmount)})</strong>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Secure your chauffeur and hotel bookings. Settle remaining 80% 14 days before arrival or upon meeting your chauffeur in Sri Lanka.
                    </div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  border: `1.5px solid ${paymentMethod === 'full' ? '#005696' : '#E2E8F0'}`,
                  background: paymentMethod === 'full' ? '#EBF4FC' : '#ffffff',
                  borderRadius: '14px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="full" 
                    checked={paymentMethod === 'full'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginTop: '0.3rem' }}
                  />
                  <div>
                    <strong style={{ color: '#002D59' }}>Pay 100% In Full ({formatPrice(grandTotal)}) - 5% Early Bird Discount Applied</strong>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Instant confirmed electronic voucher with guaranteed vehicle upgrade.
                    </div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  border: `1.5px solid ${paymentMethod === 'wire' ? '#005696' : '#E2E8F0'}`,
                  background: paymentMethod === 'wire' ? '#EBF4FC' : '#ffffff',
                  borderRadius: '14px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="payMethod" 
                    value="wire" 
                    checked={paymentMethod === 'wire'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginTop: '0.3rem' }}
                  />
                  <div>
                    <strong style={{ color: '#002D59' }}>International Bank Wire Transfer (IBAN / SWIFT)</strong>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Receive an official commercial invoice with company banking details.
                    </div>
                  </div>
                </label>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '1.2rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                color: '#475569',
                marginBottom: '2rem'
              }}>
                🔒 <strong>256-Bit SSL Encrypted & SLTDA Bonded:</strong> Free cancellation up to 21 days prior to departure. Zero hidden fees.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-outline" onClick={() => setStep(3)}>&larr; Back</button>
                <button className="btn btn-gold btn-lg" onClick={handleConfirmBooking}>
                  Confirm Reservation & Issue Voucher 🎉
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmed Voucher */}
          {step === 5 && (
            <div className="booking-form-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
              <h2 style={{ fontSize: '1.8rem', color: '#002D59', marginBottom: '0.4rem' }}>
                Booking Successfully Confirmed!
              </h2>
              <p style={{ color: '#64748B', fontSize: '1rem' }}>
                Ayubowan! We look forward to welcoming you to Sri Lanka.
              </p>

              <div className="voucher-card" style={{ margin: '2rem 0' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Official Travel Confirmation Voucher
                </div>
                <div className="voucher-ref">{bookingRef}</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', textAlign: 'left', marginTop: '1.2rem', fontSize: '0.92rem' }}>
                  <div><strong>Tour / Service:</strong> {selectedItem.title || selectedItem.name}</div>
                  <div><strong>Start Date:</strong> {startDate}</div>
                  <div><strong>Travelers:</strong> {adults} Adults, {children} Children</div>
                  <div><strong>Lead Guest:</strong> {name} ({country})</div>
                  <div><strong>Total Amount:</strong> {formatPrice(grandTotal)}</div>
                  <div><strong>Status:</strong> <span style={{ color: '#10B981', fontWeight: 700 }}>✓ Confirmed & Protected</span></div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1', fontSize: '0.85rem', color: '#64748B' }}>
                  A formal confirmation copy has been sent to <strong>{email}</strong> and dispatched to your chauffeur guide.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" onClick={() => window.print()}>
                  🖨️ Print Voucher
                </button>
                <a 
                  href={`https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20have%20confirmed%20booking%20${bookingRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: '#25D366', borderColor: '#25D366' }}
                >
                  💬 WhatsApp Concierge
                </a>
                <Link href="/" className="btn btn-primary">
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}
