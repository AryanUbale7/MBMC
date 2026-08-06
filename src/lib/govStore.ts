// MBMC UECP Government e-Governance Persistence Engine (localStorage)
// Final Refinement Phase — All 8 Departments + Timeline + Document Upload

export interface CitizenUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  aadhaarPan: string;
  address: string;
  registeredAt: string;
}

export interface OfficerUser {
  id: string;
  empId: string;
  officerName: string;
  designation: string;
  departmentCode: "CFO_FIRE" | "POLICE" | "TRAFFIC" | "PWD" | "HEALTH" | "ELECTRICITY" | "WARD" | "COMMISSIONER";
  departmentName: string;
}

export type DeptStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "RETURNED";

export interface UploadedDoc {
  key: string;          // e.g. "aadhaar"
  label: string;        // e.g. "Aadhaar Card"
  fileName: string;     // actual file name
  fileSize: string;     // e.g. "245 KB"
  uploadedAt: string;
  dataUrl?: string;     // base64 data URL for preview/download
}

export interface TimelineEntry {
  stage: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED" | "RETURNED";
  date: string;
  time: string;
  officerName?: string;
  department?: string;
  remarks?: string;
}

export interface ApplicationRecord {
  id: string; // e.g. MBMC/UECP/2026/89412
  citizenId: string;
  eventName: string;
  eventCategory: string;
  eventType: string;
  wardId: string;
  wardName: string;
  policeStation: string;
  venueName: string;
  applicantName: string;
  organizationName: string;
  mobile: string;
  email: string;
  aadhaarPan: string;
  address: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  expectedCrowd: string;
  stageDimensions: string;
  cctvCount: number;
  fireExtinguishers: number;
  totalFeeCalculated: number;
  paymentStatus: "PAID" | "PENDING";
  status: "PENDING_SCRUTINY" | "UNDER_VERIFICATION" | "APPROVED" | "REJECTED" | "CORRECTION_REQUIRED";
  submittedAt: string;

  // Full 8-Department Sign-off Matrix
  cfoFireStatus: DeptStatus;
  policeStatus: DeptStatus;
  trafficStatus: DeptStatus;
  pwdStatus: DeptStatus;
  healthStatus: DeptStatus;
  electricityStatus: DeptStatus;
  wardStatus: DeptStatus;
  commissionerSanction: boolean;

  // Uploaded Documents
  uploadedDocs: UploadedDoc[];

  // Government Approval Timeline
  timeline: TimelineEntry[];

  officerRemarks?: string;
  correctionNote?: string;
  approvedAt?: string;
  approvedBy?: string;
  certificateNo?: string;
  commissionerName?: string;
  commissionerDesignation?: string;
}

export interface CitizenNotification {
  id: string;
  citizenId: string;
  applicationId: string;
  title: string;
  message: string;
  type: "SUBMITTED" | "APPROVED" | "CORRECTION" | "REJECTED";
  timestamp: string;
  read: boolean;
}

const STORAGE_KEYS = {
  CITIZEN_SESSION: "mbmc_citizen_session",
  OFFICER_SESSION: "mbmc_officer_session",
  REGISTERED_CITIZENS: "mbmc_registered_citizens",
  APPLICATIONS: "mbmc_applications_db",
  NOTIFICATIONS: "mbmc_notifications_db"
};

const isClient = typeof window !== "undefined";

// ----------------------------------------------------
// CITIZEN AUTHENTICATION STORE
// ----------------------------------------------------
export function getCitizenSession(): CitizenUser | null {
  if (!isClient) return null;
  const data = localStorage.getItem(STORAGE_KEYS.CITIZEN_SESSION);
  return data ? JSON.parse(data) : null;
}

export function setCitizenSession(user: CitizenUser | null) {
  if (!isClient) return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CITIZEN_SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CITIZEN_SESSION);
  }
}

export function registerCitizen(data: Omit<CitizenUser, "id" | "registeredAt">): CitizenUser {
  if (!isClient) throw new Error("Client execution required");
  const existingUsers: CitizenUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_CITIZENS) || "[]");

  const newUser: CitizenUser = {
    ...data,
    id: `CIT-${Math.floor(10000 + Math.random() * 90000)}`,
    registeredAt: new Date().toLocaleDateString("en-IN")
  };

  existingUsers.push(newUser);
  localStorage.setItem(STORAGE_KEYS.REGISTERED_CITIZENS, JSON.stringify(existingUsers));
  setCitizenSession(newUser);
  return newUser;
}

