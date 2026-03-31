package routes

import "net/http"

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	return mux
}
