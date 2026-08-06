"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { DEPARTMENTS, MBMC_VENUES } from "@/data/mbmcData";
import {
  Search,
  FileText,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Flame,
  Volume2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  Check,
  ChevronRight,
  Download,
  FileCheck2,
  PhoneCall,
  ChevronLeft,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Radio,
  Bell,
  Eye,
  FileCode,
  Paperclip
} from "lucide-react";

export default function HomePage() {
  const { t } = useAccessibility();
  const router = useRouter();

  // Pure Banner Carousel Slider State (Full Natural Image, Zero Controls Bar)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      id: 1,
      alt: "Mira Bhayandar Municipal Corporation Headquarters",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
    },
    {
      id: 2,
      alt: "Sarvajanik Festival & Cultural Grounds",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80"
    },
    {
      id: 3,
      alt: "Mira Bhayandar Public Infrastructure & City Plaza",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
    }
  ];

  // Auto-play Slider Timer (6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Official Government Notice Board Category State
  const [activeNoticeTab, setActiveNoticeTab] = useState<"circulars" | "tenders" | "public_notices" | "emergency">("circulars");

  return (
    <div className="space-y-8 pb-16 font-sans text-gov-text bg-gov-bg">

      {/* -------------------------------------------------
          SECTION 4: PURE NATURAL GOVERNMENT IMAGE BANNER SLIDER
      ------------------------------------------------- */}
      <section className="w-full relative overflow-hidden bg-white border-b-4 border-gov-accent shadow-gov-md group">
        
        {/* Full-Width Image Container */}
        <div className="w-full h-[440px] sm:h-[480px] lg:h-[520px] relative">
          
          {/* Natural Bright Banner Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].alt}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </div>

          {/* Minimal Top Identification Badge */}
          <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 relative z-10 flex flex-col justify-between py-6 pointer-events-none">
            <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-gov-sm border border-gov-border shadow-gov-sm w-fit pointer-events-auto">
              <img
                src="/images/sher.png"
                alt="Emblem of India"
                className="w-4 h-6 object-contain"
              />
              <img
                src="/images/mbmc_updated logo.jpg"
                alt="MBMC Seal"
                className="w-8 h-8 object-contain rounded-full border border-gov-border"
              />
              <span className="text-xs font-bold text-gov-primary uppercase tracking-wider">
                {t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}
              </span>
            </div>

            {/* Floating Navigation Chevrons */}
            <div className="flex items-center justify-between w-full pointer-events-auto">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-gov-border flex items-center justify-center transition shadow-gov-sm text-gov-primary hover:text-gov-dark cursor-pointer opacity-80 hover:opacity-100"
                title="Previous Banner"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-gov-border flex items-center justify-center transition shadow-gov-sm text-gov-primary hover:text-gov-dark cursor-pointer opacity-80 hover:opacity-100"
                title="Next Banner"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* BREAKING NEWS TICKER BAR */}
        <div className="bg-gov-navbar text-white font-sans font-bold text-xs py-2.5 px-4 sm:px-8 border-t border-blue-900 shadow-md">
          <div className="max-w-[1440px] mx-auto flex items-center space-x-3">
            <div className="bg-gov-accent text-gov-footer px-3 py-1 rounded text-[11px] uppercase tracking-wider font-extrabold flex items-center space-x-1 flex-shrink-0 shadow-xs">
              <Bell className="w-3.5 h-3.5" />
              <span>{t("BREAKING NEWS", "महत्त्वाच्या सूचना")}</span>
            </div>
            
            <div className="overflow-hidden flex-1 relative whitespace-nowrap">
              <div className="inline-block tracking-wide text-blue-100 font-semibold space-x-8">
                <span>
                  {t(
                    "• MBMC Circular No. 42: Sarvajanik Ganesh Utsav 2026 Mandap Applications are NOW OPEN via Single-Window Portal.",
                    "• एमबीएमसी परिपत्रक क्र. ४२: सार्वजनिक गणेशोत्सव २०२६ मंडप परवानगी अर्ज ऑनलाईन सुरु."
                  )}
                </span>
                <span>
                  {t(
                    "• Mandatory CFO Fire Retardant Pandal Canvas Treatment Order strictly enforced.",
                    "• अग्निशमन दल आदेश: मंडप कापड अग्निरोधक द्रावण प्रक्रिया सक्तीची."
                  )}
                </span>
                <span>
                  {t(
                    "• High Court Noise Rules: Sound limit 55 dB daytime, 45 dB post 10:00 PM.",
                    "• ध्वनी प्रदूषण अनुपालन आदेश: रात्री १०:०० नंतर ४५ डेसिबल मर्यादा लागू."
                  )}
                </span>
                <span>
                  {t(
                    "• Emergency Control Room Helpline: 1800-22-3424 / 022-28192828 (24x7 Active).",
                    "• आपत्कालीन नियंत्रण कक्ष हेल्पलाइन: १८००-२२-३४२४ (२४ तास सुरू)."
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* -------------------------------------------------
          SECTION 5: QUICK CITIZEN SERVICES DIRECTORY (REAL SERVICE THUMBNAILS)
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
        <div className="border-b border-gov-border pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider block">
              {t("Single-Window Clearance Catalogue", "एकल खिडकी सेवा दालन")}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gov-text mt-0.5">
              {t("Quick Citizen Services Directory", "मुख्य नागरिक सेवा डायरेक्टरी")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Apply Event Permission */}
          <Link
            href="/apply"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/apply.png"
                alt="Apply Event Permission"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-gov-primary text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("CLEARANCE NOC", "परवानगी सेवा")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("Apply Event Permission", "कार्यक्रम परवानगी अर्ज")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Submit online application for Sarvajanik Ganesh Utsav, Exhibitions, Rallies, and Stage setups with multi-department NOC routing.",
                    "सार्वजनिक उत्सव, प्रदर्शने, सभा व मंडप उभारणीसाठी ऑनलाईन अर्ज करा."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("Start Application", "अर्ज सुरु करा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </Link>

          {/* Card 2: Track NOC Approval Status */}
          <Link
            href="/track"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/track.png"
                alt="Track NOC Approval Status"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("REAL-TIME TRACKING", "थेट स्थिती")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("Track NOC Approval Status", "अर्जाची स्थिती तपासा")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Monitor real-time progress across Fire Services, Police, MBMC PWD, Sanitation, and Electrical departments.",
                    "अग्निशमन, पोलीस, मनपा बांधकाम व स्वच्छता विभागाचे डिजिटल शेरे तपासा."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("Track Application Status", "अर्जाची स्थिती तपासा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </Link>

          {/* Card 3: Required Documents Checklist */}
          <Link
            href="#required-documents"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/required.png"
                alt="Required Documents Checklist"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("DOCUMENTS GUIDE", "कागदपत्रे यादी")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("Required Documents Checklist", "आवश्यक कागदपत्रे यादी")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "View mandatory document checklist including Aadhaar, PAN, Site Layout CAD Plan, and Society NOC.",
                    "आधार, पॅन, मंडप आराखडा व जागा मालक ना-हरकत पत्राची आवश्यक यादी पहा."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("Check Required Docs", "कागदपत्रे यादी पहा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </Link>

          {/* Card 4: Public Ground Availability */}
          <Link
            href="/venues"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/public_ground.png"
                alt="Public Ground Availability"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("VENUE BOOKING", "मैदान वेळापत्रक")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("Public Ground Availability", "सार्वजनिक मैदान उपलब्धता")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Check real-time availability schedule for Netaji Bose Ground, Shanti Nagar Field, and MBMC Plazas.",
                    "नेताजी सुभाषचंद्र बोस मैदान, शांती नगर क्रीडा संकुल व मनपा मैदानांची उपलब्धता पाहू शकता."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("View Ground Schedule", "मैदान वेळापत्रक पहा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </Link>

          {/* Card 5: NOC Rules & Sound Guidelines */}
          <Link
            href="/guidelines"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/noc.png"
                alt="NOC Rules & Sound Guidelines"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-sky-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("COMPLIANCE RULES", "सुरक्षा नियमावली")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("NOC Rules & Sound Guidelines", "ध्वनी व सुरक्षा मार्गदर्शक नियम")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "High Court mandated noise level rules (dB standards), CFO fire safety norms, and solid waste disposal policy.",
                    "ध्वनी मर्यादा नियम (डेसिबल मानके), अग्निशमन सुरक्षा व स्वच्छता नियमावली."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("Read Guidelines", "नियमावली वाचा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </Link>

          {/* Card 6: Help Centre & Emergency Contacts */}
          <a
            href="#emergency-contacts"
            className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-gov-primary hover:shadow-gov-md transition-all duration-300 block"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <img
                src="/images/services/help.png"
                alt="Help Centre & Emergency Contacts"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {t("24x7 HELPLINES", "आपत्कालीन संपर्क")}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-gov-primary transition-colors">
                  {t("Help Centre & Emergency Contacts", "मदत केंद्र व आपत्कालीन क्रमांक")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Direct contact numbers for MBMC Disaster Management Cell, Fire Brigade Control, Police, and Ward Officers.",
                    "आपत्ती व्यवस्थापन कक्ष, अग्निशमन दल, पोलीस व प्रभाग अधिकाऱ्यांचे थेट नंबर."
                  )}
                </p>
              </div>
              <div className="text-xs font-extrabold text-gov-primary flex items-center space-x-1 pt-2 border-t border-slate-100">
                <span>{t("View Emergency Contacts", "संपर्क क्रमांक पहा")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-accent" />
              </div>
            </div>
          </a>

        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 6: REALISTIC PINNED A4 PAPER GOVERNMENT NOTICE BOARD
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-5">
        
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gov-border pb-4 gap-3">
          <div>
            <span className="text-[11px] font-extrabold text-gov-primary uppercase tracking-widest block">
              {t("E-GOVERNANCE DOCUMENT REPOSITORY", "ई-प्रशासकीय सूचना फलक")}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gov-text mt-0.5 flex items-center space-x-2">
              <span>📌</span>
              <span>{t("Official Notice Board", "अधिकृत मनपा सूचना फलक")}</span>
            </h2>
            <p className="text-xs text-gov-muted font-medium mt-0.5">
              {t(
                "Latest Circulars, Government Orders, Public Notices, Tender Documents and Official Announcements.",
                "मीरा भाईंदर मनपा व पोलीस प्रशासनाचे अद्ययावत परिपत्रक, सार्वजनिक सूचना व निविदा दाखले."
              )}
            </p>
          </div>

          <Link
            href="/guidelines"
            className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1.5 self-start sm:self-auto whitespace-nowrap bg-white border border-[#DCE6F7] px-3.5 py-2 rounded-gov-sm shadow-xs transition"
          >
            <span>{t("View All Notices", "सर्व सूचना पहा")}</span>
            <ArrowRight className="w-4 h-4 text-gov-accent" />
          </Link>
        </div>

        {/* Official Category Underline Tab Bar */}
        <div className="flex items-center space-x-6 border-b border-[#DCE6F7] text-xs sm:text-sm font-bold overflow-x-auto pt-1">
          <button
            onClick={() => setActiveNoticeTab("circulars")}
            className={`pb-2.5 transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeNoticeTab === "circulars"
                ? "border-b-2 border-[#123B7A] text-[#123B7A] font-extrabold"
                : "text-gov-muted hover:text-gov-text border-b-2 border-transparent font-medium"
            }`}
          >
            <FileText className="w-4 h-4 text-[#123B7A]" />
            <span>{t("Circulars", "परिपत्रके")}</span>
          </button>

          <button
            onClick={() => setActiveNoticeTab("tenders")}
            className={`pb-2.5 transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeNoticeTab === "tenders"
                ? "border-b-2 border-[#123B7A] text-[#123B7A] font-extrabold"
                : "text-gov-muted hover:text-gov-text border-b-2 border-transparent font-medium"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-700" />
            <span>{t("Tenders", "निविदा")}</span>
          </button>

          <button
            onClick={() => setActiveNoticeTab("public_notices")}
            className={`pb-2.5 transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeNoticeTab === "public_notices"
                ? "border-b-2 border-[#123B7A] text-[#123B7A] font-extrabold"
                : "text-gov-muted hover:text-gov-text border-b-2 border-transparent font-medium"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>{t("Public Notices", "सार्वजनिक सूचना")}</span>
          </button>

          <button
            onClick={() => setActiveNoticeTab("emergency")}
            className={`pb-2.5 transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2 ${
              activeNoticeTab === "emergency"
                ? "border-b-2 border-[#123B7A] text-[#123B7A] font-extrabold"
                : "text-gov-muted hover:text-gov-text border-b-2 border-transparent font-medium"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{t("Emergency Advisories", "आपत्कालीन सूचना")}</span>
          </button>
        </div>

        {/* REALISTIC PINNED NOTICE BOARD CONTAINER (Warm tone + Wooden Border Frame) */}
        <div className="bg-[#F5F2EC] border-4 sm:border-8 border-[#8B5A2B] rounded-gov-md shadow-md p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle MBMC Watermark (3% Opacity) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] z-0 overflow-hidden">
            <img
              src="/images/mbmc_updated logo.jpg"
              alt="MBMC Watermark"
              className="w-[650px] h-[650px] object-contain"
            />
          </div>

          {/* PINNED A4 PAPER NOTICES GRID (Desktop: 3, Tablet: 2, Mobile: 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 py-2">
            
            {/* PAPER SHEET 1: Fire Safety Circular */}
            <div className="bg-white border border-slate-300 shadow-md p-5 rounded-xs relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-4 -rotate-1 group">
              {/* Realistic Push Pin */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 text-xl select-none drop-shadow-xs">
                📌
              </div>

              {/* Blue Header Strip */}
              <div className="bg-[#123B7A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xs uppercase tracking-wider flex items-center justify-between">
                <span>MBMC MUNICIPAL GAZETTE</span>
                <span className="bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase tracking-wider animate-pulse">
                  NEW
                </span>
              </div>

              {/* Filename & PDF Icon */}
              <div className="space-y-1.5 border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2 text-red-600 font-mono font-bold text-xs">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-slate-900 font-extrabold">Fire_Safety_Circular_2026.pdf</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t(
                    "MBMC Circular No. 42: Mandatory Fire Retardant Coating for Sarvajanik Pandals 2026.",
                    "एमबीएमसी परिपत्रक क्र. ४२: सार्वजनिक गणेशोत्सव मंडपांसाठी अग्निरोधक द्रावण प्रक्रिया सक्तीची."
                  )}
                </h4>
              </div>

              {/* Metadata Grid */}
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs text-[11px] font-mono grid grid-cols-2 gap-1.5 text-slate-700">
                <div><span className="font-bold text-slate-900">Issued:</span> 05 Aug 2026</div>
                <div><span className="font-bold text-slate-900">Dept:</span> CFO Fire Cell</div>
                <div><span className="font-bold text-slate-900">Size:</span> 2.4 MB</div>
                <div><span className="font-bold text-slate-900">Ref:</span> MBMC/CFO/42</div>
              </div>

              {/* Short Summary */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-2">
                {t(
                  "Official Chief Fire Officer mandate enforcing ammonium phosphate fire retardant canvas treatment across all Ganesh Utsav pandals within MBMC limits.",
                  "सर्व सार्वजनिक गणेशोत्सव मंडळांनी कापडावर सक्तीने अग्निरोधक द्रावण प्रक्रिया करून अग्निशमन दलाकडून प्रमाणपत्र घेणे अनिवार्य आहे."
                )}
              </p>

              {/* Bottom Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href="/guidelines"
                  className="border border-[#123B7A]/40 text-[#123B7A] hover:bg-[#123B7A]/10 rounded px-2.5 py-1 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </Link>

                <Link
                  href="/guidelines"
                  className="bg-[#123B7A] text-white hover:bg-[#0B254E] rounded px-3 py-1 text-xs font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </Link>
              </div>
            </div>


            {/* PAPER SHEET 2: Noise Pollution Directive */}
            <div className="bg-white border border-slate-300 shadow-md p-5 rounded-xs relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-4 rotate-1 group">
              {/* Push Pin */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 text-xl select-none drop-shadow-xs">
                📌
              </div>

              {/* Blue Header Strip */}
              <div className="bg-[#123B7A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xs uppercase tracking-wider flex items-center justify-between">
                <span>LAW ENFORCEMENT DIRECTIVE</span>
                <span className="bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase tracking-wider animate-pulse">
                  NEW
                </span>
              </div>

              {/* Filename & PDF Icon */}
              <div className="space-y-1.5 border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2 text-red-600 font-mono font-bold text-xs">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-slate-900 font-extrabold">Noise_Pollution_Compliance_2026.pdf</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t(
                    "High Court Noise Regulations: Sound limit 55 dB daytime, 45 dB post 10:00 PM.",
                    "ध्वनी प्रदूषण अनुपालन आदेश: रात्री १०:०० नंतर ४५ डेसिबल मर्यादा लागू."
                  )}
                </h4>
              </div>

              {/* Metadata Grid */}
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs text-[11px] font-mono grid grid-cols-2 gap-1.5 text-slate-700">
                <div><span className="font-bold text-slate-900">Issued:</span> 01 Aug 2026</div>
                <div><span className="font-bold text-slate-900">Dept:</span> MBVV Police</div>
                <div><span className="font-bold text-slate-900">Size:</span> 1.8 MB</div>
                <div><span className="font-bold text-slate-900">Ref:</span> MBVV/POL/18</div>
              </div>

              {/* Short Summary */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-2">
                {t(
                  "High Court sound regulations enforcing strict decibel limits. Loudspeakers permitted until 10:00 PM with mandatory decibel limiters.",
                  "मा. उच्च न्यायालयाच्या आदेशानुसार रात्री १०:०० वाजेपर्यंत ध्वनिक्षेपकास परवानगी असून मर्यादेचे पालन सक्तीचे आहे."
                )}
              </p>

              {/* Bottom Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href="/guidelines"
                  className="border border-[#123B7A]/40 text-[#123B7A] hover:bg-[#123B7A]/10 rounded px-2.5 py-1 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </Link>

                <Link
                  href="/guidelines"
                  className="bg-[#123B7A] text-white hover:bg-[#0B254E] rounded px-3 py-1 text-xs font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </Link>
              </div>
            </div>


            {/* PAPER SHEET 3: Bio-Toilet & CCTV Tender */}
            <div className="bg-white border border-slate-300 shadow-md p-5 rounded-xs relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-4 -rotate-2 group">
              {/* Push Pin */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 text-xl select-none drop-shadow-xs">
                📌
              </div>

              {/* Blue Header Strip */}
              <div className="bg-amber-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xs uppercase tracking-wider flex items-center justify-between">
                <span>PROCUREMENT TENDER NOTICE</span>
                <span className="text-[9px] bg-amber-950 px-1.5 py-0.2 rounded font-mono">TENDER-08</span>
              </div>

              {/* Filename & PDF Icon */}
              <div className="space-y-1.5 border-b border-slate-200 pb-2">
                <div className="flex items-center space-x-2 text-red-600 font-mono font-bold text-xs">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-slate-900 font-extrabold">Tender_BioToilet_CCTV_Ghats_2026.pdf</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t(
                    "Tender Ref: TENDER-MBMC-2026/08 — Mobile Bio-Toilets & CCTV Monitoring at Immersion Ghats.",
                    "निविदा सूचना: विसर्जन घाटांसाठी मोबाईल बायो-टॉयलेट व सीसीटीव्ही यंत्रणा पुरवठा."
                  )}
                </h4>
              </div>

              {/* Metadata Grid */}
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs text-[11px] font-mono grid grid-cols-2 gap-1.5 text-slate-700">
                <div><span className="font-bold text-slate-900">Issued:</span> 28 Jul 2026</div>
                <div><span className="font-bold text-slate-900">Dept:</span> MBMC PWD</div>
                <div><span className="font-bold text-slate-900">Size:</span> 3.1 MB</div>
                <div><span className="font-bold text-slate-900">Ref:</span> TND-MBMC-08</div>
              </div>

              {/* Short Summary */}
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-2">
                {t(
                  "Procurement tender for mobile sanitation units, high-definition CCTV security rigs, and LED floodlights across all 14 immersion points.",
                  "मीरा भाईंदर क्षेत्रातील १४ विसर्जन घाटांवर तात्पुरती स्वच्छता गृहे व सुरक्षा कॅमेरे उभारणीसाठी स्पर्धात्मक निविदा मागवण्यात येत आहेत."
                )}
              </p>

              {/* Bottom Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href="/guidelines"
                  className="border border-[#123B7A]/40 text-[#123B7A] hover:bg-[#123B7A]/10 rounded px-2.5 py-1 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </Link>

                <Link
                  href="/guidelines"
                  className="bg-[#123B7A] text-white hover:bg-[#0B254E] rounded px-3 py-1 text-xs font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tender Doc</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* -------------------------------------------------
          SECTION 7: WORKFLOW SECTION (5-STEP PROCESS)
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider">
            {t("Transparent Governance Workflow", "पारदर्शक प्रशासकीय प्रक्रिया")}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gov-text">
            {t("Single-Window Permission Approval Lifecycle", "एकल खिडकी परवानगी मंजुरी टप्पे")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-gov-card border border-gov-border shadow-gov-sm text-center space-y-2">
            <div className="w-8 h-8 bg-gov-primary text-white font-bold text-xs rounded-full flex items-center justify-center mx-auto">
              1
            </div>
            <h4 className="text-sm font-bold text-gov-text">{t("Citizen Application", "नागरिक अर्ज")}</h4>
            <p className="text-[11px] text-gov-muted leading-tight">Fill online details, ward selection & venue map.</p>
          </div>

          <div className="bg-white p-5 rounded-gov-card border border-gov-border shadow-gov-sm text-center space-y-2">
            <div className="w-8 h-8 bg-gov-primary text-white font-bold text-xs rounded-full flex items-center justify-center mx-auto">
              2
            </div>
            <h4 className="text-sm font-bold text-gov-text">{t("Department Review", "विभागीय तपासणी")}</h4>
            <p className="text-[11px] text-gov-muted leading-tight">Fire, Police & PWD receive concurrent digital files.</p>
          </div>

          <div className="bg-white p-5 rounded-gov-card border border-gov-border shadow-gov-sm text-center space-y-2">
            <div className="w-8 h-8 bg-gov-primary text-white font-bold text-xs rounded-full flex items-center justify-center mx-auto">
              3
            </div>
            <h4 className="text-sm font-bold text-gov-text">{t("Officer Verification", "अधिकारी पडताळणी")}</h4>
            <p className="text-[11px] text-gov-muted leading-tight">Field safety audit & decibel compliance check.</p>
          </div>

          <div className="bg-white p-5 rounded-gov-card border border-gov-border shadow-gov-sm text-center space-y-2">
            <div className="w-8 h-8 bg-gov-primary text-white font-bold text-xs rounded-full flex items-center justify-center mx-auto">
              4
            </div>
            <h4 className="text-sm font-bold text-gov-text">{t("Digital Approval", "डिजिटल मंजुरी")}</h4>
            <p className="text-[11px] text-gov-muted leading-tight">CFO & DCP attach encrypted digital keys.</p>
          </div>

          <div className="bg-gov-primary text-white p-5 rounded-gov-card border border-gov-primary shadow-gov-sm text-center space-y-2">
            <div className="w-8 h-8 bg-gov-accent text-gov-footer font-bold text-xs rounded-full flex items-center justify-center mx-auto">
              5
            </div>
            <h4 className="text-sm font-bold text-gov-accent">{t("Permission Pass", "क्यूआर दाखला")}</h4>
            <p className="text-[11px] text-blue-100 leading-tight">Download QR certified official permission pass.</p>
          </div>

        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 8: GOVERNANCE STATISTICS COUNTER
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-gov-footer text-white rounded-gov-lg p-6 sm:p-8 shadow-gov-md border border-blue-900">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-accent font-mono">1,840+</div>
              <div className="text-xs text-blue-200">{t("Applications Received", "प्राप्त झालेले अर्ज")}</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">1,792</div>
              <div className="text-xs text-blue-200">{t("NOCs Approved", "मंजूर झालेले NOCs")}</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">48</div>
              <div className="text-xs text-blue-200">{t("Pending Audit", "प्रलंबित अर्ज")}</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">6 Depts</div>
              <div className="text-xs text-blue-200">{t("Integrated Bodies", "एकत्रित मनपा विभाग")}</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-accent font-mono">72 Hours</div>
              <div className="text-xs text-blue-200">{t("Average Processing SLA", "सरासरी कालावधी")}</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">1,792</div>
              <div className="text-xs text-blue-200">{t("QR Passes Issued", "क्यूआर दाखले जारी")}</div>
            </div>

          </div>
        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 9: OTHER GOVERNMENT SERVICES (REDESIGNED MODERN IMAGE CARDS)
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
        <div className="border-b border-gov-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider block">
              {t("Inter-Departmental Authorities", "शासकीय विभाग")}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gov-text mt-0.5">
              {t("Integrated Municipal & Other Government Services", "एकत्रित महानगरपालिका व इतर शासकीय सेवा")}
            </h2>
            <p className="text-xs text-gov-muted font-medium mt-0.5">
              {t(
                "Direct single-window routing to specialized municipal departments, emergency cells, and civic infrastructure bodies.",
                "मनपाचे विविध विभाग, आपत्कालीन कक्ष व नागरी सुविधा केंद्र जोडणी सेवा."
              )}
            </p>
          </div>
        </div>

        {/* 6 Equal Modern Government Service Cards (Desktop: 3, Tablet: 2, Mobile: 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Chief Fire Officer NOC Services */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            {/* Top 60% Image Thumbnail */}
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                alt="Chief Fire Officer NOC Services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                FIRE NOC
              </div>
            </div>

            {/* Bottom Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("Chief Fire Officer NOC Services", "अग्निशमन ना-हरकत प्रमाणपत्र सेवा")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Fire safety audit, mandap canvas treatment clearance & emergency NOC issuance.",
                    "अग्निशमन सुरक्षा तपासणी व तात्पुरती अग्निरोधक ना-हरकत दाखला प्रक्रिया."
                  )}
                </p>
              </div>

              <Link
                href="/department"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: MBVV Police Clearance Cell */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                alt="MBVV Police Clearance Cell"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                POLICE PERMIT
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("MBVV Police Clearance Cell", "पोलीस ना-हरकत व सुरक्षा कक्ष")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Loudspeaker permission, traffic route diversion NOC & crowd control safety clearance.",
                    "ध्वनिक्षेपक परवानगी, वाहतूक नियंत्रण व कायदा सुव्यवस्था ना-हरकत दाखला."
                  )}
                </p>
              </div>

              <Link
                href="/department"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: MBMC Town Planning & PWD */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="MBMC Town Planning & PWD"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                PWD STRUCTURAL
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("MBMC Town Planning & PWD", "नगररचना व सार्वजनिक बांधकाम विभाग")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Stage structural stability verification, public road encroachment & digging permits.",
                    "मंडप रचना मजबुतीकरण तपासणी व रस्ता वापर तात्पुरती ना-हरकत परवानगी."
                  )}
                </p>
              </div>

              <Link
                href="/department"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 4: Disaster Management Headquarters */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
                alt="Disaster Management Headquarters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                DISASTER CELL
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("Disaster Management Control", "आपत्ती व्यवस्थापन कक्ष व नियंत्रण")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "24x7 emergency control room monitoring, coastal high-tide alert & flood relief setup.",
                    "२४ तास आपत्कालीन नियंत्रण कक्ष, उधाणाची भरती इशारा व आपत्कालीन मदत केंद्र."
                  )}
                </p>
              </div>

              <a
                href="#emergency-contacts"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 5: Health & Sanitation NOC Cell */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
                alt="Health & Sanitation NOC Cell"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                SANITATION NOC
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("Health & Sanitation NOC Cell", "सार्वजनिक आरोग्य व स्वच्छता विभाग")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Solid waste disposal compliance, mobile bio-toilet deployment & vector control audit.",
                    "कचरा व्यवस्थापन नियम, तात्पुरती स्वच्छता गृहे व कीटक नियंत्रण तपासणी प्रमाणपत्र."
                  )}
                </p>
              </div>

              <Link
                href="/department"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 6: MBMC Estate & Property Clearance */}
          <div className="bg-white rounded-[16px] border border-[#DCE6F7] shadow-gov-sm overflow-hidden flex flex-col justify-between group hover:border-[#123B7A] hover:shadow-gov-md transition-all duration-300">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&q=80"
                alt="MBMC Estate & Property Clearance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gov-accent/20 text-gov-footer text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-gov-accent/40 uppercase tracking-wider backdrop-blur-xs">
                ESTATE DEPT
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-gov-text group-hover:text-[#123B7A] transition-colors leading-snug">
                  {t("MBMC Estate & Property Clearance", "मालमत्ता व मालमत्ता व्यवस्थापन विभाग")}
                </h3>
                <p className="text-xs text-gov-muted leading-relaxed font-medium">
                  {t(
                    "Public ground lease verification, municipal plaza booking & society NOC validation.",
                    "सार्वजनिक भूखंड भाडेपट्टी पडताळणी, मनपा जागा आरक्षण व मालकी हक्क तपासणी."
                  )}
                </p>
              </div>

              <Link
                href="/venues"
                className="text-xs font-extrabold text-[#123B7A] hover:underline flex items-center space-x-1 pt-2.5 border-t border-slate-100"
              >
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 text-gov-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 10: REQUIRED DOCUMENTS CHECKLIST
      ------------------------------------------------- */}
      <section id="required-documents" className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-gov-card border border-gov-border p-6 sm:p-8 shadow-gov-sm space-y-6">
          <div className="border-b border-gov-border pb-3">
            <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider block">
              {t("Document Readiness Guide", "कागदपत्रे मार्गदर्शक")}
            </span>
            <h3 className="text-xl font-bold text-gov-text mt-0.5">
              {t("Mandatory Documents Required for Event NOC", "कार्यक्रम एनओसी साठी आवश्यक अनिवार्य कागदपत्रे")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">1. Applicant Identity Proof</span>
              <p className="text-gov-muted">Aadhaar Card copy & PAN Card of authorized representative or trust trustee.</p>
            </div>
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">2. Site Layout CAD / Plan</span>
              <p className="text-gov-muted">Architect certified map showing stage dimensions, exit gates & fire extinguisher points.</p>
            </div>
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">3. Land Lease / Society NOC</span>
              <p className="text-gov-muted">No-Objection Certificate from private land owner or MBMC Estate Dept land lease sanction.</p>
            </div>
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">4. Fire Safety Audit Cert</span>
              <p className="text-gov-muted">Declaration copy of ammonium phosphate fire-retardant coating on pandal canvas.</p>
            </div>
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">5. Electrical Load Sanction</span>
              <p className="text-gov-muted">MSEDCL temporary power connection approval copy or licensed electrical contractor cert.</p>
            </div>
            <div className="p-4 rounded-gov-sm border border-gov-border bg-gov-bg space-y-1">
              <span className="font-bold text-gov-primary text-sm block">6. Sound & CCTV Undertaking</span>
              <p className="text-gov-muted">Decibel compliance undertaking (&lt;55dB post 10 PM) and CCTV camera deployment plan.</p>
            </div>
          </div>
        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 11: DOWNLOADS HUB & FAQS
      ------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-6 bg-white rounded-gov-card border border-gov-border p-6 shadow-gov-sm space-y-4">
            <div className="border-b border-gov-border pb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-text flex items-center space-x-2">
                <Download className="w-5 h-5 text-gov-primary" />
                <span>{t("Official Downloads & Forms", "अधिकृत अर्ज नमुने व डाऊनलोड्स")}</span>
              </h3>
            </div>

            <div className="divide-y divide-gov-border text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-gov-text">Ganesh Utsav Sarvajanik Mandap Form 2026 (PDF)</span>
                <Link href="/guidelines" className="text-gov-primary font-bold hover:underline flex items-center space-x-1">
                  <span>Download</span> <Download className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-gov-text">MBMC CFO Fire Safety Self-Declaration Format</span>
                <Link href="/guidelines" className="text-gov-primary font-bold hover:underline flex items-center space-x-1">
                  <span>Download</span> <Download className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-gov-text">MBVV Police Sound Decibel Undertaking Bond</span>
                <Link href="/guidelines" className="text-gov-primary font-bold hover:underline flex items-center space-x-1">
                  <span>Download</span> <Download className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-gov-card border border-gov-border p-6 shadow-gov-sm space-y-4">
            <div className="border-b border-gov-border pb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-text flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-gov-primary" />
                <span>{t("Frequently Asked Questions", "सतत विचारले जाणारे प्रश्न")}</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gov-bg p-3 rounded-gov-sm border border-gov-border">
                <span className="font-bold text-gov-primary block">Q: How many days prior should I submit the event permission application?</span>
                <p className="text-gov-muted mt-1">Ans: Applications should be submitted at least 7 working days prior to event commencement to allow departmental safety audits.</p>
              </div>
              <div className="bg-gov-bg p-3 rounded-gov-sm border border-gov-border">
                <span className="font-bold text-gov-primary block">Q: How do I verify the digital permission pass issued by MBMC?</span>
                <p className="text-gov-muted mt-1">Ans: Every approved pass contains an encrypted QR Code. Police and MBMC officers can scan the QR code to verify validity live on mbmc.gov.in.</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* -------------------------------------------------
          SECTION 12: EMERGENCY CONTACTS MATRIX
      ------------------------------------------------- */}
      <section id="emergency-contacts" className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-gov-card border border-gov-border p-6 sm:p-8 shadow-gov-sm space-y-4">
          <div className="border-b border-gov-border pb-3">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
              {t("24x7 Emergency Services", "२४x७ आपत्कालीन संपर्क")}
            </span>
            <h3 className="text-xl font-bold text-gov-text mt-0.5">
              {t("MBMC Emergency Helpline Numbers", "महानगरपालिका आपत्कालीन संपर्क क्रमांक")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-red-50 border border-red-200 p-4 rounded-gov-sm space-y-1">
              <span className="font-extrabold text-red-900 text-sm block">MBVV Police Emergency</span>
              <span className="font-mono text-lg font-bold text-red-700 block">Tel: 112 / 022-29452100</span>
              <span className="text-[11px] text-red-800">Mira-Bhayandar Police Control Room</span>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-gov-sm space-y-1">
              <span className="font-extrabold text-amber-900 text-sm block">MBMC Fire Control</span>
              <span className="font-mono text-lg font-bold text-amber-800 block">Tel: 101 / 022-28192323</span>
              <span className="text-[11px] text-amber-900">Chief Fire Officer Emergency Cell</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-gov-sm space-y-1">
              <span className="font-extrabold text-gov-primary text-sm block">Medical & Ambulance</span>
              <span className="font-mono text-lg font-bold text-gov-primary block">Tel: 108 / 022-28192828</span>
              <span className="text-[11px] text-blue-900">MBMC Municipal Hospital Cell</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-gov-sm space-y-1">
              <span className="font-extrabold text-emerald-900 text-sm block">Disaster Management</span>
              <span className="font-mono text-lg font-bold text-emerald-800 block">Tel: 1800-22-3424</span>
              <span className="text-[11px] text-emerald-950">Toll-Free Control Headquarters</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
