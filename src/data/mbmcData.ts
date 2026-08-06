export interface MBMCWard {
  id: string;
  name: string;
  nameMr: string;
  headquarters: string;
  contactPerson: string;
  contactEmail: string;
  areasCovered: string[];
}

export interface PublicVenue {
  id: string;
  name: string;
  nameMr: string;
  wardId: string;
  wardName: string;
  locationAddress: string;
  totalCapacity: number;
  areaSqFt: number;
  dailyRateINR: number;
  facilities: string[];
  image: string;
  status: "Available" | "Reserved" | "Maintenance";
}

export interface DepartmentNOC {
  id: string;
  code: string;
  name: string;
  nameMr: string;
  authority: string;
  description: string;
  mandatedFor: string[]; // event types requiring this NOC
  avgProcessingTimeHours: number;
  requiredDocs: string[];
}

export interface EventApplication {
  id: string;
  referenceNo: string; // e.g. MBMC/UECP/2026/89412
  eventName: string;
  eventType: string;
  wardId: string;
  venueName: string;
  applicantName: string;
  applicantType: "Trust" | "NGO" | "Corporate" | "Individual" | "Event Agency";
  organizationName: string;
  mobile: string;
  email: string;
  aadhaarPan: string;
  startDate: string;
  endDate: string;
  expectedAttendance: number;
  stageAreaSqFt: number;
  soundPermitNeeded: boolean;
  totalFeeCalculated: number;
  paymentStatus: "PAID" | "PENDING";
  overallStatus: "APPROVED" | "IN_REVIEW" | "ACTION_REQUIRED" | "REJECTED";
  submittedAt: string;
  departmentStatus: {
    departmentCode: string;
    departmentName: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
    remarks: string;
    updatedAt: string;
  }[];
}

export const MBMC_WARDS: MBMCWard[] = [
  {
    id: "W01",
    name: "Ward 1 - Bhayandar West & Coastal",
    nameMr: "प्रभाग १ - भाईंदर पश्चिम आणि किनारी भाग",
    headquarters: "MBMC Ward Office 1, Station Road, Bhayandar (W)",
    contactPerson: "Rajesh V. Patil (Ward Officer)",
    contactEmail: "ward1.officer@mbmc.gov.in",
    areasCovered: ["Maxus Mall Area", "Murda Village", "Rai Village", "Uttan Coastal"]
  },
  {
    id: "W02",
    name: "Ward 2 - Bhayandar East & Industrial Zone",
    nameMr: "प्रभाग २ - भाईंदर पूर्व आणि औद्योगिक क्षेत्र",
    headquarters: "MBMC Ward Office 2, Golden Nest Circle, Bhayandar (E)",
    contactPerson: "Sunita S. Deshmukh (Ward Officer)",
    contactEmail: "ward2.officer@mbmc.gov.in",
    areasCovered: ["Bhayandar East Rly Station", "Navghar", "Goddev", "Ind. Estate"]
  },
  {
    id: "W03",
    name: "Ward 3 - Mira Road West & Pleasant Park",
    nameMr: "प्रभाग ३ - मीरा रोड पश्चिम आणि प्लझंट पार्क",
    headquarters: "MBMC Ward Office 3, Hatkesh Layout, Mira Road (W)",
    contactPerson: "Anil K. Sawant (Ward Officer)",
    contactEmail: "ward3.officer@mbmc.gov.in",
    areasCovered: ["Pleasant Park", "Beverly Park", "Sheetal Nagar", "Penkarpada"]
  },
  {
    id: "W04",
    name: "Ward 4 - Mira Road East (Kanakia & Shanti Nagar)",
    nameMr: "प्रभाग ४ - मीरा रोड पूर्व (कनकिया आणि शांती नगर)",
    headquarters: "MBMC Complex, Jangid Enclave, Mira Road (E)",
    contactPerson: "Meena R. Joshi (Ward Officer)",
    contactEmail: "ward4.officer@mbmc.gov.in",
    areasCovered: ["Shanti Nagar", "Kanakia Park", "Naya Nagar", "Srishti Complex"]
  },
  {
    id: "W05",
    name: "Ward 5 - Kashimira & WE Highway Belt",
    nameMr: "प्रभाग ५ - काशिमीरा आणि पश्चिम द्रुतगती महामार्ग क्षेत्र",
    headquarters: "MBMC Nodal Center, Kashimira Naka",
    contactPerson: "Prakash T. Shinde (Ward Officer)",
    contactEmail: "ward5.officer@mbmc.gov.in",
    areasCovered: ["Kashimira Naka", "Mahajan Wadi", "Chenna Village", "Ghodbunder Gate"]
  }
];

