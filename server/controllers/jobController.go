package controllers

import (
	"math"
	"net/http"
	"strconv"
	"time"
	initializers "work-adhoc/initializer"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type TagResponse struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type JobResponse struct {
	ID          uuid.UUID     `json:"id"`
	Title       string        `json:"title"`
	Salary      string        `json:"salary"`
	Description string        `json:"description"`
	Overview    string        `json:"overview"`
	CreatedAt   time.Time     `json:"createdAt"`
	UpdatedAt   time.Time     `json:"updatedAt"`
	Tags        []TagResponse `json:"tags"`
	User        struct {
		Username string `json:"username"`
	} `json:"user"`
}

type CreateJobRequest struct {
	Title       string   `json:"title"`
	Salary      string   `json:"salary"`
	Description string   `json:"description"`
	Overview    string   `json:"overview"`
	Tags        []string `json:"tags"`
}

func GetJobResponse(job *models.Job, tags []TagResponse) JobResponse {
	jobResponse := JobResponse{
		ID:          job.ID,
		Title:       job.Title,
		Salary:      job.Salary,
		Description: job.Description,
		CreatedAt:   job.CreatedAt,
		UpdatedAt:   job.UpdatedAt,
		Overview:    job.Overview,
		Tags:        tags,
		User: struct {
			Username string `json:"username"`
		}{
			Username: job.User.Username,
		},
	}
	return jobResponse
}

func CreateJob(ctx *fiber.Ctx) error {
	// Get the authenticated user from the context
	user := ctx.Locals("user").(models.User)

	// Parse the incoming request body into CreateJobRequest struct
	var request CreateJobRequest
	if err := ctx.BodyParser(&request); err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Request failed"})
		return err
	}

	// Create a new job and associate it with the user
	job := models.Job{
		Title:       request.Title,
		Salary:      request.Salary,
		Description: request.Description,
		Overview:    request.Overview,
		UserID:      user.ID,
	}

	// Start a transaction
	tx := initializers.DB.Begin()

	// Create the job
	if err := tx.Create(&job).Error; err != nil {
		tx.Rollback()
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not create job"})
		return err
	}

	// Create tags and associate them with the job
	var tags []models.Tag
	for _, tagName := range request.Tags {
		tag := models.Tag{
			Name:  tagName,
			JobId: job.ID,
		}
		tags = append(tags, tag)
	}

	if err := tx.Create(&tags).Error; err != nil {
		tx.Rollback()
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not create tags"})
		return err
	}

	// Commit the transaction
	tx.Commit()

	// Fetch the job with tags for the response
	var createdJob models.Job
	if err := initializers.DB.Preload("Tags").Preload("User").First(&createdJob, job.ID).Error; err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not retrieve job"})
		return err
	}

	// Prepare the response
	tagsResponse := make([]TagResponse, len(createdJob.Tags))
	for i, tag := range createdJob.Tags {
		tagsResponse[i] = TagResponse{
			ID:   tag.ID,
			Name: tag.Name,
		}
	}

	jobResponse := GetJobResponse(&createdJob, tagsResponse)

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
	if err := initializers.DB.Preload("Tags").Preload("User").
		Limit(pageSize).
		Offset(offset).
		Order("created_at desc").
		Find(&jobs).Error; err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not get jobs"})
		return err
	}

	// Transform the result into the desired response format
	jobResponses := make([]JobResponse, len(jobs))
	for i, job := range jobs {
		tags := make([]TagResponse, len(job.Tags))
		for j, tag := range job.Tags {
			tags[j] = TagResponse{
				ID:   tag.ID,
				Name: tag.Name,
			}
		}
		jobResponses[i] = JobResponse{
			ID:          job.ID,
			Title:       job.Title,
			Salary:      job.Salary,
			Description: job.Description,
			CreatedAt:   job.CreatedAt,
			UpdatedAt:   job.UpdatedAt,
			Tags:        tags,
			Overview:    job.Overview,
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

	err := initializers.DB.Where("id = ?", id).Preload("Tags").Preload("User").First(&jobModel).Error

	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not find Job"})
		return nil
	}

	tags := make([]TagResponse, len(jobModel.Tags))
	for i, tag := range jobModel.Tags {
		tags[i] = TagResponse{
			ID:   tag.ID,
			Name: tag.Name,
		}
	}
	jobResponse := JobResponse{
		ID:          jobModel.ID,
		Title:       jobModel.Title,
		Salary:      jobModel.Salary,
		Description: jobModel.Description,
		CreatedAt:   jobModel.CreatedAt,
		UpdatedAt:   jobModel.UpdatedAt,
		Tags:        tags,
		Overview:    jobModel.Overview,
		User: struct {
			Username string `json:"username"`
		}{
			Username: jobModel.User.Username,
		},
	}

	ctx.Status(http.StatusOK).JSON(jobResponse)
	return nil
}
