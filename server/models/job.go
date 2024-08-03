package models

import (
	"time"

	"github.com/google/uuid"
)

type Job struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary key" json:"id"`
	Title       string    `gorm:"not null; type:varchar(250)" json:"title"`
	Salary      string    `gorm:"not null; type:money" json:"salary"`
	Description string    `gorm:"not null" json:"description"`
	CreatedAt   time.Time `gorm:"not null" json:"createdAt"`
	UpdatedAt   time.Time `gorm:"not null" json:"updatedAt"`
}
