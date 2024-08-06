package initializers

import (
	"log"
	"work-adhoc/models"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.Job{}, &models.User{}, &models.Tag{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
}
