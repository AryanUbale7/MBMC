"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { OfficerUser } from "@/lib/govStore";
import {
  ShieldAlert,
  Key,
  Lock,
  UserCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function OfficerLoginPage() {
  const { t } = useAccessibility();
  const { loginOfficer } = useAuth();
  const router = useRouter();

  const [deptCode, setDeptCode] = useState<OfficerUser["departmentCode"]>("CFO_FIRE");
  const [empId, setEmpId] = useState("MBMC-OFF-8810");
  const [password, setPassword] = useState("admin123");
  const [stqcKey, setStqcKey] = useState("STQC-RSA-9941");
  const [error, setError] = useState("");

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId.trim()) {
      setError("Officer Employee ID is required.");
      return;
    }

    loginOfficer(deptCode, empId.trim());
    router.push("/officer/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white py-12 px-4 sm:px-8">
      <div className="max-w-md mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <img src="/images/sher.png" alt="Emblem of India" className="w-5 h-8 object-contain filter invert" />
            <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-lg font-black text-yellow-400 uppercase tracking-wider">
            MIRA BHAYANDAR MUNICIPAL CORPORATION
          </h1>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wide">
            GOVERNMENT OFFICER SCRUTINY & APPROVAL PORTAL
          </p>
        </div>

        {/* LOGIN FORM CARD */}
        <div className="bg-slate-800 rounded-xs border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-yellow-400 uppercase tracking-wide flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-yellow-400" />
              <span>OFFICER LOGIN / अधिकारी प्रवेश</span>
            </h2>
            <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              RESTRICTED ACCESS
            </span>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-500 text-red-200 text-xs font-bold p-3 rounded-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleOfficerLogin} className="space-y-4 text-xs">
            
            {/* Department Selection */}
            <div>
              <label className="font-bold text-slate-200 mb-1.5 block">
                Designated Scrutiny Department <span className="text-red-400">*</span>
              </label>
              <select
                value={deptCode}
                onChange={(e) => setDeptCode(e.target.value as any)}
                className="w-full border border-slate-600 p-2.5 rounded-xs bg-slate-900 text-white font-medium focus:outline-none focus:border-yellow-400"
              >
                <option value="CFO_FIRE">🔥 Chief Fire Officer (CFO) Services</option>
                <option value="POLICE">👮 MBVV Police Commissionerate</option>
                <option value="TRAFFIC">🚥 MBVV Traffic Control Branch</option>
                <option value="PWD">🏗️ Public Works Department (PWD)</option>
                <option value="HEALTH">🏥 Health &amp; Sanitation Department</option>
                <option value="ELECTRICITY">⚡ Electricity &amp; Infrastructure Department</option>
                <option value="WARD">🏛️ MBMC Ward Office Jurisdiction</option>
                <option value="COMMISSIONER">⭐ Municipal Commissioner (Competent Sanction)</option>
              </select>
            </div>

            {/* Employee ID */}
            <div>
              <label className="font-bold text-slate-200 mb-1.5 block">
                Government Employee ID (PPO / Emp ID) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                className="w-full border border-slate-600 p-2.5 rounded-xs bg-slate-900 text-white font-mono font-bold focus:outline-none focus:border-yellow-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-bold text-slate-200 mb-1.5 block">
                Officer Account Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-600 p-2.5 rounded-xs bg-slate-900 text-white font-mono focus:outline-none focus:border-yellow-400"
                required
              />
            </div>

            {/* STQC Digital Token Key */}
            <div>
              <label className="font-bold text-slate-200 mb-1.5 block">
                STQC Digital Cryptographic Token Hash <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={stqcKey}
                onChange={(e) => setStqcKey(e.target.value)}
                className="w-full border border-slate-600 p-2.5 rounded-xs bg-slate-900 text-yellow-300 font-mono text-[11px] focus:outline-none focus:border-yellow-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-3 rounded-xs transition flex items-center justify-center space-x-1.5 shadow-md cursor-pointer uppercase tracking-wider"
            >
              <Key className="w-4 h-4" />
              <span>Authenticate Officer Session & Open Queue</span>
            </button>

          </form>

          <div className="border-t border-slate-700 pt-4 text-center text-xs">
            <Link href="/citizen/login" className="text-slate-400 hover:text-white underline">
              Switch to Citizen Portal Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