export function loginCitizen(mobileOrEmail: string): CitizenUser | null {
  if (!isClient) return null;
  const existingUsers: CitizenUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTERED_CITIZENS) || "[]");

  let user = existingUsers.find(
    (u) => u.email.toLowerCase() === mobileOrEmail.toLowerCase() || u.mobile === mobileOrEmail
  );

  if (!user && mobileOrEmail.trim()) {
    user = registerCitizen({
      fullName: "Registered Citizen",
      email: mobileOrEmail.includes("@") ? mobileOrEmail : `${mobileOrEmail}@mbmc-portal.org`,
      mobile: mobileOrEmail.replace(/\D/g, "") || "9820199482",
      aadhaarPan: "4589 1204 8812 / ABCDE1234F",
      address: "Mira Bhayandar Municipal Area"
    });
  }

  if (user) setCitizenSession(user);
  return user ?? null;
}

// ----------------------------------------------------
// OFFICER AUTHENTICATION STORE
// ----------------------------------------------------
export function getOfficerSession(): OfficerUser | null {
  if (!isClient) return null;
  const data = localStorage.getItem(STORAGE_KEYS.OFFICER_SESSION);
  return data ? JSON.parse(data) : null;
}

export function setOfficerSession(officer: OfficerUser | null) {
  if (!isClient) return;
  if (officer) {
    localStorage.setItem(STORAGE_KEYS.OFFICER_SESSION, JSON.stringify(officer));
  } else {
    localStorage.removeItem(STORAGE_KEYS.OFFICER_SESSION);
  }
}

export function loginOfficer(deptCode: OfficerUser["departmentCode"], empId: string): OfficerUser {
  const deptNames: Record<string, string> = {
    CFO_FIRE: "Chief Fire Officer (CFO) Services",
    POLICE: "MBVV Police Commissionerate",
    TRAFFIC: "MBVV Traffic Control Branch",
    PWD: "Public Works Department (PWD)",
    HEALTH: "Health & Sanitation Department",
    ELECTRICITY: "Electricity & Infrastructure Department",
    WARD: "MBMC Ward Office Jurisdiction",
    COMMISSIONER: "Municipal Commissionerate, MBMC"
  };

  const designations: Record<string, string> = {
    CFO_FIRE: "Chief Fire Officer",
    POLICE: "Deputy Commissioner of Police",
    TRAFFIC: "Assistant Commissioner of Police (Traffic)",
    PWD: "Executive Engineer (PWD)",
    HEALTH: "Medical Officer of Health",
    ELECTRICITY: "Executive Engineer (Electrical)",
    WARD: "Ward Executive Officer",
    COMMISSIONER: "Municipal Commissioner & Competent Authority"
  };

  const officer: OfficerUser = {
    id: `OFF-${empId || "8810"}`,
    empId: empId || "MBMC-OFF-8810",
    officerName: `Authorized ${designations[deptCode]}`,
    designation: designations[deptCode],
    departmentCode: deptCode,
    departmentName: deptNames[deptCode]
  };

  setOfficerSession(officer);
  return officer;
}

// ----------------------------------------------------
// TIMELINE HELPER
// ----------------------------------------------------
function buildInitialTimeline(): TimelineEntry[] {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN");
  const timeStr = now.toLocaleTimeString("en-IN");
  return [
    { stage: "Application Submitted", status: "COMPLETED", date: dateStr, time: timeStr, remarks: "Application logged into Single-Window Clearance System." },
    { stage: "Pending Scrutiny (Desk Audit)", status: "IN_PROGRESS", date: dateStr, time: timeStr, remarks: "Application under initial desk scrutiny." },
    { stage: "Fire Department Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Police Department Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Traffic Department Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Public Works Department (PWD) Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Health & Sanitation Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Electricity Department Review", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Ward Officer Approval", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Commissioner Sanction", status: "PENDING", date: "", time: "", remarks: "" },
    { stage: "Permission Certificate Issued", status: "PENDING", date: "", time: "", remarks: "" }
  ];
}

// Map department code to timeline stage index
const DEPT_TIMELINE_INDEX: Record<string, number> = {
  CFO_FIRE: 2,
  POLICE: 3,
  TRAFFIC: 4,
  PWD: 5,
  HEALTH: 6,
  ELECTRICITY: 7,
  WARD: 8,
  COMMISSIONER: 9
};

// ----------------------------------------------------
// APPLICATIONS DB STORE
// ----------------------------------------------------
export function getApplications(): ApplicationRecord[] {
  if (!isClient) return [];
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [];
}

export function saveApplication(app: ApplicationRecord) {
  if (!isClient) return;
  const list = getApplications();
  const index = list.findIndex((a) => a.id === app.id);
  if (index >= 0) {
    list[index] = app;
  } else {
    list.unshift(app);
  }
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
}

export function createNewApplication(data: Omit<ApplicationRecord, "uploadedDocs" | "timeline">): ApplicationRecord {
  const app: ApplicationRecord = {
    ...data,
    uploadedDocs: [],
    timeline: buildInitialTimeline()
  };
  saveApplication(app);
  return app;
}

