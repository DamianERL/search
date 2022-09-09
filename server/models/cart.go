package models

import "time"

type Cart struct {
	ID        int         `json:"id"`
	QTY       int         `json:"qty"`
	SubTotal  int         `json:"subtotal"`
	ProductID int         `json:"product_id"`
	Product   ProductResponse     `json:"product"`
	UserID    int         `json:"user_id"`
	User      UserProfile `json:"user"`
	Stock     int         `json:"stock"`
	Status    string      `json:"status"`
	CreatedAt time.Time   `json:"-"`
	UpdatedAt time.Time   `json:"updated_at"`
}
type CartResponse struct {
	ID        int     `json:"id"`
	QTY       int     `json:"qty"`
	SubTotal  int     `json:"subtotal"`
	ProductID int     `json:"product_id"`
	Product   ProductResponse `json:"product"`
}

func (CartResponse) TableName() string {
	return "carts"
}
