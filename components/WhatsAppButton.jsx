'use client';

import React, { useState } from 'react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="whatsapp-widget">
      {isOpen && (
        <div className="whatsapp-popup active">
          <div className="wa-popup-header">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Concierge Roshan" 
              className="wa-popup-avatar" 
            />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Roshan • KCSTours Concierge</strong>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Online • Typically replies in 2 mins</div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', color: '#ffffff', marginLeft: 'auto', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>
          <div className="wa-popup-body">
            <div className="wa-bubble">
              Ayubowan! 🙏 Looking for advice on dates, hotels, or custom itineraries in Sri Lanka? How can I help you today?
            </div>
            <div className="wa-quick-chips">
              <button 
                className="wa-chip" 
                onClick={() => window.open('https://wa.me/94771234567?text=Hello%20KCSTours,%20can%20you%20help%20me%20plan%20a%20Sri%20Lanka%20itinerary?', '_blank')}
              >
                💬 Help me plan a custom itinerary
              </button>
              <button 
                className="wa-chip" 
                onClick={() => window.open('https://wa.me/94771234567?text=Hello%20KCSTours,%20what%20is%20the%20best%20season%20to%20visit%20Sri%20Lanka?', '_blank')}
              >
                ☀️ What is the best season to visit?
              </button>
              <button 
                className="wa-chip" 
                onClick={() => window.open('https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20want%20to%20book%20a%20private%20airport%20transfer', '_blank')}
              >
                🚗 Book private airport transfer
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        className="whatsapp-btn" 
        onClick={() => setIsOpen(!isOpen)} 
        title="Chat with Sri Lanka Destination Specialist on WhatsApp"
      >
        <span>💬</span>
        <span className="online-pulse"></span>
      </button>
    </div>
  );
}
