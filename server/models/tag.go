package models

import (
	"github.com/google/uuid"
)

type Tag struct {
	ID    uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary key" json:"id"`
	Name  string    `json:"name"`
	JobId uuid.UUID `gorm:"type:uuid;not null" json:"job_id"`
	Job   Job       `gorm:"foreignKey:JobId" json:"job"`
}
