"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  getApplications,
  updateApplicationStatus,
  saveApplication,
  ApplicationRecord,
  UploadedDoc,
  DeptStatus
} from "@/lib/govStore";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Printer,
  Eye,
  LogOut,
  ChevronRight,
  Clock,
  Download,
  X,
  Trash2,
  FileCheck2,
  Info
} from "lucide-react";

// Dept → which status field it controls
const DEPT_STATUS_KEY: Record<string, keyof ApplicationRecord> = {
  CFO_FIRE: "cfoFireStatus",
  POLICE: "policeStatus",
  TRAFFIC: "trafficStatus",
  PWD: "pwdStatus",
  HEALTH: "healthStatus",
  ELECTRICITY: "electricityStatus",
  WARD: "wardStatus"
};

const NOC_MATRIX = [
  { code: "CFO_FIRE", label: "🔥 Fire (CFO)", key: "cfoFireStatus" },
  { code: "POLICE",   label: "👮 Police",     key: "policeStatus" },
  { code: "TRAFFIC",  label: "🚥 Traffic",    key: "trafficStatus" },
  { code: "PWD",      label: "🏗️ PWD",        key: "pwdStatus" },
  { code: "HEALTH",   label: "🏥 Health",     key: "healthStatus" },
  { code: "ELECTRICITY", label: "⚡ Electricity", key: "electricityStatus" },
  { code: "WARD",     label: "🏛️ Ward Office", key: "wardStatus" },
];

function statusBadge(s: DeptStatus | boolean | undefined) {
  if (s === true || s === "APPROVED")
    return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (s === "REJECTED")
    return "bg-red-100 text-red-800 border-red-300";
  if (s === "RETURNED")
    return "bg-amber-100 text-amber-800 border-amber-300";
  if (s === "UNDER_REVIEW")
    return "bg-blue-100 text-blue-800 border-blue-300";
  return "bg-slate-100 text-slate-600 border-slate-300";
}

