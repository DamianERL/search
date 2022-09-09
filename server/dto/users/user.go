package usersdto

type UserResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name" form:"name" validate:"required"`
	Email string `json:"email" form:"name" validate:"required"`
}
type UserResponseDelete struct {
	ID int `json:"id"`
}
type UserResponseUpdate struct {
	ID    int    `json:"id"`
	Name  string `json:"name" form:"name" validate:"required"`
	Email string `json:"email" form:"email" validate:"required"`
	Image string `json:"Image" form:"Image" validate:"required"`
}
type CreateUserRequest struct {
	Name     string `json:"name" form:"name" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Image    string `json:"image" form:"image" validate:"required"`
	Status   string `json:"status" form:"status" validate:"required"`
}

type UpdateUserRequest struct {
	Name     string `json:"name" form:"name"`
	Email    string `json:"email" form:"email"`
	Image    string `json:"image" form:"image"`
	Address  string `json:"address" form:"address"`
	PostCode string `json:"post_code" form:"post_code"`
}
