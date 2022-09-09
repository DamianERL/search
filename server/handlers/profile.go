package handlers

import (
	profiledto "Be_waysbean/dto/profile"
	dto "Be_waysbean/dto/result"
	"Be_waysbean/models"
	"Be_waysbean/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

var path_file = "http://localhost:5000/uploads/"

type handlersProfile struct {
	ProfileRepository repositories.ProfileRepostory
}

func HandlerProfile(ProfileRepository repositories.ProfileRepostory) *handlersProfile {
	return &handlersProfile{ProfileRepository}
}

func (h *handlersProfile) FindProfiles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	profiles, err := h.ProfileRepository.FindProfiles()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: profiles}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersProfile) GetProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	profiles, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	profiles.Image = path_file + profiles.Image

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseProfile(profiles)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersProfile) CreateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(profiledto.CreateProfile)

	profile := models.Profile{
		Phone:      request.Phone,
		Address:    request.Address,
		City:       request.City,
		PostalCode: request.PostalCode,
		Image:      request.Image,
		UserID:     request.UserID,
	}
	data, err := h.ProfileRepository.CreateProfile(profile)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseProfile(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersProfile) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	id := int(userInfo["id"].(float64))

	dataContext := r.Context().Value("datafile")
	filename := dataContext.(string)
	postalCode, _ := strconv.Atoi(r.FormValue("postal_code"))

	request := profiledto.UpdateProfile{
		Address:    r.FormValue("address"),
		PostalCode: postalCode,
		Image:      filename,
	}
	profile,err:=h.ProfileRepository.GetProfile(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	if (request.Address)!=""{
		profile.Address=request.Address
	}
	if (request.PostalCode)!=0{
		profile.PostalCode=request.PostalCode
	}
	if (filename) !="false" {
		profile.Image=filename
	}

	data, err := h.ProfileRepository.UpdateProfile(profile)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status:"success" , Data: convertResponseProfile(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlersProfile) DeleteProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	profile, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	data, err := h.ProfileRepository.DeleteProfile(profile)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		Image:      u.Image,
		Phone:      u.Phone,
		Address:    u.Address,
		PostalCode: u.PostalCode,
		City:       u.City,
		UserID:     u.UserID,
		User:       u.User,
	}
}
