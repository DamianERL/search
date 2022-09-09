package repositories

import (
	"Be_waysbean/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User,error)
	GetUser(ID int) (models.User,error)
	CreateUser(user models.User)(models.User,error)
	UpdateUser(user models.User)(models.User,error)
	DeleteUser(user models.User)(models.User,error)
}

func RepositoryUser(db *gorm.DB) *repository  {
	return&repository{db}
}
func (r *repository) FindUsers() ([]models.User,error)  {
	var users []models.User
	err := r.db.Preload("Profile").Find(&users).Error
	return users, err
}

func (r *repository) GetUser(ID int) (models.User,error)  {
	var user models.User
	err := r.db.Preload("Profile").Find(&user,ID).Error
	return user, err
}

//"create" method here
func (r *repository) CreateUser(user models.User)(models.User,error) {
	err :=r.db.Create(&user).Error
	return user,err
}
//"update" method here
func (r *repository) UpdateUser(user models.User)(models.User,error)  {
	err :=r.db.Save(&user).Error
	return user ,err
}
//"delete" method here
func (r *repository) DeleteUser(user models.User)(models.User,error)  {
	err :=r.db.Delete(&user).Error
	return user ,err
}