package initializers

import (
	"fmt"
	"work-adhoc/models"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.Job{})
	if err != nil {
		fmt.Println(err.Error())
	}
}
