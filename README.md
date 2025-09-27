<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7feec41b-f565-4c4e-ac07-f14d2aa1eeb7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7feec41b-f565-4c4e-ac07-f14d2aa1eeb7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7feec41b-f565-4c4e-ac07-f14d2aa1eeb7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======
# POD AI Monitoring Assistant# POD AI Monitoring Assistant



An AI-powered monitoring system designed for **school coordinators, advisers, and beadles** to manage student absences efficiently.An AI-powered monitoring system designed for **school coordinators, advisers, and beadles** to manage student absences efficiently.



------



## 🚀 Features## 🚀 Features

- **Role-based access control** (Coordinator, Adviser, Beadle)- **Role-based access control** (Coordinator, Adviser, Beadle)

- **Absence tracking** with media proof uploads (max 2MB)- **Absence tracking** with media proof uploads (max 2MB)

- **Telegram bot integration** for real-time queries:- **Telegram bot integration** for real-time queries:

  - `/topabsent` → Top students with absences  - `/topabsent` → Top students with absences

  - `/sectionabsences` → Absences per section (last 7 days)  - `/sectionabsences` → Absences per section (last 7 days)

  - `/flagged` → Students flagged for review  - `/flagged` → Students flagged for review

- **Automated workflows** (via n8n):- **Automated workflows** (via n8n):

  - Daily absence checks  - Daily absence checks

  - Weekly compliance checks  - Weekly compliance checks

  - Monthly archiving + cleanup  - Monthly archiving + cleanup

- **Secure backend** (Express.js, JWT auth, PostgreSQL)- **Secure backend** (Express.js, JWT auth, PostgreSQL)

- **Audit logging** for accountability- **Audit logging** for accountability

- **Backups & disaster recovery plan**- **Backups & disaster recovery plan**



------



## 📂 Project Structure## 📂 Project Structure



``````

selfhosted-ai/selfhosted-ai/

│── backend/     # Express.js API (authentication, RBAC, file uploads)│── backend/     # Express.js API (authentication, RBAC, file uploads)

│── frontend/    # React.js frontend (Vite + TypeScript)│── frontend/    # React.js frontend (Vite + TypeScript)

│── n8n/        # Workflow automation│── n8n/        # Workflow automation

│── nocodb/     # Low-code dashboard for DB management│── nocodb/     # Low-code dashboard for DB management

│── docs/       # Documentation (operations, security, DR, monitoring, etc.)│── docs/       # Documentation (operations, security, DR, monitoring, etc.)

│── docker-compose.yml│── docker-compose.yml

``````



------



## 🛠️ Tech Stack## 🛠️ Tech Stack

- **Backend**: Node.js (Express, Sequelize ORM)- **Backend**: Node.js (Express, Sequelize ORM)

- **Frontend**: React.js + Vite + TypeScript- **Frontend**: React.js + Vite + TypeScript

- **Database**: PostgreSQL- **Database**: PostgreSQL

- **Dashboard**: NocoDB- **Dashboard**: NocoDB

- **Automation**: n8n- **Automation**: n8n

- **Storage**: MinIO- **Storage**: MinIO

- **Messaging**: Telegram Bot- **Messaging**: Telegram Bot

- **Deployment**: Docker- **Deployment**: Docker



------



## ⚡ Setup## ⚡ Quick Start (PowerShell)

1. Copy env example and fill secrets (do NOT commit `.env`)

1. Clone repo:

   ```bash   cp .env.example .env

   git clone https://github.com/techfixastral-cmyk/pod-ai-monitoring.git   # Edit .env with a secure password and 32+ char N8N_ENCRYPTION_KEY

   cd pod-ai-monitoring

   ```2. Start services



2. Copy .env.example → .env and configure credentials:   docker compose up -d

   ```bash

   cp .env.example .env3. Access locally

   ```- NocoDB: http://localhost:8080

- n8n: http://localhost:5678 (protected by basic auth if enabled)

3. Start services:

   ```bashExpose to the Internet with Cloudflare Tunnel (optional)

   docker compose up -d1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation

   ```2. Login and create a tunnel following Cloudflare docs. This will create a `config.yml` under `%USERPROFILE%\\.cloudflared` with a tunnel id and `credentials-file` path.

3. Use the provided `cloudflared-config.example.yml` as a template for `config.yml` and set your hostnames.

4. Access:4. Run tunnel (PowerShell):

   - Frontend: http://localhost:3000

   - Backend: http://localhost:4000   cloudflared tunnel run <TUNNEL-NAME>

   - NocoDB: http://localhost:8080

   - n8n: http://localhost:5678Security notes

   - MinIO: http://localhost:9000- Always keep `.env` out of VCS.

