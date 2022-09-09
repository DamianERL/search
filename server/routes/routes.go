package routes

import "github.com/gorilla/mux"

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	UserRoutes(r)
	ProfileRoutes(r)
	TransactionRoutes(r)
	CartRoutes(r)
	ProductRoutes(r)
}