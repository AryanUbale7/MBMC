"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useAuth } from "@/context/AuthContext";
import { getApplications, ApplicationRecord, TimelineEntry } from "@/lib/govStore";
import { QRCodeSVG } from "qrcode.react";
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
  const { citizen } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  useEffect(() => {
    if (!citizen) {
      router.push("/citizen/login?redirect=/track");
    }
  }, [citizen, router]);

  const [refInput, setRefInput] = useState(initialRef);
  const [searchedRef, setSearchedRef] = useState(initialRef);
  const [activeApp, setActiveApp] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    const allApps = getApplications();
    if (searchedRef.trim()) {
      const found = allApps.find(
        (a) => a.id.toLowerCase() === searchedRef.trim().toLowerCase() || a.mobile === searchedRef.trim()
      );
      setActiveApp(found || null);
    } else if (allApps.length > 0) {
      setActiveApp(allApps[0]);
      setSearchedRef(allApps[0].id);
      setRefInput(allApps[0].id);
    } else {
      setActiveApp(null);
    }
  }, [searchedRef]);

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
        {!activeApp ? (
          <div className="bg-white rounded-xs border border-[#D9E4F4] p-8 text-center space-y-3 print:hidden">
            <Clock className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-extrabold text-[#123B7A]">No Application File Found</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              No registered application was found matching Reference ID <strong>"{searchedRef || refInput}"</strong>. Please check your Reference ID or log in to file a new application.
            </p>
            <div className="pt-2">
              <Link href="/apply" className="bg-[#123B7A] text-white text-xs font-bold px-4 py-2 rounded-xs">
                Apply for Event Permission
              </Link>
            </div>
          </div>
        ) : (
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
                    : activeApp.status === "REJECTED"
                    ? "bg-red-100 text-red-800 border-red-300"
                    : activeApp.status === "CORRECTION_REQUIRED"
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-blue-100 text-blue-900 border-blue-300"
                }`}>
                  {activeApp.status === "APPROVED" ? "SANCTIONED & ISSUED"
                    : activeApp.status === "REJECTED" ? "REJECTED"
                    : activeApp.status === "CORRECTION_REQUIRED" ? "CORRECTION REQUIRED"
                    : "UNDER SCRUTINY"}
                </span>
              </div>
            </div>

            {/* 11-STAGE DYNAMIC APPROVAL TIMELINE */}
            <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                11-STAGE MULTI-DEPARTMENTAL APPROVAL TIMELINE
              </span>

              <div className="space-y-2 text-xs font-mono">
                {(activeApp.timeline && activeApp.timeline.length > 0
                  ? activeApp.timeline
                  : [
                      { stage: "Application Submitted", status: "COMPLETED", date: activeApp.submittedAt, time: "", remarks: "" },
                      { stage: "Pending Scrutiny (Desk Audit)", status: "IN_PROGRESS", date: "", time: "", remarks: "" },
                      { stage: "Fire Department Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Police Department Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Traffic Department Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Public Works Department (PWD) Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Health & Sanitation Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Electricity Department Review", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Ward Officer Approval", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Commissioner Sanction", status: "PENDING", date: "", time: "", remarks: "" },
                      { stage: "Permission Certificate Issued", status: "PENDING", date: "", time: "", remarks: "" }
                    ] as TimelineEntry[]
                ).map((entry, idx) => {
                  const isCompleted = entry.status === "COMPLETED";
                  const isInProgress = entry.status === "IN_PROGRESS";
                  const isRejected = entry.status === "REJECTED";
                  const isReturned = entry.status === "RETURNED";

                  return (
                    <div key={idx} className={`p-2.5 rounded-xs border flex flex-col gap-1 ${
                      isCompleted ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : isInProgress ? "bg-amber-50 border-amber-200 text-amber-900"
                      : isRejected ? "bg-red-50 border-red-200 text-red-900"
                      : isReturned ? "bg-orange-50 border-orange-200 text-orange-900"
                      : "bg-white border-slate-200 text-slate-500"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-2 font-bold">
                          {isInProgress && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />}
                          <span>{idx + 1}. {entry.stage}</span>
                        </span>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded whitespace-nowrap ${
                          isCompleted ? "bg-emerald-700 text-white"
                          : isInProgress ? "bg-amber-600 text-white"
                          : isRejected ? "bg-red-700 text-white"
                          : isReturned ? "bg-orange-600 text-white"
                          : "bg-slate-200 text-slate-600"
                        }`}>
                          {entry.status}
                        </span>
                      </div>
                      {(entry.date || entry.officerName || entry.remarks) && (
                        <div className="text-[10px] text-current opacity-75 pl-4 space-y-0.5">
                          {entry.date && <span className="block">📅 {entry.date} {entry.time}</span>}
                          {entry.officerName && <span className="block">👤 {entry.officerName}</span>}
                          {entry.remarks && <span className="block">💬 {entry.remarks}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8-Department NOC Status Summary */}
            <div className="space-y-2 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">DEPARTMENT NOC STATUS SUMMARY</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                {[
                  { label: "🔥 Fire (CFO)", val: activeApp.cfoFireStatus },
                  { label: "👮 Police", val: activeApp.policeStatus },
                  { label: "🚥 Traffic", val: activeApp.trafficStatus },
                  { label: "🏗️ PWD", val: activeApp.pwdStatus },
                  { label: "🏥 Health", val: activeApp.healthStatus },
                  { label: "⚡ Electricity", val: activeApp.electricityStatus },
                  { label: "🏛️ Ward Office", val: activeApp.wardStatus },
                  { label: "⭐ Commissioner", val: activeApp.commissionerSanction ? "APPROVED" : "PENDING" },
                ].map((d, i) => (
                  <div key={i} className={`p-2 border rounded-xs text-center ${
                    d.val === "APPROVED" ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : d.val === "REJECTED" ? "bg-red-50 border-red-300 text-red-800"
                    : d.val === "UNDER_REVIEW" ? "bg-blue-50 border-blue-300 text-blue-800"
                    : "bg-white border-slate-200 text-slate-500"
                  }`}>
                    <div className="font-bold">{d.label}</div>
                    <div className="font-extrabold uppercase">{d.val || "PENDING"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Portal Link */}
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xs text-xs flex items-center justify-between">
              <span className="text-[#123B7A] font-medium">
                Want to simulate Officer Approval for this file? Use the Officer Admin Portal.
              </span>
              <Link
                href="/officer/login"
                className="bg-[#123B7A] hover:bg-[#1E4F91] text-white font-bold px-3 py-1.5 rounded-xs transition flex items-center space-x-1"
              >
                <span>Go to Officer Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        )}


        {/* -------------------------------------------------
            PRINTABLE OFFICIAL A4 PERMISSION PASS (RENDERED IF APPROVED)
        ------------------------------------------------- */}
        {activeApp && activeApp.status === "APPROVED" ? (
          <div className="printable-pass bg-white rounded-xs border-2 border-[#123B7A] p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Government Emblem & Header */}
            <div className="text-center space-y-2 border-b-2 border-[#123B7A] pb-6">
              <div className="flex items-center justify-center space-x-4">
                <img src="/images/sher.png" alt="Emblem of India" className="w-6 h-9 object-contain" width="24" height="36" />
                <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-14 h-14 object-contain" width="56" height="56" />
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
              <div><span className="font-bold text-slate-900">Organization / Trust:</span> {activeApp.organizationName}</div>
              <div><span className="font-bold text-slate-900">Event Title:</span> {activeApp.eventName}</div>
              <div><span className="font-bold text-slate-900">Ward Jurisdiction:</span> {activeApp.wardName}</div>
              <div><span className="font-bold text-slate-900">Sanctioned Venue:</span> {activeApp.venueName}</div>
              <div><span className="font-bold text-slate-900">Validity Schedule:</span> {activeApp.startDate} – {activeApp.endDate}</div>
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
                <div className="p-1 border-2 border-[#123B7A] rounded">
                  <QRCodeSVG
                    value={`https://mbmc.gov.in/verify/${activeApp.id}`}
                    size={88}
                    level="H"
                    includeMargin={false}
                  />
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