- Use strong passwords and a 32+ character `N8N_ENCRYPTION_KEY`.

## 📖 Documentation- When exposing n8n, enable basic auth and restrict access where possible.



Detailed guides are in the /docs folder:Next steps (suggested)

- `OPERATIONS.md` → Day-to-day SOP- Configure NocoDB with the `postgres` DB and create tables for absence tracking.

- `SECURITY.md` → Security practices- Create n8n workflows to process data, generate Excel reports, and send Telegram notifications.

- `BACKUP_DR.md` → Backup & disaster recovery- Add backups for Postgres volume.

- `MONITORING.md` → Monitoring & alerts

- `TRAINING.md` → User trainingProject-specific guidance — POD AI Monitoring Assistant

- `MAINTENANCE.md` → Long-term upkeep

1) Data model suggestion (NocoDB / Postgres tables)

## 🔒 Security Notes   - students: id, student_number, first_name, last_name, contact_number, section_id

- Always keep `.env` out of VCS   - sections: id, name, adviser_name, contact_number

- Use strong passwords and a 32+ character `N8N_ENCRYPTION_KEY`   - absences: id, student_id, date, reason, recorded_by, notes

- When exposing n8n, enable basic auth and restrict access   - reports_log: id, report_type, generated_at, generated_by, file_path

- Do NOT expose Postgres port to the internet

2) NocoDB setup

## 📊 Data Model   - Open NocoDB at http://localhost:8080 and connect to the Postgres DB using the `NC_DB` connection string from `.env`.

### Tables   - Create the tables above using NocoDB's UI so non-technical beadle staff can edit records.

- **students**: id, student_number, first_name, last_name, contact_number, section_id

- **sections**: id, name, adviser_name, contact_number3) n8n workflows (high level)

- **absences**: id, student_id, date, reason, recorded_by, notes   - Data validation workflow: trigger on new/updated `absences` rows -> check duplicates -> normalize data.

- **reports_log**: id, report_type, generated_at, generated_by, file_path   - Daily summary: cron trigger -> query DB -> compute section rankings -> store summary in `reports_log` and optionally create Excel via spreadsheet node.

   - Alerts: trigger when a student reaches 2+ absences -> send Telegram alert to coordinator; 5+ absences -> include contact phone in message.

### Workflows   - Manual report generation: HTTP webhook (secured) -> run report job -> upload file to storage or return downloadable link.

- **Data validation**: Trigger on new/updated absences → check duplicates → normalize data

- **Daily summary**: Cron trigger → query DB → compute rankings → store summary4) Telegram integration

- **Alerts**: Monitor absence thresholds → send Telegram notifications   - Create a Telegram bot via BotFather and copy the Bot Token into n8n credentials (do NOT store token in repo).

- **Reports**: HTTP webhook (secured) → generate report → provide download link   - In n8n, use the Telegram node to send messages to the coordinator chat id. Use environment variables in `.env` for tokens.



## 🤝 Contributing5) Expose only what's necessary

   - Prefer exposing NocoDB and n8n behind a Cloudflare Tunnel with hostnames and HTTP basic auth for n8n.

1. Fork the repo   - Do NOT expose Postgres port to the internet. Keep it on the Docker network only.

2. Create a feature branch: `git checkout -b feature-name`

3. Commit changes: `git commit -m "Add new feature"`6) Next small improvements (proactive extras)

4. Push to branch: `git push origin feature-name`   - Add `docker-compose.override.yml` with local development mounts for easier editing.

5. Open a Pull Request   - Add a minimal SQL migration or seed file under `init/` to create the suggested tables on first run.



## 📜 LicenseHow I validated changes

 - Verified `docker-compose.yml` reads from `.env` and no secrets are hard-coded.

This project is licensed under the MIT License — free to use, modify, and distribute. - Added example config files and README steps for exposing with Cloudflare Tunnel without embedding credentials.

Requirements coverage
 - Free data storage: Postgres (local, free) + NocoDB (UI) — Done
 - Integration with n8n: compose file includes n8n service and environment placeholders — Done
 - First run locally then expose: README explains local run and Cloudflare Tunnel exposure — Done

If you'd like, I can:
 - Add the SQL seed file under `init/` to automatically create the tables when Postgres initializes.
 - Add an `n8n` workflow template (JSON) for Telegram alerts and daily summaries.
 - Create `docker-compose.override.yml` for development mounts.
>>>>>>> pod/main
