// ==========================================================================
// KCSTours Master Travel Data Store (Sri Lanka Tourism Platform)
// ==========================================================================

export const EXCHANGE_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'AUD (A$)' },
  CAD: { symbol: 'C$', rate: 1.36, label: 'CAD (C$)' },
  LKR: { symbol: 'Rs.', rate: 305.0, label: 'LKR (Rs)' }
};

export const DESTINATIONS = [
  {
    id: 'sigiriya',
    name: 'Sigiriya & Cultural Triangle',
    region: 'cultural',
    regionLabel: 'Cultural Triangle',
    tagline: 'The 8th Wonder of the World & Ancient Citadels',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    description: 'Rise before dawn to ascend the 5th-century sky fortress of King Kashyapa, explore the ancient ruins of Polonnaruwa, and marvel at Dambulla Cave Temple frescoes.',
    highlights: ['Sigiriya Lion Rock Fortress', 'Dambulla Golden Rock Temple', 'Minneriya Elephant Gathering', 'Polonnaruwa Royal Palaces'],
    bestTime: 'December to April, July to September',
    climate: 'Warm & Tropical (28°C - 33°C)',
    startingPrice: 380,
    badge: 'UNESCO World Heritage',
    estimatedStay: '2 - 3 Days',
    visitDuration: '3 - 4 Hours (Rock Climb) / Full Day',
    annualFootfall: '520,000+ Foreign Tourists (SLTDA)'
  },
  {
    id: 'ella',
    name: 'Ella & Tea Highlands',
    region: 'highlands',
    regionLabel: 'Central Highlands',
    tagline: 'Misty Valleys, Nine Arch Bridge & Cloud Forests',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    description: 'Sri Lanka’s hiking capital perched amidst rolling emerald tea plantations. Experience the iconic blue train ride, Little Adam’s Peak, and Ravana Falls.',
    highlights: ['Nine Arch Viaduct Bridge', 'Little Adam’s Peak Sunrise', 'Scenic Blue Mountain Train', 'Ravana Waterfall & Ella Rock'],
    bestTime: 'January to May, August to September',
    climate: 'Cool Mountain Breeze (18°C - 24°C)',
    startingPrice: 290,
    badge: 'Traveler Favorite',
    estimatedStay: '2 - 3 Days',
    visitDuration: '2 - 4 Hours (Hikes & Bridge)',
    annualFootfall: '420,000+ Foreign Tourists'
  },
  {
    id: 'galle',
    name: 'Galle & Southern Coast',
    region: 'coast',
    regionLabel: 'Southern Coast',
    tagline: '17th Century Dutch Fort & Golden Sandy Bays',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    description: 'Wander along cobblestone lanes flanked by colonial ramparts, artisan boutiques, and chic seaside cafes, then dip into the warm turquoise waters of Unawatuna.',
    highlights: ['Galle Fort Lighthouse & Ramparts', 'Unawatuna Beach & Jungle Beach', 'Stilt Fishermen of Koggala', 'Turtle Conservation Sanctuaries'],
    bestTime: 'November to April',
    climate: 'Tropical Maritime (27°C - 31°C)',
    startingPrice: 240,
    badge: 'Living Heritage',
    estimatedStay: '1 - 2 Days',
    visitDuration: '3 - 4 Hours (Fort Ramparts Walk)',
    annualFootfall: '900,000+ Coastal Visitors'
  },
  {
    id: 'yala',
    name: 'Yala & Udawalawe Safari',
    region: 'wildlife',
    regionLabel: 'Wildlife & Safari',
    tagline: 'Highest Leopard Density on Earth & Wild Elephants',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    description: 'Venture into dry-zone thorny forests in rugged 4x4 safari jeeps to track Sri Lankan leopards (Panthera pardus kotiya), sloth bears, Asian elephants, and saltwater crocodiles.',
    highlights: ['Leopard Tracking in Block 1', 'Udawalawe Elephant Orphanage Transit', 'Kumana Bird Sanctuaries', 'Luxury Bush Glamping under the Stars'],
    bestTime: 'February to July (Peak Sightings)',
    climate: 'Dry Zone Sunshine (29°C - 34°C)',
    startingPrice: 320,
    badge: 'Premier Wildlife',
    estimatedStay: '1 - 2 Days',
    visitDuration: '3.5 - 4 Hours (Per Game Drive)',
    annualFootfall: '340,000+ Safari Visitors (DWC)'
  },
  {
    id: 'kandy',
    name: 'Kandy & Knuckles Range',
    region: 'cultural',
    regionLabel: 'Cultural & Highlands',
    tagline: 'Sacred Temple of the Tooth & Royal Botanic Gardens',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    description: 'The last royal kingdom of Ceylon, nestled around a picturesque placid lake. Home to the golden-roofed Temple of the Sacred Tooth Relic and mist-clad Knuckles mountain range.',
    highlights: ['Sri Dalada Maligawa (Tooth Temple)', 'Royal Botanical Gardens Peradeniya', 'Traditional Kandyan Fire Dancing', 'Knuckles UNESCO Cloud Forest Treks'],
    bestTime: 'December to April, July to August',
    climate: 'Sub-tropical Highland (22°C - 28°C)',
    startingPrice: 260,
    badge: 'Sacred Kingdom',
    estimatedStay: '2 Days',
    visitDuration: '2 - 3 Hours (Temple & Gardens)',
    annualFootfall: '680,000+ Foreign Visitors'
  },
  {
    id: 'mirissa',
    name: 'Mirissa & Weligama Bay',
    region: 'coast',
    regionLabel: 'Southern Ocean',
    tagline: 'Blue Whale Migrations & Surf Paradises',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier location in Asia to spot colossal Blue Whales and playful spinner dolphins just off the continental shelf, paired with crescent bays perfect for learning to surf.',
    highlights: ['Responsible Whale Watching Cruises', 'Coconut Tree Hill Viewpoint', 'Gentle Beginner Surf Breaks', 'Seafood BBQ on Sunset Beaches'],
    bestTime: 'November to April',
    climate: 'Warm Coastal Breeze (27°C - 32°C)',
    startingPrice: 195,
    badge: 'Ocean Escapes',
    estimatedStay: '2 - 3 Days',
    visitDuration: '4 - 5 Hours (Whale Cruise & Beach)',
    annualFootfall: '310,000+ Ocean Visitors'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya ("Little England")',
    region: 'highlands',
    regionLabel: 'High Tea Highlands',
    tagline: 'Colonial Mansions, Tea Factories & Horton Plains',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Step into misty emerald hills dotted with English Tudor-style bungalows, manicured golf courses, waterfalls, and world-renowned Ceylon Single Origin black tea plantations.',
    highlights: ['Pedro Tea Estate & Factory Tasting', 'Horton Plains & World’s End Cliff', 'Gregory Lake Boat Rides', 'Historic Grand Hotel High Tea'],
    bestTime: 'February to May',
    climate: 'Crisp Mountain Alpine (12°C - 20°C)',
    startingPrice: 280,
    badge: 'Highland Retreat',
    estimatedStay: '1 - 2 Days',
    visitDuration: '3 - 5 Hours (Tea Factory & Horton Plains)',
    annualFootfall: '290,000+ Highland Travelers'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee & Pigeon Island',
    region: 'coast',
    regionLabel: 'East Coast Paradise',
    tagline: 'Turquoise Waters, Coral Reefs & Koneswaram Temple',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'The jewel of the East Coast with pristine powdery white sand, the sacred cliffside Koneswaram Hindu Temple, and marine national parks teeming with reef sharks and sea turtles.',
    highlights: ['Pigeon Island Coral Snorkeling', 'Koneswaram Temple Swami Rock', 'Nilaveli Crystal Sands', 'Marble Beach & Whale Watching'],
    bestTime: 'May to October',
    climate: 'Warm & Sunny (29°C - 35°C)',
    startingPrice: 340,
    badge: 'Pristine East Coast',
    estimatedStay: '3 - 4 Days',
    visitDuration: 'Half Day (Pigeon Island Snorkel)',
    annualFootfall: '140,000+ Coastal Visitors'
  },
  {
    id: 'mahiyanganaya',
    name: 'Mahiyanganaya & Dambana Vedda Village',
    region: 'cultural',
    regionLabel: 'Indigenous & Cultural Heritage',
    tagline: 'Living Vedda Heritage, Sorabora Wewa & Untamed Waterfalls',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse into the deep anthropological roots of Sri Lanka in Dambana, meet the indigenous Wanniya-laeto community, glide across ancient Sorabora Wewa, and trek through pristine waterfalls.',
    highlights: ['Dambana Indigenous Vedda Village & Museum', 'Sorabora Wewa Ancient Sluice & Boat Safari', 'Rathna Ella Waterfall Trek', 'Mahiyangana Raja Maha Viharaya'],
    bestTime: 'December to March, July to September',
    climate: 'Tropical Dry Zone (27°C - 32°C)',
    startingPrice: 210,
    badge: 'Indigenous Heritage',
    estimatedStay: '1 - 2 Days',
    visitDuration: '3 - 4 Hours (Dambana Immersion & Sluice)',
    annualFootfall: '22,000+ Foreign / 450,000+ Domestic'
  }
];

