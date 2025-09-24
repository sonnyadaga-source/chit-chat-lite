POD AI Monitoring Assistant — Local dev & expose guide

Overview
- This repo runs Postgres + NocoDB + n8n (plus optional services) via Docker Compose for local development.
- Keep secrets out of VCS: copy `.env.example` → `.env` and fill values.

Quick start (PowerShell)
1. Copy env example and fill secrets (do NOT commit `.env`)

   cp .env.example .env
   # Edit .env with a secure password and 32+ char N8N_ENCRYPTION_KEY

2. Start services

   docker compose up -d

3. Access locally
- NocoDB: http://localhost:8080
- n8n: http://localhost:5678 (protected by basic auth if enabled)

Expose to the Internet with Cloudflare Tunnel (optional)
1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation
2. Login and create a tunnel following Cloudflare docs. This will create a `config.yml` under `%USERPROFILE%\\.cloudflared` with a tunnel id and `credentials-file` path.
3. Use the provided `cloudflared-config.example.yml` as a template for `config.yml` and set your hostnames.
4. Run tunnel (PowerShell):

   cloudflared tunnel run <TUNNEL-NAME>

Security notes
- Always keep `.env` out of VCS.
- Use strong passwords and a 32+ character `N8N_ENCRYPTION_KEY`.
- When exposing n8n, enable basic auth and restrict access where possible.

Next steps (suggested)
- Configure NocoDB with the `postgres` DB and create tables for absence tracking.
- Create n8n workflows to process data, generate Excel reports, and send Telegram notifications.
- Add backups for Postgres volume.

Project-specific guidance — POD AI Monitoring Assistant

1) Data model suggestion (NocoDB / Postgres tables)
   - students: id, student_number, first_name, last_name, contact_number, section_id
   - sections: id, name, adviser_name, contact_number
   - absences: id, student_id, date, reason, recorded_by, notes
   - reports_log: id, report_type, generated_at, generated_by, file_path

2) NocoDB setup
   - Open NocoDB at http://localhost:8080 and connect to the Postgres DB using the `NC_DB` connection string from `.env`.
   - Create the tables above using NocoDB's UI so non-technical beadle staff can edit records.

3) n8n workflows (high level)
   - Data validation workflow: trigger on new/updated `absences` rows -> check duplicates -> normalize data.
   - Daily summary: cron trigger -> query DB -> compute section rankings -> store summary in `reports_log` and optionally create Excel via spreadsheet node.
   - Alerts: trigger when a student reaches 2+ absences -> send Telegram alert to coordinator; 5+ absences -> include contact phone in message.
   - Manual report generation: HTTP webhook (secured) -> run report job -> upload file to storage or return downloadable link.

4) Telegram integration
   - Create a Telegram bot via BotFather and copy the Bot Token into n8n credentials (do NOT store token in repo).
   - In n8n, use the Telegram node to send messages to the coordinator chat id. Use environment variables in `.env` for tokens.

5) Expose only what's necessary
   - Prefer exposing NocoDB and n8n behind a Cloudflare Tunnel with hostnames and HTTP basic auth for n8n.
   - Do NOT expose Postgres port to the internet. Keep it on the Docker network only.

6) Next small improvements (proactive extras)
   - Add `docker-compose.override.yml` with local development mounts for easier editing.
   - Add a minimal SQL migration or seed file under `init/` to create the suggested tables on first run.

How I validated changes
 - Verified `docker-compose.yml` reads from `.env` and no secrets are hard-coded.
 - Added example config files and README steps for exposing with Cloudflare Tunnel without embedding credentials.

Requirements coverage
 - Free data storage: Postgres (local, free) + NocoDB (UI) — Done
 - Integration with n8n: compose file includes n8n service and environment placeholders — Done
 - First run locally then expose: README explains local run and Cloudflare Tunnel exposure — Done

If you'd like, I can:
 - Add the SQL seed file under `init/` to automatically create the tables when Postgres initializes.
 - Add an `n8n` workflow template (JSON) for Telegram alerts and daily summaries.
 - Create `docker-compose.override.yml` for development mounts.
