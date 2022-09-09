package routes

import (
	"Be_waysbean/handlers"
	"Be_waysbean/pkg/middleware"
	"Be_waysbean/pkg/mysql"
	"Be_waysbean/repositories"

	"github.com/gorilla/mux"
)

func CartRoutes(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/carts", h.FindCarts).Methods("GET")
	r.HandleFunc("/cart/{id}", h.GetCart).Methods("GET")
	r.HandleFunc("/carts-id", middleware.Auth(h.FindCartsByID)).Methods("GET")
	r.HandleFunc("/cart", middleware.Auth(h.CreateCart)).Methods("POST")
	r.HandleFunc("/cart", middleware.Auth(h.UpdateCart)).Methods("PATCH")
	r.HandleFunc("/cart/{id}", middleware.Auth(h.UpdateeCart)).Methods("PATCH")
	r.HandleFunc("/cart/{id}", middleware.Auth(h.DeleteCart)).Methods("DELETE")
}
