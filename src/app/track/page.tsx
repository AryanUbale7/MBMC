"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { DEMO_APPLICATIONS, EventApplication } from "@/data/mbmcData";
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
  Award
} from "lucide-react";

function TrackContent() {
  const { t } = useAccessibility();
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "MBMC/UECP/2026/98412";

  const [refInput, setRefInput] = useState(initialRef);
  const [activeApp, setActiveApp] = useState<EventApplication | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const found = DEMO_APPLICATIONS.find(
      (app) => app.referenceNo.toLowerCase() === refInput.toLowerCase() || app.id.toLowerCase() === refInput.toLowerCase()
    );
    if (found) {
      setActiveApp(found);
    } else {
      setActiveApp(DEMO_APPLICATIONS[0]);
    }
  }, [refInput]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_APPLICATIONS.find(
      (app) => app.referenceNo.toLowerCase() === refInput.toLowerCase() || app.id.toLowerCase() === refInput.toLowerCase()
    );
    if (found) {
      setActiveApp(found);
    } else {
      setActiveApp({
        id: "APP-CUSTOM",
        referenceNo: refInput.toUpperCase(),
        eventName: "Searched Event Clearance",
        eventType: "Religious / Cultural Festival",
        wardId: "W04",
        venueName: "Mira Road Community Ground",
        applicantName: "Registered Citizen Applicant",
        applicantType: "Trust",
        organizationName: "Local Event Committee",
        mobile: "+91 98200 00000",
        email: "applicant@mbmc-portal.org",
        aadhaarPan: "XXXX XXXX 9912",
        startDate: "2026-09-01",
        endDate: "2026-09-10",
        expectedAttendance: 5000,
        stageAreaSqFt: 2500,
        soundPermitNeeded: true,
        totalFeeCalculated: 15500,
        paymentStatus: "PAID",
        overallStatus: "IN_REVIEW",
        submittedAt: "2026-08-05 11:00 AM",
        departmentStatus: [
          {
            departmentCode: "MBMC_PWD",
            departmentName: "MBMC Public Works Dept",
            status: "APPROVED",
            remarks: "Ground lease sanctioned.",
            updatedAt: "2026-08-05 03:00 PM"
          },
          {
            departmentCode: "MBMC_FIRE",
            departmentName: "MBMC Fire Services",
            status: "PENDING",
            remarks: "Scheduled for field safety audit.",
            updatedAt: "2026-08-06 09:00 AM"
          },
          {
            departmentCode: "MBVV_POLICE",
            departmentName: "MBVV Police Dept",
            status: "APPROVED",
            remarks: "Noise permit cleared.",
            updatedAt: "2026-08-05 05:00 PM"
          }
        ]
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 font-sans space-y-8">
      {/* PAGE HEADER */}
      <div className="border-b border-gov-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gov-textMuted font-medium">
            <Link href="/" className="hover:underline">{t("Home", "मुख्य पृष्ठ")}</Link>
            <span>/</span>
            <span className="text-gov-primary font-bold">{t("Track Application", "अर्जाचा पाठपुरावा")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-dark mt-1">
            {t("Single Window Live Clearance Status", "एकल खिडकी अर्जाची थेट स्थिती")}
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="Ref No (e.g. MBMC/UECP/2026/98412)"
              className="bg-white border border-gov-border rounded-lg pl-3 pr-8 py-2 text-xs font-mono font-bold focus:ring-2 focus:ring-gov-primary outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gov-textMuted absolute right-2.5 top-2.5" />
          </div>
          <button
            type="submit"
            className="bg-gov-primary hover:bg-gov-dark text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer"
          >
            {t("Track", "शोधा")}
          </button>
        </form>
      </div>

      {activeApp && (
        <div className="space-y-8">
          {/* APPLICATION OVERVIEW CARD */}
          <div className="bg-white rounded-xl border border-gov-border shadow-gov-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gov-border pb-4 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-gov-primary bg-blue-50 border border-blue-200 px-3 py-1 rounded">
                  {activeApp.referenceNo}
                </span>
                <h2 className="text-xl font-bold text-gov-dark mt-2">
                  {activeApp.eventName}
                </h2>
                <p className="text-xs text-gov-textMuted mt-0.5">
                  {activeApp.eventType} • {t("Submitted:", "सादर केल्याची तारीख:")} {activeApp.submittedAt}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end">
                {activeApp.overallStatus === "APPROVED" ? (
                  <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t("ALL NOCs CLEARED & APPROVED", "सर्व एनओसी मंजूर व परवाना तयार")}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-bold">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{t("IN REVIEW BY DEPARTMENTS", "विभागीय अधिकारी तपासणी सुरु")}</span>
                  </div>
                )}

                {activeApp.overallStatus === "APPROVED" && (
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="mt-2 text-xs font-bold text-gov-primary hover:text-gov-dark underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-yellow-500" />
                    <span>{t("View & Download Digital Permit Certificate", "डिजिटल परवाना पहा व डाऊनलोड करा")}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
                <span className="text-gov-textMuted block">{t("Applicant / Trust Name", "अर्जदार / मंडळ")}</span>
                <span className="font-bold text-gov-dark block mt-0.5">{activeApp.organizationName}</span>
                <span className="text-[11px] text-gov-textMuted">{activeApp.applicantName}</span>
              </div>

              <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
                <span className="text-gov-textMuted block">{t("Venue Address", "मैदान व पत्ता")}</span>
                <span className="font-bold text-gov-dark block mt-0.5">{activeApp.venueName}</span>
                <span className="text-[11px] text-gov-textMuted">Ward {activeApp.wardId}</span>
              </div>

              <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
                <span className="text-gov-textMuted block">{t("Sanctioned Event Dates", "परवानगी कालावधी")}</span>
                <span className="font-bold text-gov-dark block mt-0.5">{activeApp.startDate} to {activeApp.endDate}</span>
              </div>

              <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
                <span className="text-gov-textMuted block">{t("Municipal Fee Paid", "मनपा शुल्क भरणा")}</span>
                <span className="font-mono font-extrabold text-emerald-700 block mt-0.5">₹ {activeApp.totalFeeCalculated.toLocaleString()} ({activeApp.paymentStatus})</span>
              </div>
            </div>
          </div>

          {/* MULTI-DEPARTMENT APPROVAL TIMELINE */}
          <div className="bg-white rounded-xl border border-gov-border shadow-gov-md p-6 sm:p-8 space-y-6">
            <div className="border-b border-gov-border pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-gov-primary" />
                  <span>{t("Inter-Department NOC Live Timeline", "विभागवार ना-हरकत (NOC) थेट स्थिती")}</span>
                </h3>
                <p className="text-xs text-gov-textMuted mt-0.5">
                  {t("Track real-time digital approvals across MBMC Fire, MBVV Police, PWD, and Health departments.", "अग्निशमन, पोलीस, बांधकाम व स्वच्छता विभागाचे थेट डिजिटल शेरे.")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeApp.departmentStatus.map((dept, idx) => (
                <div
                  key={dept.departmentCode}
                  className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    dept.status === "APPROVED"
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-amber-50/60 border-amber-200"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 mt-0.5 ${
                        dept.status === "APPROVED" ? "bg-emerald-600" : "bg-amber-600"
                      }`}
                    >
                      {dept.status === "APPROVED" ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-gov-dark">{dept.departmentName}</h4>
                        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-gov-border">
                          {dept.departmentCode}
                        </span>
                      </div>
                      <p className="text-xs text-gov-textMuted mt-1 font-medium">
                        "{dept.remarks}"
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-gov-border sm:pl-4">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-bold ${
                        dept.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      {dept.status}
                    </span>
                    <span className="block text-[11px] text-gov-textMuted mt-1">
                      Updated: {dept.updatedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIGITAL PERMISSION CERTIFICATE MODAL */}
          {showQrModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-xl border-4 border-gov-primary max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <div className="text-center space-y-2 border-b-2 border-gov-primary pb-4">
                  <div className="flex items-center justify-center space-x-4">
                    <img src="/images/sher.png" alt="Emblem" className="w-6 h-9 object-contain" />
                    <img src="/images/MBMC logo.jpg" alt="MBMC Seal" className="w-12 h-12 object-contain rounded-full" />
                  </div>
                  <h2 className="text-xl font-extrabold text-gov-primary uppercase tracking-tight">
                    Mira Bhayandar Municipal Corporation
                  </h2>
                  <p className="text-xs font-bold text-gov-dark uppercase tracking-widest">
                    OFFICIAL DIGITAL EVENT PERMISSION CERTIFICATE (2026)
                  </p>
                  <span className="text-[11px] text-gov-textMuted">
                    Issued under Maharashtra Municipal Corporations Act • Section 376
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  <div className="sm:col-span-2 space-y-2 text-xs">
                    <div className="bg-gov-bg p-2.5 rounded border border-gov-border">
                      <span className="text-gov-textMuted block">Permit Reference ID:</span>
                      <span className="font-mono font-bold text-gov-primary text-sm">{activeApp.referenceNo}</span>
                    </div>
                    <div className="bg-gov-bg p-2.5 rounded border border-gov-border">
                      <span className="text-gov-textMuted block">Permittee / Mandap Trust:</span>
                      <span className="font-bold text-gov-dark">{activeApp.organizationName} ({activeApp.applicantName})</span>
                    </div>
                    <div className="bg-gov-bg p-2.5 rounded border border-gov-border">
                      <span className="text-gov-textMuted block">Approved Venue & Ward:</span>
                      <span className="font-bold text-gov-dark">{activeApp.venueName} (Ward {activeApp.wardId})</span>
                    </div>
                    <div className="bg-gov-bg p-2.5 rounded border border-gov-border">
                      <span className="text-gov-textMuted block">Sanctioned Validity:</span>
                      <span className="font-bold text-gov-dark">{activeApp.startDate} to {activeApp.endDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-3 bg-gov-bg border-2 border-gov-border rounded-xl space-y-2">
                    <QRCodeSVG
                      value={`https://mbmc.gov.in/verify?ref=${encodeURIComponent(activeApp.referenceNo)}`}
                      size={120}
                      level="H"
                    />
                    <span className="text-[10px] font-mono font-bold text-gov-primary text-center">
                      SCAN TO VERIFY OFFICIAL MBMC SEAL
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gov-border text-center text-[10px] font-bold text-gov-dark">
                  <div>
                    <div className="border-b border-dashed border-gov-border pb-1 mb-1 font-mono text-gov-primary">
                      [DIGITALLY SIGNED]
                    </div>
                    <span>CFO, MBMC Fire Services</span>
                  </div>
                  <div>
                    <div className="border-b border-dashed border-gov-border pb-1 mb-1 font-mono text-gov-primary">
                      [DIGITALLY SIGNED]
                    </div>
                    <span>DCP, MBVV Police Zone 1</span>
                  </div>
                  <div>
                    <div className="border-b border-dashed border-gov-border pb-1 mb-1 font-mono text-gov-primary">
                      [DIGITALLY SIGNED]
                    </div>
                    <span>Exec. Engineer, MBMC PWD</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2 no-print">
                  <button
                    onClick={() => window.print()}
                    className="bg-gov-primary text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 transition hover:bg-gov-dark cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                  <button
                    onClick={() => setShowQrModal(false)}
                    className="bg-gov-surface hover:bg-gov-border text-gov-dark font-bold text-xs px-4 py-2 rounded-lg transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gov-primary font-bold">Loading Live Tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
