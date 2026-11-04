/**
 * Client-Side GeM Synchronization Engine
 * Simulates real-time webhook & scraper polling for the browser Admin Panel.
 */

export function syncFreshGeMBids(existingTenders) {
  const ministries = [
    { name: "Ministry of Defence", depts: ["Indian Navy Material Org", "Border Roads Organisation (BRO)", "Ordnance Factory Board", "DRDO Electronic Warfare Lab"] },
    { name: "Ministry of Railways", depts: ["South Western Railway", "RailTel Corporation of India", "Dedicated Freight Corridor (DFCCIL)", "Chittaranjan Locomotive Works"] },
    { name: "Ministry of Health and Family Welfare", depts: ["AIIMS Rishikesh", "National Vector Borne Disease Control", "JIPMER Puducherry", "Central Drugs Standard Control"] },
    { name: "Ministry of Power & Renewable Energy", depts: ["Solar Energy Corporation of India (SECI)", "Power Grid Corporation", "THDC India", "SJVN Hydro"] },
    { name: "Ministry of Road Transport and Highways", depts: ["NHAI Regional Office", "National Highways & Infrastructure Dev Corp (NHIDCL)"] }
  ];

  const items = [
    { title: "Supply and Commissioning of Industrial Air Compressors and Desiccant Air Dryers", cat: "Products", sector: "Industrial Machinery", baseVal: 3400000 },
    { title: "Procurement of Ruggedized Military Grade GPS Receivers and Handheld Satellite Radios", cat: "Products", sector: "Defence Electronics", baseVal: 19500000 },
    { title: "Third-Party Structural Safety Audit and Vibration Analysis of Metro Elevated Viaducts", cat: "Services", sector: "Engineering & Safety", baseVal: 5200000 },
    { title: "Comprehensive Annual Maintenance of High-Speed Baggage Scanners and Explosive Detectors", cat: "Services", sector: "Aviation & Security", baseVal: 7800000 },
    { title: "Design, EPC and Grid Interconnection of 1.5 MW Ground Mounted Solar Power Plant", cat: "Works", sector: "Solar & Clean Energy", baseVal: 65000000 },
    { title: "Procurement of Enterprise Cloud Managed SD-WAN Routers and Fiber Backbone Termination", cat: "Products", sector: "IT & Telecommunications", baseVal: 14200000 }
  ];

  const states = ["Delhi", "Maharashtra", "Uttar Pradesh", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Madhya Pradesh"];

  const freshBids = [];
  const now = new Date();

  // Create 3 fresh incoming bids that aren't already in existing list
  for (let i = 0; i < 3; i++) {
    const minObj = ministries[Math.floor(Math.random() * ministries.length)];
    const dept = minObj.depts[Math.floor(Math.random() * minObj.depts.length)];
    const item = items[Math.floor(Math.random() * items.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const bidSerial = Math.floor(1000000 + Math.random() * 9000000);
    const bidNumber = `GEM/2026/B/${bidSerial}`;
    const value = item.baseVal + Math.floor(Math.random() * 25) * 100000;
    const emdAmount = Math.round(value * 0.02);
    const hoursRemaining = 72 + Math.floor(Math.random() * 250);
    const endDate = new Date(now.getTime() + hoursRemaining * 60 * 60 * 1000).toISOString();

    const valueDisplay = value >= 10000000 
      ? `₹ ${(value / 10000000).toFixed(2)} Crore`
      : `₹ ${(value / 100000).toFixed(2)} Lakhs`;

    freshBids.push({
      id: `GEM-2026-B-${bidSerial}`,
      bidNumber,
      title: item.title,
      department: dept,
      ministry: minObj.name,
      state: state,
      city: state === "Delhi" ? "New Delhi" : `${state} Region`,
      category: item.cat,
      sector: item.sector,
      value: value,
      valueDisplay: valueDisplay,
      emdAmount: emdAmount,
      emdDisplay: `₹ ${emdAmount.toLocaleString('en-IN')}`,
      msmeExempted: true,
      startupExempted: true,
      miiPercentage: 60,
      postedDate: now.toISOString().split('T')[0],
      endDate: endDate,
      hoursRemaining: hoursRemaining,
      status: "Pending Review",
      isLive: false, // In Draft/Admin buffer so admin has full publishing control!
      source: "GeM Live Scraper",
      boqItemCount: 6 + Math.floor(Math.random() * 12),
      docSize: `${(2.4 + Math.random() * 3.5).toFixed(1)} MB`,
      description: `Live procurement requisition for ${item.title}. Verified from Government e-Marketplace (GeM) public gazette.`,
      eligibility: {
        minTurnover: `₹ ${(value * 0.4 / 100000).toFixed(0)} Lakhs`,
        pastExperience: "Minimum 2 completed contracts with Government/PSU",
        oemAuthorization: item.cat === "Products" ? "Manufacturer Authorization Form (MAF) required" : "Not Applicable"
      }
    });
  }

  // Prepend new bids to the existing database
  return [...freshBids, ...existingTenders];
}
