package handlers

import (
	dto "Be_waysbean/dto/result"
	usersdto "Be_waysbean/dto/users"
	"Be_waysbean/models"
	"Be_waysbean/pkg/bcrypt"
	"Be_waysbean/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	// "github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlersUser struct {
	UserRepository repositories.UserRepository
}

func HandlersUser(UserRepository repositories.UserRepository) *handlersUser  {
	return &handlersUser{UserRepository}
}
func (h *handlersUser) FindUsers  (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	users, err := h.UserRepository.FindUsers()
	if err != nil{
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code:http.StatusInternalServerError,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: users}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersUser) GetUser  (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	id, _:= strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)

	if err != nil{
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code:http.StatusInternalServerError,Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	// user.Profile.Image = path_file + user.Profile.Image
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersUser) CreateUser  (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	request := new(usersdto.CreateUserRequest)
	if err:= json.NewDecoder(r.Body).Decode(&request);err !=nil{
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	password,err :=bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	user := models.User{
		Name: request.Name,
		Email: request.Email,
		Password: password,
	}
	data,err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "succes" ,Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersUser) UpdateUser  (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")
	request := new(usersdto.UpdateUserRequest)

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	id,_ := strconv.Atoi(mux.Vars(r)["id"])
	user,err := h.UserRepository.GetUser(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	if request.Name !="" {
		user.Name =request.Name
	}
	if request.Email!=""{
		user.Email = request.Email
	}

	data,err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data:data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersUser) DeleteUser  (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")

	id,_:= strconv.Atoi(mux.Vars(r)["id"])
	user,err :=h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	data,err:=h.UserRepository.DeleteUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Name:     u.Name,
		Email:    u.Email,
	}
}