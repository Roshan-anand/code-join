##CODE JOIN an interactive code editor

docker context create vps \
  --docker "host=ssh://user@your.vps.ip"

docker context use vps
docker build -t my‑app:latest .
docker run -d --name my‑app‑container my‑app:latest

docker context use default
