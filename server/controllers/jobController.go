package controllers

import (
	"fmt"
	"math"
	"net/http"
	"strconv"
	"time"
	initializers "work-adhoc/initializer"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type JobResponse struct {
	ID          uuid.UUID `json:"id"`
	Title       string    `json:"title"`
	Salary      string    `json:"salary"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	User        struct {
		Username string `json:"username"`
	} `json:"user"`
}

func CreateJob(ctx *fiber.Ctx) error {
	user := ctx.Locals("user").(models.User)
	fmt.Printf("Logged in user: %s", user.Username)
	job := models.Job{}
	job.UserID = user.ID
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
	jobResponse := JobResponse{
		ID:          job.ID,
		Title:       job.Title,
		Salary:      job.Salary,
		Description: job.Description,
		CreatedAt:   job.CreatedAt,
		UpdatedAt:   job.UpdatedAt,
		User: struct {
			Username string `json:"username"`
		}{
			Username: job.User.Username,
		},
	}

	ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Job has been created", "job": jobResponse})
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
	// Get pagination parameters from query string
	pageStr := ctx.Query("page", "1")
	pageSizeStr := ctx.Query("pageSize", "10")

	// Convert page and pageSize to integers
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil || pageSize < 1 {
		pageSize = 10
	}

	// Calculate offset for pagination
	offset := (page - 1) * pageSize

	var jobs []models.Job
	var totalJobs int64

	// Get the total count of jobs for pagination metadata
	if err := initializers.DB.Model(&models.Job{}).Count(&totalJobs).Error; err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not get jobs count"})
		return err
	}

	// Eager load the associated User data and apply pagination
	if err := initializers.DB.Preload("User").
		Limit(pageSize).
		Offset(offset).
		Find(&jobs).Error; err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not get jobs"})
		return err
	}

	// Transform the result into the desired response format
	jobResponses := make([]JobResponse, len(jobs))
	for i, job := range jobs {
		jobResponses[i] = JobResponse{
			ID:          job.ID,
			Title:       job.Title,
			Salary:      job.Salary,
			Description: job.Description,
			CreatedAt:   job.CreatedAt,
			UpdatedAt:   job.UpdatedAt,
			User: struct {
				Username string `json:"username"`
			}{
				Username: job.User.Username,
			},
		}
	}

	// Send the response with pagination metadata
	ctx.Status(http.StatusOK).JSON(&fiber.Map{
		"jobs": jobResponses,
		"pagination": fiber.Map{
			"page":       page,
			"pageSize":   pageSize,
			"totalItems": totalJobs,
			"totalPages": int(math.Ceil(float64(totalJobs) / float64(pageSize))),
		},
	})
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
