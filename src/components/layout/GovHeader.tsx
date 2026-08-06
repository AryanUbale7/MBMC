"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useAuth } from "@/context/AuthContext";
import {
  PhoneCall,
  Globe,
  Eye,
  Search,
  User,
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  Calendar,
  BookOpen,
  Download,
  HelpCircle,
  X,
  Lock,
  Key
} from "lucide-react";

export default function GovHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { fontSize, setFontSize, highContrast, setHighContrast, language, setLanguage, t } = useAccessibility();
  const { citizen, officer } = useAuth();

  const [topSearch, setTopSearch] = useState("");
  const [showCitizenModal, setShowCitizenModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);

  const handleTopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (topSearch.trim()) {
      router.push(`/track?ref=${encodeURIComponent(topSearch.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white font-sans text-gov-text border-b border-gov-border shadow-gov-sm print:hidden">
      
      {/* -------------------------------------------------
          SECTION 1: UTILITY HEADER
      ------------------------------------------------- */}
      <div className="bg-[#E89B00] text-gov-footer text-xs py-1.5 px-4 sm:px-8 border-b border-amber-600 font-bold shadow-xs">
        <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2 sm:px-6">
          
          {/* Left: Government Emblem & Authority */}
          <div className="flex items-center space-x-3">
            <div className="relative w-4 h-6 flex-shrink-0">
              <img
                src="/images/sher.png"
                alt="Emblem of India"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex items-center space-x-2 font-extrabold tracking-wide text-gov-footer">
              <span>{t("Government of Maharashtra", "महाराष्ट्र शासन")}</span>
              <span className="text-amber-900">|</span>
              <span className="text-amber-950 font-black">{t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}</span>
            </div>
          </div>

          {/* Center/Right: Helpline, Search, Accessibility & Language */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-4">
            
            {/* Helpline */}
            <div className="hidden md:flex items-center space-x-1 bg-amber-900/20 px-2.5 py-0.5 rounded border border-amber-700/40 text-[11px] text-gov-footer font-extrabold">
              <PhoneCall className="w-3 h-3 text-gov-footer" />
              <span>{t("Toll-Free Helpline: 1800-22-3424", "टोल-फ्री हेल्पलाइन: १८००-२२-३४२४")}</span>
            </div>

            {/* Quick Header Search */}
            <form onSubmit={handleTopSearch} className="relative hidden lg:flex items-center">
              <input
                type="text"
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                placeholder={t("Search Ref / Portal...", "अर्जाचा क्रमांक शोधा...")}
                className="bg-white/90 text-gov-footer placeholder-amber-900/70 text-[11px] rounded pl-2.5 pr-7 py-0.5 outline-none border border-amber-700/40 focus:ring-1 focus:ring-gov-footer w-48 font-bold"
              />
              <button type="submit" className="absolute right-1.5 text-gov-footer hover:text-black">
                <Search className="w-3 h-3" />
              </button>
            </form>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-extrabold transition border ${
                highContrast
                  ? "bg-black text-white border-black"
                  : "bg-amber-900/20 hover:bg-amber-900/30 text-gov-footer border-amber-700/40"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{highContrast ? t("Normal", "सामान्य") : t("Contrast", "कॉन्ट्रास्ट")}</span>
            </button>

            {/* Font Size Adjusters */}
            <div className="flex items-center space-x-1 bg-amber-900/20 px-1.5 py-0.5 rounded border border-amber-700/40">
              <span className="text-[10px] text-gov-footer mr-0.5 font-bold">{t("Font:", "फॉन्ट:")}</span>
              <button
                onClick={() => setFontSize("sm")}
                className={`px-1 rounded text-[11px] font-extrabold ${fontSize === "sm" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`px-1 rounded text-[11px] font-extrabold ${fontSize === "md" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-1 rounded text-[11px] font-extrabold ${fontSize === "lg" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-700/40 text-xs font-bold">
              <Globe className="w-3 h-3 text-gov-footer" />
              <button
                onClick={() => setLanguage("EN")}
                className={`px-1 text-xs font-extrabold ${language === "EN" ? "text-gov-footer underline" : "text-amber-950 hover:text-black"}`}
              >
                English
              </button>
              <span className="text-amber-800">/</span>
              <button
                onClick={() => setLanguage("MR")}
                className={`px-1 text-xs font-extrabold ${language === "MR" ? "text-gov-footer underline" : "text-amber-950 hover:text-black"}`}
              >
                मराठी
              </button>
            </div>

            {/* Academic Prototype Badge */}
            <span className="hidden xl:inline-block px-2 py-0.5 bg-gov-footer text-white rounded text-[10px] font-black uppercase tracking-wider">
              {t("Academic Prototype", "शैक्षणिक नमुना")}
            </span>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------
          SECTION 2: MAIN HEADER
      ------------------------------------------------- */}
      <div className="bg-white py-5 px-4 sm:px-8 border-b border-gov-border">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-2 sm:px-6">
          
          {/* MBMC Logo & Portal Title */}
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
              <img
                src="/images/mbmc_updated logo.jpg"
                alt="MBMC Official Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-gov-primary text-white rounded">
                  {t("MBMC e-Governance", "एमबीएमसी ई-गव्हर्नन्स")}
                </span>
                <span className="text-xs text-gov-muted font-medium">
                  {t("Unified Single-Window Clearance Portal", "एककृत एकल खिडकी परवानगी पोर्टल")}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-tight leading-tight mt-0.5">
                {t("Urban Event Permission & Coordination Platform (UECP)", "नागरी कार्यक्रम परवानगी व समन्वय प्रणाली (यूईसीपी)")}
              </h1>
              <p className="text-xs sm:text-sm text-gov-muted font-medium mt-0.5">
                {t("Department of Urban Governance & Citizen Services • Mira Bhayandar Municipal Corporation", "नगर प्रशासन व नागरी सुविधा विभाग • मीरा भाईंदर महानगरपालिका")}
              </p>
            </div>
          </div>

          {/* Right Action Logins & Academic Seals */}
          <div className="flex items-center space-x-3">
            {/* Citizen Login / Dashboard Button */}
            {citizen ? (
              <Link
                href="/citizen/dashboard"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="truncate max-w-[120px]">{citizen.fullName}</span>
              </Link>
            ) : (
              <Link
                href="/citizen/login"
                className="bg-gov-surface hover:bg-gov-border text-gov-primary border border-gov-border font-bold text-xs px-4 py-2.5 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <User className="w-4 h-4 text-gov-secondary" />
                <span>{t("Citizen Login", "नागरिक लॉगिन")}</span>
              </Link>
            )}

            {/* Officer Login / Dashboard Link */}
            {officer ? (
              <Link
                href="/officer/dashboard"
                className="bg-[#123B7A] hover:bg-[#1E4F91] text-white font-bold text-xs px-3.5 py-2.5 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span className="truncate max-w-[120px]">Officer Portal</span>
              </Link>
            ) : (
              <Link
                href="/officer/login"
                className="bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs px-4 py-2.5 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-gov-accent" />
                <span>{t("Officer Login", "अधिकारी लॉगिन")}</span>
              </Link>
            )}

            {/* Divider & Prominent Header Logos (State Emblem, SLRTCE & IT Dept) */}
            <div className="hidden lg:flex items-center space-x-4 border-l-2 border-gov-border pl-5 ml-2">
              <img
                src="/images/sher.png"
                alt="Emblem of India"
                className="h-20 sm:h-26 w-auto object-contain"
                title="State Emblem of India"
              />
              <img
                src="/images/SLRTCElogo.png"
                alt="SLRTCE Logo"
                className="h-20 sm:h-26 w-20 sm:w-26 object-contain"
                title="Shree L. R. Tiwari College of Engineering"
              />
              <img
                src="/images/IT.png"
                alt="IT Department Seal"
                className="h-20 sm:h-26 w-20 sm:w-26 object-contain"
                title="Department of Information Technology"
              />
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------
          SECTION 3: NAVIGATION BAR
      ------------------------------------------------- */}
      <nav className="bg-gov-navbar text-white shadow-gov-md">
        <div className="w-full px-2 sm:px-6 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 py-1">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname === "/" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t("Home", "मुख्य पृष्ठ")}</span>
            </Link>

            <Link
              href="/apply"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname === "/apply" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t("Apply Permission", "परवानगी अर्ज करा")}</span>
            </Link>

            <Link
              href="/track"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname === "/track" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("Track Application", "अर्जाची स्थिती खेळा")}</span>
            </Link>

            <Link
              href="/officer/login"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname.startsWith("/officer") ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-gov-accent" />
              <span>{t("Officer Portal", "अधिकारी दालन")}</span>
            </Link>

            <Link
              href="/venues"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname === "/venues" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t("Public Notices", "सार्वजनिक सूचना")}</span>
            </Link>

            <Link
              href="/downloads"
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                pathname === "/downloads" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{t("Downloads", "फॉर्म्स व डाऊनलोड्स")}</span>
            </Link>

            <a
              href="/#emergency-contacts"
              className="flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap hover:bg-[#343AB8] text-white"
            >
              <PhoneCall className="w-4 h-4 text-gov-accent" />
              <span>{t("Contact", "संपर्क व आपत्कालीन")}</span>
            </a>
          </div>

          <div className="hidden xl:flex items-center space-x-2 text-xs text-blue-200">
            <span>{t("STQC Certified • WCAG 2.1 AAA", "एसटीक्यूसी प्रमाणित • डब्ल्यूसीएजी २.१ एएए")}</span>
          </div>
        </div>
      </nav>

      {/* CITIZEN LOGIN MODAL */}
      {showCitizenModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-gov-lg border-2 border-gov-primary max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gov-border pb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gov-primary" />
                <h3 className="text-base font-bold text-gov-primary">{t("Citizen Portal Login", "नागरिक पोर्टल लॉगिन")}</h3>
              </div>
              <button onClick={() => setShowCitizenModal(false)} className="text-gov-muted hover:text-gov-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gov-muted">
              {t("Log in using Mobile OTP or DigiLocker to view saved applications & certificates.", "जतन केलेले अर्ज व दाखले पाहण्यासाठी मोबाईल ओटीपी किंवा डिजीलॉकर द्वारे लॉगिन करा.")}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setShowCitizenModal(false); alert("Simulated OTP Login Successful!"); }} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gov-text block mb-1">{t("Mobile Number / Aadhaar", "मोबाईल क्रमांक / आधार")}</label>
                <input
                  type="text"
                  placeholder="Enter 10-digit Mobile No."
                  className="w-full bg-white border border-gov-border rounded p-2 text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-gov-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs py-2.5 rounded transition cursor-pointer"
              >
                {t("Send OTP & Log In", "ओटीपी पाठवा व लॉगिन करा")}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-gov-border">
              <span className="text-[11px] text-gov-muted">Protected by Govt of Maharashtra e-Pramaan Single Sign-On</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
