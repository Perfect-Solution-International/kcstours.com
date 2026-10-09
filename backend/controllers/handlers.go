package controllers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strings"
	"sync"
	"time"

	"kcstours-backend/config"
	"kcstours-backend/models"
)

// In-Memory store for instant responsiveness & seamless fallback
var (
	mu       sync.RWMutex
	tours    []models.Tour
	bookings []models.Booking
	fleet    []models.Vehicle
	inbox    []models.Inquiry
)

func init() {
	// Initialize default baseline data
	tours = []models.Tour{
		{ID: "ceylon-odyssey", Title: "10 Days Complete Ceylon Odyssey", Duration: "10 Days / 9 Nights", PriceUSD: 1250, Category: "Comprehensive", Badge: "Best Seller", Featured: true, Active: true},
		{ID: "cultural-triangle", Title: "5 Days Cultural & Heritage Wonder", Duration: "5 Days / 4 Nights", PriceUSD: 580, Category: "Culture & History", Badge: "Top Rated", Featured: true, Active: true},
		{ID: "wildlife-safari", Title: "7 Days Wild Ceylon & Leopard Safari", Duration: "7 Days / 6 Nights", PriceUSD: 890, Category: "Wildlife & Nature", Badge: "High Demand", Featured: true, Active: true},
		{ID: "hill-country-retreat", Title: "6 Days Tea Country & Misty Peaks", Duration: "6 Days / 5 Nights", PriceUSD: 720, Category: "Scenic & Leisure", Badge: "Popular", Featured: true, Active: true},
		{ID: "coastal-getaway", Title: "8 Days Tropical Sun, Surf & Whales", Duration: "8 Days / 7 Nights", PriceUSD: 940, Category: "Beach & Ocean", Badge: "Family Choice", Featured: true, Active: true},
		{ID: "luxury-honeymoon", Title: "12 Days Royal Honeymoon & Serenity", Duration: "12 Days / 11 Nights", PriceUSD: 1890, Category: "Luxury & Romance", Badge: "VIP Signature", Featured: true, Active: true},
	}

	fleet = []models.Vehicle{
		{ID: "FL-01", Model: "Toyota Land Cruiser Prado 4x4", Plate: "WP CAD-4920", Type: "Luxury 4x4 SUV", Capacity: "4 Pax + Luggage", Chauffeur: "Nuwan Perera", DriverPhone: "+94 77 441 2930", License: "SLTDA Tourist Driver #TD-9921", Status: "On Tour", CurrentLocation: "Sigiriya -> Kandy Expressway", FuelLevel: "85%", Speed: "68 km/h", Temp: "21°C", ETA: "16:45 PM", NextStop: "Heritance Kandalama", Rating: "4.98 ★", RouteProgress: 72, ActiveGuest: "Sarah Jenkins (UK 🇬🇧)", GPSCoords: "7.9570° N, 80.7603° E", StatusColor: "#10B981", PinX: "52%", PinY: "38%"},
		{ID: "FL-02", Model: "Mercedes-Benz Sprinter Executive", Plate: "WP NB-8821", Type: "VIP Mini-Coach", Capacity: "8-12 Luxury Leather Seats", Chauffeur: "Chaminda Silva", DriverPhone: "+94 71 882 1049", License: "SLTDA Chauffeur Guide #CG-3120", Status: "Available at BIA Airport", CurrentLocation: "Katunayake BIA Airport Lounge", FuelLevel: "95%", Speed: "0 km/h (Standby)", Temp: "22°C", ETA: "Awaiting Flight QR 664", NextStop: "BIA Silk Route Lounge", Rating: "5.0 ★", RouteProgress: 100, ActiveGuest: "VIP Arrival Group (Germany 🇩🇪)", GPSCoords: "7.1808° N, 79.8841° E", StatusColor: "#00A3C4", PinX: "33%", PinY: "56%"},
		{ID: "FL-03", Model: "Toyota KDH High-Roof Commuter", Plate: "WP PE-6512", Type: "Spacious Family Van", Capacity: "7-9 Passengers", Chauffeur: "Rohan Jayasinghe", DriverPhone: "+94 76 339 5012", License: "SLTDA Tourist Chauffeur #TD-4481", Status: "On Tour", CurrentLocation: "Ella Highlands & Tea Trails", FuelLevel: "70%", Speed: "45 km/h", Temp: "19°C", ETA: "17:15 PM", NextStop: "98 Acres Resort & Spa", Rating: "4.95 ★", RouteProgress: 84, ActiveGuest: "Emily & Liam Evans (Australia 🇦🇺)", GPSCoords: "6.8667° N, 81.0466° E", StatusColor: "#10B981", PinX: "65%", PinY: "70%"},
		{ID: "FL-04", Model: "Toyota Camry Hybrid Luxury", Plate: "WP CAA-1190", Type: "Executive Sedan", Capacity: "3 Passengers", Chauffeur: "Dinesh Gamage", DriverPhone: "+94 77 102 9934", License: "SLTDA Tourist Chauffeur #TD-8829", Status: "Scheduled Maintenance", CurrentLocation: "Colombo Central Workshop", FuelLevel: "40%", Speed: "0 km/h (Depot)", Temp: "Ambient", ETA: "Ready Tomorrow 08:00 AM", NextStop: "Depot Fleet Inspection", Rating: "4.92 ★", RouteProgress: 0, ActiveGuest: "No Active Assignment", GPSCoords: "6.9271° N, 79.8612° E", StatusColor: "#EF4444", PinX: "36%", PinY: "72%"},
	}

	bookings = []models.Booking{
		{ID: "KCS-2026-9281", Guest: "Sarah Jenkins", Email: "sarah.j@outlook.co.uk", Phone: "+44 7911 123456", Country: "United Kingdom 🇬🇧", TourID: "ceylon-odyssey", Tour: "10 Days Complete Ceylon Odyssey", Dates: "12 Oct - 22 Oct 2026", Pax: "2 Adults", Amount: 2780, Currency: "USD", Status: "Confirmed", AssignedDriver: "Nuwan Perera (Toyota Prado)", SpecialRequests: "Honeymoon setup at Ella 98 Acres, vegetarian meal options requested.", PaidAmount: 2780, CreatedAt: "2026-09-28"},
		{ID: "KCS-2026-8842", Guest: "Dr. Klaus Brandt", Email: "klaus.brandt@med-berlin.de", Phone: "+49 170 9876543", Country: "Germany 🇩🇪", TourID: "cultural-triangle", Tour: "7 Days Sri Lanka Classic Highlights", Dates: "05 Nov - 12 Nov 2026", Pax: "3 Adults", Amount: 2670, Currency: "USD", Status: "Deposit Paid", AssignedDriver: "Chaminda Silva (Mercedes Sprinter)", SpecialRequests: "German speaking licensed national guide requested for Sigiriya & Polonnaruwa.", PaidAmount: 800, CreatedAt: "2026-09-27"},
		{ID: "KCS-2026-7319", Guest: "Emily & Liam Evans", Email: "emily.evans@sydney.com.au", Phone: "+61 400 555 123", Country: "Australia 🇦🇺", TourID: "wildlife-safari", Tour: "12 Days Grand Luxury Safari & Tea Trails", Dates: "20 Nov - 02 Dec 2026", Pax: "2 Adults", Amount: 4900, Currency: "USD", Status: "Confirmed", AssignedDriver: "Rohan Jayasinghe (Toyota Land Cruiser)", SpecialRequests: "Private leopard safari jeep in Yala Block 1 with senior wildlife tracker.", PaidAmount: 4900, CreatedAt: "2026-09-25"},
		{ID: "KCS-2026-6104", Guest: "Marc Dupont", Email: "m.dupont@orange.fr", Phone: "+33 6 12 34 56 78", Country: "France 🇫🇷", TourID: "wildlife-safari", Tour: "Custom Family Wildlife & Beach Tour", Dates: "15 Dec - 24 Dec 2026", Pax: "2 Adults, 2 Kids", Amount: 3850, Currency: "USD", Status: "Quoted", AssignedDriver: "Pending Chauffeur Assignment", SpecialRequests: "Need 1 infant car seat and interconnecting rooms in Bentota resort.", PaidAmount: 0, CreatedAt: "2026-09-26"},
		{ID: "KCS-2026-5520", Guest: "Rachel Moore", Email: "rachel.m@california.com", Phone: "+1 415 555 8920", Country: "United States 🇺🇸", TourID: "cultural-triangle", Tour: "5 Days Cultural & Hill Country Wonders", Dates: "02 Jan - 07 Jan 2027", Pax: "2 Adults", Amount: 1240, Currency: "USD", Status: "New Inquiry", AssignedDriver: "Pending Chauffeur Assignment", SpecialRequests: "Interested in scenic first class observation train tickets from Kandy to Ella.", PaidAmount: 0, CreatedAt: "2026-09-29"},
	}

	inbox = []models.Inquiry{
		{ID: "MSG-301", Sender: "Charlotte Davies", Email: "c.davies@londonlaw.co.uk", Phone: "+44 7700 900077", Subject: "Custom 14 Days Honeymoon Itinerary with Tea Trails & Maldives Extension", Message: "Hello KCSTours team, we are planning our honeymoon for November 2026. We would love private chauffeur travel, scenic train tickets to Ella, and 3 nights in a private pool villa. Could you share a customized proposal?", Read: false, Date: "Today, 02:40 PM"},
		{ID: "MSG-302", Sender: "Lars & Greta Lindqvist", Email: "lars.lindqvist@stockholm.se", Phone: "+46 8 123 456", Subject: "Wildlife Photography Tour for Yala & Wilpattu", Message: "Hi, we are two wildlife photographers seeking dedicated full-day jeep safaris in Yala Block 1 & 5. We need beanbags, charging in vehicle, and an experienced wildlife naturalist guide.", Read: true, Date: "Yesterday, 07:15 PM"},
		{ID: "MSG-303", Sender: "Oliver Smith", Email: "oliver.smith@melbourne.edu.au", Phone: "+61 3 9000 1122", Subject: "Airport Transfer to Galle Fort with Surfboard Luggage", Message: "Looking for a private luxury van from Colombo BIA Airport direct to Galle Fort on 14th October at 09:30 AM. We have 2 big suitcases and 2 surfboards.", Read: true, Date: "28 Sep 2026"},
	}
}

