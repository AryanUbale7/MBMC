// MBMC UECP Government e-Governance Persistence Engine (localStorage)

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
  departmentCode: "CFO_FIRE" | "POLICE" | "TRAFFIC" | "WARD" | "COMMISSIONER";
  departmentName: string;
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
  
  // Department Sign-off Matrix
  cfoFireStatus: "PENDING" | "APPROVED" | "REJECTED";
  policeStatus: "PENDING" | "APPROVED" | "REJECTED";
  trafficStatus: "PENDING" | "APPROVED" | "REJECTED";
  wardStatus: "PENDING" | "APPROVED" | "REJECTED";
  commissionerSanction: boolean;
  
  officerRemarks?: string;
  correctionNote?: string;
  approvedAt?: string;
  approvedBy?: string;
  certificateNo?: string;
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

// Check if running in browser
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
    registeredAt: new Date().toLocaleDateString('en-IN')
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

  // If not registered yet, auto-create account for smooth prototype testing
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
    WARD: "MBMC Ward Office Jurisdiction",
    COMMISSIONER: "Municipal Commissionerate, MBMC"
  };

  const designations: Record<string, string> = {
    CFO_FIRE: "Chief Fire Officer",
    POLICE: "Deputy Commissioner of Police",
    TRAFFIC: "Assistant Commissioner of Police (Traffic)",
    WARD: "Ward Executive Officer",
    COMMISSIONER: "Municipal Commissioner & Competent Authority"
  };

  const officer: OfficerUser = {
    id: `OFF-${empId || '8810'}`,
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

export function updateApplicationStatus(
  appId: string,
  updates: Partial<ApplicationRecord>,
  officerName: string
): ApplicationRecord | null {
  if (!isClient) return null;
  const list = getApplications();
  const app = list.find((a) => a.id === appId);
  if (!app) return null;

  const updatedApp: ApplicationRecord = {
    ...app,
    ...updates,
    officerRemarks: updates.officerRemarks || `Action recorded by ${officerName} at ${new Date().toLocaleTimeString('en-IN')}`
  };

  // Check if fully approved by all departments & commissioner
  const allDepts = updatedApp.cfoFireStatus === "APPROVED" &&
                   updatedApp.policeStatus === "APPROVED" &&
                   updatedApp.trafficStatus === "APPROVED" &&
                   updatedApp.wardStatus === "APPROVED";
  
  if (allDepts && updatedApp.commissionerSanction) {
    updatedApp.status = "APPROVED";
    updatedApp.approvedAt = new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN');
    updatedApp.approvedBy = "Municipal Commissioner & Competent Authority, MBMC";
    updatedApp.certificateNo = `CERT-MBMC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create Notification
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
    timestamp: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN'),
    read: false
  };
  list.unshift(newNoti);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
}
