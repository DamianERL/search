package transactiondto

type CreateTransaction struct {
	Total int `json:"total"`
}

type UpdateTransaction struct {
	Total  int    `json:"total"`
	UserID int    `json:"user_id" form:"user_id"`
	Status string `json:"status"`
}

type TransactionResponse struct {
	ID     int    `json:"id"`
	Total  int    `json:"total"`
	UserID int    `json:"user_id" form:"user_id"`
	Status string `json:"status"`
}
