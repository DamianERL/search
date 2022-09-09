package cartdto

type CreateCart struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	SubTotal  int    `json:"subtotal"`
	QTY       int    `json:"qty"`
	Status    string `json:"status"`
	ProductID int    `json:"product_id"`
}


type UpdateCart struct {
	ID       int    `json:"id"`
	QTY      int    `json:"qty"`
	SubTotal int    `json:"subtotal"`
	Status   string `jsom:"status"`
}
type CartResponse struct {
	ID       int `json:"id"`
	QTY      int `json:"qty"`
	SubTotal int `json:"subtotal"`
}


//	type UpdateQTYRequest struct {
//		QTY      int `json:"qty"`
//		SubTotal int `json:"subtotal"`
//		Stock    int `json:"stock"`
//	}