export const TOURS = [
  {
    id: 'tour-highlights-7d',
    title: '7 Days – Sri Lanka Classic Highlights',
    subtitle: 'Colombo • Sigiriya • Kandy • Ella • Galle Coastal Fort',
    duration: '7 Days / 6 Nights',
    daysCount: 7,
    category: 'classic',
    difficulty: 'Easy / Moderate',
    groupType: 'Private Chauffeur Tour',
    rating: 4.95,
    reviewsCount: 382,
    badge: 'Best Seller',
    featured: true,
    priceUSD: 890,
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80'
    ],
    route: ['Colombo BIA', 'Sigiriya', 'Kandy', 'Scenic Train to Ella', 'Galle Fort', 'Colombo Departure'],
    description: 'The definitive Sri Lankan journey crafted specifically for first-time visitors who want to witness the crown jewels of Ceylon: ancient royal citadel fortresses, sacred Buddhist shrines, misty tea hills aboard the world’s most scenic train, and colonial ocean ramparts.',
    highlights: [
      'Climb the legendary 5th-century Sigiriya Rock Fortress at sunrise',
      'Receive blessings at the sacred Temple of the Tooth in Kandy',
      'Reserved first-class seats on the world-famous Ella Scenic Mountain Train',
      'Wander through tea factories and sample Ceylon single origin golden tips',
      'Sunset walking tour across UNESCO Galle Fort ramparts and lighthouse',
      'Private air-conditioned vehicle with dedicated English-speaking chauffeur-guide'
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Sri Lanka • Colombo Arrival & Transit to Dambulla', summary: 'Meet your private KCSTours chauffeur-guide at Bandaranaike International Airport. Relax as you journey past lush coconut groves toward the Cultural Triangle.', stay: 'Heritance Kandalama / Amaya Lake', meals: 'Dinner included' },
      { day: 2, title: 'The Sky Citadel • Sigiriya Rock Fortress & Minneriya Wild Elephants', summary: 'Ascend the dramatic Lion Rock fortress early morning to admire the ancient water gardens and celestial frescoes. Afternoon private open-top 4x4 safari tracking giant elephant herds.', stay: 'Heritance Kandalama', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Spices & Sacred Heritage • Dambulla Caves to Royal City of Kandy', summary: 'Explore the spectacular golden cave temples of Dambulla with ancient Buddha statues. Visit an organic Matale spice garden before arriving in Kandy for evening Tooth Temple ceremony.', stay: 'Earl’s Regency Kandy', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'The Legendary Tea Train • Kandy to Ella Highland Passage', summary: 'Board the iconic blue train through emerald valleys, roaring waterfalls, and rolling mist. Arrive in relaxed Ella and hike to Nine Arch Bridge for sunset photography.', stay: '98 Acres Resort & Spa / EKHO Ella', meals: 'Breakfast & Dinner' },
      { day: 5, title: 'Little Adam’s Peak & Descent to Galle Coastal Ramparts', summary: 'Catch sunrise over Ella Gap before descending through scenic Ravana Falls toward the Indian Ocean. Check into boutique hotel in historic Galle Fort.', stay: 'Fort Bazaar / Jetwing Lighthouse', meals: 'Breakfast included' },
      { day: 6, title: 'Colonial Charms & Golden Southern Beaches', summary: 'Guided walking tour through Galle Fort’s cobblestone alleyways, Dutch Reformed Church, and ramparts. Afternoon at leisure on Unawatuna or Bentota beach with fresh seafood dinner.', stay: 'Jetwing Lighthouse Galle', meals: 'Breakfast & Seafood Dinner' },
      { day: 7, title: 'Colombo City Highlights & Airport Farewell', summary: 'Scenic coastal highway drive to Colombo. Panoramic tour of Independence Square, Gangaramaya Temple, and souvenir shopping at Barefoot before airport transfer.', stay: 'Departure', meals: 'Breakfast included' }
    ],
    included: [
      '6 nights accommodation in handpicked 4-star & boutique luxury hotels',
      'Private luxury AC vehicle with dedicated professional English-speaking chauffeur-guide',
      'Daily sumptuous breakfast + 5 authentic dinner experiences',
      'Reserved First-Class / Observation train tickets (Kandy to Ella)',
      'Minneriya National Park private 4x4 jeep safari with tracker',
      'All highway tolls, fuel, chauffeur quarters, and parking fees',
      'Complimentary 24/7 on-ground island concierge & 4G travel SIM card',
      'Chilled bottled mineral water throughout journeys'
    ],
    excluded: [
      'International flights and Sri Lanka ETA tourist visa fee',
      'Monuments entrance fees (Sigiriya, Tooth Temple, Dambulla Caves)',
      'Travel insurance and personal expenditures',
      'Discretionary tips for driver and local guides'
    ]
  },
  {
    id: 'tour-odyssey-10d',
    title: '10 Days – Complete Ceylon Odyssey',
    subtitle: 'Culture • Leopards of Yala • Hill Country • Whales & Beaches',
    duration: '10 Days / 9 Nights',
    daysCount: 10,
    category: 'signature',
    difficulty: 'Moderate',
    groupType: 'Private Tailored Journey',
    rating: 4.98,
    reviewsCount: 247,
    badge: 'Signature Tour',
    featured: true,
    priceUSD: 1390,
    heroImage: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    route: ['Colombo', 'Sigiriya', 'Polonnaruwa', 'Kandy', 'Nuwara Eliya', 'Ella', 'Yala Safari', 'Mirissa', 'Galle', 'Airport'],
    description: 'The master itinerary covering the full spectrum of Sri Lanka. From 2,500-year-old ruined royal capitals to deep savannahs of Yala tracking wild leopards, to pristine beaches where Blue Whales glide along the southern shoreline.',
    highlights: [
      'Two private game drives in Yala National Park tracking leopards & sloth bears',
      'Cycle through ancient royal kingdom of Polonnaruwa with local historian',
      'High Tea and colonial heritage at Grand Hotel Nuwara Eliya',
      'Morning blue whale and dolphin safari in Mirissa with marine naturalist',
      'Full board luxury stays in safari glamping tents and oceanfront villas'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Colombo Gateway', summary: 'Arrival in Colombo and oceanfront relaxation.', stay: 'Cinnamon Grand Colombo', meals: 'Dinner' },
      { day: 2, title: 'Cultural Triangle & Dambulla Caves', summary: 'Drive to Dambulla and witness 150+ gilded Buddha statues.', stay: 'Aliya Resort & Spa', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Sigiriya Rock & Polonnaruwa Kingdom', summary: 'Dawn climb of Sigiriya and cycling through Polonnaruwa ruins.', stay: 'Aliya Resort & Spa', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Spice Hills & Sacred City of Kandy', summary: 'Scenic drive to Kandy, temple ceremonies, and botanical gardens.', stay: 'The Gilded Kandy', meals: 'Breakfast & Dinner' },
      { day: 5, title: 'Highland Tea Estates of Nuwara Eliya', summary: 'Waterfalls, tea plucking masterclass, and colonial architecture.', stay: 'Heritance Tea Factory', meals: 'Breakfast & High Tea' },
      { day: 6, title: 'Scenic Train Passage to Ella', summary: 'Famous scenic train journey across Demodara Nine Arch Bridge.', stay: '98 Acres Resort', meals: 'Breakfast & Dinner' },
      { day: 7, title: 'Yala Safari Wilderness Expedition', summary: 'Descend to dry-zone savannah. Afternoon leopard safari game drive.', stay: 'Cinnamon Wild Yala', meals: 'Breakfast & Bush Dinner' },
      { day: 8, title: 'Dawn Safari & Transfer to Mirissa Coast', summary: 'Early morning game drive for birdlife and elephants; reach the beach.', stay: 'Weligama Bay Marriott Resort', meals: 'Breakfast' },
      { day: 9, title: 'Mirissa Blue Whales & Historic Galle Fort', summary: 'Whale watching cruise, Coconut Tree Hill, and sunset over Galle Fort.', stay: 'Jetwing Lighthouse Galle', meals: 'Breakfast & Dinner' },
      { day: 10, title: 'Coastal Highway Transfer to Airport', summary: 'Final souvenir stop and seamless transfer to Colombo BIA.', stay: 'Departure', meals: 'Breakfast' }
    ],
    included: [
      '9 nights handpicked luxury 4-star superior & 5-star accommodation',
      'Private Mercedes / Toyota Luxury Van with English-speaking licensed guide',
      '2 x Private 4x4 Safari Jeeps in Yala with expert naturalist',
      'Mirissa Whale Watching cruise aboard certified eco-catamaran',
      'Observation class scenic train tickets Kandy to Ella',
      'Daily breakfast & 7 dinners including bush safari dining experience'
    ],
    excluded: [
      'International flights and visa fees',
      'Alcoholic beverages and personal expenses'
    ]
  },
  {
    id: 'tour-luxury-wildlife-12d',
    title: '12 Days – Grand Luxury Safari & Beach Hideaway',
    subtitle: 'Wilpattu • Cultural Triangle • Ella • Yala • Private Beach Villa',
    duration: '12 Days / 11 Nights',
    daysCount: 12,
    category: 'luxury',
    difficulty: 'Easy / Relaxed',
    groupType: 'VIP Ultra-Luxury',
    rating: 5.0,
    reviewsCount: 119,
    badge: 'VIP Ultra-Luxury',
    featured: true,
    priceUSD: 2450,
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80'
    ],
    route: ['Colombo', 'Wilpattu', 'Sigiriya', 'Nuwara Eliya', 'Yala Luxury Tents', 'Tangalle Ocean Villa'],
    description: 'An uncompromising luxury voyage pairing Sri Lanka’s most exclusive boutique sanctuaries (Resplendent Ceylon / Jetwing / Amaya) with private naturalists, champagne bush picnics, and secluded oceanfront relaxation.',
    highlights: [
      'Stay at Ceylon Tea Trails and Wild Coast Tented Lodge',
      'Private naturalist guides for all national park excursions',
      'Helicopter transfer options available on request',
      'Personalized Ayurvedic spa rejuvenation packages included'
    ],
    itinerary: [
      { day: 1, title: 'VIP Airport Welcome & Luxury Colombo Transfer', summary: 'Fast-track airport clearance and check-in to Tintagel Colombo.', stay: 'Tintagel Colombo', meals: 'Dinner' },
      { day: 2, title: 'Wilpattu Untamed Safari Expeditions', summary: 'Track leopards and sloth bears around natural sand-rimmed lakes.', stay: 'Mahoora Tented Safari Camp', meals: 'All Inclusive' },
      { day: 3, title: 'Ancient Sigiriya & Private Helicopter / Drive', summary: 'Private guided climb of Sigiriya fortress and Water Gardens.', stay: 'Water Garden Sigiriya', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Dambulla Caves & Ceylon Tea Trails', summary: 'Travel into golden tea valleys. Restored colonial planter bungalow.', stay: 'Ceylon Tea Trails', meals: 'All Inclusive' },
      { day: 5, title: 'Tea Master Experience & Mountain Hiking', summary: 'Walk scenic trails, taste premium white teas, and enjoy croquet.', stay: 'Ceylon Tea Trails', meals: 'All Inclusive' },
      { day: 6, title: 'Scenic Train to Ella & 98 Acres Sanctuary', summary: 'Scenic train journey and private villa stay overlooking Ella Rock.', stay: '98 Acres Resort & Spa', meals: 'Breakfast & Dinner' },
      { day: 7, title: 'Wild Coast Tented Lodge Yala', summary: 'Arrive at ultra-luxurious cocoon tents where jungle meets ocean.', stay: 'Wild Coast Tented Lodge', meals: 'All Inclusive' },
      { day: 8, title: 'Dual Leopard & Sloth Bear Safaris', summary: 'Dawn and dusk game drives with resident zoologist tracker.', stay: 'Wild Coast Tented Lodge', meals: 'All Inclusive' },
      { day: 9, title: 'Secluded Southern Coast Villa (Tangalle)', summary: 'Transfer along palm-fringed coast to exclusive private ocean villa.', stay: 'Anantara Peace Haven Tangalle', meals: 'Breakfast' },
      { day: 10, title: 'Ayurvedic Wellness & Private Beach Day', summary: 'Comprehensive 90-minute Ayurvedic massage and sunset beach cocktails.', stay: 'Anantara Peace Haven Tangalle', meals: 'Breakfast' },
      { day: 11, title: 'Galle Fort Cultural Walk & Dining', summary: 'Private historical walk with author-historian through Galle Fort.', stay: 'Amangalla Galle Fort', meals: 'Breakfast & Dinner' },
      { day: 12, title: 'Farewell Ceylon & VIP Airport Dropoff', summary: 'Private transfer along expressway to VIP lounge at Colombo BIA.', stay: 'Departure', meals: 'Breakfast' }
    ],
    included: [
      '11 nights in 5-star Relais & Châteaux / Luxury Boutique sanctuaries',
      'VIP luxury Mercedes SUV / Toyota Prado vehicle with senior chauffeur-guide',
      'All Inclusive dining at safari lodges and Tea Trails bungalows',
      'Private customized game drives with top-tier naturalists',
      'Full Ayurvedic spa treatments and all national park VIP permits'
    ],
    excluded: ['International flights and visas']
  },
  {
    id: 'tour-hill-cultural-5d',
    title: '5 Days – Cultural & Hill Country Wonders',
    subtitle: 'Sigiriya • Dambulla • Kandy • Ella Scenic Rail',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    category: 'cultural',
    difficulty: 'Easy',
    groupType: 'Private Tour',
    rating: 4.92,
    reviewsCount: 164,
    badge: 'Short Break',
    featured: false,
    priceUSD: 620,
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80'
    ],
    route: ['Airport', 'Sigiriya', 'Kandy', 'Ella Train', 'Airport/South Coast'],
    description: 'The ideal compact itinerary for travelers on a short holiday or stopover who want to experience Sri Lanka’s most iconic historical monuments and mountain landscapes.',
    highlights: [
      'Sigiriya Lion Rock ascent & Dambulla cave temple frescoes',
      'Kandy sacred tooth relic evening ceremony',
      'Observation carriage train ride to Nine Arch Bridge'
    ],
    itinerary: [
      { day: 1, title: 'Airport to Sigiriya Rock Citadel', summary: 'Pick up and drive to Sigiriya. Evening village tour.', stay: 'Habarana Village by Cinnamon', meals: 'Dinner' },
      { day: 2, title: 'Sigiriya Fortress & Dambulla Caves to Kandy', summary: 'Climb Sigiriya, explore Dambulla, arrive in Kandy.', stay: 'Earl’s Regent Kandy', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Kandy Temple & Train to Ella', summary: 'Morning tooth temple visit, afternoon scenic train ride to Ella.', stay: 'Mountain Heavens Ella', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Nine Arch Bridge & Little Adam’s Peak', summary: 'Hike sunrise viewpoints and tea garden estates.', stay: 'Mountain Heavens Ella', meals: 'Breakfast' },
      { day: 5, title: 'Descent to Colombo / Beach drop-off', summary: 'Comfortable transfer to your preferred beach hotel or airport.', stay: 'Departure', meals: 'Breakfast' }
    ],
    included: [
      '4 nights 4-star boutique hotel accommodation',
      'Private AC vehicle with driver-guide, fuel and tolls',
      'Daily breakfast & selected dinners',
      'Reserved train tickets Kandy to Ella'
    ],
    excluded: ['Sightseeing entry tickets', 'International flights']
  },
  {
    id: 'tour-southern-waves-4d',
    title: '4 Days – Southern Waves & Whale Watching Getaway',
    subtitle: 'Bentota • Mirissa • Galle Fort • Whale Watching',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    category: 'beach',
    difficulty: 'Easy',
    groupType: 'Private Coastal Tour',
    rating: 4.89,
    reviewsCount: 96,
    badge: 'Coastal Weekend',
    featured: false,
    priceUSD: 490,
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    route: ['Colombo Airport', 'Bentota River Safari', 'Mirissa Whale Bay', 'Galle Fort', 'Airport'],
    description: 'A sun-drenched coastal escape focused on warm waters of the Indian Ocean, marine wildlife, stilt fishermen, and sunset seafood dining.',
    highlights: [
      'Madu River mangrove boat safari through cinnamon islands',
      'Early morning cruise to watch giant blue whales off Mirissa',
      'Cobblestone walking tour of historic Galle Fort at sunset'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Bentota Coastal Waters', summary: 'Scenic drive to Bentota. Mangrove boat safari and sea turtle conservation.', stay: 'Cinnamon Bentota Beach', meals: 'Dinner' },
      { day: 2, title: 'Galle Fort Ramparts & Mirissa Sunset', summary: 'Explore Galle Fort boutiques and sunset cocktails at Coconut Tree Hill.', stay: 'Mandara Resort Mirissa', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Mirissa Blue Whale Cruise & Surf Beach', summary: 'Eco-catamaran whale watching expedition followed by beach leisure.', stay: 'Mandara Resort Mirissa', meals: 'Breakfast' },
      { day: 4, title: 'Coastal Highway Transfer to Colombo Airport', summary: 'Souvenir shopping and expressway transfer for departure.', stay: 'Departure', meals: 'Breakfast' }
    ],
    included: [
      '3 nights beachfront 4-star resort accommodation',
      'Private AC vehicle and dedicated chauffeur-guide',
      'Whale watching boat cruise tickets and Madu River boat safari',
      'Daily breakfast & dinners'
    ],
    excluded: ['Personal watersports gear rental', 'Tips & alcohol']
  }
];

