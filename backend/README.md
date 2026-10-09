# KCSTours Go + MySQL Backend Server

Production-grade, high-performance REST API built in **Go (Golang)** with **MySQL** database support for KCSTours Sri Lanka.

---

## 🏗️ Architecture Overview

- **Language:** Go (Golang 1.22+)
- **Database:** MySQL 8.x / 9.x
- **Port:** `8080` (Configurable via `PORT` environment variable)
- **Frontend Integration:** Ready for Next.js (`http://localhost:3000`) with built-in CORS middleware.

---

## 📁 Directory Structure

```
backend/
├── main.go               # HTTP Server entry point & routing
├── go.mod                # Go module definition
├── .env                  # Database and server config
├── config/
│   └── db.go             # MySQL connection pool manager
├── models/
│   └── models.go         # Data structures (Tours, Bookings, Fleet, Inquiries)
├── controllers/
│   └── handlers.go       # REST API endpoints & business logic
└── database/
    ├── schema.sql        # MySQL table definitions
    └── seed.sql          # Preloaded KCSTours data
```

---

## 🚀 Getting Started

### 1. Initialize the MySQL Database
Run the schema and seed scripts using MySQL client or MySQL Workbench:

```sql
SOURCE backend/database/schema.sql;
SOURCE backend/database/seed.sql;
```

Or via command line:
```bash
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
```

### 2. Configure Environment (`.env`)
Update `backend/.env` with your MySQL credentials:
```env
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kcstours_db
```

### 3. Run the Go Server
```bash
cd backend
go run main.go
```

The server will start at: `http://localhost:8080`

---

## 📡 Available API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service & DB health check |
| `POST` | `/api/auth/login` | Admin authentication |
| `GET` | `/api/tours` | List all active tour packages |
| `GET` | `/api/bookings` | List all guest bookings |
| `POST` | `/api/bookings` | Create new tour reservation |
| `PUT` | `/api/bookings/:id/status` | Update booking status |
| `GET` | `/api/fleet` | Live vehicle telemetry & drivers |
| `GET` | `/api/inquiries` | Customer messages inbox |
| `POST` | `/api/inquiries` | Submit new inquiry / contact |
| `GET` | `/api/metrics` | Dashboard revenue & operations KPIs |
