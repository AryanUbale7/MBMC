"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import { DEMO_APPLICATIONS, EventApplication, DEPARTMENTS } from "@/data/mbmcData";
import {
  ShieldCheck,
  Building2,
  Flame,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  UserCheck,
  Search,
  Key,
  Lock,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Printer,
  FileCheck2,
  XCircle,
  Edit3,
  Eye,
  Check,
  Download,
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  Info
} from "lucide-react";

export default function DepartmentPage() {
  const { t } = useAccessibility();
  const [selectedRole, setSelectedRole] = useState<"CFO_FIRE" | "POLICE" | "TRAFFIC" | "WARD" | "COMMISSIONER">("CFO_FIRE");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Applications Store
  const [appsList, setAppsList] = useState([
    {
      id: "MBMC/UECP/2026/89412",
      eventName: "Shanti Nagar Sarvajanik Ganeshotsav Pandal",
      applicantName: "Pravin Kumar Raut",
      organization: "Shanti Nagar Welfare Mandal Trust",
      ward: "Ward 4 (Kashimira - Ghodbunder)",
      venue: "Shanti Nagar Cultural & Community Field",
      dates: "2026-09-10 to 2026-09-20",
      mobile: "9820199482",
      email: "pravin.raut@mandal.org",
      stageSize: "40ft x 30ft",
      crowd: "10,000 daily",
      cctvCount: 8,
      fireExtinguishers: 6,
      submittedAt: "2026-08-06 09:15 AM",
      status: "PENDING_SCRUTINY" as "PENDING_SCRUTINY" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "CORRECTION",
      cfoFireStatus: "PENDING" as "APPROVED" | "PENDING" | "REJECTED",
      policeStatus: "PENDING" as "APPROVED" | "PENDING" | "REJECTED",
      trafficStatus: "PENDING" as "APPROVED" | "PENDING" | "REJECTED",
      wardStatus: "PENDING" as "APPROVED" | "PENDING" | "REJECTED",
      commissionerSanction: false,
      remarks: "Application logged into system. Awaiting Desk Scrutiny & Department Audits."
    },
    {
      id: "MBMC/UECP/2026/98412",
      eventName: "Mira Bhayandar Annual Cultural & Handloom Festival 2026",
      applicantName: "Sanjay R. Mehta",
      organization: "Konkan Heritage Cultural Trust",
      ward: "Ward 1 (Bhayandar West)",
      venue: "Netaji Subhash Chandra Bose Ground",
      dates: "2026-09-15 to 2026-09-20",
      mobile: "9820144890",
      email: "sanjay@konkanheritage.org",
      stageSize: "60ft x 45ft",
      crowd: "12,000 daily",
      cctvCount: 12,
      fireExtinguishers: 12,
      submittedAt: "2026-08-01 10:30 AM",
      status: "APPROVED" as const,
      cfoFireStatus: "APPROVED" as const,
      policeStatus: "APPROVED" as const,
      trafficStatus: "APPROVED" as const,
      wardStatus: "APPROVED" as const,
      commissionerSanction: true,
      remarks: "All multi-departmental clearances granted. QR Permission Pass issued."
    }
  ]);

  const [selectedAppId, setSelectedAppId] = useState<string>("MBMC/UECP/2026/89412");
  const [docPreviewModal, setDocPreviewModal] = useState<string | null>(null);
  const [correctionNote, setCorrectionNote] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<string>("");

  const activeApp = appsList.find((a) => a.id === selectedAppId) || appsList[0];

  // Officer Grant Department NOC
  const handleOfficerGrantNoc = () => {
    setAppsList((prev) =>
      prev.map((app) => {
        if (app.id === selectedAppId) {
          let updatedCfo = app.cfoFireStatus;
          let updatedPolice = app.policeStatus;
          let updatedTraffic = app.trafficStatus;
          let updatedWard = app.wardStatus;
          let updatedComm = app.commissionerSanction;

          if (selectedRole === "CFO_FIRE") updatedCfo = "APPROVED";
          if (selectedRole === "POLICE") updatedPolice = "APPROVED";
          if (selectedRole === "TRAFFIC") updatedTraffic = "APPROVED";
          if (selectedRole === "WARD") updatedWard = "APPROVED";
          if (selectedRole === "COMMISSIONER") updatedComm = true;

          const allDeptsApproved = updatedCfo === "APPROVED" && updatedPolice === "APPROVED" && updatedTraffic === "APPROVED" && updatedWard === "APPROVED";
          const isFullySanctioned = allDeptsApproved && updatedComm;

          return {
            ...app,
            cfoFireStatus: updatedCfo,
            policeStatus: updatedPolice,
            trafficStatus: updatedTraffic,
            wardStatus: updatedWard,
            commissionerSanction: updatedComm,
            status: isFullySanctioned ? ("APPROVED" as const) : ("IN_REVIEW" as const),
            remarks: `Department NOC signed by ${selectedRole} Officer at ${new Date().toLocaleTimeString('en-IN')}.`
          };
        }
        return app;
      })
    );

    setActionSuccess(`Department Sign-off successfully attached under ${selectedRole} officer authority!`);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // Officer Request Correction
  const handleRequestCorrection = () => {
    if (!correctionNote.trim()) return;
    setAppsList((prev) =>
      prev.map((app) => {
        if (app.id === selectedAppId) {
          return {
            ...app,
            status: "CORRECTION" as const,
            remarks: `Correction Notice Issued by ${selectedRole}: ${correctionNote}`
          };
        }
        return app;
      })
    );
    setCorrectionNote("");
    setActionSuccess("Correction Notice sent to citizen.");
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // Officer Reject Application
  const handleRejectApplication = () => {
    setAppsList((prev) =>
      prev.map((app) => {
        if (app.id === selectedAppId) {
          return {
            ...app,
            status: "REJECTED" as const,
            remarks: `Application rejected by ${selectedRole} due to safety non-compliance.`
          };
        }
        return app;
      })
    );
    setActionSuccess("Application rejected.");
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // Filtered Applications
  const filteredApps = appsList.filter((app) => {
    const matchesSearch = app.id.toLowerCase().includes(searchQuery.toLowerCase()) || app.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "PENDING") return matchesSearch && (app.status === "PENDING_SCRUTINY" || app.status === "IN_REVIEW");
    if (statusFilter === "APPROVED") return matchesSearch && app.status === "APPROVED";
    if (statusFilter === "REJECTED") return matchesSuccess(app.status === "REJECTED");
    return matchesSearch;
  });

  function matchesSuccess(isMatch: boolean) {
    return isMatch;
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-6 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* -------------------------------------------------
            ADMIN OFFICER PORTAL HEADER
        ------------------------------------------------- */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 sm:p-6 shadow-xs space-y-4 print:hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9E4F4] pb-3 gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#1E4F91] uppercase tracking-wider block">
                MIRA BHAYANDAR MUNICIPAL CORPORATION • E-GOVERNANCE ADMIN
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#123B7A] mt-0.5 flex items-center space-x-2">
                <ShieldAlert className="w-6 h-6 text-[#123B7A]" />
                <span>Inter-Departmental Officer Scrutiny & Approval Portal</span>
              </h1>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900 text-yellow-400 border border-slate-700 px-3 py-1.5 rounded-xs text-xs font-mono font-bold self-start sm:self-auto">
              <Key className="w-3.5 h-3.5" />
              <span>OFFICER SESSION ACTIVE (STQC ENCRYPTION)</span>
            </div>
          </div>

          {/* Department Role Selector Tabs */}
          <div className="flex items-center space-x-2 text-xs font-bold overflow-x-auto pt-1">
            <span className="text-slate-500 font-mono uppercase text-[10px] mr-2">LOGGED IN AS:</span>
            {[
              { id: "CFO_FIRE", label: "🔥 CFO Fire Officer" },
              { id: "POLICE", label: "👮 MBVV Police Officer" },
              { id: "TRAFFIC", label: "🚥 Traffic Police Officer" },
              { id: "WARD", label: "🏛️ MBMC Ward Officer" },
              { id: "COMMISSIONER", label: "⭐ Municipal Commissioner" },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as any)}
                className={`px-3 py-1.5 rounded-xs transition whitespace-nowrap cursor-pointer ${
                  selectedRole === role.id
                    ? "bg-[#123B7A] text-white font-extrabold shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------
            ACTION SUCCESS ALERT
        ------------------------------------------------- */}
        {actionSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xs flex items-center space-x-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* -------------------------------------------------
            MAIN OFFICER QUEUE & SCRUTINY WORKBENCH (75% / 25%)
        ------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden">

          {/* LEFT 35%: APPLICATION QUEUE */}
          <div className="lg:col-span-4 bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-4">
            
            <div className="border-b border-[#D9E4F4] pb-2 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                APPLICATION SCRUTINY QUEUE
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded">
                {filteredApps.length} FILES
              </span>
            </div>

            {/* Search & Filter */}
            <div className="space-y-2 text-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter Ref No. or Event Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-[#D9E4F4] p-2 pl-7 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
              </div>

              <div className="flex items-center space-x-1 font-bold text-[10px]">
                {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`flex-1 py-1 rounded-xs border transition cursor-pointer ${
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

            {/* Application List */}
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
                        : "bg-amber-100 text-amber-900"
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 truncate">{app.eventName}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{app.applicantName} • {app.ward}</p>
                </div>
              ))}
            </div>

          </div>


          {/* RIGHT 65%: OFFICER SCRUTINY WORKBENCH */}
          <div className="lg:col-span-8 bg-white rounded-xs border border-[#D9E4F4] p-6 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="border-b-2 border-[#123B7A] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 block">APPLICATION FILE SCRUTINY WORKBENCH</span>
                <h3 className="text-lg font-extrabold text-[#123B7A]">{activeApp.eventName}</h3>
                <span className="text-xs font-mono text-[#1E4F91] font-bold">Ref: {activeApp.id}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold block">CURRENT STATUS</span>
                <span className="bg-amber-100 text-amber-900 text-xs font-mono font-extrabold px-2.5 py-1 rounded border border-amber-300">
                  {activeApp.status}
                </span>
              </div>
            </div>

            {/* Applicant & Venue Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs">
              <div><span className="font-bold text-slate-900">Applicant:</span> {activeApp.applicantName}</div>
              <div><span className="font-bold text-slate-900">Organization:</span> {activeApp.organization}</div>
              <div><span className="font-bold text-slate-900">Mobile:</span> {activeApp.mobile}</div>
              <div><span className="font-bold text-slate-900">Email:</span> {activeApp.email}</div>
              <div><span className="font-bold text-slate-900">Ward:</span> {activeApp.ward}</div>
              <div><span className="font-bold text-slate-900">Venue:</span> {activeApp.venue}</div>
              <div><span className="font-bold text-slate-900">Dates:</span> {activeApp.dates}</div>
              <div><span className="font-bold text-slate-900">Expected Crowd:</span> {activeApp.crowd}</div>
              <div><span className="font-bold text-slate-900">Stage Dimensions:</span> {activeApp.stageSize}</div>
              <div><span className="font-bold text-slate-900">Safety Rigs:</span> {activeApp.cctvCount} CCTV | {activeApp.fireExtinguishers} Extinguishers</div>
            </div>

            {/* Document Verification Drawer */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                SUBMITTED DOCUMENTS VERIFICATION DRAWER
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { name: "Applicant Aadhaar Card", file: "Aadhaar_PravinRaut.pdf" },
                  { name: "Organization PAN Card", file: "PAN_Trust.pdf" },
                  { name: "Venue Layout CAD Plan", file: "CAD_SitePlan_2026.pdf" },
                  { name: "CFO Fire Retardant Cert", file: "FireRetardant_Cert.pdf" },
                  { name: "Society NOC Copy", file: "Society_NOC_Signed.pdf" },
                  { name: "Public Liability Insurance", file: "Insurance_Policy.pdf" },
                ].map((doc, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 bg-white rounded-xs space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">{doc.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{doc.file}</span>
                    </div>
                    <button
                      onClick={() => setDocPreviewModal(doc.name)}
                      className="text-[11px] font-bold text-[#123B7A] hover:underline flex items-center space-x-1 pt-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Document</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Departmental Sign-off Status Pipeline */}
            <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                CONCURRENT DEPARTMENTAL NOC SIGN-OFF STATUS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                
                <div className={`p-2.5 border rounded-xs flex items-center justify-between ${
                  activeApp.cfoFireStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                }`}>
                  <span>🔥 CFO Fire Safety NOC:</span>
                  <span className="font-bold">{activeApp.cfoFireStatus}</span>
                </div>

                <div className={`p-2.5 border rounded-xs flex items-center justify-between ${
                  activeApp.policeStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                }`}>
                  <span>👮 MBVV Police Clearance:</span>
                  <span className="font-bold">{activeApp.policeStatus}</span>
                </div>

                <div className={`p-2.5 border rounded-xs flex items-center justify-between ${
                  activeApp.trafficStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                }`}>
                  <span>🚥 Traffic Police Clearance:</span>
                  <span className="font-bold">{activeApp.trafficStatus}</span>
                </div>

                <div className={`p-2.5 border rounded-xs flex items-center justify-between ${
                  activeApp.wardStatus === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-300"
                }`}>
                  <span>🏛️ Ward Officer Clearance:</span>
                  <span className="font-bold">{activeApp.wardStatus}</span>
                </div>

                <div className={`sm:col-span-2 p-2.5 border rounded-xs flex items-center justify-between ${
                  activeApp.commissionerSanction ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-extrabold" : "bg-white border-slate-300"
                }`}>
                  <span>⭐ Municipal Commissioner Sanction:</span>
                  <span>{activeApp.commissionerSanction ? "SANCTIONED & SEALED" : "PENDING SANCTION"}</span>
                </div>

              </div>
            </div>

            {/* Officer Action Buttons */}
            <div className="space-y-4 pt-2 border-t border-[#D9E4F4]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                
                {/* Approve Button */}
                <button
                  onClick={handleOfficerGrantNoc}
                  className="bg-[#123B7A] hover:bg-[#1E4F91] text-white text-xs font-extrabold px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant NOC & Attach Digital Sign [{selectedRole}]</span>
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
                  placeholder="Type correction requirement note for citizen..."
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

          </div>

        </div>


        {/* -------------------------------------------------
            PRINTABLE OFFICIAL A4 PERMISSION PASS (ALWAYS AVAILABLE FOR APPROVED FILES)
        ------------------------------------------------- */}
        {activeApp.status === "APPROVED" && (
          <div className="printable-pass bg-white rounded-xs border-2 border-[#123B7A] p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Government Emblem & Header */}
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
              <span className="text-xs text-slate-600 font-mono block">Issuing Authority: Municipal Commissionerate & Chief Fire Officer, MBMC</span>
            </div>

            {/* Pass Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs text-slate-800">
              <div><span className="font-bold text-slate-900">Application Reference ID:</span> <span className="text-[#123B7A] font-extrabold">{activeApp.id}</span></div>
              <div><span className="font-bold text-slate-900">Digital Issue Date:</span> {new Date().toLocaleDateString('en-IN')}</div>
              <div><span className="font-bold text-slate-900">Applicant Full Name:</span> {activeApp.applicantName}</div>
              <div><span className="font-bold text-slate-900">Organization / Trust:</span> {activeApp.organization}</div>
              <div><span className="font-bold text-slate-900">Event Title:</span> {activeApp.eventName}</div>
              <div><span className="font-bold text-slate-900">Ward Jurisdiction:</span> {activeApp.ward}</div>
              <div><span className="font-bold text-slate-900">Sanctioned Venue:</span> {activeApp.venue}</div>
              <div><span className="font-bold text-slate-900">Validity Schedule:</span> {activeApp.dates}</div>
              <div><span className="font-bold text-slate-900">CFO Fire Safety NOC:</span> SANCTIONED (CFO/2026/88)</div>
              <div><span className="font-bold text-slate-900">MBVV Police Law & Order:</span> SANCTIONED (MBVV/POL/41)</div>
              <div><span className="font-bold text-slate-900">Traffic Route Permit:</span> APPROVED (TFR/2026/19)</div>
              <div><span className="font-bold text-slate-900">Ward Officer Field Cert:</span> APPROVED (WARD/2026/04)</div>
            </div>

            {/* Mandatory Operational Compliance Terms */}
            <div className="text-xs text-slate-700 leading-relaxed space-y-1 bg-amber-50/60 p-3 border border-amber-200 rounded-xs">
              <span className="font-bold text-amber-900 block">STATUTORY PERMIT CONDITIONS:</span>
              <p>1. Loudspeakers strictly limited to &lt;55 dB during daytime and MUST be turned off by 10:00 PM as per High Court noise norms.</p>
              <p>2. Ammonium phosphate fire-retardant coating on pandal canvas must be maintained intact for daily CFO spot inspection.</p>
              <p>3. This pass must be displayed prominently at the entrance of the event venue.</p>
            </div>

            {/* QR Stamp & Digital Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D9E4F4] pt-4 gap-4">
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#123B7A] block">Encrypted Government QR Code Verification</span>
                <span className="text-[11px] text-slate-600 block">Scan to verify live authenticity on <strong>https://mbmc.gov.in/verify/{activeApp.id}</strong></span>
                <span className="text-[10px] font-mono text-slate-500 block">Digital Hash: STQC_SHA256_88A9F1023B44E99A0</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-slate-900 text-white flex flex-col items-center justify-center font-mono text-[9px] text-center p-2 rounded">
                  <span>[QR CODE STAMP]</span>
                  <span className="mt-1 font-bold text-[#F4B400]">MBMC VERIFIED</span>
                </div>

                <div className="text-center space-y-1 text-xs font-mono">
                  <div className="w-20 h-10 border-b border-slate-900 mx-auto flex items-center justify-center text-[10px] text-slate-500 italic">
                    [Digitally Signed]
                  </div>
                  <span className="font-bold text-slate-900 block">Municipal Commissioner</span>
                  <span className="text-[10px] text-slate-500 block">MBMC Authority</span>
                </div>
              </div>
            </div>

            {/* Print Action Button */}
            <div className="pt-2 border-t border-[#D9E4F4] flex justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-[#123B7A] text-white hover:bg-[#1E4F91] font-extrabold text-xs px-5 py-2.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
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
            <div className="bg-white rounded-xs border border-[#D9E4F4] max-w-lg w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D9E4F4] pb-3">
                <h4 className="text-sm font-extrabold text-[#123B7A]">Document Inspection: {docPreviewModal}</h4>
                <button onClick={() => setDocPreviewModal(null)} className="text-slate-500 hover:text-slate-900 text-xs font-bold">✕ Close</button>
              </div>

              <div className="h-64 bg-slate-100 border border-slate-300 rounded flex flex-col items-center justify-center text-xs font-mono text-slate-600 p-4 text-center space-y-2">
                <FileText className="w-10 h-10 text-[#123B7A]" />
                <span className="font-bold text-slate-900">VERIFIED OFFICIAL ATTACHMENT</span>
                <span>SHA-256 Checksum: MATCHED (0x8F92A104)</span>
                <span className="text-[10px] text-slate-500">STQC Encrypted Document Storage</span>
              </div>

              <div className="flex justify-end pt-2">
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