export default function OfficerDashboardPage() {
  const { t } = useAccessibility();
  const { officer, logoutOfficer } = useAuth();
  const router = useRouter();

  const [appsList, setAppsList] = useState<ApplicationRecord[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [docModal, setDocModal] = useState<UploadedDoc | null>(null);
  const [correctionNote, setCorrectionNote] = useState<string>("");
  const [officerRemarkInput, setOfficerRemarkInput] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<string>("");
  const [actionError, setActionError] = useState<string>("");

  const refresh = () => {
    const apps = getApplications();
    setAppsList(apps);
  };

  useEffect(() => {
    if (!officer) { router.push("/officer/login"); return; }
    refresh();
  }, [officer, router]);

  const activeApp = appsList.find((a) => a.id === selectedAppId) || null;

  // Department-filtered queue (Commissioner sees all)
  const deptFilteredApps = officer?.departmentCode === "COMMISSIONER"
    ? appsList
    : appsList.filter((app) => {
        const key = DEPT_STATUS_KEY[officer?.departmentCode || ""];
        if (!key) return true;
        const val = app[key] as DeptStatus;
        // Show apps that are pending/under-review for this dept OR returned/rejected by this dept
        return val === "PENDING" || val === "UNDER_REVIEW" || val === "RETURNED" || val === "REJECTED";
      });

  const filteredApps = deptFilteredApps.filter((app) => {
    const matchSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "PENDING")    return matchSearch && (app.status === "PENDING_SCRUTINY" || app.status === "UNDER_VERIFICATION");
    if (statusFilter === "APPROVED")   return matchSearch && app.status === "APPROVED";
    if (statusFilter === "REJECTED")   return matchSearch && app.status === "REJECTED";
    if (statusFilter === "CORRECTION") return matchSearch && app.status === "CORRECTION_REQUIRED";
    return matchSearch;
  });

  const flash = (msg: string, isError = false) => {
    if (isError) { setActionError(msg); setTimeout(() => setActionError(""), 4500); }
    else { setActionSuccess(msg); setTimeout(() => setActionSuccess(""), 4500); }
  };

  // Grant department NOC
  const handleGrantNoc = () => {
    if (!activeApp || !officer) return;
    const remark = officerRemarkInput.trim() || `NOC granted by ${officer.officerName} (${officer.departmentName})`;
    let updates: Partial<ApplicationRecord> = { status: "UNDER_VERIFICATION", officerRemarks: remark };

    if (officer.departmentCode === "CFO_FIRE")    updates.cfoFireStatus = "APPROVED";
    if (officer.departmentCode === "POLICE")       updates.policeStatus = "APPROVED";
    if (officer.departmentCode === "TRAFFIC")      updates.trafficStatus = "APPROVED";
    if (officer.departmentCode === "PWD")          updates.pwdStatus = "APPROVED";
    if (officer.departmentCode === "HEALTH")       updates.healthStatus = "APPROVED";
    if (officer.departmentCode === "ELECTRICITY")  updates.electricityStatus = "APPROVED";
    if (officer.departmentCode === "WARD")         updates.wardStatus = "APPROVED";
    if (officer.departmentCode === "COMMISSIONER") {
      updates.commissionerSanction = true;
      updates.commissionerName = officer.officerName;
      updates.commissionerDesignation = officer.designation;
    }

    const updated = updateApplicationStatus(activeApp.id, updates, officer.officerName, officer.departmentCode);
    if (updated) { refresh(); setOfficerRemarkInput(""); flash(`✅ ${officer.departmentName} NOC signed off.`); }
  };

  // Mark Under Review
  const handleMarkUnderReview = () => {
    if (!activeApp || !officer) return;
    const key = DEPT_STATUS_KEY[officer.departmentCode];
    if (!key) return;
    const updates: Partial<ApplicationRecord> = {
      [key]: "UNDER_REVIEW" as DeptStatus,
      officerRemarks: `File marked Under Review by ${officer.officerName}`
    };
    const updated = updateApplicationStatus(activeApp.id, updates, officer.officerName, officer.departmentCode);
    if (updated) { refresh(); flash(`File marked Under Review by ${officer.departmentName}.`); }
  };

  // Return application
  const handleReturn = () => {
    if (!activeApp || !officer || !correctionNote.trim()) {
      flash("Please enter a correction note before returning.", true); return;
    }
    const key = DEPT_STATUS_KEY[officer.departmentCode];
    const updates: Partial<ApplicationRecord> = {
      status: "CORRECTION_REQUIRED",
      correctionNote: correctionNote.trim(),
      officerRemarks: `Correction Notice by ${officer.officerName}: ${correctionNote.trim()}`,
      ...(key ? { [key]: "RETURNED" as DeptStatus } : {})
    };
    const updated = updateApplicationStatus(activeApp.id, updates, officer.officerName, officer.departmentCode);
    if (updated) { refresh(); setCorrectionNote(""); flash("Correction notice sent to citizen."); }
  };

  // Reject application
  const handleReject = () => {
    if (!activeApp || !officer) return;
    const key = DEPT_STATUS_KEY[officer.departmentCode];
    const updates: Partial<ApplicationRecord> = {
      status: "REJECTED",
      officerRemarks: `Rejected by ${officer.officerName} (${officer.departmentName}) — non-compliance.`,
      ...(key ? { [key]: "REJECTED" as DeptStatus } : {})
    };
    const updated = updateApplicationStatus(activeApp.id, updates, officer.officerName, officer.departmentCode);
    if (updated) { refresh(); flash("Application rejected."); }
  };

  if (!officer) return null;

  const isCommissioner = officer.departmentCode === "COMMISSIONER";

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-6 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* OFFICER PORTAL HEADER */}
        <div className="bg-slate-900 text-white rounded-xs border border-slate-700 p-4 sm:p-6 shadow-xs space-y-4 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-3 gap-2">
            <div>
              <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider block">
                MIRA BHAYANDAR MUNICIPAL CORPORATION • OFFICER SCRUTINY PORTAL
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 flex items-center space-x-2">
                <ShieldAlert className="w-6 h-6 text-yellow-400" />
                <span>{officer.departmentName}</span>
              </h1>
              <span className="text-xs text-slate-300 font-mono font-semibold">
                Logged: {officer.officerName} | Emp ID: {officer.empId} | Designation: {officer.designation}
              </span>
            </div>
            <div className="flex items-center space-x-3 self-start sm:self-auto">
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500 px-3 py-1 rounded text-xs font-mono font-bold">
                STQC SESSION ACTIVE
              </span>
              <button
                onClick={() => { logoutOfficer(); router.push("/officer/login"); }}
                className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded-xs text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
              </button>
            </div>
          </div>

          {/* Dept queue info */}
          <div className="text-[11px] text-slate-400 font-mono">
            {isCommissioner
              ? "👁 Commissioner view — all applications visible."
              : `📂 Showing applications in your department queue (${officer.departmentName}).`}
            {" "}<span className="text-yellow-300 font-bold">{filteredApps.length} file(s)</span> in queue.
          </div>
        </div>

        {/* ALERTS */}
        {actionSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xs flex items-center space-x-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" /><span>{actionSuccess}</span>
          </div>
        )}
        {actionError && (
          <div className="bg-red-50 border border-red-300 text-red-900 text-xs font-bold p-3 rounded-xs flex items-center space-x-2 print:hidden">
            <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" /><span>{actionError}</span>
          </div>
        )}

        {/* MAIN WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden">

          {/* LEFT: APPLICATION QUEUE */}
          <div className="lg:col-span-4 bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-4">
            <div className="border-b border-[#D9E4F4] pb-2 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider">APPLICATION FILES QUEUE</span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded">{filteredApps.length} FILES</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter Ref ID, Event, Applicant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-[#D9E4F4] p-2 pl-7 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
              </div>
              <div className="flex items-center space-x-1 font-bold text-[10px] flex-wrap gap-1">
                {["ALL", "PENDING", "APPROVED", "REJECTED", "CORRECTION"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-1 rounded-xs border transition cursor-pointer ${
                      statusFilter === st ? "bg-[#123B7A] text-white border-[#123B7A]" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >{st}</button>
                ))}
              </div>
            </div>

            {filteredApps.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-300 rounded-xs space-y-2">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-xs font-extrabold text-slate-700">No Applications in Queue</h4>
                <p className="text-[11px] text-slate-500">
                  {isCommissioner ? "No applications submitted yet." : `No files pending ${officer.departmentName} review.`}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-3 border rounded-xs cursor-pointer transition space-y-1.5 ${
                      selectedAppId === app.id
                        ? "bg-blue-50/70 border-[#123B7A] shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#123B7A]">{app.id}</span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase border ${statusBadge(app.status as any)}`}>
                        {app.status.replace("_", " ")}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{app.eventName}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{app.applicantName} • {app.wardName}</p>
                    {/* Show this dept's current status */}
                    {!isCommissioner && DEPT_STATUS_KEY[officer.departmentCode] && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        statusBadge(app[DEPT_STATUS_KEY[officer.departmentCode]] as DeptStatus)
                      }`}>
                        {officer.departmentCode}: {String(app[DEPT_STATUS_KEY[officer.departmentCode]] || "PENDING")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: SCRUTINY WORKBENCH */}
          <div className="lg:col-span-8 bg-white rounded-xs border border-[#D9E4F4] p-6 shadow-xs space-y-6">
            {!activeApp ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs">
                Select an application from the left queue to begin officer scrutiny.
              </div>
            ) : (
              <>
                {/* File Header */}
                <div className="border-b-2 border-[#123B7A] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 block">FILE SCRUTINY & AUDIT</span>
                    <h3 className="text-lg font-extrabold text-[#123B7A]">{activeApp.eventName}</h3>
                    <span className="text-xs font-mono text-[#1E4F91] font-bold">Ref ID: {activeApp.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block">FILE STATUS</span>
                    <span className="bg-amber-100 text-amber-900 text-xs font-mono font-extrabold px-2.5 py-1 rounded border border-amber-300">
                      {activeApp.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs text-slate-800">
                  <div><span className="font-bold text-slate-900">Applicant:</span> {activeApp.applicantName}</div>
                  <div><span className="font-bold text-slate-900">Organization:</span> {activeApp.organizationName}</div>
                  <div><span className="font-bold text-slate-900">Mobile:</span> {activeApp.mobile}</div>
                  <div><span className="font-bold text-slate-900">Email:</span> {activeApp.email}</div>
                  <div><span className="font-bold text-slate-900">Ward:</span> {activeApp.wardName}</div>
                  <div><span className="font-bold text-slate-900">Venue:</span> {activeApp.venueName}</div>
                  <div><span className="font-bold text-slate-900">Dates:</span> {activeApp.startDate} to {activeApp.endDate}</div>
                  <div><span className="font-bold text-slate-900">Expected Crowd:</span> {activeApp.expectedCrowd}</div>
                  <div><span className="font-bold text-slate-900">Stage:</span> {activeApp.stageDimensions}</div>
                  <div><span className="font-bold text-slate-900">Safety:</span> {activeApp.cctvCount} CCTV | {activeApp.fireExtinguishers} Extinguishers</div>
                </div>

                {/* DOCUMENT INSPECTION DRAWER — real uploaded docs */}
                <div className="space-y-3">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                    UPLOADED DOCUMENTS — INSPECTION DRAWER
                  </span>

                  {(!activeApp.uploadedDocs || activeApp.uploadedDocs.length === 0) ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xs text-xs text-slate-500 font-mono text-center">
                      No documents uploaded by citizen yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {activeApp.uploadedDocs.map((doc, idx) => (
                        <div key={idx} className="p-3 border border-slate-200 bg-white rounded-xs space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-slate-900 block text-[11px]">{doc.label}</span>
                            <span className="text-[10px] text-slate-500 font-mono truncate block">{doc.fileName}</span>
                            <span className="text-[10px] text-slate-400">{doc.fileSize} · {doc.uploadedAt}</span>
                          </div>
                          <div className="flex items-center space-x-3 pt-1">
                            <button
                              onClick={() => setDocModal(doc)}
                              className="text-[11px] font-bold text-[#123B7A] hover:underline flex items-center space-x-1"
                            >
                              <Eye className="w-3.5 h-3.5" /><span>View</span>
                            </button>
                            {doc.dataUrl && (
                              <a
                                href={doc.dataUrl}
                                download={doc.fileName}
                                className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center space-x-1"
                              >
                                <Download className="w-3.5 h-3.5" /><span>Download</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8-DEPT NOC MATRIX */}
                <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                    8-DEPARTMENT CONCURRENT NOC STATUS MATRIX
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    {NOC_MATRIX.map((d) => {
                      const val = activeApp[d.key as keyof ApplicationRecord] as DeptStatus;
                      return (
                        <div key={d.code} className={`p-2 border rounded-xs flex flex-col gap-0.5 ${statusBadge(val)}`}>
                          <span className="font-bold text-[10px]">{d.label}</span>
                          <span className="font-extrabold uppercase text-[10px]">{val || "PENDING"}</span>
                        </div>
                      );
                    })}
                    <div className={`p-2 border rounded-xs flex flex-col gap-0.5 ${
                      activeApp.commissionerSanction ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-100 text-slate-600 border-slate-300"
                    }`}>
                      <span className="font-bold text-[10px]">⭐ Commissioner</span>
                      <span className="font-extrabold uppercase text-[10px]">
                        {activeApp.commissionerSanction ? "SANCTIONED" : "PENDING"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* OFFICER REMARK INPUT */}
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">Officer Remarks</span>
                  <textarea
                    value={officerRemarkInput}
                    onChange={(e) => setOfficerRemarkInput(e.target.value)}
                    placeholder={`Enter official remarks for ${officer.departmentName} sign-off (optional)...`}
                    rows={2}
                    className="w-full border border-[#D9E4F4] p-2 rounded-xs bg-white text-slate-900 text-xs font-medium focus:outline-none focus:border-[#123B7A] resize-none"
                  />
                </div>

                {/* ACTION CONTROLS */}
                <div className="space-y-3 pt-2 border-t border-[#D9E4F4]">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Grant NOC */}
                    <button
                      onClick={handleGrantNoc}
                      className="bg-[#123B7A] hover:bg-[#1E4F91] text-white text-xs font-extrabold px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCommissioner ? "Grant Commissioner Sanction" : `Grant ${officer.departmentCode} NOC`}</span>
                    </button>

                    {/* Mark Under Review */}
                    {!isCommissioner && (
                      <button
                        onClick={handleMarkUnderReview}
                        className="border border-blue-600 text-blue-700 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-xs transition cursor-pointer"
                      >
                        Mark Under Review
                      </button>
                    )}

                    {/* Reject */}
                    <button
                      onClick={handleReject}
                      className="border border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-2.5 rounded-xs transition cursor-pointer"
                    >
                      Reject File
                    </button>
                  </div>

                  {/* Return/Correction */}
                  <div className="flex items-center space-x-2 text-xs">
                    <input
                      type="text"
                      placeholder="Correction note for citizen (required to return)..."
                      value={correctionNote}
                      onChange={(e) => setCorrectionNote(e.target.value)}
                      className="flex-1 border border-[#D9E4F4] p-2 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                    />
                    <button
                      onClick={handleReturn}
                      className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-xs transition cursor-pointer whitespace-nowrap"
                    >
                      Return for Correction
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PRINTABLE OFFICIAL A4 PERMISSION PASS */}
        {activeApp && activeApp.status === "APPROVED" && (
          <div className="printable-pass bg-white rounded-xs border-2 border-[#123B7A] p-6 sm:p-8 shadow-xs space-y-6">

            {/* Government Header */}
            <div className="text-center space-y-2 border-b-2 border-[#123B7A] pb-6">
              <div className="flex items-center justify-center space-x-4">
                <img src="/images/sher.png" alt="Emblem of India" className="w-6 h-9 object-contain" />
                <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-14 h-14 object-contain" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#123B7A] uppercase tracking-wider">
                MIRA BHAYANDAR MUNICIPAL CORPORATION
              </h2>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                OFFICIAL SANCTIONED DIGITAL EVENT PERMISSION CERTIFICATE 2026
              </h3>
              <span className="text-xs text-slate-600 font-mono block">Certificate No: {activeApp.certificateNo}</span>
            </div>

            {/* Certificate Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs text-slate-800">
              <div><span className="font-bold text-slate-900">Application Ref ID:</span> <span className="text-[#123B7A] font-extrabold">{activeApp.id}</span></div>
              <div><span className="font-bold text-slate-900">Certificate No:</span> {activeApp.certificateNo}</div>
              <div><span className="font-bold text-slate-900">Issue Date:</span> {activeApp.approvedAt}</div>
              <div><span className="font-bold text-slate-900">Approved By:</span> {activeApp.approvedBy}</div>
              <div><span className="font-bold text-slate-900">Applicant Name:</span> {activeApp.applicantName}</div>
              <div><span className="font-bold text-slate-900">Organization:</span> {activeApp.organizationName}</div>
              <div><span className="font-bold text-slate-900">Event Title:</span> {activeApp.eventName}</div>
              <div><span className="font-bold text-slate-900">Venue:</span> {activeApp.venueName}</div>
              <div><span className="font-bold text-slate-900">Validity:</span> {activeApp.startDate} to {activeApp.endDate}</div>
              <div><span className="font-bold text-slate-900">Ward:</span> {activeApp.wardName}</div>
            </div>

            {/* QR + Digital Signature Block */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D9E4F4] pt-6 gap-6">

              {/* QR Code */}
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-white border-2 border-slate-900 rounded">
                  <QRCodeSVG value={`${typeof window !== "undefined" ? window.location.origin : ""}/verify/${activeApp.id}`} size={100} />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#123B7A] uppercase tracking-wider">SCAN TO VERIFY</span>
                <span className="text-[9px] font-mono text-slate-500">/verify/{activeApp.id}</span>
              </div>

              {/* Government Digital Signature Block */}
              <div className="border border-[#D9E4F4] rounded-xs p-4 text-xs font-mono space-y-2 bg-slate-50 min-w-[240px]">
                <span className="text-[10px] font-extrabold text-[#123B7A] uppercase tracking-wider block border-b border-[#D9E4F4] pb-1">
                  GOVERNMENT DIGITAL SIGNATURE
                </span>
                <div className="py-2 text-center">
                  <div className="w-40 h-10 border-b-2 border-slate-800 mx-auto flex items-end justify-center pb-1">
                    <span className="font-bold text-slate-700 italic text-sm">
                      {activeApp.commissionerName || "Municipal Commissioner"}
                    </span>
                  </div>
                </div>
                <div className="text-slate-800 space-y-0.5">
                  <div><span className="font-bold">Officer:</span> {activeApp.commissionerName || "Municipal Commissioner"}</div>
                  <div><span className="font-bold">Designation:</span> {activeApp.commissionerDesignation || "Municipal Commissioner & Competent Authority"}</div>
                  <div><span className="font-bold">Department:</span> Municipal Commissionerate, MBMC</div>
                  <div><span className="font-bold">Approval Date:</span> {activeApp.approvedAt}</div>
                  <div><span className="font-bold">Digital Auth:</span> <span className="text-emerald-700 font-extrabold">✓ VERIFIED</span></div>
                </div>
                <div className="bg-slate-900 text-white p-2 rounded-xs text-[9px] space-y-0.5">
                  <span className="text-yellow-400 font-bold block">STQC DIGITAL SEAL</span>
                  <span className="text-slate-300">SHA-256: {activeApp.certificateNo?.replace("CERT-MBMC-2026-", "0x") || "0xVERIFIED"}</span>
                  <span className="text-slate-400">NIC Class-2 Signature · NeGP Framework</span>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="pt-2 border-t border-[#D9E4F4] flex justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-[#123B7A] text-white hover:bg-[#1E4F91] font-extrabold text-xs px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" /><span>Print Official A4 Permission Pass</span>
              </button>
            </div>
          </div>
        )}

        {/* DOCUMENT VIEW MODAL */}
        {docModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-xs border border-[#D9E4F4] max-w-lg w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D9E4F4] pb-2">
                <h4 className="text-sm font-extrabold text-[#123B7A]">📄 {docModal.label}</h4>
                <button onClick={() => setDocModal(null)} className="text-slate-500 hover:text-slate-900 font-bold">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-700">
                <div><span className="font-bold">File Name:</span> {docModal.fileName}</div>
                <div><span className="font-bold">File Size:</span> {docModal.fileSize}</div>
                <div><span className="font-bold">Uploaded At:</span> {docModal.uploadedAt}</div>
              </div>

              {/* If it's an image, show preview */}
              {docModal.dataUrl && docModal.dataUrl.startsWith("data:image") ? (
                <img src={docModal.dataUrl} alt={docModal.label} className="w-full max-h-64 object-contain border border-slate-200 rounded" />
              ) : docModal.dataUrl && docModal.dataUrl.startsWith("data:application/pdf") ? (
                <div className="h-48 flex items-center justify-center bg-slate-100 border border-slate-300 rounded-xs text-slate-500 text-xs font-mono text-center p-4">
                  <div>
                    <FileText className="w-10 h-10 text-red-500 mx-auto mb-2" />
                    <p className="font-bold">PDF Document</p>
                    <p className="text-[11px] mt-1">{docModal.fileName}</p>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center bg-slate-100 border border-slate-300 rounded-xs text-xs font-mono text-slate-600 text-center">
                  <div>
                    <FileCheck2 className="w-8 h-8 text-[#123B7A] mx-auto mb-2" />
                    <span className="font-bold text-slate-900 block">Document Uploaded</span>
                    <span className="text-slate-500">{docModal.fileName}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-[#D9E4F4] pt-3">
                {docModal.dataUrl && (
                  <a
                    href={docModal.dataUrl}
                    download={docModal.fileName}
                    className="text-xs font-bold text-[#123B7A] flex items-center space-x-1 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" /><span>Download</span>
                  </a>
                )}
                <button
                  onClick={() => setDocModal(null)}
                  className="bg-[#123B7A] text-white font-bold text-xs px-4 py-2 rounded-xs ml-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
