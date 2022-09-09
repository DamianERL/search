package profiledto

import "Be_waysbean/models"

type CreateProfile struct {
	Address    string             `json:"address" form:"address"`
	Phone      string             `json:"phone" form:"phone"`
	Image      string             `json:"image" form:"image"`
	City       string             `json:"city" form:"city"`
	PostalCode int                `json:"postal_code" form:"postal_code"`
	UserID     int                `json:"user_id"`
	User       models.UserProfile `json:"user"`
}

type UpdateProfile struct {
	Address    string `json:"address"`
	Phone      string `json:"phone" `
	Image      string `json:"image" `
	City       string `json:"city" `
	PostalCode int    `json:"postal_code"`
	UserID     int    `json:"user_id"`
}

type ProfileResponse struct {
	Address    string             `json:"address"`
	Phone      string             `json:"phone" `
	Image      string             `json:"image" `
	City       string             `json:"city" `
	PostalCode int                `json:"postal_code"`
	UserID     int                `json:"user_id"`
	User       models.UserProfile `json:"user"`
}