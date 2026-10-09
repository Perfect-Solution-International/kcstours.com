'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ACTIVITIES } from '@/lib/data';
import ActivityCard from '@/components/ActivityCard';

export default function ActivitiesPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === filter);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#005696' }}>Home</Link> &nbsp;/&nbsp; <span>Experiences & Activities</span>
        </div>

        <div className="section-header">
          <span className="section-tag">Unforgettable Moments</span>
          <h1>Curated Sri Lankan Experiences & Day Adventures</h1>
          <p>
            Add magical memories to your vacation: private wildlife safaris, scenic rail journeys, whale watching, and village cooking classes.
          </p>
        </div>

        {/* Filter Nav */}
        <div className="filter-nav">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Experiences ({ACTIVITIES.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'adventure' ? 'active' : ''}`}
            onClick={() => setFilter('adventure')}
          >
            Adventure & Climbing
          </button>
          <button 
            className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
            onClick={() => setFilter('wildlife')}
          >
            Wildlife Safaris
          </button>
          <button 
            className={`filter-btn ${filter === 'nature' ? 'active' : ''}`}
            onClick={() => setFilter('nature')}
          >
            Scenic Trains & Tea
          </button>
          <button 
            className={`filter-btn ${filter === 'beach' ? 'active' : ''}`}
            onClick={() => setFilter('beach')}
          >
            Ocean & Whales
          </button>
          <button 
            className={`filter-btn ${filter === 'culture' ? 'active' : ''}`}
            onClick={() => setFilter('culture')}
          >
            Culinary & Culture
          </button>
        </div>

        {/* Activities Grid */}
        <div className="activities-grid">
          {filtered.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
