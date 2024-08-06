package middlewares

import (
	"fmt"
	"log"
	"os"
	"time"
	initializers "work-adhoc/initializer"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/csrf"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/utils"
	"github.com/golang-jwt/jwt/v5"
)

func WithAuthenticatedUser(ctx *fiber.Ctx) error {

	tokenString := ctx.Cookies("token")

	if tokenString == "" {
		fmt.Println("No token found")
		return fiber.ErrForbidden
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		log.Fatal(err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			fmt.Println("Token Expired")
			return fiber.ErrForbidden
		}

		var user = models.User{}
		initializers.DB.Where("id = ?", claims["sub"]).First(&user)

		if user.Username == "" {
			fmt.Println("User not found")
			return fiber.ErrForbidden
		}

		// Attach the req
		ctx.Locals("user", user)
		return ctx.Next()
		// Continue
	} else {
		return fiber.ErrForbidden
	}

}

func SetRateLimit() fiber.Handler {
	return limiter.New(limiter.Config{
		Max:        100,
		Expiration: 1 * time.Minute,
		LimitReached: func(c *fiber.Ctx) error {
			c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"message": "Too many requests, please try again later.",
			})
			return nil
		},
	})

}

func SetCSRF() fiber.Handler {
	return csrf.New(csrf.Config{
		KeyLookup:      "header:X-Csrf-Token",
		CookieName:     "csrf_",
		CookieSameSite: "Lax",
		Expiration:     1 * time.Hour,
		KeyGenerator:   utils.UUIDv4,
	})

}
