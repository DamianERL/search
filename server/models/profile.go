package models

import "time"

type Profile struct {
	ID         int         `json:"id"`
	Phone      string      `json:"phone" gorm:"type: varchar(255)"`
	Image      string      `json:"image" gorm:"type :varchar(255)"`
	Address    string      `json:"address" gorm:"type: varchar(255)"`
	City       string      `json:"city" gorm:"type :varchar(255)"`
	PostalCode int      `json:"postal_code" gorm:"type: int"`
	UserID     int         `json:"user_id" ` //make id when register
	User       UserProfile `json:"user"`     //relasi user
	CreatedAt  time.Time   `json:"-"`
	UpdateAt   time.Time   `json:"-"`
}

type ProfileResponse struct {
	ID         int    `json:"id"`
	Image      string `json:"image"`
	Phone      string `json:"phone"`
	Address    string `json:"address"`
	City       string `json:"city" `
	PostalCode int `json:"postal_code"`
	UserId     int    `json:"user_id"`
}
func (ProfileResponse) TableName() string{
	return "Profiles"
}