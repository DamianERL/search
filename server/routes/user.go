package routes

import (
	"Be_waysbean/handlers"
	"Be_waysbean/pkg/mysql"
	"Be_waysbean/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h:= handlers.HandlersUser(userRepository)

	r.HandleFunc("/users", h.FindUsers).Methods("GET")
	r.HandleFunc("/user/{id}", h.GetUser).Methods("GET")
	r.HandleFunc("/user", h.CreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", h.DeleteUser).Methods("PATCH")
	r.HandleFunc("/users/{id}", h.DeleteUser).Methods("DELETE")
}