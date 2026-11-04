# GeM Scraper & Live Synchronization Guide

This guide explains how **TenderSearch** extracts, ingests, and synchronizes live public government tenders from the **Government e-Marketplace (GeM)** portal (`bidplus.gem.gov.in`).

---

## 🏗️ Architecture Overview

```
[GeM BidPlus Portal] 
(bidplus.gem.gov.in)
        │
        ▼ (Automated HTTP Fetch / Parser)
[scripts/gem_scraper.js] 
        │
        ▼ (Standardized GeM Schema)
[src/data/scraped_gem_bids.json]
        │
        ▼ (Admin Review Buffer: Draft / Pending)
[Admin Ingestion Console] ────► [Toggle: "Live on Site"]
        │                                  │
        └──────────────────────────────────┴─────► [Public Visitor Screen]
                                                    (Immediately Visible to Visitors!)
```

---

## 1. Interactive In-App Sync (One-Click)

1. Open the website: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
2. Click **"Admin Portal"** in the top navigation bar.
3. Click the **"Sync from GeM Portal"** button.
4. The system queries GeM, pulls the latest biddings, and queues them in the **"Pending Review"** list.
5. Review any bid and click the **"Live on Website"** switch.
6. The moment you toggle it to **`● LIVE ON SITE`**, it **immediately becomes visible to all visitors** on the public search feed and directory!

---

## 2. Command-Line Automated Scraper

You can run the scraper directly from your terminal:

```powershell
cd D:\TenderSearch
node scripts/gem_scraper.js
```

**Output:**
```
[GeM Scraper] Connecting to https://bidplus.gem.gov.in/all-bids...
[GeM Scraper] Connected successfully. HTTP Status: 200
[GeM Scraper] Successfully extracted 6 live GeM tenders to D:\TenderSearch\src\data\scraped_gem_bids.json
```

---

## 3. Production Automated Scheduling (Cron / Background Worker)

To automatically sync new GeM tenders every 2 hours without manual intervention:

### Option A: Windows Task Scheduler (PowerShell)
```powershell
$action = New-ScheduledTaskAction -Execute "node.exe" -Argument "D:\TenderSearch\scripts\gem_scraper.js"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 2)
Register-ScheduledTask -TaskName "GeMTenderSync" -Action $action -Trigger $trigger
```

### Option B: Linux / Cloud Crontab
```bash
0 */2 * * * cd /var/www/tendersearch && node scripts/gem_scraper.js >> /var/log/gem_sync.log 2>&1
```

### Option C: GitHub Actions Workflow (`.github/workflows/gem_sync.yml`)
```yaml
name: Daily GeM Tender Sync
on:
  schedule:
    - cron: '0 */4 * * *' # Runs every 4 hours
  workflow_dispatch:

jobs:
  scrape-gem:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: node scripts/gem_scraper.js
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Auto-sync latest GeM tenders"
```

---

## 4. Tender Data Schema

All scraped and manual tenders adhere to this schema:

```json
{
  "id": "GEM-2026-B-9182301",
  "bidNumber": "GEM/2026/B/9182301",
  "title": "Supply of High-Performance Server Racks",
  "department": "Military Engineer Services (MES)",
  "ministry": "Ministry of Defence",
  "state": "Delhi",
  "city": "New Delhi",
  "category": "Products",
  "sector": "IT & Telecommunications",
  "value": 18500000,
  "valueDisplay": "₹ 1.85 Crore",
  "emdAmount": 370000,
  "emdDisplay": "₹ 3,70,000",
  "msmeExempted": true,
  "startupExempted": true,
  "miiPercentage": 50,
  "postedDate": "2026-11-01",
  "endDate": "2026-11-08T15:00:00",
  "hoursRemaining": 18,
  "status": "Live",
  "isLive": true,
  "source": "GeM Live Scraper",
  "boqItemCount": 14,
  "docSize": "4.2 MB",
  "description": "...",
  "eligibility": {
    "minTurnover": "...",
    "pastExperience": "...",
    "oemAuthorization": "..."
  }
}
```
