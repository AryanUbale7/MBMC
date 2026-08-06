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
  ChevronRight
} from "lucide-react";

export default function DepartmentPage() {
  const { t } = useAccessibility();
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>("MBMC_FIRE");
  const [applications, setApplications] = useState<EventApplication[]>(DEMO_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<EventApplication>(DEMO_APPLICATIONS[1]);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>("");

  const handleApproveNoc = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedDepts = app.departmentStatus.map((d) => {
            if (d.departmentCode === selectedDeptCode) {
              return {
                ...d,
                status: "APPROVED" as const,
                remarks: `NOC Approved & Digitally Signed by Authorized Officer [${selectedDeptCode}] at ${new Date().toLocaleTimeString()}.`,
                updatedAt: "Just Now"
              };
            }
            return d;
          });
          const allApproved = updatedDepts.every((d) => d.status === "APPROVED");
          return {
            ...app,
            departmentStatus: updatedDepts,
            overallStatus: allApproved ? ("APPROVED" as const) : app.overallStatus
          };
        }
        return app;
      })
    );

    // Update selected view
    setSelectedApp((prev) => {
      const updatedDepts = prev.departmentStatus.map((d) => {
        if (d.departmentCode === selectedDeptCode) {
          return {
            ...d,
            status: "APPROVED" as const,
            remarks: `NOC Approved & Digitally Signed by Authorized Officer [${selectedDeptCode}].`,
            updatedAt: "Just Now"
          };
        }
        return d;
      });
      return {
        ...prev,
        departmentStatus: updatedDepts
      };
    });

    setActionSuccessMsg(`NOC successfully sanctioned and signed under ${selectedDeptCode} authority!`);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  const currentDept = DEPARTMENTS.find((d) => d.code === selectedDeptCode);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 font-sans space-y-8">
      
      {/* PAGE HEADER */}
      <div className="border-b border-gov-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gov-textMuted font-medium">
            <Link href="/" className="hover:underline">{t("Home", "मुख्य पृष्ठ")}</Link>
            <span>/</span>
            <span className="text-gov-primary font-bold">{t("Officer Portal", "अधिकारी दालन")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-dark mt-1">
            {t("Inter-Department Officer Verification Portal", "विभागनिहाय अधिकारी पडताळणी व परवानगी दालन")}
          </h1>
        </div>

        <div className="inline-flex items-center space-x-2 bg-gov-dark text-yellow-400 border border-blue-900 px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
          <Key className="w-4 h-4" />
          <span>OFFICER SESSION: ACTIVE (STQC ENCRYPTION)</span>
        </div>
      </div>

      {/* DEPARTMENT SELECTOR TABS */}
      <div className="bg-white p-2 rounded-xl border border-gov-border shadow-gov-sm overflow-x-auto flex space-x-2">
        {DEPARTMENTS.map((dept) => {
          const isActive = selectedDeptCode === dept.code;
          return (
            <button
              key={dept.code}
              onClick={() => setSelectedDeptCode(dept.code)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                isActive
                  ? "bg-gov-primary text-yellow-400 shadow-gov-sm"
                  : "bg-gov-surface hover:bg-gov-border text-gov-dark"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t(dept.name, dept.nameMr)}</span>
            </button>
          );
        })}
      </div>

      {actionSuccessMsg && (
        <div className="bg-emerald-100 border border-emerald-400 text-emerald-950 p-4 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-gov-sm animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* MAIN TWO-COLUMN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Applications Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gov-border shadow-gov-sm">
            <h3 className="text-sm font-bold text-gov-dark uppercase tracking-wider border-b border-gov-border pb-2 flex justify-between">
              <span>{t("Pending Verification Queue", "पडताळणी प्रलंबित अर्ज")}</span>
              <span className="text-gov-primary font-mono">{applications.length} Items</span>
            </h3>

            <div className="divide-y divide-gov-border mt-3 space-y-3">
              {applications.map((app) => {
                const isSelected = selectedApp.id === app.id;
                const deptStatusObj = app.departmentStatus.find((d) => d.departmentCode === selectedDeptCode);
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-3 rounded-lg border transition cursor-pointer space-y-2 ${
                      isSelected
                        ? "bg-blue-50 border-gov-primary shadow-gov-sm"
                        : "bg-gov-bg hover:bg-gov-surface border-gov-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-gov-primary">{app.referenceNo}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          deptStatusObj?.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {deptStatusObj?.status || "PENDING"}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gov-dark leading-tight">{app.eventName}</h4>
                    <p className="text-[11px] text-gov-textMuted">{app.organizationName} • {app.venueName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Application Review Panel */}
        <div className="lg:col-span-7">
          {selectedApp && (
            <div className="bg-white rounded-xl border border-gov-border shadow-gov-md p-6 space-y-6">
              
              <div className="border-b border-gov-border pb-4 flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-gov-primary bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                    {selectedApp.referenceNo}
                  </span>
                  <h3 className="text-lg font-bold text-gov-dark mt-2">{selectedApp.eventName}</h3>
                  <p className="text-xs text-gov-textMuted mt-0.5">{selectedApp.organizationName} ({selectedApp.applicantName})</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-extrabold text-gov-primary">
                    Fee: ₹ {selectedApp.totalFeeCalculated.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Specific Department Checklist Verification */}
              <div className="bg-gov-bg p-4 rounded-xl border border-gov-border space-y-3">
                <h4 className="text-xs font-bold text-gov-dark uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-gov-primary" />
                  <span>{currentDept?.name} Compliance Checklist</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gov-border">
                    <span>Pandal Stage Setback Clearance (Min 6m)</span>
                    <span className="text-emerald-700 font-bold">VERIFIED OK</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gov-border">
                    <span>Fire Extinguishers Count ({selectedApp.stageAreaSqFt} sq.ft)</span>
                    <span className="text-emerald-700 font-bold">6 UNITS PRESENT</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gov-border">
                    <span>CCTV Cameras Integration ({selectedApp.expectedAttendance} capacity)</span>
                    <span className="text-emerald-700 font-bold">8 CAMERAS CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gov-border">
                    <span>Sound Wattage Compliance (&lt;55 dB)</span>
                    <span className="text-emerald-700 font-bold">UNDERTAKING SIGNED</span>
                  </div>
                </div>
              </div>

              {/* OFFICER ACTION BUTTONS */}
              <div className="pt-2 border-t border-gov-border space-y-3">
                <h4 className="text-xs font-bold text-gov-dark uppercase tracking-wider">
                  {t("Execute Official Action & Digital Signature", "अधिसत्ता डिजिटल स्वाक्षरी व कृती")}
                </h4>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleApproveNoc(selectedApp.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-md cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t("Approve & Digitally Sign NOC", "NOC मंजूर करा व स्वाक्षरी करा")}</span>
                  </button>

                  <button
                    onClick={() => alert("Query notification sent to applicant mobile & email.")}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t("Raise Query Note", "त्रुटी नोंदवा")}</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
