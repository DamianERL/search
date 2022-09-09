package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//connect gorm.DB
var DB *gorm.DB
var err error
func DatabaseInit() {

	//declare dsn
	dsn := "root:@tcp(localhost:3306)/waysbean?charset=utf8mb4&parseTime=True&loc=Local"

	//use mysql for DB
	DB ,err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err !=  nil{
		panic(err)
	}
	fmt.Println("Connected To DataBase")
}