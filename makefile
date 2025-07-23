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

E?=dev
# to run build docker compose [ make build E=dev/prod ]
build:
	@clear && \
	( docker image inspect codejoin-s >/dev/null 2>&1 && docker rmi codejoin-s || true ) && \
	( docker image inspect codejoin-c >/dev/null 2>&1 && docker rmi codejoin-c || true ) && \
	docker compose -f compose.$(E).yaml build

# to run docker compose
up :
	@clear && \
	docker compose -f compose.dev.yaml up -d

# to stop docker compose
down :
	@clear && \
	docker compose -f compose.dev.yaml down

# to deploy the stack
deploy :
	@clear && \
	docker stack deploy -c compose.prod.yaml codejoin