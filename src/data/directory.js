export const indianStates = [
  { name: "Maharashtra", code: "MH", count: 4210, trending: true },
  { name: "Uttar Pradesh", code: "UP", count: 3890, trending: true },
  { name: "Delhi (NCT)", code: "DL", count: 3450, trending: true },
  { name: "Karnataka", code: "KA", count: 2980, trending: false },
  { name: "Gujarat", code: "GJ", count: 2840, trending: true },
  { name: "Tamil Nadu", code: "TN", count: 2610, trending: false },
  { name: "Rajasthan", code: "RJ", count: 2150, trending: false },
  { name: "Madhya Pradesh", code: "MP", count: 1980, trending: false },
  { name: "West Bengal", code: "WB", count: 1870, trending: false },
  { name: "Telangana", code: "TS", codeAlt: "TG", count: 1690, trending: false },
  { name: "Punjab", code: "PB", count: 1420, trending: false },
  { name: "Haryana", code: "HR", count: 1390, trending: false },
  { name: "Kerala", code: "KL", count: 1260, trending: false },
  { name: "Odisha", code: "OD", count: 1140, trending: false },
  { name: "Andhra Pradesh", code: "AP", count: 1090, trending: false },
  { name: "Bihar", code: "BR", count: 980, trending: false },
  { name: "Assam", code: "AS", count: 870, trending: false },
  { name: "Jharkhand", code: "JH", count: 760, trending: false },
  { name: "Chhattisgarh", code: "CG", count: 720, trending: false },
  { name: "Uttarakhand", code: "UK", count: 680, trending: false },
  { name: "Himachal Pradesh", code: "HP", count: 540, trending: false },
  { name: "Jammu and Kashmir", code: "JK", count: 490, trending: false },
  { name: "Goa", code: "GA", count: 320, trending: false },
  { name: "Tripura", code: "TR", count: 210, trending: false },
  { name: "Manipur", code: "MN", count: 190, trending: false },
  { name: "Meghalaya", code: "ML", count: 180, trending: false },
  { name: "Nagaland", code: "NL", count: 150, trending: false },
  { name: "Arunachal Pradesh", code: "AR", count: 140, trending: false }
];

export const keyMinistries = [
  { name: "Ministry of Defence", acronym: "MoD", count: 4890, icon: "Shield" },
  { name: "Ministry of Railways", acronym: "MoR", count: 4120, icon: "Train" },
  { name: "Ministry of Road Transport and Highways", acronym: "MoRTH", count: 3290, icon: "Truck" },
  { name: "Ministry of Health and Family Welfare", acronym: "MoHFW", count: 2840, icon: "HeartPulse" },
  { name: "Ministry of Education", acronym: "MoE", count: 2450, icon: "GraduationCap" },
  { name: "Ministry of Power & Renewable Energy", acronym: "MNRE", count: 2180, icon: "Zap" },
  { name: "Ministry of Petroleum and Natural Gas", acronym: "MoPNG", count: 1920, icon: "Flame" },
  { name: "Ministry of Housing and Urban Affairs", acronym: "MoHUA", count: 1760, icon: "Building2" },
  { name: "Ministry of Finance", acronym: "MoF", count: 1420, icon: "Coins" },
  { name: "Ministry of Agriculture", acronym: "MoA&FW", count: 1250, icon: "Tractor" }
];

export const standardDocumentTemplates = [
  {
    id: "non-blacklisting",
    title: "Non-Blacklisting / Debarment Affidavit",
    description: "Mandatory stamp-paper declaration certifying your firm is not debarred or blacklisted by any Central/State Govt or PSU.",
    tags: ["Mandatory", "GeM Clause 4.2", "Legal"]
  },
  {
    id: "make-in-india",
    title: "Make In India (MII) Local Content Declaration",
    description: "Self-certification indicating percentage of local value addition in accordance with DPIIT Order P-45021/2/2017-PP (BE-II).",
    tags: ["Preference", "Class-I / Class-II", "DPIIT"]
  },
  {
    id: "turnover-certificate",
    title: "Annual Turnover & Net Worth Self-Declaration",
    description: "Formatted chartered-accountant aligned declaration confirming audited annual turnover across the last 3 financial years.",
    tags: ["Financial", "Turnover", "CA Format"]
  },
  {
    id: "land-border",
    title: "Land Border Sharing Compliance Certificate",
    description: "Mandatory compliance undertaking under Rule 144(xi) of General Financial Rules (GFR), 2017 regarding neighboring countries.",
    tags: ["GFR 144(xi)", "Mandatory", "National Security"]
  },
  {
    id: "oem-maf",
    title: "Manufacturer Authorization Form (MAF)",
    description: "Official authorization letter from OEM authorizing your company to bid and support their products for this specific tender.",
    tags: ["OEM", "Hardware & Equipment", "Warranty"]
  }
];