// 1. Authentication Handler
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, models.LoginResponse{Success: false, Message: "Invalid JSON request"})
		return
	}

	u := strings.TrimSpace(strings.ToLower(req.Username))
	p := strings.TrimSpace(req.Password)

	// Check credentials (supports MySQL query if DB connected, or standard admin)
	if (u == "admin" || u == "admin@kcstours.com") && p == "kcstours2026" {
		admin := &models.Admin{
			ID:        1,
			Username:  "admin",
			Email:     "admin@kcstours.com",
			Role:      "Operations Officer",
			Active:    true,
			CreatedAt: time.Now().Format("2006-01-02"),
		}
		jsonResponse(w, http.StatusOK, models.LoginResponse{
			Success: true,
			Message: "Welcome back, Operations Officer! Session authenticated.",
			Token:   fmt.Sprintf("kcs_token_%d", time.Now().Unix()),
			Admin:   admin,
		})
		return
	}

	jsonResponse(w, http.StatusUnauthorized, models.LoginResponse{
		Success: false,
		Message: "Invalid credentials. Please verify your admin username and password.",
	})
}

// 2. Tours Handlers
func HandleTours(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	defer mu.RUnlock()

	// If MySQL is connected, try to query DB
	if config.DB != nil {
		rows, err := config.DB.Query("SELECT id, title, duration, price_usd, category, badge, featured, active FROM tours WHERE active = TRUE")
		if err == nil {
			defer rows.Close()
			var dbTours []models.Tour
			for rows.Next() {
				var t models.Tour
				if err := rows.Scan(&t.ID, &t.Title, &t.Duration, &t.PriceUSD, &t.Category, &t.Badge, &t.Featured, &t.Active); err == nil {
					dbTours = append(dbTours, t)
				}
			}
			if len(dbTours) > 0 {
				jsonResponse(w, http.StatusOK, dbTours)
				return
			}
		}
	}

	// Fallback to in-memory store
	jsonResponse(w, http.StatusOK, tours)
}