export const MBMC_VENUES: PublicVenue[] = [
  {
    id: "V01",
    name: "Netaji Subhash Chandra Bose Ground",
    nameMr: "नेताजी सुभाषचंद्र बोस क्रीडा मैदान",
    wardId: "W01",
    wardName: "Ward 1 - Bhayandar West",
    locationAddress: "Near Maxus Mall, Station Road, Bhayandar West",
    totalCapacity: 15000,
    areaSqFt: 65000,
    dailyRateINR: 12500,
    facilities: ["High-mast Lighting", "Multiple Gate Access", "VIP Parking Zone", "Water Connection"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    status: "Available"
  },
  {
    id: "V02",
    name: "Shanti Nagar Cultural & Community Field",
    nameMr: "शांती नगर सांस्कृतिक मैदान",
    wardId: "W04",
    wardName: "Ward 4 - Mira Road East",
    locationAddress: "Sector 3, Shanti Nagar, Mira Road East",
    totalCapacity: 8000,
    areaSqFt: 35000,
    dailyRateINR: 8000,
    facilities: ["Enclosed Boundary Wall", "Stage Pedestal", "Public Toilet Block", "CCTV Infrastructure"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    status: "Available"
  },
  {
    id: "V03",
    name: "Kanakia Park Sports Ground",
    nameMr: "कनकिया पार्क क्रीडा संकुल",
    wardId: "W04",
    wardName: "Ward 4 - Mira Road East",
    locationAddress: "Opp. RBK International School, Kanakia Park",
    totalCapacity: 5000,
    areaSqFt: 24000,
    dailyRateINR: 6000,
    facilities: ["Synthetic Track Surround", "Emergency Exit Bays", "Green Room Block"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    status: "Reserved"
  },
  {
    id: "V04",
    name: "Golden Nest Circle Public Event Plaza",
    nameMr: "गोल्डन नेस्ट सर्कल सार्वजनिक चौक मैदान",
    wardId: "W02",
    wardName: "Ward 2 - Bhayandar East",
    locationAddress: "Near Golden Nest Junction, Bhayandar East",
    totalCapacity: 12000,
    areaSqFt: 48000,
    dailyRateINR: 10000,
    facilities: ["Central Location", "3-Phase Electrical Points", "Dedicated Ambulance Dock"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    status: "Available"
  }
];

export const DEPARTMENTS: DepartmentNOC[] = [
  {
    id: "DEP01",
    code: "MBMC_PWD",
    name: "MBMC Public Works Department",
    nameMr: "एमबीएमसी सार्वजनिक बांधकाम विभाग",
    authority: "Executive Engineer, PWD",
    description: "Evaluates ground allocation, temporary structure safety, and municipal land usage permission.",
    mandatedFor: ["All"],
    avgProcessingTimeHours: 24,
    requiredDocs: ["Site Layout Map", "No-Objection Certificate from Land Owner/Society", "Aadhaar Card"]
  },
  {
    id: "DEP02",
    code: "MBMC_FIRE",
    name: "MBMC Fire & Rescue Services Brigade",
    nameMr: "एमबीएमसी अग्निशमन दल विभाग",
    authority: "Chief Fire Officer (CFO)",
    description: "Mandatory fire safety audit, emergency egress verification, flame-retardant fabric compliance.",
    mandatedFor: ["Commercial Exhibition", "Religious / Cultural Festival", "Political Rally", "Temporary Stage Enclosure"],
    avgProcessingTimeHours: 36,
    requiredDocs: ["Fire Extinguisher Layout Plan", "Electrical Wiring Safety Certificate", "Stage Structural Stability Cert"]
  },
  {
    id: "DEP03",
    code: "MBVV_POLICE",
    name: "Mira-Bhayandar Vasai-Virar (MBVV) Police",
    nameMr: "मीरा-भाईंदर वसई-विरार पोलीस आयुक्तालय",
    authority: "Deputy Commissioner of Police (DCP Zone 1)",
    description: "Law & order maintenance, crowd management plan, speaker volume restrictions & anti-nuisance checks.",
    mandatedFor: ["All"],
    avgProcessingTimeHours: 48,
    requiredDocs: ["Applicant Criminal Record Self-Declaration", "CCTV Deployment Plan", "Volunteer Identity List"]
  },
  {
    id: "DEP04",
    code: "MBMC_HEALTH",
    name: "MBMC Public Health & Solid Waste Mgmt",
    nameMr: "एमबीएमसी आरोग्य व घनकचरा व्यवस्थापन विभाग",
    authority: "Medical Officer of Health (MOH)",
    description: "Ensures bio-toilet installation, food safety standards compliance, and prompt post-event zero-litter cleanup.",
    mandatedFor: ["Food Stall / Catering", "Exhibition", "Large Festival (>1000 visitors)"],
    avgProcessingTimeHours: 24,
    requiredDocs: ["Waste Disposal Plan", "Food Safety (FSSAI) Copy if selling food"]
  },
  {
    id: "DEP05",
    code: "MBVV_TRAFFIC",
    name: "MBVV Traffic Control Branch",
    nameMr: "एमबीविव्हि ट्रॅफिक पोलीस विभाग",
    authority: "Assistant Commissioner of Police (Traffic)",
    description: "Traffic diversion plan, dedicated parking bay allocation, and pedestrian safety corridor review.",
    mandatedFor: ["Marathon / Processions", "Large Rallies (>3000 attendees)"],
    avgProcessingTimeHours: 36,
    requiredDocs: ["Traffic Diversion Map", "Parking Lot Permission Copy"]
  },
  {
    id: "DEP06",
    code: "MSEDCL_POWER",
    name: "MSEDCL Temporary Power Division",
    nameMr: "महावितरण तात्पुरती वीज जोडणी",
    authority: "Superintending Engineer, MSEDCL Bhayandar",
    description: "Temporary 3-phase power load sanctioning and electrical transformer safety inspection.",
    mandatedFor: ["Loudspeaker / Heavy Lighting", "Exhibition", "Stage Event"],
    avgProcessingTimeHours: 24,
    requiredDocs: ["Licensed Electrical Contractor Certificate", "Power Demand Calculator"]
  }
];

export const DEMO_APPLICATIONS: EventApplication[] = [
  {
    id: "APP-98412",
    referenceNo: "MBMC/UECP/2026/98412",
    eventName: "Mira Bhayandar Annual Cultural & Handloom Festival 2026",
    eventType: "Commercial Exhibition & Trade Fair",
    wardId: "W01",
    venueName: "Netaji Subhash Chandra Bose Ground",
    applicantName: "Sanjay R. Mehta",
    applicantType: "Trust",
    organizationName: "Konkan Heritage Cultural Trust",
    mobile: "+91 98201 44890",
    email: "sanjay@konkanheritage.org",
    aadhaarPan: "AAAAA1234F / 4589 1204 8812",
    startDate: "2026-09-15",
    endDate: "2026-09-20",
    expectedAttendance: 12000,
    stageAreaSqFt: 4500,
    soundPermitNeeded: true,
    totalFeeCalculated: 34500,
    paymentStatus: "PAID",
    overallStatus: "APPROVED",
    submittedAt: "2026-08-01 10:30 AM",
    departmentStatus: [
      {
        departmentCode: "MBMC_PWD",
        departmentName: "MBMC Public Works Dept",
        status: "APPROVED",
        remarks: "Ground structural stability and boundary setback verified.",
        updatedAt: "2026-08-02 02:15 PM"
      },
      {
        departmentCode: "MBMC_FIRE",
        departmentName: "MBMC Fire Services",
        status: "APPROVED",
        remarks: "12 Fire Extinguishers verified on-site. Clear 6m egress path.",
        updatedAt: "2026-08-03 11:00 AM"
      },
      {
        departmentCode: "MBVV_POLICE",
        departmentName: "MBVV Police Dept",
        status: "APPROVED",
        remarks: "Police personnel deployed for crowd control. Sound limit 55dB after 10 PM.",
        updatedAt: "2026-08-04 04:30 PM"
      },
      {
        departmentCode: "MBMC_HEALTH",
        departmentName: "MBMC Sanitation Dept",
        status: "APPROVED",
        remarks: "6 Mobile Bio-toilets and wet waste bins placed.",
        updatedAt: "2026-08-03 03:00 PM"
      }
    ]
  },
  {
    id: "APP-98440",
    referenceNo: "MBMC/UECP/2026/98440",
    eventName: "Ganesh Utsav Sarvajanik Mandap Clearance 2026",
    eventType: "Religious / Cultural Festival",
    wardId: "W04",
    venueName: "Shanti Nagar Cultural & Community Field",
    applicantName: "Pravin K. Raut",
    applicantType: "Trust",
    organizationName: "Shanti Nagar Sarvajanik Ganeshotsav Mandal",
    mobile: "+91 99302 77112",
    email: "pravin.raut@gmail.com",
    aadhaarPan: "BBBBB5678G / 8890 3341 5567",
    startDate: "2026-09-02",
    endDate: "2026-09-12",
    expectedAttendance: 25000,
    stageAreaSqFt: 6000,
    soundPermitNeeded: true,
    totalFeeCalculated: 18000,
    paymentStatus: "PAID",
    overallStatus: "IN_REVIEW",
    submittedAt: "2026-08-05 09:15 AM",
    departmentStatus: [
      {
        departmentCode: "MBMC_PWD",
        departmentName: "MBMC Public Works Dept",
        status: "APPROVED",
        remarks: "Mandap layout and height clearance within 25ft threshold.",
        updatedAt: "2026-08-05 04:00 PM"
      },
      {
        departmentCode: "MBMC_FIRE",
        departmentName: "MBMC Fire Services",
        status: "APPROVED",
        remarks: "Fire retardant pandal canvas certified.",
        updatedAt: "2026-08-06 10:20 AM"
      },
      {
        departmentCode: "MBVV_POLICE",
        departmentName: "MBVV Police Dept",
        status: "PENDING",
        remarks: "Awaiting final CCTV integration report & volunteer list.",
        updatedAt: "2026-08-06 11:45 AM"
      },
      {
        departmentCode: "MBMC_HEALTH",
        departmentName: "MBMC Sanitation Dept",
        status: "APPROVED",
        remarks: "Sanitation deposit received.",
        updatedAt: "2026-08-05 05:30 PM"
      }
    ]
  }
];
