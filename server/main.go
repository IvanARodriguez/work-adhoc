package main

import (
	"work-adhoc/controllers"
	initializers "work-adhoc/initializer"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	app := fiber.New()
	app.Use(logger.New())
	controllers.GetRoutes(app)
	app.Listen(":9090")
}