export function updateApplicationStatus(
  appId: string,
  updates: Partial<ApplicationRecord>,
  officerName: string,
  deptCode?: string
): ApplicationRecord | null {
  if (!isClient) return null;
  const list = getApplications();
  const app = list.find((a) => a.id === appId);
  if (!app) return null;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN");
  const timeStr = now.toLocaleTimeString("en-IN");

  const updatedApp: ApplicationRecord = {
    ...app,
    ...updates,
    officerRemarks: updates.officerRemarks || `Action recorded by ${officerName} at ${timeStr}`
  };

  // Update timeline for the relevant department stage
  if (deptCode && DEPT_TIMELINE_INDEX[deptCode] !== undefined) {
    const stageIdx = DEPT_TIMELINE_INDEX[deptCode];
    const timeline = [...(updatedApp.timeline || buildInitialTimeline())];

    const newStatus =
      updates.status === "REJECTED" ? "REJECTED"
      : updates.status === "CORRECTION_REQUIRED" ? "RETURNED"
      : "COMPLETED";

    timeline[stageIdx] = {
      ...timeline[stageIdx],
      status: newStatus,
      date: dateStr,
      time: timeStr,
      officerName,
      remarks: updates.officerRemarks || `Reviewed by ${officerName}`
    };

    // Set next stage to IN_PROGRESS if current is COMPLETED
    if (newStatus === "COMPLETED" && stageIdx + 1 < timeline.length) {
      timeline[stageIdx + 1] = {
        ...timeline[stageIdx + 1],
        status: "IN_PROGRESS",
        date: dateStr,
        time: timeStr
      };
    }

    updatedApp.timeline = timeline;
  }

  // Check if fully approved by all 8 departments + commissioner
  const allDepts =
    updatedApp.cfoFireStatus === "APPROVED" &&
    updatedApp.policeStatus === "APPROVED" &&
    updatedApp.trafficStatus === "APPROVED" &&
    updatedApp.pwdStatus === "APPROVED" &&
    updatedApp.healthStatus === "APPROVED" &&
    updatedApp.electricityStatus === "APPROVED" &&
    updatedApp.wardStatus === "APPROVED";

  if (allDepts && updatedApp.commissionerSanction) {
    updatedApp.status = "APPROVED";
    updatedApp.approvedAt = dateStr + " " + timeStr;
    updatedApp.approvedBy = "Municipal Commissioner & Competent Authority, MBMC";
    updatedApp.certificateNo = `CERT-MBMC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    // Finalize certificate stage in timeline
    const timeline = [...(updatedApp.timeline || buildInitialTimeline())];
    timeline[10] = {
      ...timeline[10],
      status: "COMPLETED",
      date: dateStr,
      time: timeStr,
      remarks: `Certificate No: ${updatedApp.certificateNo} issued.`
    };
    updatedApp.timeline = timeline;

    addNotification({
      citizenId: updatedApp.citizenId,
      applicationId: updatedApp.id,
      title: "🎉 Event Permission Approved & QR Pass Issued!",
      message: `Your application ${updatedApp.id} for ${updatedApp.eventName} has been fully approved. Download your Official QR Permission Pass.`,
      type: "APPROVED"
    });
  } else if (updates.status === "REJECTED") {
    addNotification({
      citizenId: updatedApp.citizenId,
      applicationId: updatedApp.id,
      title: "❌ Application Rejected",
      message: `Your application ${updatedApp.id} has been rejected by ${officerName}. Reason: ${updates.officerRemarks}`,
      type: "REJECTED"
    });
  } else if (updates.status === "CORRECTION_REQUIRED") {
    addNotification({
      citizenId: updatedApp.citizenId,
      applicationId: updatedApp.id,
      title: "⚠️ Action Required: Corrections Requested",
      message: `Correction requested for ${updatedApp.id} by ${officerName}: ${updates.correctionNote}`,
      type: "CORRECTION"
    });
  }

  saveApplication(updatedApp);
  return updatedApp;
}

// ----------------------------------------------------
// NOTIFICATIONS DB STORE
// ----------------------------------------------------
export function getNotifications(citizenId?: string): CitizenNotification[] {
  if (!isClient) return [];
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  const list: CitizenNotification[] = data ? JSON.parse(data) : [];
  if (citizenId) {
    return list.filter((n) => n.citizenId === citizenId);
  }
  return list;
}

export function addNotification(noti: Omit<CitizenNotification, "id" | "timestamp" | "read">) {
  if (!isClient) return;
  const list = getNotifications();
  const newNoti: CitizenNotification = {
    ...noti,
    id: `NOTI-${Math.floor(10000 + Math.random() * 90000)}`,
    timestamp: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN"),
    read: false
  };
  list.unshift(newNoti);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
}
