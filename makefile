# to run server
dev-server : 
	@clear && \
	cd backend && \
	pnpm dev

# to run server in prod mode
prod-server :
	@clear && \
	cd backend && \
	pnpm install && \
	pnpm build && \
	pnpm start

#to run react on dev mode
dev-client :
	@clear && \
	cd frontend && \
	pnpm dev

# to run react on prod mode
prod-client :
	@clear && \
	cd frontend && \
	pnpm build && \
	pnpm preview --port 5173 

# to containerize the server 
dkr-server :
	@clear && \
	cd backend && \
	docker image rm codejoin-s && \
	docker build -t codejoin-s .

# to containerize the client
dkr-client :
	@clear && \
	cd frontend && \
	docker image rm codejoin-c && \
	docker build -t codejoin-c .

# to run build docker compose
compose-build:
	@clear && \
	( docker image inspect codejoin-s >/dev/null 2>&1 && docker rmi codejoin-s || true ) && \
	( docker image inspect codejoin-c >/dev/null 2>&1 && docker rmi codejoin-c || true ) && \
	docker compose up -d --build

# to run docker compose
compose :
	@clear && \
	docker compose up -d

# to stop docker compose
down :
	@clear && \
	docker compose down