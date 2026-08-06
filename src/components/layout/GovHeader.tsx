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
  Key,
  Menu
} from "lucide-react";

export default function GovHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { fontSize, setFontSize, highContrast, setHighContrast, language, setLanguage, t } = useAccessibility();
  const { citizen, officer } = useAuth();

  const [topSearch, setTopSearch] = useState("");
  const [showCitizenModal, setShowCitizenModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
      <div className="bg-[#E89B00] text-gov-footer text-xs py-2 px-4 sm:px-8 lg:px-12 border-b border-amber-600 font-bold shadow-xs w-full overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2.5">
          
          {/* Left: Government Emblem & Authority */}
          <div className="flex items-center space-x-2.5 text-[11px] sm:text-xs text-center md:text-left flex-wrap justify-center md:justify-start">
            <div className="relative w-5 h-7 sm:w-6 sm:h-8 flex-shrink-0">
              <img
                src="/images/sher.png"
                alt="Emblem of India"
                className="w-full h-full object-contain filter drop-shadow-xs"
                width="24"
                height="32"
              />
            </div>
            <div className="flex items-center space-x-2 font-extrabold tracking-wide text-gov-footer text-xs sm:text-sm">
              <span>{t("Govt of Maharashtra", "महाराष्ट्र शासन")}</span>
              <span className="text-amber-900">|</span>
              <span className="text-amber-950 font-black">{t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}</span>
            </div>
          </div>

          {/* Right: Helpline, Search, Accessibility & Language */}
          <div className="flex items-center flex-wrap justify-center md:justify-end gap-2.5 text-xs">
            
            {/* Helpline */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-amber-900/20 px-2.5 py-1 rounded border border-amber-700/40 text-gov-footer font-extrabold">
              <PhoneCall className="w-3.5 h-3.5 text-gov-footer" />
              <span>{t("Helpline: 1800-22-3424", "हेल्पलाइन: १८००-२२-३४२४")}</span>
            </div>

            {/* Quick Header Search */}
            <form onSubmit={handleTopSearch} className="relative hidden md:flex items-center">
              <input
                type="text"
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                placeholder={t("Search Ref...", "अर्जाचा क्र...")}
                className="bg-white/90 text-gov-footer placeholder-amber-900/70 text-xs rounded pl-2.5 pr-7 py-1 outline-none border border-amber-700/40 w-32 lg:w-44 font-bold"
              />
              <button type="submit" className="absolute right-2 text-gov-footer hover:text-black">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-extrabold transition border ${
                highContrast
                  ? "bg-black text-white border-black"
                  : "bg-amber-900/20 hover:bg-amber-900/30 text-gov-footer border-amber-700/40"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{highContrast ? t("Normal", "सामान्य") : t("Contrast", "कॉन्ट्रास्ट")}</span>
            </button>

            {/* Font Size Adjusters */}
            <div className="flex items-center space-x-1 bg-amber-900/20 px-1.5 py-1 rounded border border-amber-700/40">
              <span className="text-xs text-gov-footer mr-0.5 font-bold">{t("Font:", "फॉन्ट:")}</span>
              <button
                onClick={() => setFontSize("sm")}
                className={`px-1.5 rounded text-xs font-extrabold ${fontSize === "sm" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`px-1.5 rounded text-xs font-extrabold ${fontSize === "md" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-1.5 rounded text-xs font-extrabold ${fontSize === "lg" ? "bg-gov-footer text-white" : "text-gov-footer hover:text-black"}`}
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-amber-900/20 px-2 py-1 rounded border border-amber-700/40 text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-gov-footer" />
              <button
                onClick={() => setLanguage("EN")}
                className={`px-1 text-xs font-extrabold ${language === "EN" ? "text-gov-footer underline" : "text-amber-950 hover:text-black"}`}
              >
                EN
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
            <span className="hidden xl:inline-block px-2 py-1 bg-gov-footer text-white rounded text-xs font-black uppercase tracking-wider">
              {t("Academic Prototype", "शैक्षणिक नमुना")}
            </span>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------
          SECTION 2: MAIN HEADER
      ------------------------------------------------- */}
      <div className="bg-white py-4 sm:py-5 px-4 sm:px-8 lg:px-12 border-b border-gov-border w-full overflow-hidden">
        <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* MBMC Logo & Portal Title */}
          <div className="flex items-center space-x-4 sm:space-x-6 w-full xl:w-auto text-left">
            <img
              src="/images/mbmc_updated logo.jpg"
              alt="MBMC Official Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain flex-shrink-0"
              width="144"
              height="144"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider bg-gov-primary text-white rounded">
                  {t("MBMC e-Governance", "एमबीएमसी ई-गव्हर्नन्स")}
                </span>
                <span className="text-xs sm:text-sm text-gov-muted font-medium">
                  {t("Unified Single-Window Clearance Portal", "एककृत एकल खिडकी परवानगी पोर्टल")}
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight mt-1 break-words">
                {t("Urban Event Permission & Coordination Platform (UECP)", "नागरी कार्यक्रम परवानगी व समन्वय प्रणाली (यूईसीपी)")}
              </h1>
              <p className="text-xs sm:text-sm text-gov-muted font-medium mt-1 hidden sm:block">
                {t("Department of Urban Governance & Citizen Services • Mira Bhayandar Municipal Corporation", "नगर प्रशासन व नागरी सुविधा विभाग • मीरा भाईंदर महानगरपालिका")}
              </p>
            </div>
          </div>

          {/* Right Action Logins & Academic Seals */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 w-full xl:w-auto">
            {/* Citizen Login / Dashboard Button */}
            {citizen ? (
              <Link
                href="/citizen/dashboard"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="truncate max-w-[140px]">{citizen.fullName}</span>
              </Link>
            ) : (
              <Link
                href="/citizen/login"
                className="bg-gov-surface hover:bg-gov-border text-gov-primary border border-gov-border font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gov-secondary" />
                <span>{t("Citizen Login", "नागरिक लॉगिन")}</span>
              </Link>
            )}

            {/* Officer Login / Dashboard Link */}
            {officer ? (
              <Link
                href="/officer/dashboard"
                className="bg-[#123B7A] hover:bg-[#1E4F91] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="truncate max-w-[140px]">Officer Portal</span>
              </Link>
            ) : (
              <Link
                href="/officer/login"
                className="bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-gov-sm flex items-center space-x-2 transition shadow-gov-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gov-accent" />
                <span>{t("Officer Login", "अधिकारी लॉगिन")}</span>
              </Link>
            )}

            {/* Prominent Header Logos (State Emblem, SLRTCE & IT Dept) */}
            <div className="hidden lg:flex items-center space-x-4 border-l-2 border-gov-border pl-5 ml-2">
              <img
                src="/images/sher.png"
                alt="Emblem of India"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                title="State Emblem of India"
                width="80"
                height="112"
              />
              <img
                src="/images/SLRTCElogo.png"
                alt="SLRTCE Logo"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                title="Shree L. R. Tiwari College of Engineering"
                width="112"
                height="112"
              />
              <img
                src="/images/IT.png"
                alt="IT Department Seal"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                title="Department of Information Technology"
                width="112"
                height="112"
              />
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------
          SECTION 3: NAVIGATION BAR WITH MOBILE TOGGLE
      ------------------------------------------------- */}
      <nav className="bg-gov-navbar text-white shadow-gov-md w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-1.5 lg:py-1">
            
            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 py-1 flex-wrap">
              <Link
                href="/"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname === "/" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t("Home", "मुख्य पृष्ठ")}</span>
              </Link>

              <Link
                href="/apply"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname === "/apply" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t("Apply Permission", "परवानगी अर्ज करा")}</span>
              </Link>

              <Link
                href="/track"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname === "/track" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("Track Application", "अर्जाची स्थिती खेळा")}</span>
              </Link>

              <Link
                href="/officer/login"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname.startsWith("/officer") ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-gov-accent" />
                <span>{t("Officer Portal", "अधिकारी दालन")}</span>
              </Link>

              <Link
                href="/venues"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname === "/venues" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t("Public Notices", "सार्वजनिक सूचना")}</span>
              </Link>

              <Link
                href="/downloads"
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                  pathname === "/downloads" ? "bg-[#252BB0] text-gov-accent border-b-2 border-gov-accent font-bold shadow-xs" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{t("Downloads", "फॉर्म्स व डाऊनलोड्स")}</span>
              </Link>

              <a
                href="/#emergency-contacts"
                className="flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors hover:bg-[#343AB8] text-white"
              >
                <PhoneCall className="w-4 h-4 text-gov-accent" />
                <span>{t("Contact", "संपर्क व आपत्कालीन")}</span>
              </a>
            </div>

            <div className="hidden xl:flex items-center space-x-2 text-xs text-blue-200">
              <span>{t("STQC Certified • WCAG 2.1 AAA", "एसटीक्यूसी प्रमाणित • डब्ल्यूसीएजी २.१ एएए")}</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center justify-between w-full py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gov-accent flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span>MBMC Portal Menu</span>
              </span>
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="p-1.5 rounded-md bg-[#252BB0] text-white hover:bg-[#343AB8] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Accordion Drawer */}
          {isMobileNavOpen && (
            <div className="lg:hidden border-t border-blue-800 py-3 space-y-2 flex flex-col">
              <Link
                href="/"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname === "/" ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t("Home", "मुख्य पृष्ठ")}</span>
              </Link>

              <Link
                href="/apply"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname === "/apply" ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t("Apply Permission", "परवानगी अर्ज करा")}</span>
              </Link>

              <Link
                href="/track"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname === "/track" ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("Track Application", "अर्जाची स्थिती खेळा")}</span>
              </Link>

              <Link
                href="/officer/login"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname.startsWith("/officer") ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-gov-accent" />
                <span>{t("Officer Portal", "अधिकारी दालन")}</span>
              </Link>

              <Link
                href="/venues"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname === "/venues" ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t("Public Notices", "सार्वजनिक सूचना")}</span>
              </Link>

              <Link
                href="/downloads"
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md ${
                  pathname === "/downloads" ? "bg-[#252BB0] text-gov-accent" : "hover:bg-[#343AB8] text-white"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{t("Downloads", "फॉर्म्स व डाऊनलोड्स")}</span>
              </Link>

              <a
                href="/#emergency-contacts"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 text-xs font-bold rounded-md hover:bg-[#343AB8] text-white"
              >
                <PhoneCall className="w-4 h-4 text-gov-accent" />
                <span>{t("Contact", "संपर्क व आपत्कालीन")}</span>
              </a>
            </div>
          )}

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
