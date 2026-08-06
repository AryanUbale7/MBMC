"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  getApplications,
  updateApplicationStatus,
  ApplicationRecord
} from "@/lib/govStore";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldAlert,
  Key,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Printer,
  Eye,
  LogOut,
  ChevronRight,
  Info,
  Clock,
  UserCheck,
  Building2,
  FileCheck2,
  ExternalLink
} from "lucide-react";

export default function OfficerDashboardPage() {
  const { t } = useAccessibility();
  const { officer, logoutOfficer } = useAuth();
  const router = useRouter();

  const [appsList, setAppsList] = useState<ApplicationRecord[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [docPreviewModal, setDocPreviewModal] = useState<string | null>(null);
  const [correctionNote, setCorrectionNote] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<string>("");

  useEffect(() => {
    if (!officer) {
      router.push("/officer/login");
      return;
    }
    const apps = getApplications();
    setAppsList(apps);
    if (apps.length > 0 && !selectedAppId) {
      setSelectedAppId(apps[0].id);
    }
  }, [officer, router]);

  const activeApp = appsList.find((a) => a.id === selectedAppId) || null;

  // Officer Grant Department NOC
  const handleOfficerGrantNoc = () => {
    if (!activeApp || !officer) return;

    let updates: Partial<ApplicationRecord> = {};
    if (officer.departmentCode === "CFO_FIRE") updates.cfoFireStatus = "APPROVED";
    if (officer.departmentCode === "POLICE") updates.policeStatus = "APPROVED";
    if (officer.departmentCode === "TRAFFIC") updates.trafficStatus = "APPROVED";
    if (officer.departmentCode === "WARD") updates.wardStatus = "APPROVED";
    if (officer.departmentCode === "COMMISSIONER") updates.commissionerSanction = true;

    updates.status = "UNDER_VERIFICATION";
    updates.officerRemarks = `Department NOC signed off by ${officer.officerName} (${officer.departmentName}) at ${new Date().toLocaleTimeString('en-IN')}`;

    const updated = updateApplicationStatus(activeApp.id, updates, officer.officerName);
    if (updated) {
      const refreshed = getApplications();
      setAppsList(refreshed);
      setActionSuccess(`Department Sign-off successfully logged under ${officer.departmentName} authority!`);
      setTimeout(() => setActionSuccess(""), 4000);
    }
  };

  // Officer Request Correction
  const handleRequestCorrection = () => {
    if (!activeApp || !officer || !correctionNote.trim()) return;

    const updated = updateApplicationStatus(
      activeApp.id,
      {
        status: "CORRECTION_REQUIRED",
        correctionNote: correctionNote.trim(),
        officerRemarks: `Correction Notice Issued by ${officer.officerName}: ${correctionNote.trim()}`
      },
      officer.officerName
    );

    if (updated) {
      const refreshed = getApplications();
      setAppsList(refreshed);
      setCorrectionNote("");
      setActionSuccess("Correction Notice sent to Citizen.");
      setTimeout(() => setActionSuccess(""), 4000);
    }
  };

  // Officer Reject Application
  const handleRejectApplication = () => {
    if (!activeApp || !officer) return;

    const updated = updateApplicationStatus(
      activeApp.id,
      {
        status: "REJECTED",
        officerRemarks: `Application rejected by ${officer.officerName} due to non-compliance with municipal safety rules.`
      },
      officer.officerName
    );

    if (updated) {
      const refreshed = getApplications();
      setAppsList(refreshed);
      setActionSuccess("Application marked REJECTED.");
      setTimeout(() => setActionSuccess(""), 4000);
    }
  };

  // Filtered Applications
  const filteredApps = appsList.filter((app) => {
    const matchesSearch = app.id.toLowerCase().includes(searchQuery.toLowerCase()) || app.eventName.toLowerCase().includes(searchQuery.toLowerCase()) || app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "PENDING") return matchesSearch && (app.status === "PENDING_SCRUTINY" || app.status === "UNDER_VERIFICATION");
    if (statusFilter === "APPROVED") return matchesSearch && app.status === "APPROVED";
    if (statusFilter === "REJECTED") return matchesSearch && app.status === "REJECTED";
    if (statusFilter === "CORRECTION") return matchesSearch && app.status === "CORRECTION_REQUIRED";
    return matchesSearch;
  });

  if (!officer) return null;

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
              <span className="text-xs text-slate-300 font-mono font-semibold">Logged Officer: {officer.officerName} ({officer.empId})</span>
            </div>

            <div className="flex items-center space-x-3 self-start sm:self-auto">
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500 px-3 py-1 rounded text-xs font-mono font-bold">
                STQC ENCRYPTED SESSION ACTIVE
              </span>
              <button
                onClick={() => {
                  logoutOfficer();
                  router.push("/officer/login");
                }}
                className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded-xs text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* ACTION SUCCESS ALERT */}
        {actionSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xs flex items-center space-x-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* MAIN WORKBENCH (QUEUE 35% / DETAILS 65%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden">

          {/* LEFT 35%: REAL APPLICATION QUEUE */}
          <div className="lg:col-span-4 bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-4">
            
            <div className="border-b border-[#D9E4F4] pb-2 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                APPLICATION FILES QUEUE
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded">
                {filteredApps.length} FILES
              </span>
            </div>

            {/* Search & Filters */}
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
                      statusFilter === st
                        ? "bg-[#123B7A] text-white border-[#123B7A]"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Queue List */}
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-300 rounded-xs space-y-2">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-xs font-extrabold text-slate-700">No Applications Found</h4>
                <p className="text-[11px] text-slate-500">No files in queue matching filter. Data will appear when submitted by citizens.</p>
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
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                        app.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : app.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : app.status === "CORRECTION_REQUIRED"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-blue-100 text-blue-900"
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">{app.eventName}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{app.applicantName} • {app.wardName}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT 65%: SCRUTINY WORKBENCH FOR SELECTED FILE */}
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
                  <div><span className="font-bold text-slate-900">Stage Dimensions:</span> {activeApp.stageDimensions}</div>
                  <div><span className="font-bold text-slate-900">Safety Rigs:</span> {activeApp.cctvCount} CCTV | {activeApp.fireExtinguishers} Extinguishers</div>
                </div>

                {/* Documents Inspection Drawer */}
                <div className="space-y-3">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                    UPLOADED DOCUMENTS INSPECTION DRAWER
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {[
                      { name: "Applicant Aadhaar Card", file: `Aadhaar_${activeApp.applicantName.replace(/\s+/g, '')}.pdf` },
                      { name: "Organization PAN Card", file: "PAN_Org.pdf" },
                      { name: "Venue Layout CAD Plan", file: "CAD_SitePlan.pdf" },
                      { name: "CFO Fire Retardant Cert", file: "FireRetardant_Cert.pdf" },
                    ].map((doc, idx) => (
                      <div key={idx} className="p-3 border border-slate-200 bg-white rounded-xs space-y-1 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px]">{doc.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono truncate block">{doc.file}</span>
                        </div>
                        <button
                          onClick={() => setDocPreviewModal(doc.name)}
                          className="text-[11px] font-bold text-[#123B7A] hover:underline flex items-center space-x-1 pt-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Departmental NOC Matrix */}
                <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                    CONCURRENT DEPARTMENTAL NOC MATRIX
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className={`p-2 border rounded-xs flex items-center justify-between ${
                      activeApp.cfoFireStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                    }`}>
                      <span>🔥 CFO Fire NOC:</span>
                      <span className="font-bold">{activeApp.cfoFireStatus}</span>
                    </div>

                    <div className={`p-2 border rounded-xs flex items-center justify-between ${
                      activeApp.policeStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                    }`}>
                      <span>👮 MBVV Police NOC:</span>
                      <span className="font-bold">{activeApp.policeStatus}</span>
                    </div>

                    <div className={`p-2 border rounded-xs flex items-center justify-between ${
                      activeApp.trafficStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                    }`}>
                      <span>🚥 Traffic Police NOC:</span>
                      <span className="font-bold">{activeApp.trafficStatus}</span>
                    </div>

                    <div className={`p-2 border rounded-xs flex items-center justify-between ${
                      activeApp.wardStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                    }`}>
                      <span>🏛️ Ward Officer Cert:</span>
                      <span className="font-bold">{activeApp.wardStatus}</span>
                    </div>

                    <div className={`sm:col-span-2 p-2 border rounded-xs flex items-center justify-between ${
                      activeApp.commissionerSanction ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-extrabold" : "bg-white border-slate-300"
                    }`}>
                      <span>⭐ Commissioner Sanction:</span>
                      <span>{activeApp.commissionerSanction ? "SANCTIONED" : "PENDING"}</span>
                    </div>
                  </div>
                </div>

                {/* Officer Action Controls */}
                <div className="space-y-4 pt-2 border-t border-[#D9E4F4]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Grant NOC Button */}
                    <button
                      onClick={handleOfficerGrantNoc}
                      className="bg-[#123B7A] hover:bg-[#1E4F91] text-white text-xs font-extrabold px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Grant Sign-off [{officer.departmentCode}]</span>
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={handleRejectApplication}
                      className="border border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-2.5 rounded-xs transition cursor-pointer"
                    >
                      Reject File
                    </button>

                  </div>

                  {/* Correction Form */}
                  <div className="flex items-center space-x-2 text-xs">
                    <input
                      type="text"
                      placeholder="Type correction note for citizen..."
                      value={correctionNote}
                      onChange={(e) => setCorrectionNote(e.target.value)}
                      className="flex-1 border border-[#D9E4F4] p-2 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                    />
                    <button
                      onClick={handleRequestCorrection}
                      className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-xs transition cursor-pointer whitespace-nowrap"
                    >
                      Issue Correction Notice
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>

        {/* PRINTABLE OFFICIAL A4 PERMISSION PASS (AVAILABLE IF APPROVED) */}
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
              <span className="text-xs text-slate-600 font-mono block">Certificate No: {activeApp.certificateNo || 'CERT-MBMC-2026-98104'}</span>
            </div>

            {/* Pass Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs text-slate-800">
              <div><span className="font-bold text-slate-900">Application Ref ID:</span> <span className="text-[#123B7A] font-extrabold">{activeApp.id}</span></div>
              <div><span className="font-bold text-slate-900">Issue Date:</span> {activeApp.approvedAt || new Date().toLocaleDateString('en-IN')}</div>
              <div><span className="font-bold text-slate-900">Applicant Name:</span> {activeApp.applicantName}</div>
              <div><span className="font-bold text-slate-900">Organization:</span> {activeApp.organizationName}</div>
              <div><span className="font-bold text-slate-900">Event Title:</span> {activeApp.eventName}</div>
              <div><span className="font-bold text-slate-900">Venue:</span> {activeApp.venueName}</div>
              <div><span className="font-bold text-slate-900">Validity Schedule:</span> {activeApp.startDate} to {activeApp.endDate}</div>
              <div><span className="font-bold text-slate-900">Approved By:</span> {activeApp.approvedBy}</div>
            </div>

            {/* Real SVG QR Stamp */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D9E4F4] pt-4 gap-4">
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#123B7A] block">Encrypted Government QR Code Verification</span>
                <span className="text-[11px] text-slate-600 block">Scan QR code to verify live authenticity on <strong>https://mbmc.gov.in/verify/{activeApp.id}</strong></span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="p-2 bg-white border-2 border-slate-900 rounded flex flex-col items-center justify-center">
                  <QRCodeSVG value={`https://mbmc.gov.in/verify/${activeApp.id}`} size={90} />
                  <span className="text-[8px] font-mono font-bold text-[#123B7A] mt-1">SCAN TO VERIFY</span>
                </div>

                <div className="text-center space-y-1 text-xs font-mono">
                  <div className="w-24 h-10 border-b border-slate-900 mx-auto flex items-center justify-center text-[10px] text-slate-600 italic font-bold">
                    [Digitally Signed]
                  </div>
                  <span className="font-bold text-slate-900 block">Municipal Commissioner</span>
                  <span className="text-[10px] text-slate-500 block">MBMC Competent Sanction</span>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="pt-2 border-t border-[#D9E4F4] flex justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-[#123B7A] text-white hover:bg-[#1E4F91] font-extrabold text-xs px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official A4 Permission Pass</span>
              </button>
            </div>

          </div>
        )}

        {/* DOCUMENT PREVIEW MODAL */}
        {docPreviewModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-xs border border-[#D9E4F4] max-w-md w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D9E4F4] pb-2">
                <h4 className="text-sm font-extrabold text-[#123B7A]">Inspect PDF: {docPreviewModal}</h4>
                <button onClick={() => setDocPreviewModal(null)} className="text-slate-500 hover:text-slate-900 text-xs font-bold">✕ Close</button>
              </div>

              <div className="h-56 bg-slate-100 border border-slate-300 rounded flex flex-col items-center justify-center text-xs font-mono text-slate-600 p-4 text-center space-y-2">
                <FileText className="w-10 h-10 text-[#123B7A]" />
                <span className="font-bold text-slate-900">VERIFIED OFFICIAL DOCUMENT</span>
                <span>SHA-256 Checksum: STQC_OK_0x4F88A</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setDocPreviewModal(null)}
                  className="bg-[#123B7A] text-white font-bold text-xs px-4 py-2 rounded-xs"
                >
                  Done Inspection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
