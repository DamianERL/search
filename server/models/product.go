package models

import "time"

type Product struct {
	ID        int       `json:"id"`
	Stock     int       `json:"stock" gorm:"type: int"`
	Title     string    `json:"title" gorm:"type : varchar(255)"`
	Price     int       `json:"price" gorm:"type :int"`
	Desc      string    `json:"desc" gorm:"type :varchar(255)"`
	Image     string    `json:"image" gorm:"type : varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdateAt  time.Time `json:"-"`
}

type ProductResponse struct {
	ID    int    `json:"id"`
	Title string `json:"Title"`
	Stock int    `json:"stock"`
	Desc  string `json:"desc"`
	Price int    `json:"Price"`
	Image string `json:"Image"`
}

func (ProductResponse) TableName() string {
	return "products"
}
