package models

type Admin struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Active    bool   `json:"active"`
	CreatedAt string `json:"createdAt"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Token   string `json:"token,omitempty"`
	Admin   *Admin `json:"admin,omitempty"`
}

type Tour struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Duration  string  `json:"duration"`
	PriceUSD  float64 `json:"priceUSD"`
	Category  string  `json:"category"`
	Badge     string  `json:"badge"`
	Featured  bool    `json:"featured"`
	Active    bool    `json:"active"`
	CreatedAt string  `json:"createdAt"`
}

type Booking struct {
	ID              string  `json:"id"`
	Guest           string  `json:"guest"`
	Email           string  `json:"email"`
	Phone           string  `json:"phone"`
	Country         string  `json:"country"`
	TourID          string  `json:"tourId"`
	Tour            string  `json:"tour"`
	Dates           string  `json:"dates"`
	Pax             string  `json:"pax"`
	Amount          float64 `json:"amount"`
	Currency        string  `json:"currency"`
	Status          string  `json:"status"`
	AssignedDriver  string  `json:"assignedDriver"`
	SpecialRequests string  `json:"specialRequests"`
	PaidAmount      float64 `json:"paidAmount"`
	CreatedAt       string  `json:"createdAt"`
}

type Vehicle struct {
	ID              string `json:"id"`
	Model           string `json:"model"`
	Plate           string `json:"plate"`
	Type            string `json:"type"`
	Capacity        string `json:"capacity"`
	Chauffeur       string `json:"chauffeur"`
	DriverPhone     string `json:"driverPhone"`
	License         string `json:"license"`
	Status          string `json:"status"`
	CurrentLocation string `json:"currentLocation"`
	FuelLevel       string `json:"fuelLevel"`
	Speed           string `json:"speed"`
	Temp            string `json:"temp"`
	ETA             string `json:"eta"`
	NextStop        string `json:"nextStop"`
	Rating          string `json:"rating"`
	RouteProgress   int    `json:"routeProgress"`
	ActiveGuest     string `json:"activeGuest"`
	GPSCoords       string `json:"gpsCoords"`
	StatusColor     string `json:"statusColor"`
	PinX            string `json:"pinX"`
	PinY            string `json:"pinY"`
}

type Inquiry struct {
	ID         string `json:"id"`
	Sender     string `json:"sender"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Subject    string `json:"subject"`
	Message    string `json:"message"`
	Read       bool   `json:"read"`
	ReplyNotes string `json:"replyNotes,omitempty"`
	Date       string `json:"date"`
}

type DashboardMetrics struct {
	TotalRevenue          float64 `json:"totalRevenue"`
	ConfirmedCount        int     `json:"confirmedCount"`
	ActiveFleetCount      int     `json:"activeFleetCount"`
	PendingInquiriesCount int     `json:"pendingInquiriesCount"`
	TotalBookingsCount    int     `json:"totalBookingsCount"`
	TotalFleetCount       int     `json:"totalFleetCount"`
}

type StatusUpdateRequest struct {
	Status string `json:"status"`
}
