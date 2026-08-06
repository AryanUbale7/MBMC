"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  Lock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  KeyRound,
  ArrowRight,
  ChevronRight,
  AlertCircle
} from "lucide-react";

function CitizenLoginContent() {
  const { t } = useAccessibility();
  const { loginCitizen } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/apply";

  const [inputVal, setInputVal] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setError("Please enter your registered Email Address or 10-Digit Mobile Number.");
      return;
    }

    const user = loginCitizen(inputVal.trim());
    if (user) {
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-10 px-4 sm:px-8">
      <div className="max-w-md mx-auto space-y-6">

        {/* GOVERNMENT EMBLEM & PORTAL HEADER */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <img src="/images/sher.png" alt="Emblem of India" className="w-5 h-8 object-contain" />
            <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-lg font-black text-[#123B7A] uppercase tracking-wider">
            MIRA BHAYANDAR MUNICIPAL CORPORATION
          </h1>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            CITIZEN SINGLE-WINDOW E-GOVERNANCE PORTAL LOGIN
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="border-b border-[#D9E4F4] pb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#123B7A] uppercase tracking-wide">
              CITIZEN LOGIN / नागरिक प्रवेश
            </h2>
            <span className="bg-[#123B7A] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              STQC SECURED
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 text-xs font-bold p-3 rounded-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN METHOD TOGGLE */}
          <div className="flex items-center space-x-1 font-bold text-xs bg-slate-100 p-1 rounded-xs">
            <button
              type="button"
              onClick={() => setIsOtpMode(false)}
              className={`flex-1 py-1.5 rounded-xs transition ${
                !isOtpMode ? "bg-[#123B7A] text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => setIsOtpMode(true)}
              className={`flex-1 py-1.5 rounded-xs transition ${
                isOtpMode ? "bg-[#123B7A] text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              OTP Mobile Login
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            
            {/* Input Email or Mobile */}
            <div>
              <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                {isOtpMode ? "10-Digit Mobile Number" : "Mobile Number / Email Address"} <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={isOtpMode ? "tel" : "text"}
                  placeholder={isOtpMode ? "e.g. 9820199482" : "e.g. pravin.raut@mandal.org"}
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setError("");
                  }}
                  className="w-full border border-[#D9E4F4] p-2.5 pl-8 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                  required
                />
                {isOtpMode ? (
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                ) : (
                  <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                )}
              </div>
            </div>

            {/* Password Field (if password mode) */}
            {!isOtpMode ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-[#1B2B4D] block">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <a href="#forgot" className="text-[11px] font-bold text-[#123B7A] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter Portal Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#D9E4F4] p-2.5 pl-8 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xs text-[11px] text-[#123B7A] font-medium">
                OTP will be sent to your registered mobile number upon clicking Login.
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#123B7A] rounded-xs"
                />
                <span className="font-medium text-slate-700 text-[11px]">Remember login credentials</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#123B7A] hover:bg-[#1E4F91] text-white font-extrabold text-xs py-3 rounded-xs transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer uppercase tracking-wider"
            >
              <span>{isOtpMode ? "Send OTP & Login" : "Authenticate & Proceed"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* REGISTER LINK */}
          <div className="border-t border-[#D9E4F4] pt-4 text-center text-xs">
            <span className="text-slate-600 font-medium">Don't have a Citizen Account? </span>
            <Link href="/citizen/register" className="font-extrabold text-[#123B7A] hover:underline">
              Create New Citizen Account
            </Link>
          </div>

        </div>

        {/* OFFICER PORTAL ACCESS LINK */}
        <div className="bg-slate-100 border border-slate-300 p-3 rounded-xs text-center text-xs space-y-1">
          <span className="text-slate-700 font-bold block">MBMC Government Officer Access Only:</span>
          <Link href="/officer/login" className="font-extrabold text-amber-900 hover:underline inline-flex items-center space-x-1">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Go to Officer Portal Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CitizenLoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-gov-primary font-bold">Loading Citizen Portal Login...</div>}>
      <CitizenLoginContent />
    </Suspense>
  );
}
