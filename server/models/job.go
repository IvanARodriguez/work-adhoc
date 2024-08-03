package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Job struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary key" json:"id"`
	Title       *string   `json:"title"`
	Salary      uint32    `json:"salary"`
	Description *string   `json:"description"`
	EmployerID  *string   `json:"employerId"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func MigrateJobs(db *gorm.DB) error {
	err := db.AutoMigrate(&Job{})
	return err
}
