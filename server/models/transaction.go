package models

import "time"

type Transaction struct {
	ID        int64     `json:"id"`
	UserID    int       `json:"user_id"`
	User      User      `json:"user"`
	Status    string    `json:"status"`
	Total     int       `json:"total"`
	Cart      []Cart    `json:"carts"  gorm:"many2many:transaction_cart;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	CartID    []int     `json:"cart_id" gorm:"-"`
	CreatedAt time.Time `json:"-"`
	UpdateAt  time.Time `json:"-"`
}
type TransactionResponse struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
