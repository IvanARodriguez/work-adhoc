package controllers

import (
	"work-adhoc/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Validate(c *fiber.Ctx) error {
	c.JSON(&fiber.Map{"message": "Is Logged in"})
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
