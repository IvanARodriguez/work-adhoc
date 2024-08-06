package main

import (
	"work-adhoc/controllers"
	initializers "work-adhoc/initializer"
	"work-adhoc/middlewares"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	app := fiber.New()

	// Use middlewares
	app.Use(middlewares.SetRateLimit())
	app.Use(middlewares.SetCSRF())
	app.Use(helmet.New())
	app.Use(cors.New())
	app.Use(logger.New())

	// Set up routes
	controllers.GetRoutes(app)

	// Start the server
	app.Listen(":9090")
}
