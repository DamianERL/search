package routes

import (
	"Be_waysbean/handlers"
	"Be_waysbean/pkg/middleware"
	"Be_waysbean/pkg/mysql"
	"Be_waysbean/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions",middleware.Auth(h.FindTransaction)).Methods("GET")
	r.HandleFunc("/transaction/{id}",middleware.Auth(h.GetTransaction)).Methods("GET")
	r.HandleFunc("/user-transaction",middleware.Auth(h.GetUserTransaction)).Methods("GET")
	r.HandleFunc("/transaction",middleware.Auth(h.CreateTransaction)).Methods("POST")
	// r.HandleFunc("/notification",middleware.Auth(h.Notification)).Methods("POST")
	r.HandleFunc("/transaction/",middleware.Auth(h.UpdateTransaction)).Methods("PATCH")
	r.HandleFunc("/transaction/{id}",middleware.Auth(h.DeleteTransaction)).Methods("DELETE")
}