export const HOTELS = [
  {
    id: 'hotel-jetwing-vil-uyana',
    name: 'Jetwing Vil Uyana',
    location: 'Sigiriya, Cultural Triangle',
    type: 'Boutique Eco Luxury',
    category: 'eco',
    rating: 4.96,
    reviewsCount: 310,
    priceUSD: 280,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Set within a man-made wetland sanctuary with private thatched dwellings over water, paddy fields, and forest canopy. A pioneer in sustainable luxury.',
    amenities: ['Private Plunge Pool', 'Ayurvedic Spa', 'Gourmet Wine Cellar', 'Loris Night Trail', 'Free WiFi', 'Butler Service']
  },
  {
    id: 'hotel-heritance-tea-factory',
    name: 'Heritance Tea Factory',
    location: 'Nuwara Eliya, Highlands',
    type: 'Colonial Heritage Resort',
    category: 'heritage',
    rating: 4.93,
    reviewsCount: 425,
    priceUSD: 240,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'A converted 19th-century colonial tea processing factory sitting 2,000 meters above sea level. Sleep in former sifting lofts and dine in an antique train carriage.',
    amenities: ['Dining on a Real Train', 'Tea Plucking Experience', 'Mist Mountain Spa', 'Fireplace Lounges', 'Putting Green', 'Free WiFi']
  },
  {
    id: 'hotel-cape-weligama',
    name: 'Cape Weligama (Resplendent Ceylon)',
    location: 'Weligama / Mirissa Coast',
    type: '5-Star Cliffside Resort',
    category: 'beachfront',
    rating: 4.99,
    reviewsCount: 188,
    priceUSD: 520,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Poised on a dramatic headland 40 meters above the Indian Ocean, offering palm-fringed private residences, cliffside dining, and a crescent-shaped Moon Pool.',
    amenities: ['60m Moon Infinity Pool', 'Private Butler', 'Ocean Cliff Dining', 'PADI Dive Center', 'Luxury Spa', 'Surfing Lessons']
  },
  {
    id: 'hotel-cinnamon-wild',
    name: 'Cinnamon Wild Yala',
    location: 'Yala National Park Border',
    type: 'Safari Wilderness Lodge',
    category: 'wildlife',
    rating: 4.88,
    reviewsCount: 390,
    priceUSD: 210,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    description: 'Located directly on boundary of Yala National Park and Indian Ocean. Wild boars, axis deer, and grey langurs frequently wander across the lawn.',
    amenities: ['Jungle Swimming Pool', 'Rooftop Observation Bar', 'Private 4x4 Jeeps', 'Naturalist Desk', 'Beach Walks', 'Buffet Restaurant']
  },
  {
    id: 'hotel-fort-bazaar',
    name: 'The Fort Bazaar',
    location: 'Galle Fort Heritage Quarter',
    type: 'Chic Boutique Haven',
    category: 'heritage',
    rating: 4.92,
    reviewsCount: 220,
    priceUSD: 195,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    description: 'A restored 17th-century merchant’s townhouse on Church Street with Middle Eastern touches, courtyard frangipani pool, and modern luxury suites.',
    amenities: ['Courtyard Bistro', 'Z Spa Rejuvenation', 'Cinema Room', 'Galle Fort Steps Away', 'Cocktail Bar', 'High Speed WiFi']
  },
  {
    id: 'hotel-98-acres',
    name: '98 Acres Resort & Spa',
    location: 'Ella Mountain Pass',
    type: 'Mountain Sanctuary',
    category: 'eco',
    rating: 4.97,
    reviewsCount: 540,
    priceUSD: 310,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant eco-friendly luxury resort nestled on scenic 98-acre tea estate, looking directly into Ella Gap and Little Adam’s Peak.',
    amenities: ['Ella Gap Infinity Pool', 'Helipad', 'Ravana Zip-line Access', 'Tea Plantation Treks', 'Fine Dining Pavilions', 'Open-Air Balconies']
  }
];

