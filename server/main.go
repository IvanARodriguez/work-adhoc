package main

import (
	"log"
	"net/http"
	"os"
	"work-adhoc/models"
	"work-adhoc/storage"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateJob(ctx *fiber.Ctx) error {
	job := models.Job{}
	err := ctx.BodyParser(&job)
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "request failed"})
		return err
	}
	err = r.DB.Create(&job).Error
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not create job"})
		return err
	}

	ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Job has been created"})
	return nil
}

func (r *Repository) GetJobs(ctx *fiber.Ctx) error {
	jobs := &[]models.Job{}
	err := r.DB.Find(jobs).Error
	if err != nil {
		ctx.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "Could not get jobs"})
		return err
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{"jobs": jobs})
	return nil
}
func (r *Repository) GetJobById(ctx *fiber.Ctx) error {

	return nil
}
func (r *Repository) DeleteJob(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	jobModel := models.Job{}
	if id == "" {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid job ID"})
		return nil
	}
	err := r.DB.Delete(jobModel, id)
	if err != nil {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid job ID"})
		return err.Error
	}
	ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Job successfully deleted"})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/job", r.CreateJob)
	api.Delete("/job/:id", r.DeleteJob)
	api.Get("/job/:id", r.GetJobById)
	api.Get("/job", r.GetJobs)
}

func main() {
	// setup environment variables
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}
	// Handle Database
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		Database: os.Getenv("DB_NAME"),
		SSLMode:  os.Getenv("DB_SSL_MODE"),
	}
	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("Could not connect to the database")
	}
	// Create server
	app := fiber.New()
	r := Repository{
		DB: db,
	}

	r.SetupRoutes(app)
	app.Listen(":9090")
}
