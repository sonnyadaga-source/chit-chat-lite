# Qodo Agents for selfhosted-ai

## test-docker
Runs docker-compose and checks health of:
- Backend (http://localhost:4000)
- Frontend (http://localhost:3000)
- NocoDB (http://localhost:8080)
- n8n (http://localhost:5678)
- MinIO (http://localhost:9000/minio/health/live)
- Postgres (pg_isready)
