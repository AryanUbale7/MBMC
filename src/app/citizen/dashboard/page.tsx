"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  getApplications,
  getNotifications,
  ApplicationRecord,
  CitizenNotification
} from "@/lib/govStore";
import {
  User,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Printer,
  Download,
  PlusCircle,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function CitizenDashboardPage() {
  const { t } = useAccessibility();
  const { citizen, logoutCitizen } = useAuth();
  const router = useRouter();

  const [myApps, setMyApps] = useState<ApplicationRecord[]>([]);
  const [myNotis, setMyNotis] = useState<CitizenNotification[]>([]);

  useEffect(() => {
    if (!citizen) {
      router.push("/citizen/login?redirect=/citizen/dashboard");
      return;
    }
    const allApps = getApplications();
    const filtered = allApps.filter((a) => a.citizenId === citizen.id || a.applicantName.toLowerCase() === citizen.fullName.toLowerCase() || a.email.toLowerCase() === citizen.email.toLowerCase());
    setMyApps(filtered);

    const notis = getNotifications(citizen.id);
    setMyNotis(notis);
  }, [citizen, router]);

  if (!citizen) return null;

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-6 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9E4F4] pb-4 gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#1E4F91] uppercase tracking-wider block">
                CITIZEN SINGLE-WINDOW DASHBOARD
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#123B7A] mt-0.5">
                Welcome, {citizen.fullName}
              </h1>
              <p className="text-xs text-slate-600 font-medium font-mono">
                Mobile: {citizen.mobile} | Email: {citizen.email}
              </p>
            </div>

            <div className="flex items-center space-x-3 self-start sm:self-auto">
              <Link
                href="/apply"
                className="bg-[#123B7A] hover:bg-[#1E4F91] text-white text-xs font-extrabold px-4 py-2 rounded-xs flex items-center space-x-1.5 transition shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Apply New Permission</span>
              </Link>

              <button
                onClick={() => {
                  logoutCitizen();
                  router.push("/citizen/login");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-2 rounded-xs transition flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS CENTER */}
        {myNotis.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xs space-y-2">
            <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider flex items-center space-x-1.5">
              <Bell className="w-4 h-4 text-[#123B7A]" />
              <span>CITIZEN NOTIFICATIONS & UPDATES</span>
            </span>

            <div className="space-y-2 text-xs">
              {myNotis.slice(0, 3).map((n) => (
                <div key={n.id} className="p-2.5 bg-white border border-blue-200 rounded-xs space-y-0.5">
                  <span className="font-bold text-slate-900 block">{n.title}</span>
                  <p className="text-slate-700">{n.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono block">{n.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBMITTED APPLICATIONS LIST */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 shadow-xs space-y-4">
          <div className="border-b border-[#D9E4F4] pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#123B7A] uppercase tracking-wider">
              MY PERMIT APPLICATIONS ({myApps.length})
            </h3>
          </div>

          {myApps.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-300 rounded-xs space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-sm font-extrabold text-slate-800">No Applications Submitted Yet</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                You have not submitted any event permission requests. Click below to file a new application.
              </p>
              <div className="pt-2">
                <Link
                  href="/apply"
                  className="bg-[#123B7A] hover:bg-[#1E4F91] text-white text-xs font-extrabold px-5 py-2.5 rounded-xs inline-flex items-center space-x-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>File New Application Now</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {myApps.map((app) => (
                <div key={app.id} className="p-4 border border-[#D9E4F4] rounded-xs space-y-3 bg-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-mono text-xs font-extrabold text-[#123B7A]">{app.id}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{app.eventName}</h4>
                    </div>

                    <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded border self-start sm:self-auto ${
                      app.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : app.status === "REJECTED"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : app.status === "CORRECTION_REQUIRED"
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-blue-100 text-blue-900 border-blue-300"
                    }`}>
                      STATUS: {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-700">
                    <div><span className="font-bold text-slate-900">Ward:</span> {app.wardName}</div>
                    <div><span className="font-bold text-slate-900">Venue:</span> {app.venueName}</div>
                    <div><span className="font-bold text-slate-900">Dates:</span> {app.startDate} to {app.endDate}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <Link
                      href={`/track?ref=${encodeURIComponent(app.id)}`}
                      className="text-xs font-bold text-[#123B7A] hover:underline flex items-center space-x-1"
                    >
                      <span>Track Detailed Workflow</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {app.status === "APPROVED" && (
                      <Link
                        href={`/verify/${encodeURIComponent(app.id)}`}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xs transition flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View / Print Approved Pass</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
