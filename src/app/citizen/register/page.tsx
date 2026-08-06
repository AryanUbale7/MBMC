"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  User,
  Phone,
  Mail,
  Lock,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function CitizenRegisterPage() {
  const { t } = useAccessibility();
  const { registerCitizen } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    aadhaarPan: "",
    address: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.email.trim()) {
      setError("Please fill all mandatory fields marked with *.");
      return;
    }

    registerCitizen({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      aadhaarPan: formData.aadhaarPan.trim() || "4589 1204 8812 / ABCDE1234F",
      address: formData.address.trim() || "Mira Bhayandar Municipal Area"
    });

    router.push("/apply");
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-10 px-4 sm:px-8">
      <div className="max-w-lg mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <img src="/images/sher.png" alt="Emblem of India" className="w-5 h-8 object-contain" />
            <img src="/images/mbmc_updated logo.jpg" alt="MBMC Seal" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-lg font-black text-[#123B7A] uppercase tracking-wider">
            MIRA BHAYANDAR MUNICIPAL CORPORATION
          </h1>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            NEW CITIZEN ACCOUNT REGISTRATION
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="border-b border-[#D9E4F4] pb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#123B7A] uppercase tracking-wide">
              CREATE CITIZEN PROFILE / नागरिक नोंदणी
            </h2>
            <span className="bg-[#123B7A] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              SINGLE-SIGN-ON
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 text-xs font-bold p-3 rounded-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            
            {/* Full Name */}
            <div>
              <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                Full Applicant Name (As per Aadhaar) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Pravin Kumar Raut"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                required
              />
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. pravin@mandal.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                  10-Digit Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="e.g. 9820199482"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                  required
                />
              </div>
            </div>

            {/* Aadhaar / PAN */}
            <div>
              <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                Aadhaar / PAN Card Identification No.
              </label>
              <input
                type="text"
                placeholder="e.g. 4589 1204 8812"
                value={formData.aadhaarPan}
                onChange={(e) => setFormData({ ...formData, aadhaarPan: e.target.value })}
                className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                Complete Residential Address
              </label>
              <input
                type="text"
                placeholder="Flat / Building, Area, Mira Road East"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                Set Portal Account Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#123B7A] hover:bg-[#1E4F91] text-white font-extrabold text-xs py-3 rounded-xs transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer uppercase tracking-wider"
            >
              <span>Register & Proceed to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="border-t border-[#D9E4F4] pt-4 text-center text-xs">
            <span className="text-slate-600 font-medium">Already registered? </span>
            <Link href="/citizen/login" className="font-extrabold text-[#123B7A] hover:underline">
              Back to Citizen Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