export const ACTIVITIES = [
  {
    id: 'act-sigiriya-climb',
    title: 'Sunrise Sigiriya Lion Rock & Water Gardens Guided Climb',
    category: 'adventure',
    categoryLabel: 'Adventure & Culture',
    duration: '3.5 Hours',
    location: 'Sigiriya',
    priceUSD: 45,
    rating: 4.96,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    description: 'Beat tropical heat and crowds with early morning ascent through mirror wall and lion paws, guided by an archaeologist explaining 1,500 years of royal history.'
  },
  {
    id: 'act-yala-jeep-safari',
    title: 'Private 4x4 Leopard Safari in Yala National Park',
    category: 'wildlife',
    categoryLabel: 'Wildlife Safari',
    duration: '4.5 Hours',
    location: 'Yala',
    priceUSD: 85,
    rating: 4.94,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
    description: 'Board a modified safari jeep equipped with cushioned high-tier seating to traverse Block 1 tracks in search of leopards, sloth bears, hornbills, and herds of spotted deer.'
  },
  {
    id: 'act-ella-train-ride',
    title: 'Iconic Scenic Blue Train: Kandy to Ella Observation Ticket & Escort',
    category: 'nature',
    categoryLabel: 'Scenic Railway',
    duration: '6 Hours',
    location: 'Kandy to Ella',
    priceUSD: 35,
    rating: 4.98,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    description: 'Guaranteed reserved seating on the most photogenic train ride in the world, rolling over 1,800m peaks, cascading waterfalls, and misty tea plantations.'
  },
  {
    id: 'act-mirissa-whales',
    title: 'Mirissa Blue Whale Watching Catamaran Cruise',
    category: 'beach',
    categoryLabel: 'Ocean Wildlife',
    duration: '4 Hours',
    location: 'Mirissa Harbour',
    priceUSD: 55,
    rating: 4.91,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Responsible whale watching cruise accompanied by a resident marine biologist, observing the largest mammals on Earth alongside playful spinner dolphins.'
  },
  {
    id: 'act-cooking-class',
    title: 'Authentic Sri Lankan Clay-Pot Village Cooking Class',
    category: 'culture',
    categoryLabel: 'Culinary Masterclass',
    duration: '3 Hours',
    location: 'Kandy / Galle',
    priceUSD: 30,
    rating: 4.99,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    description: 'Pick fresh organic herbs, grind your own roasted curry spices on a traditional stone miris gala, and cook 5 authentic curries over wood-fire hearths.'
  },
  {
    id: 'act-kitulgala-rafting',
    title: 'White Water Rafting & Waterfall Abseiling in Kitulgala',
    category: 'adventure',
    categoryLabel: 'Water Sports',
    duration: '4 Hours',
    location: 'Kitulgala Rainforest',
    priceUSD: 40,
    rating: 4.88,
    reviewsCount: 295,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Navigate grade 3 and 4 rapids on scenic Kelani River, famous as film location for Bridge on the River Kwai, followed by natural rock canyoning.'
  }
];

