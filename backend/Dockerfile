FROM node:22-alpine AS builder

WORKDIR /server

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:22-alpine AS production

WORKDIR /server

RUN npm install -g pnpm

COPY --from=builder /server/package.json ./
COPY --from=builder /server/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /server/dist ./dist

ENTRYPOINT [ "pnpm", "start" ]