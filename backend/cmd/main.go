package main

import (
	"context"
	"fmt"
	"log"
	"os/signal"
	"syscall"

	"github.com/Roshan-anand/code-join/backend/internals/config"
	"github.com/Roshan-anand/code-join/backend/internals/routes"
)

func main() {

	srv, err := config.NewServer()
	if err != nil {
		log.Fatalf("failed to create server: %v", err)
		return
	}

	// config http server
	h := routes.SetupRoutes()
	srv.SetupHttp(h)

	srvErr := make(chan error, 1)
	srv.StartServer(srvErr)
	fmt.Println("server started on port 8080")

	sysCtx, cancle := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer cancle()

	select {
	case <-sysCtx.Done():
		if err := srv.ShutDownServer(); err != nil {
			log.Fatalf("failed to shutdown server: %v", err)
		}
	case err := <-srvErr:
		log.Fatalf("server error: %v", err)
	}
}
