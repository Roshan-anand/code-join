package config

import (
	"net/http"

	"github.com/moby/moby/client"
)

type Server struct {
	Http   *http.Server
	Docker *client.Client
}

// creates a new server instance
func NewServer() (*Server, error) {
	dClient, err := InitDockerClient()
	if err != nil {
		return nil, err
	}

	return &Server{
		Docker: dClient,
	}, nil
}
