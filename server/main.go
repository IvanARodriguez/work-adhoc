package main

import (
	"work-adhoc/controllers"
	initializers "work-adhoc/initializer"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	// Jobs
	jobsRoutes := api.Group("/jobs")
	jobsRoutes.Post("/", controllers.CreateJob)
	jobsRoutes.Delete("/:id", controllers.DeleteJob)
	jobsRoutes.Get("/", controllers.GetJobs)
	jobsRoutes.Get("/:id", controllers.GetJobById)
}

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	app := fiber.New()
	SetupRoutes(app)
	app.Listen(":9090")
}
