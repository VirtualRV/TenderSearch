# TenderHelp (v2.0 Redevelopment)

Modern, high-converting redevelopment of **TenderHelp** (`tenderhelp.co`), combining the functionality and layout of **Bidhelp** (`bidhelp.co`) with the editorial, high-craft design and color system of **Bisque Framer** (`bisque-posterity-745237.framer.app/#make`).

---

## 🎨 Design System & Aesthetic Tokens
- **Color Palette:**
  - Background: Warm Bisque `#F6F2EA`
  - Cards & Surfaces: Linen Card `#FCFAF6`
  - Subtle Muted Surfaces: Sand `#EEE8DC` & `#E4DCCC`
  - Typography Ink: Off-Black `#121212` & Muted Umber `#57534A`
  - Primary Brand Accent: Papaya / Electric Orange `#FF7A3D` (with `#B4480F` dark states)
  - Secondary Brand Accent: Deep Spruce Green `#0F3B2E` & Success Emerald `#2F9E6A`
  - Borders: 1px hairline `rgba(18, 18, 18, 0.10)`
- **Typography:**
  - Headings & Primary UI: **Onest** (Google Fonts)
  - Data, Bid Numbers, Tags, Counters & Split Headers: **Azeret Mono** (Google Fonts)
- **Split Rail Headers:**
  - Numbered indicators `(01)`, `(02)`, `(03)`, `(04)`, `(05)` with subtle hairline dividers.

---

## 🚀 Key Functional Modules Built

1. **Live Header & Announcement Ticker:**
   - Real-time ticker: Active GeM Bids counter, total pipeline value, and sync status.
   - Sticky navbar with brand badge, quick navigation, and document generator trigger.
2. **Hero Omnibar Search (Bidhelp Model):**
   - Instant search by Item Keyword, GeM Bid Number, Ministry, or Organization.
   - Dynamic filters: 28 States & UTs dropdown, Central Ministries, and Category (Goods, Services, Works).
   - Fast toggle chips: "MSME / Startup EMD Exempted", "Closing in 48 Hours".
3. **Interactive `#make` Component (Eligibility & Bid Matcher):**
   - Direct interactive equivalent of `https://bisque-posterity-745237.framer.app/#make`.
   - Real-time qualification score calculator based on Entity type (MSME, DPIIT Startup, General), Turnover slider, Experience slider, and Udyam certification.
   - Live benefit badges (100% EMD Exemption, 50% Turnover Relaxation, MII Class-I status).
   - 1-click "Download Qualified Bid Pack" with confetti celebration.
4. **Live Tender Feed & BOQ Inspector:**
   - Real-time bid cards displaying GeM Bid No., Ministry, Estimated Value in INR (Crores / Lakhs), EMD amount, and countdown timer.
   - Full BOQ & Details Modal on click.
   - Bookmarking / Save Bid capability.
5. **Doc's Creator Suite (TenderHelp Signature Tool):**
   - 1-click automated generator for official procurement affidavits:
     - Non-Blacklisting / Debarment Affidavit
     - Make in India (MII) Local Content Declaration
     - Annual Turnover & CA Self-Declaration
     - Land Border Sharing Compliance Undertaking (Rule 144(xi) of GFR)
     - Manufacturer's Authorization Form (MAF)
   - Live formatted letterhead preview with 1-click clipboard copy and ready `.txt` file download.
6. **28 States & Key Ministries Directory:**
   - Interactive directory tabs to filter tenders by state or central authority.
7. **Statutory Transparency Footer:**
   - Disclaimers complying with Indian procurement regulations.

---

## 💻 Running the Project

```bash
# 1. Navigate to the project directory
cd D:\TenderSearch

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

Dev Server URL: **http://127.0.0.1:5173/**
