package controllers

import (
	"fmt"
	"os"
	"strings"
	"time"
	initializers "work-adhoc/initializer"
	"work-adhoc/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type Creds struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

type LoginCreds struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Signup(ctx *fiber.Ctx) error {
	// Get email | pass from body
	creds := Creds{}
	if ctx.BodyParser(&creds) != nil {
		ctx.Status(fiber.ErrBadRequest.Code).JSON(&fiber.Map{"message": "Invalid credentials"})
		return nil
	}
	//  Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(creds.Password), 10)
	if err != nil {
		ctx.Status(fiber.ErrBadRequest.Code).JSON(&fiber.Map{"message": "Failed to hash password"})
		return nil
	}
	// Create the user
	user := models.User{
		Email:    creds.Email,
		Password: string(hash),
		Username: creds.Username,
	}

	result := initializers.DB.Create(&user)

	if result.Error != nil {
		userExists := strings.Contains(
			result.Error.Error(),
			"duplicate",
		)
		if userExists {
			ctx.Status(fiber.ErrBadRequest.Code).JSON(&fiber.Map{"message": "User already exists"})
		} else {
			ctx.Status(fiber.ErrBadRequest.Code).JSON(&fiber.Map{"message": "Failed to create user"})
		}
		return nil
	}
	// Respond
	ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "User successfully created"})
	return nil
}

func Login(ctx *fiber.Ctx) error {
	// Get the email and password from body
	creds := LoginCreds{}
	user := models.User{}
	if ctx.BodyParser(&creds) != nil {
		ctx.Status(fiber.ErrBadRequest.Code).JSON(&fiber.Map{"message": "Invalid credentials"})
		return nil
	}

	// Look up the user
	result := initializers.DB.Where("username = ? OR email = ?", creds.Username, creds.Username).First(&user)
	if result.Error != nil {
		ctx.Status(fiber.StatusNotFound).JSON(&fiber.Map{"message": "User not found"})
		return nil
	}

	if result.RowsAffected == 0 {
		ctx.Status(fiber.StatusNotFound).JSON(&fiber.Map{"message": "User not found"})
		return nil
	}
	// Compare req pass with saved pass
	err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(creds.Password),
	)

	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "Invalid credentials"})
		return nil
	}
	cookieExpiration := time.Hour * 24 * 30
	// Generate a JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(cookieExpiration).Unix(),
	})
	var tokenString string
	tokenString, err = token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		fmt.Print(err.Error())
		ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "Failed to create token"})
		return nil
	}
	ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"username":  user.Username,
		"email":     user.Email,
		"createdAt": user.CreatedAt,
	})
	// Respond

	ctx.ClearCookie("token")

	ctx.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  time.Now().Add(cookieExpiration),
		HTTPOnly: true,
		SameSite: "strict",
	})
	return nil
}

func Logout(ctx *fiber.Ctx) error {
	expiredTime := time.Now().Add(-3 * time.Second)
	// remove the cookie
	ctx.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  expiredTime,
		HTTPOnly: true,
		SameSite: "strict",
	})
	// respond
	ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "Successfully logged out",
	})
	return nil
}
