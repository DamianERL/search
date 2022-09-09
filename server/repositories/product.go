package repositories

import (
	"Be_waysbean/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product,error)
	GetProduct(ID int) (models.Product,error)
	CreateProduct(Product models.Product)(models.Product,error)
	UpdateProduct(Product models.Product)(models.Product,error)
	DeleteProduct(Product models.Product)(models.Product,error)
}

func RepositoryProduct(db *gorm.DB)*repository {
	return &repository{db}
}
func (r *repository)FindProducts()([]models.Product,error)  {
	var products []models.Product

	err:= r.db.Find(&products ).Error
	return products, err
}
func (r *repository)GetProduct (ID int)(models.Product,error)  {
	var product models.Product

	err:= r.db.First(&product,ID ).Error
	return product, err
}

func (r *repository) CreateProduct(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err
}

func (r *repository) UpdateProduct(product models.Product) (models.Product, error) {
	err := r.db.Save(&product).Error

	return product, err
}

func (r *repository) DeleteProduct(product models.Product) (models.Product, error) {
	err := r.db.Delete(&product).Error

	return product, err
}
