package controllers

import (
	"net/http"
	initializers "work-adhoc/initializer"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
)

func CreateJob(ctx *fiber.Ctx) error {
	job := models.Job{}
	err := ctx.BodyParser(&job)
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "request failed"})
		return err
	}
	result := initializers.DB.Create(&job)
	if result.Error != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not create job"})
		return result.Error
	}

	ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Job has been created", "job": job})
	return nil
}

func DeleteJob(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	jobModel := models.Job{}
	if id == "" {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid job ID"})
		return nil
	}
	result := initializers.DB.Where("id = ?", id).Delete(&jobModel)
	if result.Error != nil {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid job ID"})
		return result.Error
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Job successfully deleted"})
	return nil
}

func GetJobs(ctx *fiber.Ctx) error {
	jobs := &[]models.Job{}
	err := initializers.DB.Find(jobs).Error
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not get jobs"})
		return err
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{"jobs": jobs})
	return nil
}

func GetJobById(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	jobModel := models.Job{}
	if id == "" {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid job ID"})
		return nil
	}

	err := initializers.DB.Where("id = ?", id).First(&jobModel).Error

	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not find Job"})
		return nil
	}
	ctx.Status(http.StatusOK).JSON(jobModel)
	return nil
}