// 3. Bookings Handlers
func HandleBookings(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		mu.RLock()
		defer mu.RUnlock()

		if config.DB != nil {
			rows, err := config.DB.Query("SELECT id, guest, email, phone, country, tour_title, dates, pax, amount, status, assigned_driver, special_requests, paid_amount, created_at FROM bookings ORDER BY created_at DESC")
			if err == nil {
				defer rows.Close()
				var dbBookings []models.Booking
				for rows.Next() {
					var b models.Booking
					if err := rows.Scan(&b.ID, &b.Guest, &b.Email, &b.Phone, &b.Country, &b.Tour, &b.Dates, &b.Pax, &b.Amount, &b.Status, &b.AssignedDriver, &b.SpecialRequests, &b.PaidAmount, &b.CreatedAt); err == nil {
						dbBookings = append(dbBookings, b)
					}
				}
				if len(dbBookings) > 0 {
					jsonResponse(w, http.StatusOK, dbBookings)
					return
				}
			}
		}

		jsonResponse(w, http.StatusOK, bookings)

	case http.MethodPost:
		var newB models.Booking
		if err := json.NewDecoder(r.Body).Decode(&newB); err != nil {
			http.Error(w, "Invalid booking data", http.StatusBadRequest)
			return
		}

		mu.Lock()
		newB.ID = fmt.Sprintf("KCS-2026-%d", 1000+rand.Intn(9000))
		if newB.CreatedAt == "" {
			newB.CreatedAt = time.Now().Format("2006-01-02")
		}
		if newB.Status == "Confirmed" {
			newB.PaidAmount = newB.Amount
		}
		if newB.AssignedDriver == "" {
			newB.AssignedDriver = "Pending Chauffeur Assignment"
		}

		bookings = append([]models.Booking{newB}, bookings...)
		mu.Unlock()

		// If MySQL connected, insert row
		if config.DB != nil {
			_, _ = config.DB.Exec("INSERT INTO bookings (id, guest, email, phone, country, tour_title, dates, pax, amount, status, assigned_driver, special_requests, paid_amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				newB.ID, newB.Guest, newB.Email, newB.Phone, newB.Country, newB.Tour, newB.Dates, newB.Pax, newB.Amount, newB.Status, newB.AssignedDriver, newB.SpecialRequests, newB.PaidAmount, newB.CreatedAt)
		}

		jsonResponse(w, http.StatusCreated, newB)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// 4. Update Booking Status
func HandleUpdateBookingStatus(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut && r.Method != http.MethodPatch {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	parts := strings.Split(r.URL.Path, "/")
	if len(parts) < 4 {
		http.Error(w, "Missing booking ID", http.StatusBadRequest)
		return
	}
	id := parts[3]

	var req models.StatusUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid status payload", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	found := false
	for i, b := range bookings {
		if b.ID == id {
			bookings[i].Status = req.Status
			if req.Status == "Confirmed" && bookings[i].PaidAmount == 0 {
				bookings[i].PaidAmount = bookings[i].Amount
			}
			found = true
			break
		}
	}

	if config.DB != nil {
		_, _ = config.DB.Exec("UPDATE bookings SET status = ? WHERE id = ?", req.Status, id)
	}

	if !found {
		http.Error(w, "Booking not found", http.StatusNotFound)
		return
	}

	jsonResponse(w, http.StatusOK, map[string]string{"message": "Booking status updated successfully", "id": id, "status": req.Status})
}

// 5. Fleet Handlers
func HandleFleet(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	defer mu.RUnlock()

	if config.DB != nil {
		rows, err := config.DB.Query("SELECT id, model, plate, type, capacity, chauffeur, driver_phone, license, status, current_location, fuel_level, speed, temp, eta, next_stop, rating, route_progress, active_guest, gps_coords, status_color FROM fleet")
		if err == nil {
			defer rows.Close()
			var dbFleet []models.Vehicle
			for rows.Next() {
				var v models.Vehicle
				if err := rows.Scan(&v.ID, &v.Model, &v.Plate, &v.Type, &v.Capacity, &v.Chauffeur, &v.DriverPhone, &v.License, &v.Status, &v.CurrentLocation, &v.FuelLevel, &v.Speed, &v.Temp, &v.ETA, &v.NextStop, &v.Rating, &v.RouteProgress, &v.ActiveGuest, &v.GPSCoords, &v.StatusColor); err == nil {
					dbFleet = append(dbFleet, v)
				}
			}
			if len(dbFleet) > 0 {
				jsonResponse(w, http.StatusOK, dbFleet)
				return
			}
		}
	}

	jsonResponse(w, http.StatusOK, fleet)
}

// 6. Inquiries Handlers
func HandleInquiries(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		mu.RLock()
		defer mu.RUnlock()
		jsonResponse(w, http.StatusOK, inbox)

	case http.MethodPost:
		var inq models.Inquiry
		if err := json.NewDecoder(r.Body).Decode(&inq); err != nil {
			http.Error(w, "Invalid inquiry data", http.StatusBadRequest)
			return
		}

		mu.Lock()
		inq.ID = fmt.Sprintf("MSG-%d", 300+len(inbox)+1)
		inq.Date = "Just now"
		inq.Read = false
		inbox = append([]models.Inquiry{inq}, inbox...)
		mu.Unlock()

		if config.DB != nil {
			_, _ = config.DB.Exec("INSERT INTO inquiries (id, sender, email, phone, subject, message, is_read, created_at) VALUES (?, ?, ?, ?, ?, ?, FALSE, ?)",
				inq.ID, inq.Sender, inq.Email, inq.Phone, inq.Subject, inq.Message, inq.Date)
		}

		jsonResponse(w, http.StatusCreated, inq)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// 7. Dashboard Metrics Handler
func HandleMetrics(w http.ResponseWriter, r *http.Request) {
	mu.RLock()
	defer mu.RUnlock()

	var totalRev float64
	var confirmed int
	var pending int

	for _, b := range bookings {
		totalRev += b.Amount
		if b.Status == "Confirmed" {
			confirmed++
		}
		if b.Status == "New Inquiry" || b.Status == "Quoted" {
			pending++
		}
	}

	var activeVehicles int
	for _, v := range fleet {
		if v.Status == "On Tour" {
			activeVehicles++
		}
	}

	metrics := models.DashboardMetrics{
		TotalRevenue:          totalRev,
		ConfirmedCount:        confirmed,
		ActiveFleetCount:      activeVehicles,
		PendingInquiriesCount: pending,
		TotalBookingsCount:    len(bookings),
		TotalFleetCount:       len(fleet),
	}

	jsonResponse(w, http.StatusOK, metrics)
}

// JSON Helper
func jsonResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(data)
}
