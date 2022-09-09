package productdto

type CreateProduct struct {
	Title    string `json:"title" form:"title" validate:"required"`
	Price    int    `json:"price" form:"price" validate:"required"`
	Stock    int    `json:"stock" form:"stock" `
	Image    string `json:"image" form:"image" `
	Desc 	 string `json:"desc" form:"desc" `
}
type UpdateProduct struct {
	Title    string `json:"title" form:"title" `
	Price    int    `json:"price" form:"price" `
	Stock    int    `json:"stock" form:"stock" `
	Image    string `json:"image" form:"image" `
	Desc	 string `json:"desc" form:"desc" `
}

type UpdateProductStock struct {
	Stock int `json:"stock" gorm:"type: int"`
}
type ProductResponse struct {
	Title    string `json:"title" form:"title"`
	Price    int    `json:"price" form:"price"`
	Stock    int    `json:"stock" form:"stock"`
	Image    string `json:"image" form:"image"`
	Desc 	 string `json:"desc" form:"desc"`
}