export const VEHICLES = [
  {
    id: 'veh-sedan',
    name: 'Luxury Air-Conditioned Sedan',
    models: 'Toyota Premio / Allion / Prius Hybrid',
    capacity: '1 - 3 Passengers',
    luggage: '2 Large + 2 Small Bags',
    pricePerDayUSD: 70,
    features: ['Dual-Zone Air Conditioning', 'Complimentary WiFi & USB Chargers', 'Chilled Bottled Water & Tissues', 'English-speaking Tourist Board Driver', 'Comprehensive Passenger Insurance'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'veh-suv',
    name: 'Executive SUV 4x4',
    models: 'Toyota Land Cruiser Prado / Honda Vezel SUV',
    capacity: '1 - 4 Passengers',
    luggage: '3 Large + 2 Small Bags',
    pricePerDayUSD: 95,
    features: ['High-Clearance Mountain Comfort', 'Panoramic Sunroof / Tinted Glass', 'Child Safety Seats On Request', 'Senior Certified Chauffeur Guide', 'Highway Tolls & Unlimited Mileage'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'veh-van-kdh',
    name: 'Spacious High-Roof Van (KDH)',
    models: 'Toyota HiAce KDH Super GL / Commuter',
    capacity: '4 - 8 Passengers',
    luggage: '6 Large + 6 Small Bags',
    pricePerDayUSD: 110,
    features: ['Reclining Captain Bucket Seats', 'Individual Overhead AC Vents', 'Ample Luggage Trunk Space', 'Microphone System for Guide', 'Ideal for Families & Small Groups'],
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'veh-coach',
    name: 'Mini Luxury Coach',
    models: 'Toyota Coaster / Mitsubishi Rosa',
    capacity: '10 - 20 Passengers',
    luggage: '15+ Large Bags',
    pricePerDayUSD: 180,
    features: ['Tour Group Public Address System', 'Panoramic Scenic Windows', 'Experienced Chauffeur + Licensed National Guide', 'Air Suspension Comfort', 'Corporate & Family Reunion Trips'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
  }
];

export const AIRPORT_TRANSFERS = [
  { from: 'Colombo BIA Airport (CMB)', to: 'Negombo Beach Area', duration: '20 mins', sedanUSD: 25, vanUSD: 35 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Colombo City Center', duration: '45 mins (Expressway)', sedanUSD: 35, vanUSD: 45 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Galle / Unawatuna', duration: '2.0 hours', sedanUSD: 75, vanUSD: 95 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Bentota / Beruwala', duration: '1.5 hours', sedanUSD: 60, vanUSD: 80 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Kandy Hill Capital', duration: '3.0 hours', sedanUSD: 70, vanUSD: 90 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Sigiriya / Dambulla', duration: '3.5 hours', sedanUSD: 85, vanUSD: 110 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Mirissa / Weligama', duration: '2.5 hours', sedanUSD: 85, vanUSD: 105 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Ella Highlands', duration: '5.0 hours', sedanUSD: 120, vanUSD: 145 },
  { from: 'Colombo BIA Airport (CMB)', to: 'Yala / Tissamaharama', duration: '4.5 hours', sedanUSD: 115, vanUSD: 140 }
];

export const ARTICLES = [
  {
    id: 'guide-best-places',
    title: '10 Best Places to Visit in Sri Lanka (2026 Ultimate Guide)',
    category: 'Destination Insights',
    readTime: '6 min read',
    date: 'Updated September 2026',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    summary: 'From ancient granite sky palaces to pristine turquoise coral bays and misty tea heights, discover top ten unmissable destinations across the teardrop island.',
    content: `Sri Lanka packs an astonishing diversity of UNESCO world heritage monuments, pristine wildlife sanctuaries, and palm-rimmed coastlines into a compact island.\n\n### 1. Sigiriya Rock Fortress\nKnown as 8th Wonder of the World, this dramatic 200-meter sheer granite monolith holds ruins of King Kashyapa's 5th-century palace, celestial frescoes, and hydraulic royal pleasure pools.\n\n### 2. Ella & Demodara Nine Arch Bridge\nSri Lanka's highland sanctuary, famous for cool air, Little Adam's Peak, and world-renowned British colonial railway viaduct spanning rolling green tea valleys.\n\n### 3. Yala National Park\nBoasting highest density of leopards anywhere on Earth, alongside Asian elephants, sloth bears, and over 200 bird species.\n\n### 4. Historic Galle Fort\nA living 17th-century Dutch colonial fortification, vibrant with boutique shops, art galleries, and ocean ramparts.\n\n### 5. Sacred City of Kandy\nNestled beside serene mountain lake, home to golden-roofed Temple of Sacred Tooth Relic (Sri Dalada Maligawa).\n\n### 6. Mirissa & Weligama\nPremier oceanic hub for blue whale watching expeditions and laid-back surf culture.`
  },
  {
    id: 'guide-best-time',
    title: 'Best Time to Visit Sri Lanka: Weather, Monsoons & Seasons Explained',
    category: 'Weather & Planning',
    readTime: '5 min read',
    date: 'Updated September 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    summary: 'Because Sri Lanka experiences two distinct monsoon seasons on opposite coasts, there is ALWAYS glorious tropical sunshine somewhere on the island all year round!',
    content: `One of Sri Lanka's greatest travel secrets is its dual-monsoon microclimate system. When one coast gets rain, the opposite coast enjoys crystal-clear blue skies.\n\n### West & South Coast (Galle, Bentota, Mirissa, Yala, Colombo)\n- **Peak Sunshine:** December through April\n- **Conditions:** Calm turquoise ocean, ideal for swimming, surfing, and whale watching.\n\n### East Coast (Trincomalee, Passikudah, Arugam Bay)\n- **Peak Sunshine:** May through October\n- **Conditions:** Dry, warm, world-class surfing at Arugam Bay and snorkeling at Pigeon Island.\n\n### Cultural Triangle & Highlands (Sigiriya, Kandy, Nuwara Eliya)\n- **Cultural Triangle:** Warm and dry for most of year (Dec-Aug).\n- **Highlands (Ella & Nuwara Eliya):** Cool and refreshing (15°C - 22°C); bring a light fleece for morning and evening strolls.`
  },
  {
    id: 'guide-first-timers',
    title: 'Sri Lanka Travel Guide for First-Time Visitors: Visas, Etiquette & Tips',
    category: 'Travel Advice',
    readTime: '7 min read',
    date: 'Updated September 2026',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    summary: 'Essential practical wisdom: tourist ETA visa procedures, respectful temple attire, local SIM cards, currency exchange, and tipping customs.',
    content: `Planning your first Sri Lanka adventure? Here are the golden rules to ensure a smooth, worry-free vacation:\n\n### 1. Tourist Visa (ETA)\nMost international travelers must apply online for an Electronic Travel Authorization (ETA) prior to arrival. KCSTours provides full assistance if needed.\n\n### 2. Temple Etiquette\nWhen visiting Buddhist and Hindu holy sites, wear clothing that covers your shoulders and knees. You will be asked to remove your shoes and hats before entering sacred precincts.\n\n### 3. Currency & Payments\nThe local currency is the Sri Lankan Rupee (LKR). Major credit cards (Visa/Mastercard) are accepted in hotels and upscale restaurants, but having cash rupees is handy for tuk-tuks, fresh coconuts, and village markets.\n\n### 4. Private Chauffeur Guide Advantage\nNavigating Sri Lanka's winding mountain roads is best left to experienced, licensed local drivers. A private chauffeur-guide acts as your driver, local storyteller, and personal concierge.`
  }
];

export const REVIEWS = [
  {
    name: 'David & Sarah Henderson',
    country: 'United Kingdom',
    flag: '🇬🇧',
    tour: '10 Days – Complete Ceylon Odyssey',
    rating: 5,
    date: 'August 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    title: 'The holiday of a lifetime with flawless service!',
    comment: 'From the minute we landed in Colombo until our flight home, KCSTours looked after us like royalty. Our chauffeur-guide Roshan was extraordinarily knowledgeable, polite, and spotted two leopards in Yala! The hotels were world-class and the scenic train ride to Ella took our breath away.'
  },
  {
    name: 'Maximilian Weber',
    country: 'Germany',
    flag: '🇩🇪',
    tour: '7 Days – Sri Lanka Classic Highlights',
    rating: 5,
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    title: 'Punctual, professional, and authentic.',
    comment: 'German precision meets Sri Lankan hospitality! The vehicle was immaculate, air conditioning strong, and the itinerary ran like clockwork. Climbing Sigiriya at 6:30 AM was mystical. Highly recommend KCSTours for anyone seeking hassle-free private travel.'
  },
  {
    name: 'Jessica & Liam O’Connor',
    country: 'Australia',
    flag: '🇦🇺',
    tour: '12 Days – Grand Luxury Safari & Beach Hideaway',
    rating: 5,
    date: 'September 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    title: 'Exceptional luxury and wildlife experiences',
    comment: 'Wild Coast Tented Lodge and Tea Trails were unbelievable. KCSTours customized every detail for our anniversary, including a surprise beach candlelit dinner in Tangalle. 10 out of 10!'
  },
  {
    name: 'Jean-Luc & Chloe Martin',
    country: 'France',
    flag: '🇫🇷',
    tour: 'Customized Family Wildlife Tour',
    rating: 5,
    date: 'August 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    title: 'Parfait pour un voyage en famille!',
    comment: 'Traveling with two teenagers can be difficult, but our driver-guide was fantastic with them. Seeing 80 wild elephants gathering in Minneriya and learning to surf in Weligama made this our best family vacation ever.'
  }
];

export const FAQS = [
  {
    category: 'booking',
    question: 'How do I book a tour with KCSTours and what is the payment process?',
    answer: 'Booking is effortless! You can select any featured package or build a custom itinerary on our website. To lock in your dates, we require only a 20% deposit via secure online payment or bank transfer. The remaining balance can be settled 14 days before arrival or upon meeting your chauffeur in Sri Lanka.'
  },
  {
    category: 'booking',
    question: 'Can I customize any of your existing itineraries?',
    answer: 'Yes, 100%! All our tour packages are fully flexible private tours. You can alter the duration, swap hotels, add extra rest days, include specialized activities (such as hot air ballooning or cooking classes), or change the travel pace to suit your group.'
  },
  {
    category: 'transport',
    question: 'Who will be driving and guiding us during the trip?',
    answer: 'You will be accompanied by a dedicated, licensed English-speaking Sri Lanka Tourist Development Authority (SLTDA) certified chauffeur-guide or national tour guide. They are experienced professionals who handle all driving, navigation, parking, luggage, and local introductions.'
  },
  {
    category: 'visas',
    question: 'Do I need a tourist visa to enter Sri Lanka?',
    answer: 'Yes, most international travelers need an Electronic Travel Authorization (ETA) before landing. It is obtained easily through the official online immigration portal or via our concierge team. It is typically granted for 30 days with double entry.'
  },
  {
    category: 'cancellation',
    question: 'What is KCSTours’ cancellation and refund policy?',
    answer: 'We provide one of the most traveler-friendly cancellation policies in the industry. Cancellations made up to 21 days before your tour start date receive a 100% refund of your deposit (minus standard banking fees), or you may postpone your dates with zero penalty.'
  },
  {
    category: 'transport',
    question: 'Are highway tolls, parking fees, and driver expenses included?',
    answer: 'Yes, completely! With KCSTours, there are zero surprise fuel surcharges or highway toll bills. Your quote covers vehicle fuel, expressway tolls, parking charges, and the chauffeur’s meals and accommodation quarters.'
  }
];
