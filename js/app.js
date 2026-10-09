// ==========================================================================
// KCSTours - Core Application Controller
// Multi-currency, Wishlist, Itinerary Builder, Multi-Step Booking & Search
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currentCurrency: 'USD',
    wishlist: JSON.parse(localStorage.getItem('kcs_wishlist') || '[]'),
    activeTourFilter: 'all',
    activeDestFilter: 'all',
    activeHotelFilter: 'all',
    activeActFilter: 'all',
    activeFaqFilter: 'all',
    
    // Custom Tour Builder State
    customTrip: {
      destinations: ['sigiriya', 'kandy', 'ella'],
      durationDays: 7,
      travelMonth: 'December',
      travelerType: 'couple',
      paxCount: 2,
      hotelTier: 'superior', // standard, superior, luxury
      interests: ['wildlife', 'scenic_train', 'culture']
    },

    // Current Booking In-Progress
    currentBooking: {
      type: 'tour',
      item: null,
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adults: 2,
      children: 0,
      addons: [],
      travelerName: '',
      travelerEmail: '',
      travelerPhone: '',
      travelerCountry: '',
      specialRequests: '',
      paymentMethod: 'deposit_20',
      step: 1
    }
  };

  // DOM Elements Cache
  const elements = {
    currencySelectors: document.querySelectorAll('.currency-select'),
    languageSelectors: document.querySelectorAll('.language-select'),
    wishlistBadges: document.querySelectorAll('.wishlist-badge'),
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    wishlistDrawerItems: document.getElementById('wishlistDrawerItems'),
    wishlistOverlay: document.getElementById('wishlistOverlay'),
    
    // Grids
    destinationsGrid: document.getElementById('destinationsGrid'),
    toursGrid: document.getElementById('toursGrid'),
    hotelsGrid: document.getElementById('hotelsGrid'),
    activitiesGrid: document.getElementById('activitiesGrid'),
    vehiclesGrid: document.getElementById('vehiclesGrid'),
    articlesGrid: document.getElementById('articlesGrid'),
    reviewsGrid: document.getElementById('reviewsGrid'),
    faqList: document.getElementById('faqList'),
    
    // Modals
    tourModal: document.getElementById('tourModal'),
    tourModalContent: document.getElementById('tourModalContent'),
    articleModal: document.getElementById('articleModal'),
    articleModalContent: document.getElementById('articleModalContent'),
    bookingModal: document.getElementById('bookingModal'),
    bookingModalContent: document.getElementById('bookingModalContent'),
    searchModal: document.getElementById('searchModal'),
    searchInput: document.getElementById('globalSearchInput'),
    searchResults: document.getElementById('globalSearchResults'),
    
    // WhatsApp Widget
    whatsappBtn: document.getElementById('whatsappBtn'),
    whatsappPopup: document.getElementById('whatsappPopup'),
    
    // Custom Builder
    builderEstimatePrice: document.getElementById('builderEstimatePrice'),
    
    // Airport Transfer
    transferPickup: document.getElementById('transferPickup'),
    transferDropoff: document.getElementById('transferDropoff'),
    transferVehicle: document.getElementById('transferVehicle'),
    transferCostResult: document.getElementById('transferCostResult'),
    
    // Admin CMS
    adminOverlay: document.getElementById('adminOverlay'),
    adminBookingsTable: document.getElementById('adminBookingsTable')
  };

  // ==========================================================================
  // Helper: Currency Formatter
  // ==========================================================================
  function formatPrice(amountUSD) {
    const curr = KCS_DATA.exchangeRates[state.currentCurrency] || KCS_DATA.exchangeRates.USD;
    const converted = Math.round(amountUSD * curr.rate);
    return `${curr.symbol} ${converted.toLocaleString()}`;
  }

  // Toast Notification
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-pill toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);
      background: #002D59;
      color: #ffffff;
      padding: 0.75rem 1.6rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 45, 89, 0.35);
      border: 1px solid rgba(0, 163, 196, 0.4);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: fadeInDown 0.3s ease;
    `;
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // ==========================================================================
  // Currency & Language Initialization
  // ==========================================================================
  function initCurrencyAndLang() {
    elements.currencySelectors.forEach(select => {
      select.value = state.currentCurrency;
      select.addEventListener('change', (e) => {
        state.currentCurrency = e.target.value;
        elements.currencySelectors.forEach(s => s.value = state.currentCurrency);
        renderAllDynamicSections();
        showToast(`Prices converted to ${state.currentCurrency}`);
      });
    });

    elements.languageSelectors.forEach(select => {
      select.addEventListener('change', (e) => {
        showToast(`Language set to ${e.target.value.toUpperCase()}. (English primary)`);
      });
    });
  }

  // ==========================================================================
  // Wishlist Logic
  // ==========================================================================
  function updateWishlistBadge() {
    elements.wishlistBadges.forEach(badge => {
      badge.textContent = state.wishlist.length;
      badge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  function toggleWishlist(itemId, itemType, title, price, image) {
    const existingIndex = state.wishlist.findIndex(i => i.id === itemId);
    if (existingIndex > -1) {
      state.wishlist.splice(existingIndex, 1);
      showToast(`Removed from Wishlist`);
    } else {
      state.wishlist.push({ id: itemId, type: itemType, title, price, image });
      showToast(`Saved to your Sri Lanka Wishlist! ❤️`);
    }
    localStorage.setItem('kcs_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
    renderWishlistDrawer();
    renderTours(); // Update heart icons
  }

  function renderWishlistDrawer() {
    if (!elements.wishlistDrawerItems) return;
    if (state.wishlist.length === 0) {
      elements.wishlistDrawerItems.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: #64748B;">
          <div style="font-size: 3rem; margin-bottom: 0.8rem;">🌴</div>
          <h4 style="font-size: 1.1rem; color: #002D59; margin-bottom: 0.4rem;">Your Wishlist is Empty</h4>
          <p style="font-size: 0.88rem;">Explore our curated tours and hotels, and click the heart icon to save your favorites!</p>
        </div>
      `;
      return;
    }

    elements.wishlistDrawerItems.innerHTML = state.wishlist.map(item => `
      <div class="wishlist-item">
        <img src="${item.image}" alt="${item.title}" class="wishlist-item-img">
        <div class="wishlist-item-info">
          <h4>${item.title}</h4>
          <div class="wishlist-item-price">${formatPrice(item.price)}</div>
          <button class="btn btn-primary btn-sm" style="margin-top: 0.4rem; padding: 0.25rem 0.75rem;" onclick="app.quickBookWishlistItem('${item.id}', '${item.type}')">Book Now</button>
        </div>
        <button class="wishlist-remove-btn" onclick="app.removeFromWishlist('${item.id}')" title="Remove">&times;</button>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render Destinations
  // ==========================================================================
  function renderDestinations() {
    if (!elements.destinationsGrid) return;
    const filtered = state.activeDestFilter === 'all' 
      ? KCS_DATA.destinations 
      : KCS_DATA.destinations.filter(d => d.region === state.activeDestFilter);

    elements.destinationsGrid.innerHTML = filtered.map(dest => `
      <div class="dest-card" onclick="app.openDestinationDetail('${dest.id}')">
        <img src="${dest.image}" alt="${dest.name}" class="dest-card-img" loading="lazy">
        <div class="dest-card-overlay"></div>
        <div class="dest-card-badge">${dest.badge}</div>
        <div class="dest-card-content">
          <h3>${dest.name}</h3>
          <p class="dest-card-tagline">${dest.tagline}</p>
          <div class="dest-card-bottom">
            <div class="dest-card-price">Tours from <strong>${formatPrice(dest.startingPrice)}</strong></div>
            <span class="dest-card-btn">Explore &rarr;</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render Featured Tours
  // ==========================================================================
  function renderTours() {
    if (!elements.toursGrid) return;
    const filtered = state.activeTourFilter === 'all' 
      ? KCS_DATA.tours 
      : KCS_DATA.tours.filter(t => t.category === state.activeTourFilter);

    elements.toursGrid.innerHTML = filtered.map(tour => {
      const isSaved = state.wishlist.some(w => w.id === tour.id);
      return `
        <div class="tour-card">
          <div class="tour-card-header">
            <img src="${tour.heroImage}" alt="${tour.title}" class="tour-card-img" loading="lazy">
            <div class="tour-badge-top">
              <span class="badge ${tour.badge.includes('VIP') ? 'badge-gold' : 'badge-teal'}">${tour.badge}</span>
            </div>
            <button class="tour-wishlist-btn ${isSaved ? 'active' : ''}" 
              onclick="event.stopPropagation(); app.toggleWishlist('${tour.id}', 'tour', '${tour.title.replace(/'/g, "\\'")}', ${tour.priceUSD}, '${tour.heroImage}')" 
              title="Save to Wishlist">
              ${isSaved ? '❤️' : '🤍'}
            </button>
            <div class="tour-card-meta-bar">
              <span>⏱️ ${tour.duration}</span>
              <span>👥 ${tour.groupType}</span>
            </div>
          </div>
          <div class="tour-card-body">
            <div class="tour-rating-row">
              <div class="tour-stars">★ ${tour.rating} <span style="color:#64748B; font-weight:normal;">(${tour.reviewsCount} reviews)</span></div>
              <span class="badge badge-emerald" style="font-size:0.7rem;">${tour.difficulty}</span>
            </div>
            <h3>${tour.title}</h3>
            <p class="tour-subtitle">${tour.subtitle}</p>
            
            <div class="tour-route-tags">
              ${tour.route.map((step, idx) => `
                <span class="route-step">${step}</span>
                ${idx < tour.route.length - 1 ? '<span class="route-arrow">➔</span>' : ''}
              `).join('')}
            </div>

            <ul class="tour-inclusions-list">
              <li><span>✓</span> Dedicated English Chauffeur-Guide</li>
              <li><span>✓</span> Handpicked Boutique / 4-5★ Stays</li>
              <li><span>✓</span> All Tolls, Fuel & Chauffeur Stays</li>
            </ul>

            <div class="tour-card-footer">
              <div class="tour-price-box">
                <span class="price-sub">From Per Person</span>
                <span class="price-amount">${formatPrice(tour.priceUSD)}</span>
              </div>
              <div class="tour-card-actions">
                <button class="btn btn-outline btn-sm" onclick="app.openTourModal('${tour.id}')">View Details</button>
                <button class="btn btn-primary btn-sm" onclick="app.startBooking('tour', '${tour.id}')">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // Render Hotels & Resorts
  // ==========================================================================
  function renderHotels() {
    if (!elements.hotelsGrid) return;
    const filtered = state.activeHotelFilter === 'all'
      ? KCS_DATA.hotels
      : KCS_DATA.hotels.filter(h => h.category === state.activeHotelFilter);

    elements.hotelsGrid.innerHTML = filtered.map(hotel => `
      <div class="hotel-card">
        <div class="hotel-card-img-wrap">
          <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
          <span class="badge badge-gold" style="position:absolute; top:1rem; left:1rem;">★ ${hotel.rating}</span>
        </div>
        <div class="hotel-card-body">
          <div style="font-size:0.8rem; color: #00A3C4; font-weight:700; text-transform:uppercase;">${hotel.type}</div>
          <h3 style="font-size: 1.25rem; margin-top: 0.2rem;">${hotel.name}</h3>
          <p style="font-size:0.85rem; color: #64748B;">📍 ${hotel.location}</p>
          <p style="font-size: 0.88rem; color:#475569; margin-top: 0.6rem;">${hotel.description}</p>
          
          <div class="hotel-amenities-tags">
            ${hotel.amenities.slice(0, 4).map(a => `<span class="amenity-tag">${a}</span>`).join('')}
          </div>

          <div style="margin-top:auto; display:flex; align-items:center; justify-content:space-between; padding-top:1rem; border-top:1px solid #E2E8F0;">
            <div>
              <span style="font-size:0.75rem; color:#64748B;">Nightly from</span>
              <div style="font-size:1.3rem; font-weight:800; color:#002D59;">${formatPrice(hotel.priceUSD)}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.startBooking('hotel', '${hotel.id}')">Reserve Stay</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render Activities & Experiences
  // ==========================================================================
  function renderActivities() {
    if (!elements.activitiesGrid) return;
    const filtered = state.activeActFilter === 'all'
      ? KCS_DATA.activities
      : KCS_DATA.activities.filter(a => a.category === state.activeActFilter);

    elements.activitiesGrid.innerHTML = filtered.map(act => `
      <div class="activity-card">
        <div class="act-card-img-wrap">
          <img src="${act.image}" alt="${act.title}" loading="lazy">
          <span class="badge badge-teal" style="position:absolute; top:0.8rem; left:0.8rem;">${act.categoryLabel}</span>
        </div>
        <div class="act-card-body">
          <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:#64748B; margin-bottom:0.4rem;">
            <span>📍 ${act.location}</span>
            <span>⏱️ ${act.duration}</span>
          </div>
          <h4 style="font-size:1.1rem; line-height:1.3; margin-bottom:0.6rem;">${act.title}</h4>
          <p style="font-size:0.85rem; color:#64748B; line-height:1.5;">${act.description}</p>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:1.2rem; padding-top:0.8rem; border-top:1px solid #E2E8F0;">
            <div style="font-size:1.2rem; font-weight:800; color:#002D59;">${formatPrice(act.priceUSD)} <span style="font-size:0.75rem; font-weight:normal; color:#64748B;">/ person</span></div>
            <button class="btn btn-primary btn-sm" onclick="app.startBooking('activity', '${act.id}')">Book Activity</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render Vehicle Fleet
  // ==========================================================================
  function renderVehicles() {
    if (!elements.vehiclesGrid) return;
    elements.vehiclesGrid.innerHTML = KCS_DATA.vehicles.map(veh => `
      <div class="vehicle-card">
        <img src="${veh.image}" alt="${veh.name}" class="vehicle-card-img" loading="lazy">
        <h4 style="font-size:1.15rem; color:#002D59;">${veh.name}</h4>
        <div style="font-size:0.82rem; color:#00A3C4; font-weight:600; margin-bottom:0.6rem;">${veh.models}</div>
        <div style="display:flex; gap:1rem; font-size:0.85rem; font-weight:600; color:#1E293B; margin-bottom:0.8rem;">
          <span>👥 ${veh.capacity}</span>
          <span>🧳 ${veh.luggage}</span>
        </div>
        <ul class="vehicle-features">
          ${veh.features.map(f => `<li><span style="color:#10B981;">✓</span> ${f}</li>`).join('')}
        </ul>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.8rem; border-top:1px solid #E2E8F0;">
          <div>
            <div style="font-size:0.75rem; color:#64748B;">Per Day (Chauffeur + Fuel)</div>
            <div style="font-size:1.3rem; font-weight:800; color:#002D59;">${formatPrice(veh.pricePerDayUSD)}</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="app.startBooking('vehicle', '${veh.id}')">Hire Vehicle</button>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Airport Transfer Calculator
  // ==========================================================================
  function updateTransferCalculation() {
    if (!elements.transferDropoff || !elements.transferVehicle || !elements.transferCostResult) return;
    const dest = elements.transferDropoff.value;
    const vehType = elements.transferVehicle.value;
    const route = KCS_DATA.airportTransfers.find(r => r.to.toLowerCase().includes(dest.toLowerCase()));
    
    if (route) {
      const price = vehType === 'van' ? route.vanUSD : route.sedanUSD;
      elements.transferCostResult.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="font-size:0.82rem; color:#64748B;">Estimated Journey Time: <strong>${route.duration}</strong></div>
            <div style="font-size:1.5rem; font-weight:800; color:#002D59; margin-top:0.2rem;">${formatPrice(price)} <span style="font-size:0.8rem; font-weight:normal; color:#64748B;">(Flat Fixed Fare)</span></div>
          </div>
          <button class="btn btn-gold btn-sm" onclick="app.bookTransfer('${route.to}', '${vehType}', ${price})">Book Airport Transfer</button>
        </div>
      `;
    }
  }

  // ==========================================================================
  // Render Travel Guides / Articles
  // ==========================================================================
  function renderArticles() {
    if (!elements.articlesGrid) return;
    elements.articlesGrid.innerHTML = KCS_DATA.articles.map(art => `
      <div class="article-card" onclick="app.openArticleModal('${art.id}')">
        <div class="article-img-wrap">
          <img src="${art.image}" alt="${art.title}" loading="lazy">
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span class="badge badge-blue">${art.category}</span>
            <span>⏱️ ${art.readTime}</span>
          </div>
          <h3 style="font-size:1.2rem; margin-bottom:0.6rem; line-height:1.3;">${art.title}</h3>
          <p style="font-size:0.88rem; color:#64748B; line-height:1.5; margin-bottom:1rem;">${art.summary}</p>
          <span style="font-size:0.85rem; font-weight:700; color:#005696; display:flex; align-items:center; gap:0.3rem;">Read Full Guide &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render Reviews & Testimonials
  // ==========================================================================
  function renderReviews() {
    if (!elements.reviewsGrid) return;
    elements.reviewsGrid.innerHTML = KCS_DATA.reviews.map(rev => `
      <div class="review-card">
        <div class="review-header">
          <img src="${rev.avatar}" alt="${rev.name}" class="reviewer-avatar">
          <div>
            <h4 class="reviewer-name">${rev.name}</h4>
            <div class="reviewer-country">${rev.flag} ${rev.country} • <span style="color:#64748B;">${rev.date}</span></div>
          </div>
        </div>
        <div style="color:var(--accent-gold); font-size:1.1rem; margin-bottom:0.6rem;">★★★★★</div>
        <h5 style="font-size:1.05rem; margin-bottom:0.5rem; color:#002D59;">"${rev.title}"</h5>
        <p class="review-quote">${rev.comment}</p>
        <div style="margin-top:auto;">
          <span class="review-tour-tag">Booked: ${rev.tour}</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Render FAQ Accordion
  // ==========================================================================
  function renderFAQs() {
    if (!elements.faqList) return;
    const filtered = state.activeFaqFilter === 'all'
      ? KCS_DATA.faqs
      : KCS_DATA.faqs.filter(f => f.category === state.activeFaqFilter);

    elements.faqList.innerHTML = filtered.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <button class="faq-question" onclick="app.toggleFaq(this)">
          <span>${faq.question}</span>
          <span class="faq-toggle-icon">▼</span>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // Customized Tour Builder Engine
  // ==========================================================================
  function updateCustomBuilderEstimate() {
    if (!elements.builderEstimatePrice) return;
    const baseDailyRate = {
      standard: 110,
      superior: 155,
      luxury: 285
    }[state.customTrip.hotelTier] || 155;

    const days = state.customTrip.durationDays;
    const pax = state.customTrip.paxCount;
    const activitiesCost = state.customTrip.interests.length * 35;
    
    // Per person estimate
    const totalEstimatePerPax = Math.round((baseDailyRate * days) + activitiesCost);
    elements.builderEstimatePrice.textContent = formatPrice(totalEstimatePerPax);
  }

  // ==========================================================================
  // Tour Details Modal Renderer
  // ==========================================================================
  function openTourModal(tourId) {
    const tour = KCS_DATA.tours.find(t => t.id === tourId);
    if (!tour || !elements.tourModalContent) return;

    elements.tourModalContent.innerHTML = `
      <div class="tour-modal-hero">
        <img src="${tour.heroImage}" alt="${tour.title}">
        <div class="dest-card-overlay"></div>
        <div style="position:absolute; bottom:1.5rem; left:2rem; right:2rem; color:#ffffff; z-index:2;">
          <span class="badge badge-gold" style="margin-bottom:0.5rem;">${tour.badge}</span>
          <h2 style="font-size:2rem; color:#ffffff; margin-bottom:0.3rem;">${tour.title}</h2>
          <p style="font-size:0.95rem; opacity:0.9;">${tour.subtitle}</p>
        </div>
      </div>

      <div class="tour-modal-body">
        <div class="tour-specs-grid">
          <div class="spec-item"><span class="spec-label">Duration</span><span class="spec-val">⏱️ ${tour.duration}</span></div>
          <div class="spec-item"><span class="spec-label">Group Style</span><span class="spec-val">👥 Private Chauffeur</span></div>
          <div class="spec-item"><span class="spec-label">Difficulty</span><span class="spec-val">🥾 ${tour.difficulty}</span></div>
          <div class="spec-item"><span class="spec-label">Languages</span><span class="spec-val">🗣️ English / German</span></div>
          <div class="spec-item"><span class="spec-label">Starting Price</span><span class="spec-val" style="color:#00A3C4;">${formatPrice(tour.priceUSD)}</span></div>
        </div>

        <h3 style="font-size:1.3rem; margin-bottom:0.8rem;">Experience Overview</h3>
        <p style="color:#475569; line-height:1.7; margin-bottom:1.5rem;">${tour.description}</p>

        <h3 style="font-size:1.3rem; margin-bottom:0.8rem;">Signature Highlights</h3>
        <ul style="list-style:none; margin-bottom:2rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.6rem;">
          ${tour.highlights.map(h => `<li style="font-size:0.9rem; color:#334155; display:flex; gap:0.5rem;"><span style="color:#10B981; font-weight:bold;">✓</span> ${h}</li>`).join('')}
        </ul>

        <h3 style="font-size:1.3rem; margin-bottom:1rem;">Day-by-Day Journey Itinerary</h3>
        <div class="itinerary-accordion">
          ${tour.itinerary.map((day, idx) => `
            <div class="itinerary-accordion-day ${idx === 0 ? 'active' : ''}">
              <div class="day-header" onclick="this.parentElement.classList.toggle('active')">
                <span>Day 0${day.day}: ${day.title}</span>
                <span style="font-size:0.8rem; color:#00A3C4;">▼</span>
              </div>
              <div class="day-body">
                <p style="margin-bottom:0.6rem;">${day.summary}</p>
                <div style="display:flex; gap:1.5rem; font-size:0.8rem; color:#64748B;">
                  <span>🏨 <strong>Stay:</strong> ${day.stay}</span>
                  <span>🍽️ <strong>Meals:</strong> ${day.meals}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0; background:#F8FAFC; padding:1.5rem; border-radius:14px; border:1px solid #E2E8F0;">
          <div>
            <h4 style="color:#10B981; font-size:1.05rem; margin-bottom:0.6rem;">✓ What's Included</h4>
            <ul style="list-style:none; font-size:0.85rem; color:#475569;">
              ${tour.included.map(i => `<li style="margin-bottom:0.35rem;">• ${i}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color:#EF4444; font-size:1.05rem; margin-bottom:0.6rem;">✕ What's Not Included</h4>
            <ul style="list-style:none; font-size:0.85rem; color:#475569;">
              ${tour.excluded.map(e => `<li style="margin-bottom:0.35rem;">• ${e}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; padding-top:1.5rem; border-top:1px solid #E2E8F0;">
          <div>
            <div style="font-size:0.85rem; color:#64748B;">All-Inclusive Tour Rate</div>
            <div style="font-size:1.8rem; font-weight:800; color:#002D59;">${formatPrice(tour.priceUSD)} <span style="font-size:0.85rem; font-weight:normal; color:#64748B;">/ person</span></div>
          </div>
          <div style="display:flex; gap:0.8rem;">
            <button class="btn btn-outline" onclick="app.closeModal('tourModal')">Close</button>
            <button class="btn btn-primary" onclick="app.closeModal('tourModal'); app.startBooking('tour', '${tour.id}')">Book This Tour</button>
          </div>
        </div>
      </div>
    `;

    elements.tourModal.classList.add('active');
  }

  // ==========================================================================
  // Travel Guide Article Modal Renderer
  // ==========================================================================
  function openArticleModal(articleId) {
    const art = KCS_DATA.articles.find(a => a.id === articleId);
    if (!art || !elements.articleModalContent) return;

    elements.articleModalContent.innerHTML = `
      <div style="position:relative; height:280px;">
        <img src="${art.image}" alt="${art.title}" style="width:100%; height:100%; object-fit:cover;">
        <div class="dest-card-overlay"></div>
        <div style="position:absolute; bottom:1.5rem; left:2rem; right:2rem; color:#ffffff; z-index:2;">
          <span class="badge badge-teal">${art.category}</span>
          <h2 style="font-size:1.8rem; color:#ffffff; margin-top:0.4rem;">${art.title}</h2>
          <div style="font-size:0.85rem; opacity:0.85; margin-top:0.2rem;">${art.date} • ${art.readTime}</div>
        </div>
      </div>
      <div style="padding:2.2rem; font-size:1rem; line-height:1.8; color:#334155;">
        <div style="font-size:1.15rem; font-weight:500; color:#002D59; margin-bottom:1.5rem; border-left:4px solid #00A3C4; padding-left:1rem;">
          ${art.summary}
        </div>
        <div style="white-space:pre-line;">
          ${art.content}
        </div>
        <div style="margin-top:2.5rem; padding:1.5rem; background:#EBF4FC; border-radius:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div>
            <h4 style="color:#002D59; font-size:1.1rem;">Ready to experience this firsthand?</h4>
            <p style="font-size:0.88rem; color:#64748B;">Let our local destination specialists craft your personalized itinerary.</p>
          </div>
          <button class="btn btn-primary" onclick="app.closeModal('articleModal'); app.scrollToSection('customBuilder')">Plan My Sri Lanka Trip</button>
        </div>
      </div>
    `;

    elements.articleModal.classList.add('active');
  }

  // ==========================================================================
  // Multi-Step Booking Engine Controller
  // ==========================================================================
  function startBooking(type, itemId) {
    let item = null;
    if (type === 'tour') item = KCS_DATA.tours.find(t => t.id === itemId);
    if (type === 'hotel') item = KCS_DATA.hotels.find(h => h.id === itemId);
    if (type === 'activity') item = KCS_DATA.activities.find(a => a.id === itemId);
    if (type === 'vehicle') item = KCS_DATA.vehicles.find(v => v.id === itemId);

    state.currentBooking = {
      type,
      item: item || { title: 'Sri Lanka Travel Experience', priceUSD: 500 },
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adults: 2,
      children: 0,
      addons: [],
      travelerName: '',
      travelerEmail: '',
      travelerPhone: '',
      travelerCountry: 'United Kingdom',
      specialRequests: '',
      paymentMethod: 'deposit_20',
      step: 1
    };

    renderBookingStep();
    elements.bookingModal.classList.add('active');
  }

  function renderBookingStep() {
    if (!elements.bookingModalContent) return;
    const b = state.currentBooking;
    const basePrice = b.item.priceUSD || b.item.pricePerDayUSD || 450;
    const subtotal = (basePrice * b.adults) + (basePrice * 0.5 * b.children);
    const addonsTotal = b.addons.reduce((acc, curr) => acc + curr.price, 0);
    const grandTotal = subtotal + addonsTotal;
    const depositAmount = Math.round(grandTotal * 0.20);

    // Step indicators
    const stepperHTML = `
      <div class="booking-header">
        <h3>Book Your Sri Lanka Journey</h3>
        <p style="font-size:0.88rem; opacity:0.9;">Secure direct booking with KCSTours • Sri Lanka Tourism Partner</p>
      </div>
      <div class="booking-stepper">
        <span class="booking-step-badge ${b.step >= 1 ? 'active' : ''}">1. Trip & Guests</span>
        <span class="booking-step-badge ${b.step >= 2 ? 'active' : ''}">2. Upgrades</span>
        <span class="booking-step-badge ${b.step >= 3 ? 'active' : ''}">3. Contact Details</span>
        <span class="booking-step-badge ${b.step >= 4 ? 'active' : ''}">4. Payment & Confirm</span>
      </div>
    `;

    let bodyHTML = '';

    if (b.step === 1) {
      bodyHTML = `
        <div class="booking-form-body">
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:1.2rem; border-radius:12px; margin-bottom:1.5rem; display:flex; gap:1rem; align-items:center;">
            <img src="${b.item.heroImage || b.item.image || 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=200&q=80'}" style="width:70px; height:70px; object-fit:cover; border-radius:8px;">
            <div>
              <span class="badge badge-teal" style="font-size:0.7rem; text-transform:uppercase;">${b.type}</span>
              <h4 style="font-size:1.1rem; color:#002D59;">${b.item.title || b.item.name}</h4>
              <div style="font-size:0.85rem; color:#64748B;">Starting from <strong>${formatPrice(basePrice)}</strong> / adult</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Preferred Start Date</label>
              <input type="date" class="form-control" id="bookingDateInput" value="${b.date}" min="${new Date().toISOString().split('T')[0]}" onchange="app.updateBookingField('date', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Adult Travelers (12+ yrs)</label>
              <select class="form-control" onchange="app.updateBookingField('adults', parseInt(this.value))">
                ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${b.adults === n ? 'selected' : ''}>${n} Adult${n > 1 ? 's' : ''}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Children (Under 12 yrs, 50% off)</label>
              <select class="form-control" onchange="app.updateBookingField('children', parseInt(this.value))">
                ${[0,1,2,3,4,5].map(n => `<option value="${n}" ${b.children === n ? 'selected' : ''}>${n} Child${n !== 1 ? 'ren' : ''}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Vehicle & Chauffeur Language</label>
              <select class="form-control">
                <option>English Speaking Chauffeur-Guide</option>
                <option>German Speaking Chauffeur-Guide (+ USD 25/day)</option>
                <option>French Speaking Chauffeur-Guide (+ USD 25/day)</option>
              </select>
            </div>
          </div>

          <div class="price-summary-box">
            <div class="price-summary-row">
              <span>${b.adults} Adults × ${formatPrice(basePrice)}:</span>
              <span>${formatPrice(basePrice * b.adults)}</span>
            </div>
            ${b.children > 0 ? `
              <div class="price-summary-row">
                <span>${b.children} Children (50% off) × ${formatPrice(basePrice * 0.5)}:</span>
                <span>${formatPrice(basePrice * 0.5 * b.children)}</span>
              </div>
            ` : ''}
            <div class="price-summary-row total">
              <span>Total Estimated:</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.8rem; margin-top:1.5rem;">
            <button class="btn btn-outline" onclick="app.closeModal('bookingModal')">Cancel</button>
            <button class="btn btn-primary" onclick="app.nextBookingStep()">Next: VIP Upgrades &rarr;</button>
          </div>
        </div>
      `;
    } else if (b.step === 2) {
      bodyHTML = `
        <div class="booking-form-body">
          <h4 style="font-size:1.15rem; margin-bottom:0.4rem;">Enhance Your Sri Lankan Journey</h4>
          <p style="font-size:0.85rem; color:#64748B; margin-bottom:1.5rem;">Select optional VIP concierge add-ons for maximum comfort.</p>

          <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
            <label style="display:flex; align-items:center; justify-content:space-between; padding:1rem; border:1.5px solid #E2E8F0; border-radius:12px; cursor:pointer;">
              <div style="display:flex; gap:0.8rem; align-items:center;">
                <input type="checkbox" onchange="app.toggleAddon('vip_lounge', 'BIA Airport VIP Silk Route Fast-Track', 60, this.checked)" ${b.addons.some(a => a.id === 'vip_lounge') ? 'checked' : ''} style="width:20px; height:20px;">
                <div>
                  <div style="font-weight:700; color:#002D59;">Colombo Airport VIP Silk Route Lounge</div>
                  <div style="font-size:0.8rem; color:#64748B;">Fast-track immigration, customs clearance, and executive lounge access</div>
                </div>
              </div>
              <strong style="color:#005696;">+${formatPrice(60)}</strong>
            </label>

            <label style="display:flex; align-items:center; justify-content:space-between; padding:1rem; border:1.5px solid #E2E8F0; border-radius:12px; cursor:pointer;">
              <div style="display:flex; gap:0.8rem; align-items:center;">
                <input type="checkbox" onchange="app.toggleAddon('hotel_upgrade', '5-Star Luxury Sanctuary Room Upgrade', 220, this.checked)" ${b.addons.some(a => a.id === 'hotel_upgrade') ? 'checked' : ''} style="width:20px; height:20px;">
                <div>
                  <div style="font-weight:700; color:#002D59;">5-Star Luxury Room & Villa Upgrade</div>
                  <div style="font-size:0.8rem; color:#64748B;">Upgrade to premium ocean-view suites and heritage boutique villas</div>
                </div>
              </div>
              <strong style="color:#005696;">+${formatPrice(220)}</strong>
            </label>

            <label style="display:flex; align-items:center; justify-content:space-between; padding:1rem; border:1.5px solid #E2E8F0; border-radius:12px; cursor:pointer;">
              <div style="display:flex; gap:0.8rem; align-items:center;">
                <input type="checkbox" onchange="app.toggleAddon('ayurveda_pack', 'Full Ayurvedic 90-min Rejuvenation Massage', 45, this.checked)" ${b.addons.some(a => a.id === 'ayurveda_pack') ? 'checked' : ''} style="width:20px; height:20px;">
                <div>
                  <div style="font-weight:700; color:#002D59;">Authentic Ayurvedic Full Body Massage</div>
                  <div style="font-size:0.8rem; color:#64748B;">Herbal oils, steam bath, and relaxation treatment by certified therapist</div>
                </div>
              </div>
              <strong style="color:#005696;">+${formatPrice(45)}</strong>
            </label>
          </div>

          <div class="price-summary-box">
            <div class="price-summary-row">
              <span>Base Subtotal:</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="price-summary-row">
              <span>Add-ons Total:</span>
              <span>${formatPrice(addonsTotal)}</span>
            </div>
            <div class="price-summary-row total">
              <span>Grand Total:</span>
              <span>${formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:1.5rem;">
            <button class="btn btn-outline" onclick="app.prevBookingStep()">&larr; Back</button>
            <button class="btn btn-primary" onclick="app.nextBookingStep()">Next: Traveler Info &rarr;</button>
          </div>
        </div>
      `;
    } else if (b.step === 3) {
      bodyHTML = `
        <div class="booking-form-body">
          <h4 style="font-size:1.15rem; margin-bottom:0.4rem;">Lead Traveler Details</h4>
          <p style="font-size:0.85rem; color:#64748B; margin-bottom:1.5rem;">We need this information to generate your official booking voucher and driver assignment.</p>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name (as in Passport) *</label>
              <input type="text" class="form-control" placeholder="e.g. John Henderson" value="${b.travelerName}" oninput="app.updateBookingField('travelerName', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" class="form-control" placeholder="john@example.com" value="${b.travelerEmail}" oninput="app.updateBookingField('travelerEmail', this.value)">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">WhatsApp / Phone (with Country Code) *</label>
              <input type="tel" class="form-control" placeholder="+44 7911 123456" value="${b.travelerPhone}" oninput="app.updateBookingField('travelerPhone', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Country of Residence *</label>
              <select class="form-control" onchange="app.updateBookingField('travelerCountry', this.value)">
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="France">France 🇫🇷</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="Switzerland">Switzerland 🇨🇭</option>
                <option value="Other">Other International</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Special Requests / Dietary Restrictions (Optional)</label>
            <textarea class="form-control" rows="2" placeholder="e.g. Vegetarian meals, honeymoon welcome, extra luggage assistance" oninput="app.updateBookingField('specialRequests', this.value)">${b.specialRequests}</textarea>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:1.5rem;">
            <button class="btn btn-outline" onclick="app.prevBookingStep()">&larr; Back</button>
            <button class="btn btn-primary" onclick="app.validateAndNext()">Next: Review & Payment &rarr;</button>
          </div>
        </div>
      `;
    } else if (b.step === 4) {
      bodyHTML = `
        <div class="booking-form-body">
          <h4 style="font-size:1.15rem; margin-bottom:0.4rem;">Select Payment Method</h4>
          <p style="font-size:0.85rem; color:#64748B; margin-bottom:1.2rem;">Choose your preferred flexible payment option.</p>

          <div style="display:flex; flex-direction:column; gap:0.8rem; margin-bottom:1.5rem;">
            <label style="display:flex; align-items:flex-start; gap:0.8rem; padding:1rem; border:1.5px solid ${b.paymentMethod === 'deposit_20' ? '#005696' : '#E2E8F0'}; background:${b.paymentMethod === 'deposit_20' ? '#EBF4FC' : '#ffffff'}; border-radius:12px; cursor:pointer;">
              <input type="radio" name="payOpt" value="deposit_20" ${b.paymentMethod === 'deposit_20' ? 'checked' : ''} onchange="app.updateBookingField('paymentMethod', this.value)" style="margin-top:0.3rem;">
              <div>
                <strong style="color:#002D59;">Pay 20% Deposit Now (${formatPrice(depositAmount)})</strong>
                <div style="font-size:0.82rem; color:#64748B;">Lock in your dates today. Settle the remaining balance 14 days before arrival or in Sri Lanka directly.</div>
              </div>
            </label>

            <label style="display:flex; align-items:flex-start; gap:0.8rem; padding:1rem; border:1.5px solid ${b.paymentMethod === 'full' ? '#005696' : '#E2E8F0'}; background:${b.paymentMethod === 'full' ? '#EBF4FC' : '#ffffff'}; border-radius:12px; cursor:pointer;">
              <input type="radio" name="payOpt" value="full" ${b.paymentMethod === 'full' ? 'checked' : ''} onchange="app.updateBookingField('paymentMethod', this.value)" style="margin-top:0.3rem;">
              <div>
                <strong style="color:#002D59;">Pay 100% In Full (${formatPrice(grandTotal)}) - 5% Discount Applied</strong>
                <div style="font-size:0.82rem; color:#64748B;">Instant confirmed voucher with priority vehicle upgrade.</div>
              </div>
            </label>

            <label style="display:flex; align-items:flex-start; gap:0.8rem; padding:1rem; border:1.5px solid ${b.paymentMethod === 'wire' ? '#005696' : '#E2E8F0'}; background:${b.paymentMethod === 'wire' ? '#EBF4FC' : '#ffffff'}; border-radius:12px; cursor:pointer;">
              <input type="radio" name="payOpt" value="wire" ${b.paymentMethod === 'wire' ? 'checked' : ''} onchange="app.updateBookingField('paymentMethod', this.value)" style="margin-top:0.3rem;">
              <div>
                <strong style="color:#002D59;">International Bank Transfer / Invoice Request</strong>
                <div style="font-size:0.82rem; color:#64748B;">Receive an official commercial invoice with Swift/IBAN details.</div>
              </div>
            </label>
          </div>

          <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:1.2rem; border-radius:12px; font-size:0.85rem; color:#475569; margin-bottom:1.5rem;">
            <div style="font-weight:700; color:#002D59; margin-bottom:0.4rem;">🔒 256-Bit SSL Encrypted & SLTDA Certified Guarantee</div>
            Free cancellation up to 21 days prior to departure. Zero hidden service fees.
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:1.5rem;">
            <button class="btn btn-outline" onclick="app.prevBookingStep()">&larr; Back</button>
            <button class="btn btn-gold btn-lg" onclick="app.submitFinalBooking()">Confirm & Generate Voucher 🎉</button>
          </div>
        </div>
      `;
    } else if (b.step === 5) {
      const bookingRef = `KCS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      bodyHTML = `
        <div class="booking-form-body" style="text-align:center;">
          <div style="font-size:3.5rem; margin-bottom:0.5rem;">🎉</div>
          <h3 style="font-size:1.6rem; color:#002D59; margin-bottom:0.4rem;">Booking Confirmed!</h3>
          <p style="color:#64748B; font-size:0.95rem;">Ayubowan! We look forward to hosting you in paradise.</p>

          <div class="voucher-card" style="margin:1.8rem 0;">
            <div style="font-size:0.85rem; color:#64748B; text-transform:uppercase; letter-spacing:0.06em;">Official Booking Confirmation Voucher</div>
            <div class="voucher-ref">${bookingRef}</div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; text-align:left; margin-top:1rem; font-size:0.9rem;">
              <div><strong>Tour / Service:</strong> ${b.item.title || b.item.name}</div>
              <div><strong>Start Date:</strong> ${b.date}</div>
              <div><strong>Travelers:</strong> ${b.adults} Adults, ${b.children} Children</div>
              <div><strong>Lead Guest:</strong> ${b.travelerName || 'Valued Guest'}</div>
              <div><strong>Total Amount:</strong> ${formatPrice(grandTotal)}</div>
              <div><strong>Deposit Status:</strong> <span style="color:#10B981; font-weight:700;">✓ Confirmed</span></div>
            </div>

            <div style="margin-top:1.4rem; padding-top:1rem; border-top:1px dashed #CBD5E1; font-size:0.82rem; color:#64748B;">
              A formal copy has been sent to <strong>${b.travelerEmail || 'your email'}</strong> and dispatched to your dedicated chauffeur-guide.
            </div>
          </div>

          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-outline" onclick="window.print()">🖨️ Print Voucher</button>
            <a href="https://wa.me/94771234567?text=Hello%20KCSTours,%20I%20have%20confirmed%20booking%20${bookingRef}" target="_blank" class="btn btn-primary" style="background:#25D366; border-color:#25D366;">💬 WhatsApp Concierge</a>
            <button class="btn btn-primary" onclick="app.closeModal('bookingModal')">Done</button>
          </div>
        </div>
      `;
    }

    elements.bookingModalContent.innerHTML = stepperHTML + bodyHTML;
  }

  // ==========================================================================
  // Global Search Engine
  // ==========================================================================
  function handleGlobalSearch(query) {
    if (!elements.searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      elements.searchResults.innerHTML = `
        <div style="text-align:center; padding:2rem; color:#94A3B8;">
          Type any destination (e.g. Sigiriya, Ella, Galle), tour type, hotel, or activity...
        </div>
      `;
      return;
    }

    const matchedDests = KCS_DATA.destinations.filter(d => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q));
    const matchedTours = KCS_DATA.tours.filter(t => t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    const matchedHotels = KCS_DATA.hotels.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
    const matchedActs = KCS_DATA.activities.filter(a => a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q));

    let html = '';

    if (matchedTours.length > 0) {
      html += `<div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:#00A3C4; margin:1rem 0 0.5rem 0;">Tour Packages (${matchedTours.length})</div>`;
      html += matchedTours.map(t => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.8rem; background:#F8FAFC; border-radius:8px; margin-bottom:0.4rem; cursor:pointer;" onclick="app.closeModal('searchModal'); app.openTourModal('${t.id}')">
          <div>
            <div style="font-weight:700; color:#002D59;">${t.title}</div>
            <div style="font-size:0.8rem; color:#64748B;">⏱️ ${t.duration} • ${formatPrice(t.priceUSD)}</div>
          </div>
          <span class="btn btn-outline btn-sm">View &rarr;</span>
        </div>
      `).join('');
    }

    if (matchedDests.length > 0) {
      html += `<div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:#00A3C4; margin:1rem 0 0.5rem 0;">Destinations (${matchedDests.length})</div>`;
      html += matchedDests.map(d => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.8rem; background:#F8FAFC; border-radius:8px; margin-bottom:0.4rem; cursor:pointer;" onclick="app.closeModal('searchModal'); app.openDestinationDetail('${d.id}')">
          <div>
            <div style="font-weight:700; color:#002D59;">📍 ${d.name}</div>
            <div style="font-size:0.8rem; color:#64748B;">${d.tagline}</div>
          </div>
          <span class="btn btn-outline btn-sm">Explore &rarr;</span>
        </div>
      `).join('');
    }

    if (matchedHotels.length > 0) {
      html += `<div style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:#00A3C4; margin:1rem 0 0.5rem 0;">Hotels & Resorts (${matchedHotels.length})</div>`;
      html += matchedHotels.map(h => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.8rem; background:#F8FAFC; border-radius:8px; margin-bottom:0.4rem; cursor:pointer;" onclick="app.closeModal('searchModal'); app.startBooking('hotel', '${h.id}')">
          <div>
            <div style="font-weight:700; color:#002D59;">🏨 ${h.name}</div>
            <div style="font-size:0.8rem; color:#64748B;">📍 ${h.location} • from ${formatPrice(h.priceUSD)}/night</div>
          </div>
          <span class="btn btn-outline btn-sm">Book &rarr;</span>
        </div>
      `).join('');
    }

    if (!html) {
      html = `<div style="text-align:center; padding:2rem; color:#94A3B8;">No results found for "${query}". Try searching for 'Sigiriya', 'Safari', or 'Train'.</div>`;
    }

    elements.searchResults.innerHTML = html;
  }

  // ==========================================================================
  // Admin CMS Mock Data
  // ==========================================================================
  function renderAdminData() {
    if (!elements.adminBookingsTable) return;
    const mockBookings = [
      { id: 'KCS-2026-9281', guest: 'Sarah Jenkins', country: 'UK 🇬🇧', tour: '10 Days Ceylon Odyssey', dates: '12 Oct - 22 Oct 2026', pax: '2 Adults', amount: '$2,780', status: 'Confirmed' },
      { id: 'KCS-2026-8842', guest: 'Dr. Klaus Brandt', country: 'Germany 🇩🇪', tour: '7 Days Classic Highlights', dates: '05 Nov - 12 Nov 2026', pax: '3 Adults', amount: '$2,670', status: 'Deposit Paid' },
      { id: 'KCS-2026-7319', guest: 'Emily & Liam Evans', country: 'Australia 🇦🇺', tour: '12 Days Luxury Safari', dates: '20 Nov - 02 Dec 2026', pax: '2 Adults', amount: '$4,900', status: 'Confirmed' },
      { id: 'KCS-2026-6104', guest: 'Marc Dupont', country: 'France 🇫🇷', tour: 'Custom Family Wildlife', dates: '15 Dec - 24 Dec 2026', pax: '4 Pax', amount: '$3,850', status: 'Quoted' }
    ];

    elements.adminBookingsTable.innerHTML = mockBookings.map(b => `
      <tr>
        <td style="font-weight:700; color:#00A3C4;">${b.id}</td>
        <td><strong>${b.guest}</strong><br><span style="font-size:0.8rem; color:#94A3B8;">${b.country}</span></td>
        <td>${b.tour}</td>
        <td>${b.dates}</td>
        <td>${b.pax}</td>
        <td style="font-weight:700; color:#F59E0B;">${b.amount}</td>
        <td><span class="badge ${b.status === 'Confirmed' ? 'badge-emerald' : 'badge-gold'}">${b.status}</span></td>
      </tr>
    `).join('');
  }

  // Re-render everything that depends on Currency
  function renderAllDynamicSections() {
    renderDestinations();
    renderTours();
    renderHotels();
    renderActivities();
    renderVehicles();
    renderWishlistDrawer();
    updateCustomBuilderEstimate();
    updateTransferCalculation();
  }

  // ==========================================================================
  // Public App API Interface
  // ==========================================================================
  window.app = {
    // Currency
    formatPrice,

    // Wishlist
    toggleWishlist,
    removeFromWishlist: (id) => {
      state.wishlist = state.wishlist.filter(w => w.id !== id);
      localStorage.setItem('kcs_wishlist', JSON.stringify(state.wishlist));
      updateWishlistBadge();
      renderWishlistDrawer();
      renderTours();
      showToast('Item removed from wishlist');
    },
    openWishlist: () => {
      renderWishlistDrawer();
      elements.wishlistDrawer.classList.add('open');
      elements.wishlistOverlay.style.display = 'block';
    },
    closeWishlist: () => {
      elements.wishlistDrawer.classList.remove('open');
      elements.wishlistOverlay.style.display = 'none';
    },
    quickBookWishlistItem: (id, type) => {
      window.app.closeWishlist();
      window.app.startBooking(type, id);
    },

    // Modals
    openTourModal,
    openArticleModal,
    openDestinationDetail: (destId) => {
      const dest = KCS_DATA.destinations.find(d => d.id === destId);
      if (!dest) return;
      // Filter tours related to this destination
      state.activeTourFilter = 'all';
      window.app.filterTours('all', null);
      window.app.scrollToSection('toursSection');
      showToast(`Showing popular tours covering ${dest.name}! 🗺️`);
    },
    closeModal: (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    },

    // Booking Engine
    startBooking,
    updateBookingField: (key, val) => {
      state.currentBooking[key] = val;
      renderBookingStep();
    },
    toggleAddon: (id, name, price, isChecked) => {
      if (isChecked) {
        state.currentBooking.addons.push({ id, name, price });
      } else {
        state.currentBooking.addons = state.currentBooking.addons.filter(a => a.id !== id);
      }
      renderBookingStep();
    },
    nextBookingStep: () => {
      state.currentBooking.step++;
      renderBookingStep();
    },
    prevBookingStep: () => {
      state.currentBooking.step--;
      renderBookingStep();
    },
    validateAndNext: () => {
      if (!state.currentBooking.travelerName || !state.currentBooking.travelerEmail) {
        alert('Please fill in your name and email to proceed.');
        return;
      }
      window.app.nextBookingStep();
    },
    submitFinalBooking: () => {
      state.currentBooking.step = 5;
      renderBookingStep();
      showToast('🎉 Booking successfully generated!');
    },
    bookTransfer: (dest, vehType, price) => {
      state.currentBooking = {
        type: 'transfer',
        item: { title: `BIA Airport to ${dest} Transfer (${vehType.toUpperCase()})`, priceUSD: price },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        adults: 2,
        children: 0,
        addons: [],
        travelerName: '',
        travelerEmail: '',
        travelerPhone: '',
        travelerCountry: 'United Kingdom',
        specialRequests: '',
        paymentMethod: 'deposit_20',
        step: 1
      };
      renderBookingStep();
      elements.bookingModal.classList.add('active');
    },

    // Filters
    filterDestinations: (region, btn) => {
      state.activeDestFilter = region;
      document.querySelectorAll('#destFilterNav .filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderDestinations();
    },
    filterTours: (cat, btn) => {
      state.activeTourFilter = cat;
      document.querySelectorAll('#tourFilterNav .filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderTours();
    },
    filterHotels: (cat, btn) => {
      state.activeHotelFilter = cat;
      document.querySelectorAll('#hotelFilterNav .filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderHotels();
    },
    filterActivities: (cat, btn) => {
      state.activeActFilter = cat;
      document.querySelectorAll('#actFilterNav .filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderActivities();
    },
    filterFaqs: (cat, btn) => {
      state.activeFaqFilter = cat;
      document.querySelectorAll('#faqFilterNav .filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderFAQs();
    },
    toggleFaq: (btn) => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('active');
    },

    // Custom Builder UI
    setBuilderStep: (stepNumber) => {
      document.querySelectorAll('.step-node').forEach((node, idx) => {
        if (idx + 1 === stepNumber) {
          node.classList.add('active');
          node.classList.remove('completed');
        } else if (idx + 1 < stepNumber) {
          node.classList.remove('active');
          node.classList.add('completed');
        } else {
          node.classList.remove('active', 'completed');
        }
      });

      document.querySelectorAll('.builder-step-content').forEach((pane, idx) => {
        if (idx + 1 === stepNumber) pane.classList.add('active');
        else pane.classList.remove('active');
      });
    },
    toggleBuilderDest: (destId, card) => {
      card.classList.toggle('selected');
      const idx = state.customTrip.destinations.indexOf(destId);
      if (idx > -1) state.customTrip.destinations.splice(idx, 1);
      else state.customTrip.destinations.push(destId);
      updateCustomBuilderEstimate();
    },
    selectBuilderOption: (group, val, card) => {
      const parent = card.closest('.builder-grid-select');
      parent.querySelectorAll('.builder-choice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (group === 'duration') state.customTrip.durationDays = parseInt(val);
      if (group === 'party') state.customTrip.travelerType = val;
      if (group === 'hotel') state.customTrip.hotelTier = val;
      updateCustomBuilderEstimate();
    },
    toggleBuilderInterest: (interestId, card) => {
      card.classList.toggle('selected');
      const idx = state.customTrip.interests.indexOf(interestId);
      if (idx > -1) state.customTrip.interests.splice(idx, 1);
      else state.customTrip.interests.push(interestId);
      updateCustomBuilderEstimate();
    },
    submitCustomTripRequest: () => {
      const emailInput = document.getElementById('customTripEmail');
      const nameInput = document.getElementById('customTripName');
      if (!nameInput.value || !emailInput.value) {
        alert('Please provide your name and email to receive the custom itinerary quote.');
        return;
      }
      showToast('🎉 Custom Trip Request Dispatched! Our destination specialist will contact you in 2 hours.');
      nameInput.value = '';
      emailInput.value = '';
      window.app.setBuilderStep(1);
    },

    // Search Modal
    openSearchModal: () => {
      elements.searchModal.classList.add('active');
      setTimeout(() => elements.searchInput && elements.searchInput.focus(), 150);
    },

    // Admin CMS
    toggleAdmin: () => {
      elements.adminOverlay.classList.toggle('active');
      renderAdminData();
    },

    // Navigation & Scroll
    scrollToSection: (sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keyboard shortcut Ctrl+K for Search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      window.app.openSearchModal();
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      window.app.closeWishlist();
    }
  });

  // Search input typing listener
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
  }

  // WhatsApp popup toggle
  if (elements.whatsappBtn && elements.whatsappPopup) {
    elements.whatsappBtn.addEventListener('click', () => {
      elements.whatsappPopup.classList.toggle('active');
    });
  }

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  });

  // Run initialization
  initCurrencyAndLang();
  updateWishlistBadge();
  renderDestinations();
  renderTours();
  renderHotels();
  renderActivities();
  renderVehicles();
  renderArticles();
  renderReviews();
  renderFAQs();
  updateCustomBuilderEstimate();
  updateTransferCalculation();

  if (elements.transferDropoff && elements.transferVehicle) {
    elements.transferDropoff.addEventListener('change', updateTransferCalculation);
    elements.transferVehicle.addEventListener('change', updateTransferCalculation);
  }
});
