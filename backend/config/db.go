package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() (*sql.DB, error) {
	user := getEnv("DB_USER", "root")
	password := getEnv("DB_PASSWORD", "")
	host := getEnv("DB_HOST", "127.0.0.1")
	port := getEnv("DB_PORT", "3307")
	dbname := getEnv("DB_NAME", "kcstours_db")

	var dsn string
	if password != "" {
		dsn = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4", user, password, host, port, dbname)
	} else {
		dsn = fmt.Sprintf("%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4", user, host, port, dbname)
	}

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("⚠️ MySQL Open error: %v", err)
		return nil, err
	}

	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(10)
	DB.SetConnMaxLifetime(5 * time.Minute)

	err = DB.Ping()
	if err != nil {
		log.Printf("⚠️ MySQL Ping failed (%s:%s): %v. (Backend will run with in-memory fallback until DB is connected)", host, port, err)
		return nil, err
	}

	log.Printf("✅ Successfully connected to MySQL database: %s on %s:%s", dbname, host, port)
	return DB, nil
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
