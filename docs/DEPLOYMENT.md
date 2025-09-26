# DEPLOYMENT.md

## 1. Prerequisites

- Render account: https://render.com
- GitHub repo: Push your project folder selfhosted-ai to GitHub.
- Environment variables: store secrets in Render dashboard (not in code).

## 2. Render Services
### 2.1 Backend API (Express + Sequelize)
- Service Type: Web Service
- Root Directory: /backend
- Build Command:
  npm install
- Start Command:
  node src/index.js
- Environment: Node 18+
- Environment Variables (set in Render dashboard):
  - DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<dbname>
  - JWT_SECRET=your_long_secret_key
  - NODE_ENV=production
- Scaling: Free tier fine (512MB RAM).

### 2.2 PostgreSQL (Database)
- Service Type: Render PostgreSQL (managed).
- Render gives you a DATABASE_URL. Copy into Backend’s environment variables.
- Run migrations/seeding with:
  docker compose exec backend node src/utils/createUsers.js

### 2.3 NocoDB Dashboard
- Service Type: Web Service
- Root Directory: /nocodb
- Dockerfile recommended OR use NocoDB’s public Docker image:

```yaml
services:
  nocodb:
    image: nocodb/nocodb:latest
    ports:
      - "8080:8080"
    volumes:
      - ./data:/usr/app/data
```

- Point NocoDB to the same PostgreSQL DATABASE_URL.

### 2.4 n8n Automation
- Service Type: Web Service
- Use Docker image:

```yaml
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=<db_host>
      - DB_POSTGRESDB_DATABASE=<dbname>
      - DB_POSTGRESDB_USER=<user>
      - DB_POSTGRESDB_PASSWORD=<password>
```

- Import your workflows (daily-check.json, weekly-compliance.json, etc.).

### 2.5 Telegram Bot
- Host inside backend container OR deploy separately.
- Use node-telegram-bot-api.
- Store bot token as TELEGRAM_BOT_TOKEN in Render dashboard.

## 3. GitHub Actions CI/CD

Create workflow file:
`.github/workflows/deploy.yml`

```yaml
name: Deploy to Render

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Trigger Render Deploy
        uses: render-examples/deploy-render-action@v1
        with:
          serviceId: ${{ secrets.RENDER_SERVICE_ID }}
          apiKey: ${{ secrets.RENDER_API_KEY }}
```

Setup Steps
- Get your Service ID from Render → Settings.
- Add RENDER_API_KEY and RENDER_SERVICE_ID in GitHub repo → Settings → Secrets → Actions.
- Every push to main auto-triggers a redeploy.

## 4. Cronjobs (Keep Alive & Archival)

Render free tier services sleep after inactivity. Solutions:
- Use your n8n workflows (monthly-archive.json) to handle archival automatically.
- Use UptimeRobot (free) or GitHub Actions scheduled workflow to “ping” your backend every 15 minutes:

`.github/workflows/ping.yml`

```yaml
name: Keep Alive

on:
  schedule:
    - cron: "*/15 * * * *"

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping API
        run: curl -s https://your-app.onrender.com/health || true
```

## 5. Health Check Endpoint

Add to src/index.js:

```js
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
```

Render will use this for automatic health monitoring.

---

## ✅ Summary
- Backend API: Render Web Service.
- Database: Render PostgreSQL.
- NocoDB + n8n: Deploy as Docker services (or local if you prefer).
- Telegram Bot: part of backend service.
- CI/CD: GitHub Actions auto-deploy.
- Keep-alive: Ping with GitHub Actions or UptimeRobot.

---

👉 Next step: Do you want me to prepare Step 9: Telegram Bot Setup (so coordinator can query absences like “who are the top absent students”)?
