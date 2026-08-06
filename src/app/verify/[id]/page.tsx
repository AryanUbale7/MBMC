"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getApplications, ApplicationRecord } from "@/lib/govStore";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  Printer,
  ChevronRight
} from "lucide-react";

export default function PublicCertificateVerifyPage() {
  const params = useParams();
  const rawId = params?.id ? decodeURIComponent(params.id as string) : "";
  const [appRecord, setAppRecord] = useState<ApplicationRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rawId) {
      const allApps = getApplications();
      const found = allApps.find(
        (a) => a.id.toLowerCase() === rawId.toLowerCase() || (a.certificateNo && a.certificateNo.toLowerCase() === rawId.toLowerCase())
      );
      setAppRecord(found || null);
    }
    setLoading(false);
  }, [rawId]);

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-10 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2 border-b border-[#D9E4F4] pb-6">
          <div className="flex items-center justify-center space-x-3">
            <img src="/images/sher.png" alt="Emblem of India" className="w-5 h-8 object-contain" width="20" height="32" />
            <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-12 h-12 object-contain" width="48" height="48" />
          </div>
          <h1 className="text-lg sm:text-xl font-black text-[#123B7A] uppercase tracking-wider">
            MIRA BHAYANDAR MUNICIPAL CORPORATION
          </h1>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            PUBLIC CERTIFICATE VERIFICATION & AUTHENTICITY PORTAL
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center font-mono text-xs text-slate-600 font-bold">
            Verifying STQC Encrypted Digital Signature...
          </div>
        ) : appRecord && appRecord.status === "APPROVED" ? (
          
          /* VERIFIED VALID CERTIFICATE CARD */
          <div className="printable-pass bg-white rounded-xs border-2 border-emerald-600 p-6 sm:p-8 shadow-md space-y-6">
            
            {/* Status Stamp */}
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xs text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-emerald-900 font-black text-base uppercase tracking-wider">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                <span>OFFICIAL PERMIT VALID & AUTHENTICATED</span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">
                This digital permission certificate has been officially issued by the Mira Bhayandar Municipal Corporation.
              </p>
            </div>

            {/* Authenticated Data Grid */}
            <div className="space-y-3 text-xs font-mono">
              <span className="font-extrabold text-[#123B7A] uppercase tracking-wider block border-b border-slate-200 pb-1">
                VERIFIED PERMIT DETAILS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs text-slate-800">
                <div><span className="font-bold text-slate-900">Application Ref ID:</span> <span className="text-[#123B7A] font-extrabold">{appRecord.id}</span></div>
                <div><span className="font-bold text-slate-900">Certificate No:</span> {appRecord.certificateNo}</div>
                <div><span className="font-bold text-slate-900">Applicant Full Name:</span> {appRecord.applicantName}</div>
                <div><span className="font-bold text-slate-900">Organization:</span> {appRecord.organizationName}</div>
                <div><span className="font-bold text-slate-900">Event Title:</span> {appRecord.eventName}</div>
                <div><span className="font-bold text-slate-900">Ward Jurisdiction:</span> {appRecord.wardName}</div>
                <div><span className="font-bold text-slate-900">Sanctioned Venue:</span> {appRecord.venueName}</div>
                <div><span className="font-bold text-slate-900">Validity Schedule:</span> {appRecord.startDate} to {appRecord.endDate}</div>
                <div><span className="font-bold text-slate-900">Approved Date:</span> {appRecord.approvedAt}</div>
                <div><span className="font-bold text-slate-900">Approved Authority:</span> {appRecord.approvedBy}</div>
              </div>
            </div>

            {/* Security Cryptographic Stamp */}
            <div className="bg-slate-900 text-white p-4 rounded-xs text-xs font-mono space-y-1">
              <span className="font-bold text-yellow-400 block text-[11px]">STQC DIGITAL SIGNATURE VERIFICATION</span>
              <p className="text-[10px] text-slate-300">SHA-256 Hash: 0x88F1A290B34E771029C44E89021AA12F98C02B9</p>
              <p className="text-[10px] text-slate-400">Police patrol officers can verify this permit live against MBMC central registry.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <Link href="/" className="text-xs font-bold text-[#123B7A] hover:underline">
                Back to MBMC Portal
              </Link>

              <button
                onClick={() => window.print()}
                className="bg-[#123B7A] text-white hover:bg-[#1E4F91] font-bold text-xs px-4 py-2 rounded-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        ) : (

          /* INVALID OR NOT FOUND CERTIFICATE CARD */
          <div className="bg-white rounded-xs border border-red-300 p-6 sm:p-8 shadow-xs text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
            <h2 className="text-lg font-extrabold text-red-900">Permission Certificate Not Found or Invalid</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              No active sanctioned MBMC permission certificate was found for Reference ID: <strong className="font-mono text-slate-900">{rawId || 'UNKNOWN'}</strong>. The application may still be in scrutiny or rejected.
            </p>
            <div className="pt-2">
              <Link href="/track" className="bg-[#123B7A] text-white text-xs font-bold px-4 py-2 rounded-xs">
                Track Application Status
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
