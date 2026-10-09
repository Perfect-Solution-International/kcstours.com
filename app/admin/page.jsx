'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOURS, DESTINATIONS, EXCHANGE_RATES } from '@/lib/data';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Haulix Command Center States
  const [selectedFleetId, setSelectedFleetId] = useState('FL-01');
  const [timeRange, setTimeRange] = useState('today');
  const [overviewFilter, setOverviewFilter] = useState('all');
  const [overviewSearch, setOverviewSearch] = useState('');

  // Dashboard Scale Mode ('100' is 100% standard compact scale = zoom: 0.8)
  const [scaleMode, setScaleMode] = useState('100');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check existing session & scale
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('kcs_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
      const savedScale = sessionStorage.getItem('kcs_admin_scale');
      if (savedScale) {
        setScaleMode(savedScale);
      }
    }
  }, []);

  const currentZoom = scaleMode === '100' ? 0.8 : scaleMode === '90' ? 0.72 : 1.0;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();

    // Valid demo credentials
    if ((u === 'admin' || u === 'admin@kcstours.com') && p === 'kcstours2026') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kcs_admin_auth', 'true');
      }
      setIsAuthenticated(true);
      triggerToast('Welcome back, Operations Officer! Session authenticated.');
    } else {
      setLoginError('Invalid credentials. Please verify your admin username and password.');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kcs_admin_auth');
    }
    setIsAuthenticated(false);
    triggerToast('Logged out of operations console.');
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // 1. Bookings State
  const [bookings, setBookings] = useState([
    {
      id: 'KCS-2026-9281',
      guest: 'Sarah Jenkins',
      email: 'sarah.j@outlook.co.uk',
      phone: '+44 7911 123456',
      country: 'United Kingdom 🇬🇧',
      tour: '10 Days Complete Ceylon Odyssey',
      dates: '12 Oct - 22 Oct 2026',
      pax: '2 Adults',
      amount: 2780,
      currency: 'USD',
      status: 'Confirmed',
      assignedDriver: 'Nuwan Perera (Toyota Prado)',
      specialRequests: 'Honeymoon setup at Ella 98 Acres, vegetarian meal options requested.',
      paidAmount: 2780,
      createdAt: '2026-09-28'
    },
    {
      id: 'KCS-2026-8842',
      guest: 'Dr. Klaus Brandt',
      email: 'klaus.brandt@med-berlin.de',
      phone: '+49 170 9876543',
      country: 'Germany 🇩🇪',
      tour: '7 Days Sri Lanka Classic Highlights',
      dates: '05 Nov - 12 Nov 2026',
      pax: '3 Adults',
      amount: 2670,
      currency: 'USD',
      status: 'Deposit Paid',
      assignedDriver: 'Chaminda Silva (Mercedes Sprinter)',
      specialRequests: 'German speaking licensed national guide requested for Sigiriya & Polonnaruwa.',
      paidAmount: 800,
      createdAt: '2026-09-27'
    },
    {
      id: 'KCS-2026-7319',
      guest: 'Emily & Liam Evans',
      email: 'emily.evans@sydney.com.au',
      phone: '+61 400 555 123',
      country: 'Australia 🇦🇺',
      tour: '12 Days Grand Luxury Safari & Tea Trails',
      dates: '20 Nov - 02 Dec 2026',
      pax: '2 Adults',
      amount: 4900,
      currency: 'USD',
      status: 'Confirmed',
      assignedDriver: 'Rohan Jayasinghe (Toyota Land Cruiser)',
      specialRequests: 'Private leopard safari jeep in Yala Block 1 with senior wildlife tracker.',
      paidAmount: 4900,
      createdAt: '2026-09-25'
    },
    {
      id: 'KCS-2026-6104',
      guest: 'Marc Dupont',
      email: 'm.dupont@orange.fr',
      phone: '+33 6 12 34 56 78',
      country: 'France 🇫🇷',
      tour: 'Custom Family Wildlife & Beach Tour',
      dates: '15 Dec - 24 Dec 2026',
      pax: '2 Adults, 2 Kids',
      amount: 3850,
      currency: 'USD',
      status: 'Quoted',
      assignedDriver: 'Pending Chauffeur Assignment',
      specialRequests: 'Need 1 infant car seat and interconnecting rooms in Bentota resort.',
      paidAmount: 0,
      createdAt: '2026-09-26'
    },
    {
      id: 'KCS-2026-5520',
      guest: 'Rachel Moore',
      email: 'rachel.m@california.com',
      phone: '+1 415 555 8920',
      country: 'United States 🇺🇸',
      tour: '5 Days Cultural & Hill Country Wonders',
      dates: '02 Jan - 07 Jan 2027',
      pax: '2 Adults',
      amount: 1240,
      currency: 'USD',
      status: 'New Inquiry',
      assignedDriver: 'Pending Chauffeur Assignment',
      specialRequests: 'Interested in scenic first class observation train tickets from Kandy to Ella.',
      paidAmount: 0,
      createdAt: '2026-09-29'
    }
  ]);

  // 2. New Booking Form State
  const [newBooking, setNewBooking] = useState({
    guest: '',
    email: '',
    phone: '',
    country: 'United Kingdom 🇬🇧',
    tour: TOURS[0]?.title || '10 Days Complete Ceylon Odyssey',
    dates: '15 Nov - 25 Nov 2026',
    pax: '2 Adults',
    amount: 2500,
    status: 'New Inquiry',
    specialRequests: ''
  });

  // 3. Tour Packages State
  const [toursList, setToursList] = useState(
    TOURS.map(t => ({
      id: t.id,
      title: t.title,
      duration: t.duration,
      priceUSD: t.priceUSD,
      category: t.category,
      badge: t.badge,
      featured: true,
      active: true
    }))
  );

  // 3.5. Destinations & Estimated Durations CMS State
  const [destinationsList, setDestinationsList] = useState(
    DESTINATIONS.map(d => ({
      ...d,
      active: true
    }))
  );
  const [destFilter, setDestFilter] = useState('all');
  const [searchDestInput, setSearchDestInput] = useState('');

  // 4. Fleet State (Enriched with Haulix Telemetry & Island Coordinates)
  const [fleetList, setFleetList] = useState([
    {
      id: 'FL-01',
      model: 'Toyota Land Cruiser Prado 4x4',
      plate: 'WP CAD-4920',
      type: 'Luxury 4x4 SUV',
      capacity: '4 Pax + Luggage',
      chauffeur: 'Nuwan Perera',
      driverPhone: '+94 77 441 2930',
      license: 'SLTDA Tourist Driver #TD-9921',
      status: 'On Tour',
      currentLocation: 'Sigiriya -> Kandy Expressway',
      fuelLevel: '85%',
      speed: '68 km/h',
      temp: '21°C',
      eta: '16:45 PM',
      nextStop: 'Heritance Kandalama',
      rating: '4.98 ★',
      routeProgress: 72,
      activeGuest: 'Sarah Jenkins (UK 🇬🇧)',
      gpsCoords: '7.9570° N, 80.7603° E',
      statusColor: '#10B981',
      pinX: '52%',
      pinY: '38%'
    },
    {
      id: 'FL-02',
      model: 'Mercedes-Benz Sprinter Executive',
      plate: 'WP NB-8821',
      type: 'VIP Mini-Coach',
      capacity: '8-12 Luxury Leather Seats',
      chauffeur: 'Chaminda Silva',
      driverPhone: '+94 71 882 1049',
      license: 'SLTDA Chauffeur Guide #CG-3120',
      status: 'Available at BIA Airport',
      currentLocation: 'Katunayake BIA Airport Lounge',
      fuelLevel: '95%',
      speed: '0 km/h (Standby)',
      temp: '22°C',
      eta: 'Awaiting Flight QR 664',
      nextStop: 'BIA Silk Route Lounge',
      rating: '5.0 ★',
      routeProgress: 100,
      activeGuest: 'VIP Arrival Group (Germany 🇩🇪)',
      gpsCoords: '7.1808° N, 79.8841° E',
      statusColor: '#00A3C4',
      pinX: '33%',
      pinY: '56%'
    },
    {
      id: 'FL-03',
      model: 'Toyota KDH High-Roof Commuter',
      plate: 'WP PE-6512',
      type: 'Spacious Family Van',
      capacity: '7-9 Passengers',
      chauffeur: 'Rohan Jayasinghe',
      driverPhone: '+94 76 339 5012',
      license: 'SLTDA Tourist Chauffeur #TD-4481',
      status: 'On Tour',
      currentLocation: 'Ella Highlands & Tea Trails',
      fuelLevel: '70%',
      speed: '45 km/h',
      temp: '19°C',
      eta: '17:15 PM',
      nextStop: '98 Acres Resort & Spa',
      rating: '4.95 ★',
      routeProgress: 84,
      activeGuest: 'Emily & Liam Evans (Australia 🇦🇺)',
      gpsCoords: '6.8667° N, 81.0466° E',
      statusColor: '#10B981',
      pinX: '65%',
      pinY: '70%'
    },
    {
      id: 'FL-04',
      model: 'Toyota Camry Hybrid Luxury',
      plate: 'WP CAA-1190',
      type: 'Executive Sedan',
      capacity: '3 Passengers',
      chauffeur: 'Dinesh Gamage',
      driverPhone: '+94 77 102 9934',
      license: 'SLTDA Tourist Chauffeur #TD-8829',
      status: 'Scheduled Maintenance',
      currentLocation: 'Colombo Central Workshop',
      fuelLevel: '40%',
      speed: '0 km/h (Depot)',
      temp: 'Ambient',
      eta: 'Ready Tomorrow 08:00 AM',
      nextStop: 'Depot Fleet Inspection',
      rating: '4.92 ★',
      routeProgress: 0,
      activeGuest: 'No Active Assignment',
      gpsCoords: '6.9271° N, 79.8612° E',
      statusColor: '#EF4444',
      pinX: '36%',
      pinY: '72%'
    }
  ]);

  // 5. Customer Inquiries Inbox State
  const [messagesList, setMessagesList] = useState([
    {
      id: 'MSG-301',
      sender: 'Charlotte Davies',
      email: 'c.davies@londonlaw.co.uk',
      phone: '+44 7700 900077',
      subject: 'Custom 14 Days Honeymoon Itinerary with Tea Trails & Maldives Extension',
      date: 'Today, 02:40 PM',
      read: false,
      message: 'Hello KCSTours team, we are planning our honeymoon for November 2026. We would love private chauffeur travel, scenic train tickets to Ella, and 3 nights in a private pool villa. Could you share a customized proposal?'
    },
    {
      id: 'MSG-302',
      sender: 'Lars & Greta Lindqvist',
      email: 'lars.lindqvist@stockholm.se',
      phone: '+46 8 123 456',
      subject: 'Wildlife Photography Tour for Yala & Wilpattu',
      date: 'Yesterday, 07:15 PM',
      read: true,
      message: 'Hi, we are two wildlife photographers seeking dedicated full-day jeep safaris in Yala Block 1 & 5. We need beanbags, charging in vehicle, and an experienced wildlife naturalist guide.'
    },
    {
      id: 'MSG-303',
      sender: 'Oliver Smith',
      email: 'oliver.smith@melbourne.edu.au',
      phone: '+61 3 9000 1122',
      subject: 'Airport Transfer to Galle Fort with Surfboard Luggage',
      date: '28 Sep 2026',
      read: true,
      message: 'Looking for a private luxury van from Colombo BIA Airport direct to Galle Fort on 14th October at 09:30 AM. We have 2 big suitcases and 2 surfboards.'
    }
  ]);

  // 6. Settings State
  const [rates, setRates] = useState(EXCHANGE_RATES);
  const [hotline, setHotline] = useState('+94 77 123 4567');
  const [conciergeEmail, setConciergeEmail] = useState('concierge@kcstours.com');
  const [autoEmailConfirm, setAutoEmailConfirm] = useState(true);

  // Status Updater
  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    triggerToast(`Booking ${id} status changed to ${newStatus}`);
  };

  // Add Booking Handler
  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!newBooking.guest || !newBooking.tour) {
      alert('Please fill out the guest name and select a tour');
      return;
    }
    const newId = `KCS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const created = {
      id: newId,
      ...newBooking,
      amount: Number(newBooking.amount),
      paidAmount: newBooking.status === 'Confirmed' ? Number(newBooking.amount) : 0,
      createdAt: '2026-09-29',
      assignedDriver: 'Pending Chauffeur Assignment'
    };
    setBookings([created, ...bookings]);
    setShowAddModal(false);
    triggerToast(`New booking ${newId} created successfully!`);
    setNewBooking({
      guest: '',
      email: '',
      phone: '',
      country: 'United Kingdom 🇬🇧',
      tour: TOURS[0]?.title || '10 Days Complete Ceylon Odyssey',
      dates: '15 Nov - 25 Nov 2026',
      pax: '2 Adults',
      amount: 2500,
      status: 'New Inquiry',
      specialRequests: ''
    });
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchFilter = bookingFilter === 'all' || b.status.toLowerCase().includes(bookingFilter.toLowerCase());
      const matchSearch =
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [bookings, bookingFilter, searchQuery]);

  // Dynamic KPIs
  const totalRevenue = useMemo(() => bookings.reduce((sum, b) => sum + (b.amount || 0), 0), [bookings]);
  const confirmedCount = useMemo(() => bookings.filter(b => b.status === 'Confirmed').length, [bookings]);
  const activeFleetCount = useMemo(() => fleetList.filter(f => f.status === 'On Tour').length, [fleetList]);
  const pendingInquiriesCount = useMemo(() => bookings.filter(b => b.status === 'New Inquiry' || b.status === 'Quoted').length, [bookings]);

  // Haulix Dynamic Telemetry & Overview Table
  const activeVehicle = useMemo(() => fleetList.find(f => f.id === selectedFleetId) || fleetList[0], [fleetList, selectedFleetId]);

  const overviewBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchFilter = overviewFilter === 'all' || b.status.toLowerCase().includes(overviewFilter.toLowerCase());
      const matchSearch =
        b.id.toLowerCase().includes(overviewSearch.toLowerCase()) ||
        b.guest.toLowerCase().includes(overviewSearch.toLowerCase()) ||
        b.tour.toLowerCase().includes(overviewSearch.toLowerCase()) ||
        b.country.toLowerCase().includes(overviewSearch.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [bookings, overviewFilter, overviewSearch]);

  // If not authenticated, render dedicated secure login view
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper" style={{ zoom: currentZoom }}>
        <div className="admin-login-card">
          <div className="admin-login-header">
            <img src="/images/logo.png" alt="KCSTours" className="admin-login-logo" />
            <div className="badge badge-teal" style={{ marginTop: '0.8rem' }}>
              SECURE OPERATIONS GATEWAY
            </div>
            <h2>KCSTours Staff Sign In</h2>
            <p>Access Sri Lanka operations control, booking reservations, and chauffeur fleet dispatch.</p>
          </div>

          {loginError && (
            <div className="admin-login-error">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label className="admin-label">Admin Username / Staff Email</label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. admin or admin@kcstours.com"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group" style={{ marginTop: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="admin-label">Master Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', color: '#00A3C4', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  {showPassword ? 'Hide 👁️' : 'Show 👁️'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="admin-input"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.6rem', padding: '0.85rem' }}>
              🔒 Unlock Operations Console
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link href="/" style={{ color: '#94A3B8', fontSize: '0.85rem', textDecoration: 'none' }}>
                &larr; Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-container" style={{ zoom: currentZoom }}>
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast-alert">
          <span>✨</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-brand-link" title="KCSTours Sri Lanka">
            <img src="/images/logo.png" alt="KCSTours" className="admin-sidebar-logo" />
            <div className="admin-brand-text">
              <span className="admin-brand-title">KCSTours</span>
              <span className="admin-brand-tag">OPERATIONS PORTAL</span>
            </div>
          </Link>
          <button 
            className="admin-collapse-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Admin Profile Widget */}
        <div className="admin-profile-card">
          <div className="admin-avatar">
            <span>🇱🇰</span>
          </div>
          <div className="admin-profile-info">
            <div className="admin-profile-name">KCS Island Control</div>
            <div className="admin-profile-role">
              <span className="admin-status-dot"></span> Senior Operations Officer
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="admin-nav-icon">📊</span>
            <span className="admin-nav-label">Dashboard Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span className="admin-nav-icon">📑</span>
            <span className="admin-nav-label">Bookings & Inquiries</span>
            <span className="admin-nav-badge">{bookings.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'tours' ? 'active' : ''}`}
            onClick={() => setActiveTab('tours')}
          >
            <span className="admin-nav-icon">🗺️</span>
            <span className="admin-nav-label">Tour Packages CMS</span>
            <span className="admin-nav-badge sub">{toursList.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'destinations' ? 'active' : ''}`}
            onClick={() => setActiveTab('destinations')}
          >
            <span className="admin-nav-icon">📍</span>
            <span className="admin-nav-label">Destinations & Durations</span>
            <span className="admin-nav-badge sub">{destinationsList.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'fleet' ? 'active' : ''}`}
            onClick={() => setActiveTab('fleet')}
          >
            <span className="admin-nav-icon">🚗</span>
            <span className="admin-nav-label">Fleet & Chauffeurs</span>
            <span className="admin-nav-badge sub">{fleetList.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <span className="admin-nav-icon">💬</span>
            <span className="admin-nav-label">Customer Inquiries</span>
            {messagesList.filter(m => !m.read).length > 0 && (
              <span className="admin-nav-badge pulse">
                {messagesList.filter(m => !m.read).length} new
              </span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="admin-nav-icon">⚙️</span>
            <span className="admin-nav-label">Portal Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer Link to Public Website */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-live-site-btn">
            <span>🌐 View Live Website &rarr;</span>
          </Link>
          <button 
            type="button"
            onClick={handleLogout}
            className="admin-logout-btn"
            title="Lock operations portal and sign out"
          >
            🔒 Sign Out / Lock
          </button>
          <div className="admin-system-version">
            KCSTours CMS Engine v2.5.0 • Colombo Time (UTC+5:30)
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="admin-main-canvas">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button 
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <div className="admin-breadcrumb">
              <span>KCSTours Portal</span>
              <span className="sep">/</span>
              <span className="current">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'bookings' && 'Bookings & Inquiries'}
                {activeTab === 'tours' && 'Tour Packages CMS'}
                {activeTab === 'fleet' && 'Fleet & Chauffeurs Logistics'}
                {activeTab === 'messages' && 'Customer Inquiries Inbox'}
                {activeTab === 'settings' && 'System Configuration'}
              </span>
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Viewport Scale Control */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                background: 'rgba(255, 255, 255, 0.05)', 
                padding: '0.35rem 0.75rem', 
                borderRadius: '6px', 
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }}
              title="Dashboard Scaling (100% Compact / 90% Ultra / 125% Large)"
            >
              <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600 }}>🔍 Scale:</span>
              <select
                value={scaleMode}
                onChange={(e) => {
                  const val = e.target.value;
                  setScaleMode(val);
                  if (typeof window !== 'undefined') sessionStorage.setItem('kcs_admin_scale', val);
                }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#38BDF8', 
                  fontSize: '0.78rem', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  outline: 'none' 
                }}
              >
                <option value="100" style={{ background: '#0B1322', color: '#ffffff' }}>100% (Compact)</option>
                <option value="90" style={{ background: '#0B1322', color: '#ffffff' }}>90% (Ultra)</option>
                <option value="125" style={{ background: '#0B1322', color: '#ffffff' }}>125% (Large)</option>
              </select>
            </div>

            {/* Quick Live Site Link */}
            <Link href="/" target="_blank" className="admin-top-action-btn" title="Open live public website in new tab">
              <span>🌐 Live Website</span>
            </Link>

            {/* Logout button */}
            <button 
              type="button"
              onClick={handleLogout}
              className="admin-top-action-btn"
              title="Sign out of operations console"
              style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <span>🔒 Sign Out</span>
            </button>

            {/* Quick Add Booking CTA */}
            <button 
              className="btn btn-primary btn-sm admin-cta-btn"
              onClick={() => setShowAddModal(true)}
            >
              <span>+ New Booking</span>
            </button>

            {/* System Status Indicator */}
            <div className="admin-system-indicator" title="All KCSTours services running normal">
              <span className="pulse-dot"></span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="admin-canvas-body">
          {/* TAB 1: DASHBOARD OVERVIEW - HAULIX COMMAND CENTER */}
          {activeTab === 'overview' && (
            <div className="admin-tab-section animate-fade">
              {/* Haulix Operational Status Strip */}
              <div className="haulix-status-strip">
                <div className="haulix-telemetry-pills">
                  <span className="haulix-telemetry-pill live">
                    <span className="dispatch-status-dot online"></span>
                    <span>2 Fleet Units In Transit</span>
                  </span>
                  <span className="haulix-telemetry-pill">
                    <span className="dispatch-status-dot" style={{ background: '#00A3C4' }}></span>
                    <span>1 Airport VIP Standby</span>
                  </span>
                  <span className="haulix-telemetry-pill warning">
                    <span className="dispatch-status-dot busy"></span>
                    <span>1 Workshop Inspection</span>
                  </span>
                  <span className="haulix-telemetry-pill">
                    <span>⚡ 100% SLTDA Compliance</span>
                  </span>
                  <span className="haulix-telemetry-pill">
                    <span>🛰️ GPS Telemetry Synced</span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="haulix-time-filter">
                    {['today', 'weekly', 'monthly'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeRange(t)}
                        className={`haulix-time-btn ${timeRange === t ? 'active' : ''}`}
                      >
                        {t === 'today' ? 'Live (Today)' : t === 'weekly' ? 'This Week' : 'This Month'}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn btn-sm btn-outline-white"
                    onClick={() => triggerToast('Haulix radar synchronized with GPS satellite fleet telemetry.')}
                  >
                    🔄 Sync Radar
                  </button>
                  <button className="btn btn-sm btn-primary" onClick={() => setShowAddModal(true)}>
                    + New Booking
                  </button>
                </div>
              </div>

              {/* Haulix 4 Hero KPI Metric Cards */}
              <div className="haulix-kpi-grid">
                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-tag">FLEET TELEMETRY</span>
                    <div className="haulix-kpi-icon-wrap">🚗</div>
                  </div>
                  <div className="haulix-kpi-value">{activeFleetCount} / {fleetList.length} Active</div>
                  <div className="haulix-mini-progress">
                    <div className="haulix-mini-fill" style={{ width: `${(activeFleetCount / fleetList.length) * 100}%` }}></div>
                  </div>
                  <div className="haulix-kpi-meta">
                    <span className="haulix-trend-badge up">● 100% On-Time</span>
                    <span>{fleetList.length - activeFleetCount} Standby/Depot</span>
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-tag">OPERATIONAL REVENUE</span>
                    <div className="haulix-kpi-icon-wrap" style={{ color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.12)' }}>💎</div>
                  </div>
                  <div className="haulix-kpi-value">${totalRevenue.toLocaleString()}</div>
                  <div className="haulix-mini-progress">
                    <div className="haulix-mini-fill" style={{ width: `${Math.min(100, Math.round((totalRevenue / 50000) * 100))}%`, background: 'linear-gradient(90deg, #F59E0B, #B45309)' }}></div>
                  </div>
                  <div className="haulix-kpi-meta">
                    <span className="haulix-trend-badge up">↑ +18.4% MoM</span>
                    <span>Target: $50k (86%)</span>
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-tag">CONFIRMED DEPARTURES</span>
                    <div className="haulix-kpi-icon-wrap" style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.12)' }}>🏆</div>
                  </div>
                  <div className="haulix-kpi-value">{confirmedCount} Departures</div>
                  <div className="haulix-mini-progress">
                    <div className="haulix-mini-fill" style={{ width: '100%', background: 'linear-gradient(90deg, #10B981, #00A3C4)' }}></div>
                  </div>
                  <div className="haulix-kpi-meta">
                    <span className="haulix-trend-badge up">100% Chauffeur Assigned</span>
                    <span>Next: 12 Oct (UK)</span>
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-tag">DISPATCH LEADS</span>
                    <div className="haulix-kpi-icon-wrap" style={{ color: '#A855F7', borderColor: 'rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.12)' }}>⚡</div>
                  </div>
                  <div className="haulix-kpi-value">{pendingInquiriesCount} Quotes</div>
                  <div className="haulix-mini-progress">
                    <div className="haulix-mini-fill" style={{ width: '65%', background: 'linear-gradient(90deg, #A855F7, #EC4899)' }}></div>
                  </div>
                  <div className="haulix-kpi-meta">
                    <span className="haulix-trend-badge warn">Action Required</span>
                    <span>Avg Quote: 14m</span>
                  </div>
                </div>
              </div>

              {/* Haulix Split Command Center: Left Radar & Right Dispatch */}
              <div className="haulix-command-split">
                {/* LEFT: Live Island Fleet & Route Radar */}
                <div className="haulix-radar-card">
                  <div className="haulix-radar-header">
                    <div className="haulix-radar-title">
                      <span>🛰️ Sri Lanka Island Fleet & Route Radar</span>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>LIVE GPS RADAR</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                      Click any vehicle pin or tab to inspect telemetry
                    </div>
                  </div>

                  {/* Interactive Radar Visual Canvas */}
                  <div className="haulix-radar-screen">
                    <div className="haulix-radar-grid"></div>
                    <div className="haulix-radar-rings"></div>
                    <div className="haulix-radar-sweep"></div>

                    {/* Island Outline Watermark */}
                    <svg className="haulix-island-outline" viewBox="0 0 100 120" fill="none">
                      <path d="M48 10 C58 14, 68 28, 70 45 C72 62, 75 75, 68 95 C62 108, 48 115, 38 108 C28 100, 22 85, 25 65 C28 45, 38 25, 48 10 Z" stroke="#00A3C4" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>

                    {/* Key Strategic Island Corridor Waypoint Labels */}
                    <div style={{ position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: '#64748B', fontWeight: 700, pointerEvents: 'none' }}>
                      ▲ ANURADHAPURA & NORTH
                    </div>
                    <div style={{ position: 'absolute', top: '35%', left: '72%', fontSize: '0.65rem', color: '#64748B', fontWeight: 700, pointerEvents: 'none' }}>
                      TRINCOMALEE BAY ▶
                    </div>
                    <div style={{ position: 'absolute', top: '88%', left: '25%', fontSize: '0.65rem', color: '#64748B', fontWeight: 700, pointerEvents: 'none' }}>
                      ◀ GALLE & SOUTH
                    </div>

                    {/* Interactive Vehicle Nodes on Radar */}
                    {fleetList.map(vehicle => {
                      const isSelected = vehicle.id === activeVehicle.id;
                      return (
                        <div
                          key={vehicle.id}
                          className={`haulix-radar-node ${isSelected ? 'active' : ''}`}
                          style={{ left: vehicle.pinX, top: vehicle.pinY }}
                          onClick={() => setSelectedFleetId(vehicle.id)}
                          title={`${vehicle.plate} - ${vehicle.model} (${vehicle.chauffeur})`}
                        >
                          <div className="haulix-radar-pin" style={{ borderColor: vehicle.statusColor }}>
                            {isSelected && <span className="haulix-radar-ping" style={{ borderColor: vehicle.statusColor }}></span>}
                            <span>🚗</span>
                          </div>
                          <div className="haulix-radar-label">
                            <span style={{ color: vehicle.statusColor }}>● </span>
                            {vehicle.plate.replace('WP ', '')}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vehicle Selector Tabs */}
                  <div className="haulix-vehicle-tabs">
                    {fleetList.map(v => (
                      <div
                        key={v.id}
                        className={`haulix-v-tab ${v.id === activeVehicle.id ? 'active' : ''}`}
                        onClick={() => setSelectedFleetId(v.id)}
                      >
                        <div className="haulix-v-tab-head">
                          <span className="haulix-v-plate">{v.plate}</span>
                          <span className="haulix-v-dot" style={{ background: v.statusColor }}></span>
                        </div>
                        <div className="haulix-v-model">{v.model}</div>
                        <div className="haulix-v-driver">Chauffeur: {v.chauffeur}</div>
                      </div>
                    ))}
                  </div>

                  {/* Active Vehicle Telemetry HUD (Haulix Style) */}
                  <div className="haulix-telemetry-hud">
                    <div className="haulix-hud-grid">
                      <div className="haulix-hud-item">
                        <label>Cruise Speed</label>
                        <strong>⚡ {activeVehicle.speed}</strong>
                      </div>
                      <div className="haulix-hud-item">
                        <label>Fuel Reserve</label>
                        <strong style={{ color: '#38BDF8' }}>⛽ {activeVehicle.fuelLevel}</strong>
                      </div>
                      <div className="haulix-hud-item">
                        <label>Cabin Climate</label>
                        <strong>❄️ {activeVehicle.temp}</strong>
                      </div>
                      <div className="haulix-hud-item">
                        <label>Target ETA</label>
                        <strong style={{ color: '#10B981' }}>⏱️ {activeVehicle.eta}</strong>
                      </div>
                    </div>

                    <div className="haulix-hud-route-progress">
                      <div className="haulix-route-text">
                        <strong style={{ color: '#ffffff' }}>Active Destination:</strong> {activeVehicle.nextStop}
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                          Passenger: <strong>{activeVehicle.activeGuest}</strong> • Chauffeur: <strong>{activeVehicle.chauffeur}</strong> ({activeVehicle.license})
                        </div>
                      </div>
                      <div className="haulix-route-bar" title={`${activeVehicle.routeProgress}% Route Completed`}>
                        <div className="haulix-route-fill" style={{ width: `${activeVehicle.routeProgress}%` }}></div>
                      </div>
                      <a href={`tel:${activeVehicle.driverPhone}`} className="haulix-call-btn">
                        <span>📞 Dial Chauffeur</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Driver Readiness Grid & Flight Advisory */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Driver Availability & Duty Roster */}
                  <div className="admin-card" style={{ padding: '1.4rem' }}>
                    <div className="admin-card-header" style={{ marginBottom: '1rem', paddingBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.05rem' }}>Chauffeur Duty Readiness</h3>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>4 LICENSED</span>
                    </div>

                    <div className="haulix-drivers-list">
                      {fleetList.map(f => (
                        <div key={f.id} className="haulix-driver-card">
                          <div className="haulix-driver-left">
                            <div className="haulix-driver-avatar">
                              {f.chauffeur.charAt(0)}
                            </div>
                            <div className="haulix-driver-info">
                              <strong>{f.chauffeur}</strong>
                              <span>{f.model} • {f.plate}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                                <span style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: 700 }}>{f.rating}</span>
                                <span style={{ fontSize: '0.68rem', color: f.statusColor }}>● {f.status}</span>
                              </div>
                            </div>
                          </div>
                          <a href={`tel:${f.driverPhone}`} className="haulix-call-btn" title="Call licensed chauffeur">
                            📞 Call
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Island Dispatch & Live Flight Advisory */}
                  <div className="admin-card" style={{ padding: '1.4rem', flexGrow: 1 }}>
                    <div className="admin-card-header" style={{ marginBottom: '1rem', paddingBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.05rem' }}>Flight & Island Advisory</h3>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>LIVE DISPATCH</span>
                    </div>
                    <div className="dispatch-list">
                      <div className="dispatch-item">
                        <span className="dispatch-status-dot online"></span>
                        <div className="dispatch-info">
                          <strong>BIA Airport Arrival (Flight QR 664)</strong>
                          <p>Doha flight landed on time. Chauffeur Chaminda Silva received guests in VIP lounge.</p>
                        </div>
                        <span className="dispatch-time">14:10</span>
                      </div>

                      <div className="dispatch-item">
                        <span className="dispatch-status-dot online"></span>
                        <div className="dispatch-info">
                          <strong>Kandy ➔ Ella Observation Saloon Train</strong>
                          <p>First class panoramic seats validated. Vehicle tracking along Nuwara Eliya pass.</p>
                        </div>
                        <span className="dispatch-time">12:30</span>
                      </div>

                      <div className="dispatch-item">
                        <span className="dispatch-status-dot busy"></span>
                        <div className="dispatch-info">
                          <strong>Yala National Park Block 1 Safari Entry</strong>
                          <p>Private 4x4 safari jeep with senior naturalist cleared at Palatupana gate.</p>
                        </div>
                        <span className="dispatch-time">08:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Haulix High-Density Dispatch & Bookings Table */}
              <div className="haulix-table-card">
                <div className="haulix-table-toolbar">
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      Active Tour Reservations & Fleet Dispatch
                    </h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94A3B8' }}>
                      Real-time guest booking manifest with chauffeur assignments and billing status.
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div className="admin-search-box" style={{ maxWidth: '280px' }}>
                      <span className="search-icon">🔍</span>
                      <input
                        type="text"
                        placeholder="Search lead traveler, ref..."
                        value={overviewSearch}
                        onChange={(e) => setOverviewSearch(e.target.value)}
                        className="admin-search-input"
                        style={{ padding: '0.5rem 1rem 0.5rem 2.2rem', fontSize: '0.82rem' }}
                      />
                    </div>

                    <div className="admin-filter-pills">
                      {['all', 'confirmed', 'deposit paid', 'quoted', 'new inquiry'].map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setOverviewFilter(f)}
                          className={`filter-pill ${overviewFilter === f ? 'active' : ''}`}
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        >
                          {f === 'all' ? 'All Bookings' : f.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <button className="btn btn-sm btn-outline-white" onClick={() => setActiveTab('bookings')}>
                      Full Manager &rarr;
                    </button>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Dispatch Ref</th>
                        <th>Lead Traveler</th>
                        <th>Tour Package & Route</th>
                        <th>Dates & Pax</th>
                        <th>Assigned Chauffeur & Vehicle</th>
                        <th>Gross Value</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overviewBookings.slice(0, 6).map(b => (
                        <tr key={b.id}>
                          <td style={{ color: '#38BDF8', fontWeight: 800, fontFamily: 'monospace' }}>
                            {b.id}
                          </td>
                          <td>
                            <strong>{b.guest}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{b.country}</div>
                          </td>
                          <td>
                            <div style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                              {b.tour}
                            </div>
                          </td>
                          <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                            <div>{b.dates}</div>
                            <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>{b.pax}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
                              <span>🚗</span>
                              <span>{b.assignedDriver}</span>
                            </div>
                          </td>
                          <td>
                            <strong style={{ color: '#F59E0B' }}>${b.amount.toLocaleString()}</strong>
                            <div style={{ fontSize: '0.72rem', color: b.paidAmount === b.amount ? '#10B981' : '#94A3B8' }}>
                              {b.paidAmount === b.amount ? 'Fully Paid' : `$${b.paidAmount} Paid`}
                            </div>
                          </td>
                          <td>
                            <span className={`admin-badge-status ${b.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {b.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button
                                className="btn btn-sm btn-outline-white"
                                style={{ padding: '0.25rem 0.55rem', fontSize: '0.74rem' }}
                                onClick={() => setSelectedBooking(b)}
                              >
                                Inspect
                              </button>
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                                className="admin-select-status"
                                style={{ fontSize: '0.74rem', padding: '0.2rem 0.4rem' }}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Deposit Paid">Deposit Paid</option>
                                <option value="Quoted">Quoted</option>
                                <option value="New Inquiry">New Inquiry</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Weekly Booking Volume Visualizer (Haulix Style) */}
              <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <div className="admin-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Weekly Booking Revenue & Operations Volume</h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#94A3B8' }}>Daily revenue tracking and traveler volume trends over the past 7 days</p>
                  </div>
                  <span className="badge badge-teal">PAST 7 DAYS</span>
                </div>
                <div className="revenue-visualizer">
                  {[
                    { day: 'Mon', val: 3200, height: '45%' },
                    { day: 'Tue', val: 4900, height: '70%' },
                    { day: 'Wed', val: 2780, height: '40%' },
                    { day: 'Thu', val: 6800, height: '95%' },
                    { day: 'Fri', val: 5100, height: '75%' },
                    { day: 'Sat', val: 4200, height: '60%' },
                    { day: 'Sun', val: 3850, height: '55%' }
                  ].map(col => (
                    <div key={col.day} className="rev-bar-col">
                      <div className="rev-bar-track">
                        <div className="rev-bar-fill" style={{ height: col.height }}>
                          <span className="rev-tooltip">${col.val}</span>
                        </div>
                      </div>
                      <span className="rev-bar-day">{col.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS & INQUIRIES MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Reservations & Inquiries Management</h1>
                  <p className="admin-page-subtitle">
                    Manage guest reservations, assign licensed chauffeurs, track vouchers, and adjust booking statuses.
                  </p>
                </div>
                <div className="admin-header-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => setShowAddModal(true)}>
                    + Add New Booking
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by Guest name, Ref ID, Tour, or Country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                  />
                  {searchQuery && (
                    <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
                  )}
                </div>

                <div className="admin-filter-pills">
                  {[
                    { id: 'all', label: `All (${bookings.length})` },
                    { id: 'confirmed', label: 'Confirmed' },
                    { id: 'deposit', label: 'Deposit Paid' },
                    { id: 'quoted', label: 'Quoted' },
                    { id: 'new', label: 'New Inquiries' }
                  ].map(f => (
                    <button
                      key={f.id}
                      className={`filter-pill ${bookingFilter === f.id ? 'active' : ''}`}
                      onClick={() => setBookingFilter(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Table */}
              <div className="admin-card">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Lead Guest & Contact</th>
                        <th>Selected Tour Package</th>
                        <th>Dates & Schedule</th>
                        <th>Party</th>
                        <th>Gross Total</th>
                        <th>Status</th>
                        <th>Assigned Chauffeur</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                            No bookings match your current filter or search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map(b => (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 700, color: '#00A3C4' }}>{b.id}</td>
                            <td>
                              <strong>{b.guest}</strong>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{b.country}</div>
                              <div style={{ fontSize: '0.75rem', color: '#38BDF8' }}>{b.email}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{b.tour}</div>
                            </td>
                            <td>{b.dates}</td>
                            <td>{b.pax}</td>
                            <td style={{ fontWeight: 700, color: '#F59E0B' }}>
                              ${b.amount.toLocaleString()}
                            </td>
                            <td>
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                                className="admin-select-status"
                              >
                                <option value="New Inquiry">New Inquiry</option>
                                <option value="Quoted">Quoted</option>
                                <option value="Deposit Paid">Deposit Paid</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.82rem', color: '#E2E8F0' }}>
                                {b.assignedDriver}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button
                                  className="btn btn-sm btn-outline-white"
                                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                                  onClick={() => setSelectedBooking(b)}
                                  title="View full booking dossier"
                                >
                                  Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOUR PACKAGES CMS */}
          {activeTab === 'tours' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Tour Packages Catalog CMS</h1>
                  <p className="admin-page-subtitle">
                    Manage Sri Lanka tour itineraries, update starting USD prices, and control homepage featured tags.
                  </p>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => triggerToast('New Tour Package Builder opened.')}>
                  + Create Tour Package
                </button>
              </div>

              <div className="admin-tours-grid">
                {toursList.map(t => (
                  <div key={t.id} className="admin-tour-card">
                    <div className="tour-card-top">
                      <span className="badge badge-teal">{t.category?.toUpperCase() || 'TOUR'}</span>
                      <span className="badge badge-gold">{t.badge}</span>
                    </div>
                    <h3 className="admin-tour-name">{t.title}</h3>
                    <div className="admin-tour-meta">
                      <span>⏱️ {t.duration}</span>
                      <span>⭐ 4.9 (SLTDA Verified)</span>
                    </div>

                    <div className="admin-tour-price-box">
                      <label style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Starting Price (USD per person):</label>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                        <input
                          type="number"
                          value={t.priceUSD}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setToursList(prev => prev.map(item => item.id === t.id ? { ...item, priceUSD: val } : item));
                          }}
                          className="admin-input-sm"
                        />
                        <button
                          className="btn btn-sm btn-outline-white"
                          onClick={() => triggerToast(`Saved price $${t.priceUSD} for "${t.title}"`)}
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="admin-tour-footer">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={t.featured}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setToursList(prev => prev.map(item => item.id === t.id ? { ...item, featured: checked } : item));
                            triggerToast(`Updated featured status for ${t.title}`);
                          }}
                        />
                        Featured on Homepage
                      </label>
                      <Link href={`/tours/${t.id}`} target="_blank" className="admin-link-external">
                        Preview &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.5: DESTINATIONS & ESTIMATED DURATIONS CMS */}
          {activeTab === 'destinations' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Destinations & Estimated Durations CMS</h1>
                  <p className="admin-page-subtitle">
                    Configure recommended stay lengths, exploration hours, and track SLTDA annual tourist footfall across Sri Lankan regions.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button 
                    className="btn btn-sm btn-primary" 
                    onClick={() => triggerToast('New Destination registration dialog opened.')}
                  >
                    + Register New Destination
                  </button>
                </div>
              </div>

              {/* Haulix Top Summary KPI Cards */}
              <div className="haulix-kpi-row" style={{ marginBottom: '1.5rem' }}>
                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-title">Active Destinations</span>
                    <span className="haulix-kpi-icon">📍</span>
                  </div>
                  <div className="haulix-kpi-value">{destinationsList.filter(d => d.active).length} Monitored</div>
                  <div className="haulix-kpi-sub">
                    <span style={{ color: '#10B981' }}>● 100% Active</span> • Island-wide Coverage
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-title">Highest Annual Footfall</span>
                    <span className="haulix-kpi-icon">📈</span>
                  </div>
                  <div className="haulix-kpi-value" style={{ color: '#F59E0B' }}>Sigiriya & Galle</div>
                  <div className="haulix-kpi-sub">
                    <span>500k – 900k+ Foreign Tourists</span>
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-title">Avg. Island Circuit</span>
                    <span className="haulix-kpi-icon">⏱️</span>
                  </div>
                  <div className="haulix-kpi-value" style={{ color: '#38BDF8' }}>10 - 14 Days</div>
                  <div className="haulix-kpi-sub">
                    <span>Multi-City Chauffeur Routes</span>
                  </div>
                </div>

                <div className="haulix-kpi-card">
                  <div className="haulix-kpi-header">
                    <span className="haulix-kpi-title">Niche Cultural & Eco</span>
                    <span className="haulix-kpi-icon">🌿</span>
                  </div>
                  <div className="haulix-kpi-value" style={{ color: '#10B981' }}>Mahiyanganaya</div>
                  <div className="haulix-kpi-sub">
                    <span>Dambana Living Vedda Heritage</span>
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="admin-filters-bar" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['all', 'cultural', 'highlands', 'coast', 'wildlife'].map(reg => (
                    <button
                      key={reg}
                      className={`filter-btn ${destFilter === reg ? 'active' : ''}`}
                      onClick={() => setDestFilter(reg)}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                    >
                      {reg === 'all' ? 'All Regions' : reg.charAt(0).toUpperCase() + reg.slice(1)}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search destination..."
                  value={searchDestInput}
                  onChange={(e) => setSearchDestInput(e.target.value)}
                  className="admin-search-input"
                  style={{ maxWidth: '240px' }}
                />
              </div>

              {/* Destinations Management Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
                {destinationsList
                  .filter(d => destFilter === 'all' || d.region === destFilter)
                  .filter(d => d.name.toLowerCase().includes(searchDestInput.toLowerCase()) || d.tagline.toLowerCase().includes(searchDestInput.toLowerCase()))
                  .map(dest => (
                    <div key={dest.id} className="admin-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      {/* Image Thumbnail Header */}
                      <div style={{ position: 'relative', height: '140px', width: '100%', overflow: 'hidden' }}>
                        <img 
                          src={dest.image} 
                          alt={dest.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(9, 19, 34, 0.9) 100%)' }}></div>
                        <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem' }}>
                          {dest.badge}
                        </span>
                        <span className={`admin-badge-status ${dest.active ? 'confirmed' : 'cancelled'}`} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem' }}>
                          {dest.active ? 'Active' : 'Inactive'}
                        </span>
                        <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                          <h3 style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0, fontWeight: 700 }}>{dest.name}</h3>
                          <span style={{ fontSize: '0.75rem', color: '#38BDF8' }}>📍 {dest.regionLabel}</span>
                        </div>
                      </div>

                      {/* Content & Duration Controls */}
                      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flexGrow: 1 }}>
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                          {dest.tagline}
                        </p>

                        {/* SLTDA Annual Footfall Box */}
                        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Annual Footfall (SLTDA Data)</div>
                          <div style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 700, marginTop: '0.2rem' }}>
                            📊 {dest.annualFootfall}
                          </div>
                        </div>

                        {/* Editable Estimated Stay Duration */}
                        <div>
                          <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                            ⏱️ Recommended Stay Duration:
                          </label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              value={dest.estimatedStay}
                              onChange={(e) => {
                                const val = e.target.value;
                                setDestinationsList(prev => prev.map(item => item.id === dest.id ? { ...item, estimatedStay: val } : item));
                              }}
                              className="admin-input-sm"
                              style={{ flexGrow: 1 }}
                            />
                            <button
                              className="btn btn-sm btn-outline-white"
                              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => triggerToast(`Saved stay duration "${dest.estimatedStay}" for ${dest.name}`)}
                            >
                              Save
                            </button>
                          </div>
                        </div>

                        {/* Editable Exploration / Visit Duration */}
                        <div>
                          <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                            🧭 Site Exploration Hours:
                          </label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              value={dest.visitDuration}
                              onChange={(e) => {
                                const val = e.target.value;
                                setDestinationsList(prev => prev.map(item => item.id === dest.id ? { ...item, visitDuration: val } : item));
                              }}
                              className="admin-input-sm"
                              style={{ flexGrow: 1 }}
                            />
                            <button
                              className="btn btn-sm btn-outline-white"
                              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => triggerToast(`Saved visit duration "${dest.visitDuration}" for ${dest.name}`)}
                            >
                              Save
                            </button>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 'auto' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94A3B8', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={dest.active}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setDestinationsList(prev => prev.map(item => item.id === dest.id ? { ...item, active: checked } : item));
                                triggerToast(`${dest.name} visibility ${checked ? 'enabled' : 'disabled'}`);
                              }}
                            />
                            Active in Route Planner
                          </label>
                          <Link href={`/destinations/${dest.id}`} target="_blank" className="admin-link-external" style={{ fontSize: '0.75rem' }}>
                            View Page &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: FLEET & CHAUFFEURS LOGISTICS */}
          {activeTab === 'fleet' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Fleet & Chauffeur Logistics</h1>
                  <p className="admin-page-subtitle">
                    Real-time status of KCSTours licensed chauffeur guides, private air-conditioned vehicles, and island dispatch.
                  </p>
                </div>
                <button className="btn btn-sm btn-primary" onClick={() => triggerToast('Chauffeur dispatch roster updated.')}>
                  + Register New Vehicle
                </button>
              </div>

              <div className="admin-fleet-grid">
                {fleetList.map(v => (
                  <div key={v.id} className="admin-fleet-card">
                    <div className="fleet-card-header">
                      <div>
                        <span className="badge badge-teal">{v.type}</span>
                        <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginTop: '0.4rem' }}>{v.model}</h3>
                        <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.9rem' }}>{v.plate}</div>
                      </div>
                      <span className={`admin-badge-status ${v.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {v.status}
                      </span>
                    </div>

                    <div className="fleet-details-list">
                      <div className="fleet-row">
                        <span className="fleet-label">Assigned Chauffeur:</span>
                        <span className="fleet-val"><strong>{v.chauffeur}</strong></span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">Direct Contact:</span>
                        <span className="fleet-val"><a href={`tel:${v.driverPhone}`} style={{ color: '#00A3C4' }}>{v.driverPhone}</a></span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">SLTDA License:</span>
                        <span className="fleet-val">{v.license}</span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">Current Route / Base:</span>
                        <span className="fleet-val" style={{ color: '#F59E0B' }}>{v.currentLocation}</span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">Cruise Speed & Temp:</span>
                        <span className="fleet-val" style={{ color: '#38BDF8' }}>{v.speed} • {v.temp}</span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">Fuel Level:</span>
                        <span className="fleet-val" style={{ color: '#10B981' }}>{v.fuelLevel}</span>
                      </div>
                      <div className="fleet-row">
                        <span className="fleet-label">Target ETA:</span>
                        <span className="fleet-val" style={{ color: '#CBD5E1' }}>{v.eta}</span>
                      </div>
                    </div>

                    <div className="fleet-card-actions">
                      <select
                        value={v.status}
                        onChange={(e) => {
                          const newStat = e.target.value;
                          setFleetList(prev => prev.map(item => item.id === v.id ? { ...item, status: newStat } : item));
                          triggerToast(`Vehicle ${v.plate} status changed to ${newStat}`);
                        }}
                        className="admin-select-status"
                      >
                        <option value="Available at BIA Airport">Available at BIA</option>
                        <option value="On Tour">On Tour</option>
                        <option value="Scheduled Maintenance">Scheduled Maintenance</option>
                      </select>
                      <button 
                        className="btn btn-sm btn-outline-white"
                        onClick={() => triggerToast(`GPS ping sent to ${v.chauffeur} (${v.plate})`)}
                      >
                        📍 Ping GPS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMER INQUIRIES & LEADS INBOX */}
          {activeTab === 'messages' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Customer Inquiries & Leads Inbox</h1>
                  <p className="admin-page-subtitle">
                    Direct messages from the public website contact form, custom trip builders, and airport transfer requests.
                  </p>
                </div>
              </div>

              <div className="admin-messages-list">
                {messagesList.map(m => (
                  <div key={m.id} className={`admin-message-card ${m.read ? 'read' : 'unread'}`}>
                    <div className="msg-header">
                      <div className="msg-sender-info">
                        <span className="msg-dot"></span>
                        <strong>{m.sender}</strong>
                        <span className="msg-email">{m.email}</span>
                        <span className="msg-phone">{m.phone}</span>
                      </div>
                      <span className="msg-date">{m.date}</span>
                    </div>

                    <h4 className="msg-subject">{m.subject}</h4>
                    <p className="msg-body">{m.message}</p>

                    <div className="msg-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedMessage(m)}
                      >
                        💬 Reply to Traveler
                      </button>
                      <button
                        className="btn btn-sm btn-outline-white"
                        onClick={() => {
                          setMessagesList(prev => prev.map(item => item.id === m.id ? { ...item, read: !item.read } : item));
                          triggerToast(`Marked ${m.id} as ${m.read ? 'Unread' : 'Read'}`);
                        }}
                      >
                        {m.read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-section animate-fade">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-page-title">Portal Settings & Configuration</h1>
                  <p className="admin-page-subtitle">
                    Manage multi-currency base exchange rates, 24/7 Island Concierge numbers, and operational controls.
                  </p>
                </div>
              </div>

              <div className="admin-settings-grid">
                {/* Currency Exchange Rates */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>Multi-Currency Exchange Rates (Base USD)</h3>
                    <span className="badge badge-teal">Live Converter Engine</span>
                  </div>
                  <div className="admin-rates-list">
                    {Object.entries(rates).map(([code, cur]) => (
                      <div key={code} className="rate-edit-row">
                        <span className="rate-code">{code} ({cur.symbol})</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>1 USD =</span>
                          <input
                            type="number"
                            step="0.01"
                            value={cur.rate}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setRates(prev => ({
                                ...prev,
                                [code]: { ...prev[code], rate: val }
                              }));
                            }}
                            className="admin-input-sm"
                            style={{ width: '100px' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ marginTop: '1.2rem' }}
                    onClick={() => triggerToast('Currency exchange rates updated across public website!')}
                  >
                    Save Exchange Rates
                  </button>
                </div>

                {/* Island Concierge & Contact Controls */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>24/7 Concierge Hotline Configuration</h3>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">WhatsApp Island Concierge Phone:</label>
                    <input
                      type="text"
                      value={hotline}
                      onChange={(e) => setHotline(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label className="admin-label">Central Operations Email:</label>
                    <input
                      type="email"
                      value={conciergeEmail}
                      onChange={(e) => setConciergeEmail(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: '#ffffff' }}>
                      <input
                        type="checkbox"
                        checked={autoEmailConfirm}
                        onChange={(e) => setAutoEmailConfirm(e.target.checked)}
                      />
                      Send Automated Booking Voucher PDF to Travelers
                    </label>
                  </div>

                  <button
                    className="btn btn-sm btn-primary"
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => triggerToast('Concierge preferences saved successfully!')}
                  >
                    Update Contact Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: BOOKING DOSSIER DETAILS */}
      {selectedBooking && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="badge badge-teal">{selectedBooking.id}</span>
                <h2 style={{ color: '#ffffff', margin: '0.4rem 0 0 0', fontSize: '1.4rem' }}>
                  {selectedBooking.guest}
                </h2>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{selectedBooking.country}</div>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedBooking(null)}>✕</button>
            </div>

            <div className="admin-modal-body">
              <div className="dossier-grid">
                <div className="dossier-item">
                  <label>Tour Package</label>
                  <strong>{selectedBooking.tour}</strong>
                </div>
                <div className="dossier-item">
                  <label>Travel Dates</label>
                  <strong>{selectedBooking.dates}</strong>
                </div>
                <div className="dossier-item">
                  <label>Party Details</label>
                  <strong>{selectedBooking.pax}</strong>
                </div>
                <div className="dossier-item">
                  <label>Gross Amount</label>
                  <strong style={{ color: '#F59E0B', fontSize: '1.2rem' }}>
                    ${selectedBooking.amount.toLocaleString()}
                  </strong>
                </div>
                <div className="dossier-item">
                  <label>Email Address</label>
                  <a href={`mailto:${selectedBooking.email}`} style={{ color: '#38BDF8' }}>
                    {selectedBooking.email}
                  </a>
                </div>
                <div className="dossier-item">
                  <label>Direct Phone / WhatsApp</label>
                  <a href={`tel:${selectedBooking.phone}`} style={{ color: '#10B981' }}>
                    {selectedBooking.phone}
                  </a>
                </div>
                <div className="dossier-item">
                  <label>Assigned Chauffeur & Vehicle</label>
                  <strong>{selectedBooking.assignedDriver}</strong>
                </div>
                <div className="dossier-item">
                  <label>Booking Status</label>
                  <span className={`admin-badge-status ${selectedBooking.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '8px' }}>
                <label style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Special Requests & Notes:
                </label>
                <p style={{ margin: '0.4rem 0 0 0', color: '#E2E8F0', fontSize: '0.9rem' }}>
                  {selectedBooking.specialRequests || 'No special dietary or accommodation notes recorded.'}
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button 
                className="btn btn-sm btn-outline-white"
                onClick={() => {
                  triggerToast(`Exported Official PDF Confirmation Voucher for ${selectedBooking.id}`);
                  setSelectedBooking(null);
                }}
              >
                📄 Print / Export Voucher
              </button>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => {
                  updateBookingStatus(selectedBooking.id, 'Confirmed');
                  setSelectedBooking(null);
                }}
              >
                ✓ Mark Confirmed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW MANUAL BOOKING */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="badge badge-teal">Direct Reservation</span>
                <h2 style={{ color: '#ffffff', margin: '0.4rem 0 0 0', fontSize: '1.4rem' }}>
                  Create New Traveler Booking
                </h2>
              </div>
              <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddBooking}>
              <div className="admin-modal-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Lead Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={newBooking.guest}
                      onChange={(e) => setNewBooking({ ...newBooking, guest: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Origin Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom 🇬🇧"
                      value={newBooking.country}
                      onChange={(e) => setNewBooking({ ...newBooking, country: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-row" style={{ marginTop: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Guest Email</label>
                    <input
                      type="email"
                      placeholder="guest@example.com"
                      value={newBooking.email}
                      onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+44 7700 900000"
                      value={newBooking.phone}
                      onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                  <label className="admin-label">Select Tour Package *</label>
                  <select
                    value={newBooking.tour}
                    onChange={(e) => setNewBooking({ ...newBooking, tour: e.target.value })}
                    className="admin-input"
                  >
                    {TOURS.map(t => (
                      <option key={t.id} value={t.title}>
                        {t.title} ({t.duration} - ${t.priceUSD})
                      </option>
                    ))}
                    <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
                    <option value="Airport Transfer & Private Chauffeur">Airport Transfer & Private Chauffeur</option>
                  </select>
                </div>

                <div className="admin-form-row" style={{ marginTop: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Travel Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. 15 Nov - 25 Nov 2026"
                      value={newBooking.dates}
                      onChange={(e) => setNewBooking({ ...newBooking, dates: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Party Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Adults, 1 Child"
                      value={newBooking.pax}
                      onChange={(e) => setNewBooking({ ...newBooking, pax: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-row" style={{ marginTop: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Gross Amount (USD) *</label>
                    <input
                      type="number"
                      required
                      value={newBooking.amount}
                      onChange={(e) => setNewBooking({ ...newBooking, amount: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Initial Status</label>
                    <select
                      value={newBooking.status}
                      onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })}
                      className="admin-input"
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Deposit Paid">Deposit Paid</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                  <label className="admin-label">Special Requests / Chauffeur Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Hotels, baby seats, train tickets, meal requirements..."
                    value={newBooking.specialRequests}
                    onChange={(e) => setNewBooking({ ...newBooking, specialRequests: e.target.value })}
                    className="admin-input"
                  ></textarea>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn btn-sm btn-outline-white" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  ✓ Save Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: REPLY TO CUSTOMER INQUIRY */}
      {selectedMessage && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="badge badge-teal">Reply to Inquiry</span>
                <h2 style={{ color: '#ffffff', margin: '0.4rem 0 0 0', fontSize: '1.3rem' }}>
                  {selectedMessage.sender}
                </h2>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{selectedMessage.email}</div>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedMessage(null)}>✕</button>
            </div>

            <div className="admin-modal-body">
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Customer Inquiry:</div>
                <div style={{ fontWeight: 600, color: '#ffffff', marginTop: '0.2rem' }}>{selectedMessage.subject}</div>
                <p style={{ fontSize: '0.88rem', color: '#CBD5E1', marginTop: '0.4rem', fontStyle: 'italic' }}>
                  "{selectedMessage.message}"
                </p>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Your Official Response (Email / WhatsApp):</label>
                <textarea
                  rows={4}
                  placeholder={`Dear ${selectedMessage.sender}, Ayubowan from Sri Lanka! Regarding your inquiry...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="admin-input"
                ></textarea>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="btn btn-sm btn-outline-white" onClick={() => setSelectedMessage(null)}>
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  triggerToast(`Reply dispatched to ${selectedMessage.email}!`);
                  setSelectedMessage(null);
                  setReplyText('');
                }}
              >
                🚀 Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
