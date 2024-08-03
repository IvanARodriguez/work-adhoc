package initializers

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	Host     string
	Port     string
	Password string
	User     string
	Database string
	SSLMode  string
}

var DB *gorm.DB

func ConnectToDb() (*gorm.DB, error) {
	config := &Config{
		Host:     os.Getenv("DATABASE_HOST"),
		Port:     os.Getenv("DATABASE_PORT"),
		Password: os.Getenv("DATABASE_PASS"),
		User:     os.Getenv("DATABASE_USER"),
		Database: os.Getenv("DATABASE_NAME"),
		SSLMode:  os.Getenv("DATABASE_SSL_MODE"),
	}
	var err error
	dsn := fmt.Sprintf("host=%s user=%s  password=%s dbname=%s port=%s  sslmode=%s", config.Host, config.User, config.Password, config.Database, config.Port, config.SSLMode)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return DB, err
	}
	return DB, nil
}
