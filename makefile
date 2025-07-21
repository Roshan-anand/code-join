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

# to run build docker compose
build:
	@clear && \
	( docker image inspect codejoin-s >/dev/null 2>&1 && docker rmi codejoin-s || true ) && \
	( docker image inspect codejoin-c >/dev/null 2>&1 && docker rmi codejoin-c || true ) && \
	docker compose -f compose.yaml build

# to run docker compose
up :
	@clear && \
	docker compose -f compose.yaml up -d

# to stop docker compose
down :
	@clear && \
	docker compose -f compose.yaml down

watch :
	@clear && \
	( docker image inspect codejoindev-s >/dev/null 2>&1 && docker rmi codejoindev-s || true ) && \
	( docker image inspect codejoindev-c >/dev/null 2>&1 && docker rmi codejoindev-c || true ) && \
	docker compose -f compose.dev.yaml up --build --watch

watch-down :
	@clear && \
	docker compose -f compose.dev.yaml down

deploy :
	@clear && \
	docker stack deploy -c compose.prod.yaml codejoin