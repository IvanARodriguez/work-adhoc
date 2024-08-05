package controllers

import (
	"time"
	"work-adhoc/middlewares"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CleanUser struct {
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	ID        uuid.UUID `json:"id"`
}

func Validate(ctx *fiber.Ctx) error {
	user := ctx.Locals("user").(models.User)

	cleanUser := CleanUser{}
	cleanUser.Username = user.Username
	cleanUser.Email = user.Email
	cleanUser.ID = user.ID
	cleanUser.CreatedAt = user.CreatedAt
	cleanUser.UpdatedAt = user.UpdatedAt

	ctx.JSON(&fiber.Map{
		"message":         "Is Logged in",
		"isAuthenticated": true,
		"user":            cleanUser,
	})

	return nil
}

func GetRoutes(app *fiber.App) {
	withAuth := middlewares.WithAuthenticatedUser
	api := app.Group("/api")
	api.Get("/validate", withAuth, Validate)
	// Jobs
	jobsRoutes := api.Group("/jobs")
	jobsRoutes.Post("/", withAuth, CreateJob)
	jobsRoutes.Delete("/:id", DeleteJob)
	jobsRoutes.Get("/", GetJobs)
	jobsRoutes.Get("/:id", GetJobById)

	// Users
	userRoutes := api.Group("/users")
	userRoutes.Post("/signup", Signup)
	userRoutes.Post("/login", Login)
	userRoutes.Get("/logout", Logout)
}
