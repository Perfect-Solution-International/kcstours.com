package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"kcstours-backend/config"
	"kcstours-backend/controllers"
)

// CORS Middleware to allow Next.js (localhost:3000) to communicate with Go API (localhost:8080)
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// 1. Initialize MySQL Connection
	log.Println("⚡ Initializing KCSTours MySQL Database Connection...")
	_, _ = config.InitDB()

	// 2. Setup Router
	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"online","service":"KCSTours Go Backend","database":"MySQL 9.4","version":"1.0.0"}`)
	})

	// Auth
	mux.HandleFunc("/api/auth/login", controllers.HandleLogin)

	// Tours
	mux.HandleFunc("/api/tours", controllers.HandleTours)

	// Bookings
	mux.HandleFunc("/api/bookings", controllers.HandleBookings)
	mux.HandleFunc("/api/bookings/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/status") {
			controllers.HandleUpdateBookingStatus(w, r)
			return
		}
		controllers.HandleBookings(w, r)
	})

	// Fleet
	mux.HandleFunc("/api/fleet", controllers.HandleFleet)

	// Inquiries
	mux.HandleFunc("/api/inquiries", controllers.HandleInquiries)

	// Dashboard Metrics & KPIs
	mux.HandleFunc("/api/metrics", controllers.HandleMetrics)

	// 3. Start Server
	handler := corsMiddleware(mux)
	serverAddr := fmt.Sprintf("0.0.0.0:%s", port)

	log.Println("====================================================================")
	log.Printf("🚀 KCSTours Go + MySQL Backend Server listening on http://localhost:%s", port)
	log.Println("📡 API Endpoints:")
	log.Printf("   - Health:    GET  http://localhost:%s/api/health", port)
	log.Printf("   - Auth:      POST http://localhost:%s/api/auth/login", port)
	log.Printf("   - Tours:     GET  http://localhost:%s/api/tours", port)
	log.Printf("   - Bookings:  GET/POST http://localhost:%s/api/bookings", port)
	log.Printf("   - Fleet:     GET  http://localhost:%s/api/fleet", port)
	log.Printf("   - Inquiries: GET/POST http://localhost:%s/api/inquiries", port)
	log.Printf("   - Metrics:   GET  http://localhost:%s/api/metrics", port)
	log.Println("====================================================================")

	if err := http.ListenAndServe(serverAddr, handler); err != nil {
		log.Fatalf("❌ Server failed to start: %v", err)
	}
}
