package initializers

import (
	"fmt"
	"work-adhoc/models"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.Job{}, &models.User{})
	if err != nil {
		fmt.Println(err.Error())
	}
}
