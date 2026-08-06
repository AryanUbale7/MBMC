"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ShieldCheck,
  Building2,
  Printer,
  Download,
  Calendar,
  User,
  Phone,
  Check,
  Flame,
  Volume2,
  ExternalLink,
  Award,
  ChevronRight,
  ShieldAlert,
  Info
} from "lucide-react";

function TrackContent() {
  const { t } = useAccessibility();
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "MBMC/UECP/2026/89412";

  const [refInput, setRefInput] = useState(initialRef);
  const [searchedRef, setSearchedRef] = useState(initialRef);

  // Mock Lookup Store
  const mockDb: Record<string, any> = {
    "MBMC/UECP/2026/89412": {
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
      status: "PENDING_SCRUTINY",
      cfoFireStatus: "PENDING",
      policeStatus: "PENDING",
      trafficStatus: "PENDING",
      wardStatus: "PENDING",
      commissionerSanction: false,
      remarks: "Application logged into system. Desk Scrutiny & CAD verification in progress."
    },
    "MBMC/UECP/2026/98412": {
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
      status: "APPROVED",
      cfoFireStatus: "APPROVED",
      policeStatus: "APPROVED",
      trafficStatus: "APPROVED",
      wardStatus: "APPROVED",
      commissionerSanction: true,
      remarks: "All multi-departmental clearances granted. QR Permission Pass issued."
    }
  };

  const activeApp = mockDb[searchedRef.toUpperCase()] || {
    id: refInput.toUpperCase(),
    eventName: "Registered Event Permit Application",
    applicantName: "Registered Citizen Applicant",
    organization: "Citizen Event Committee",
    ward: "Ward 4 (Kashimira - Ghodbunder)",
    venue: "Designated Public Field, Mira Road",
    dates: "2026-09-01 to 2026-09-10",
    mobile: "9820000000",
    email: "applicant@mbmc-portal.org",
    stageSize: "30ft x 20ft",
    crowd: "5,000 daily",
    cctvCount: 6,
    fireExtinguishers: 4,
    submittedAt: "2026-08-05 11:00 AM",
    status: "PENDING_SCRUTINY",
    cfoFireStatus: "PENDING",
    policeStatus: "PENDING",
    trafficStatus: "PENDING",
    wardStatus: "PENDING",
    commissionerSanction: false,
    remarks: "Application under initial Desk Scrutiny by MBMC Single-Window Cell."
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refInput.trim()) {
      setSearchedRef(refInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-6 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* -------------------------------------------------
            PAGE HEADER & SEARCH BAR
        ------------------------------------------------- */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 sm:p-6 shadow-xs space-y-4 print:hidden">
          
          <div className="text-[11px] font-bold text-[#1E4F91] uppercase tracking-wider flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span>{t("Government of Maharashtra", "महाराष्ट्र शासन")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-extrabold">{t("Citizen Application Live Status Tracker", "अर्ज स्थिती थेट मागोवा")}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-[#D9E4F4] pt-4 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#123B7A]">
                {t("Real-Time Application Status & Approval Tracker", "अर्ज स्थिती आणि विभागीय पडताळणी थेट मागोवा")}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Enter your 10-digit Application Reference ID (e.g., <strong>MBMC/UECP/2026/89412</strong> or <strong>MBMC/UECP/2026/98412</strong>)
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Enter Application Ref ID..."
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 text-xs font-mono font-bold w-full md:w-64 focus:outline-none focus:border-[#123B7A]"
              />
              <button
                type="submit"
                className="bg-[#123B7A] hover:bg-[#1E4F91] text-white font-extrabold text-xs px-4 py-2.5 rounded-xs flex items-center space-x-1 transition cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>
          </div>

        </div>


        {/* -------------------------------------------------
            LIVE WORKFLOW TRACKER DISPLAY
        ------------------------------------------------- */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 sm:p-8 shadow-xs space-y-6 print:hidden">
          
          {/* Header Status Bar */}
          <div className="border-b border-[#D9E4F4] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 block">APPLICATION FILE TRACKING RECORD</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#123B7A]">{activeApp.eventName}</h2>
              <span className="text-xs font-mono text-[#1E4F91] font-bold">Ref No: {activeApp.id}</span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-500 font-bold block">CURRENT E-GOVERNANCE STATUS</span>
              <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded border inline-block ${
                activeApp.status === "APPROVED"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-amber-100 text-amber-900 border-amber-300"
              }`}>
                STATUS: {activeApp.status === "APPROVED" ? "SANCTIONED & ISSUED" : "PENDING SCRUTINY"}
              </span>
            </div>
          </div>

          {/* 7-STAGE APPROVAL TIMELINE PIPELINE */}
          <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
            <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
              7-STAGE MULTI-DEPARTMENTAL APPROVAL TIMELINE PIPELINE
            </span>

            <div className="space-y-2 text-xs font-mono">
              
              {/* Stage 1 */}
              <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold rounded-xs">
                <span>1. Citizen Application Form Submission</span>
                <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded">COMPLETED ({activeApp.submittedAt})</span>
              </div>

              {/* Stage 2 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.status === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"
              }`}>
                <span className="flex items-center space-x-2">
                  {activeApp.status !== "APPROVED" && <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />}
                  <span>2. Desk Scrutiny & CAD Layout Plan Audit</span>
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.status === "APPROVED" ? "bg-emerald-700 text-white" : "bg-amber-600 text-white"
                }`}>
                  {activeApp.status === "APPROVED" ? "VERIFIED" : "IN PROGRESS"}
                </span>
              </div>

              {/* Stage 3 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.cfoFireStatus === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <span>3. Chief Fire Officer (CFO) Fire Safety NOC</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.cfoFireStatus === "APPROVED" ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {activeApp.cfoFireStatus === "APPROVED" ? "SANCTIONED (CFO/2026/88)" : "PENDING AUDIT"}
                </span>
              </div>

              {/* Stage 4 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.policeStatus === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <span>4. MBVV Police Law & Order Clearance</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.policeStatus === "APPROVED" ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {activeApp.policeStatus === "APPROVED" ? "SANCTIONED (MBVV/POL/41)" : "PENDING AUDIT"}
                </span>
              </div>

              {/* Stage 5 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.trafficStatus === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <span>5. MBVV Traffic Route Diversion Audit</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.trafficStatus === "APPROVED" ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {activeApp.trafficStatus === "APPROVED" ? "SANCTIONED (TFR/2026/19)" : "PENDING AUDIT"}
                </span>
              </div>

              {/* Stage 6 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.wardStatus === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <span>6. MBMC Ward Officer Field Recommendation</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.wardStatus === "APPROVED" ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {activeApp.wardStatus === "APPROVED" ? "RECOMMENDED (WARD/2026/04)" : "PENDING RECOMMENDATION"}
                </span>
              </div>

              {/* Stage 7 */}
              <div className={`flex items-center justify-between p-2 rounded-xs border font-bold ${
                activeApp.commissionerSanction ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-extrabold" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <span>7. Municipal Commissioner Final Sanction & QR Pass Generation</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  activeApp.commissionerSanction ? "bg-emerald-700 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {activeApp.commissionerSanction ? "SANCTIONED & GENERATED" : "PENDING SANCTION"}
                </span>
              </div>

            </div>
          </div>

          {/* Quick Simulation Link for Testing */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xs text-xs flex items-center justify-between">
            <span className="text-[#123B7A] font-medium">
              Want to simulate Officer Approval for this file? Use the Officer Admin Portal.
            </span>
            <Link
              href={`/department?ref=${encodeURIComponent(activeApp.id)}`}
              className="bg-[#123B7A] hover:bg-[#1E4F91] text-white font-bold px-3 py-1.5 rounded-xs transition flex items-center space-x-1"
            >
              <span>Go to Officer Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>


        {/* -------------------------------------------------
            PRINTABLE OFFICIAL A4 PERMISSION PASS (RENDERED IF APPROVED)
        ------------------------------------------------- */}
        {activeApp.status === "APPROVED" ? (
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
        ) : (
          <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 text-center space-y-3 print:hidden">
            <Clock className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="text-base font-extrabold text-[#123B7A]">Official QR Permission Pass Pending Approval</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              As per municipal governance rules, the Official QR Permission Pass is generated <strong>ONLY AFTER</strong> all multi-departmental clearances (CFO, Police, Ward Officer, Municipal Commissioner) are signed off.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center font-mono text-xs text-gov-primary font-bold">
        Loading Application Status Tracker...
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
