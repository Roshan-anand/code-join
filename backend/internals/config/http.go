package config

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"
)

func (s *Server) SetupHttp(h http.Handler) {
	s.Http = &http.Server{
		Addr:    ":8080",
		Handler: h,
	}
}

// starts the http server
func (s *Server) StartServer(srvErr chan error) {
	if err := s.Http.ListenAndServe(); errors.Is(err, http.ErrServerClosed) {
		srvErr <- err
	}
}

// shuts down the http server gracefully
func (s *Server) ShutDownServer() error {
	ctx, cancle := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancle()

	if err := s.Http.Shutdown(ctx); err != nil {
		if closeErr := s.Http.Close(); closeErr != nil {
			return errors.Join(fmt.Errorf("http server close error :"), err, closeErr)
		}

		return fmt.Errorf("http server shutdown error : %w", err)
	}

	if err := s.CloseDockerClient(); err != nil {
		return fmt.Errorf("docker client close error : %w", err)
	}

	return nil
}
