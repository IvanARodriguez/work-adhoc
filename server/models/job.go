package models

import (
	"time"

	"github.com/google/uuid"
)

type Job struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary key" json:"id"`
	Title       string    `gorm:"not null; type:varchar(250)" json:"title"`
	Salary      string    `gorm:"not null; type:money" json:"salary"`
	Overview    string    `gorm:"not null; type:varchar(250)" json:"overview"`
	Description string    `gorm:"not null" json:"description"`
	CreatedAt   time.Time `gorm:"not null" json:"createdAt"`
	UpdatedAt   time.Time `gorm:"not null" json:"updatedAt"`
	UserID      uuid.UUID `gorm:"type:uuid;not null"`
	User        User      `gorm:"foreignKey:UserID"`
	Tags        []Tag     `gorm:"foreignKey:JobId;constraint:OnDelete:CASCADE;" json:"tags"`
}
