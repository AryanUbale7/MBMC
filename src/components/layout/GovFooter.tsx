"use client";

import React from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ExternalLink,
  Lock,
  FileCheck2,
  Share2
} from "lucide-react";

export default function GovFooter() {
  const { t } = useAccessibility();

  return (
    <footer className="w-full bg-gov-footer text-white border-t-4 border-gov-accent font-sans mt-16">
      
      {/* -------------------------------------------------
          SECTION 13: OFFICIAL FOOTER CONTENT
      ------------------------------------------------- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Corporation Details & Address */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full p-1 flex-shrink-0">
              <img
                src="/images/mbmc_updated logo.jpg"
                alt="MBMC Seal"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                {t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}
              </h3>
              <p className="text-xs text-blue-200">
                {t("Government of Maharashtra e-Governance Portal", "महाराष्ट्र शासन ई-गव्हर्नन्स पोर्टल")}
              </p>
            </div>
          </div>

          <p className="text-xs text-blue-100/80 leading-relaxed">
            {t(
              "Single-Window Clearance Platform for events, rallies, loudspeakers, pandals, and filming within Mira Bhayandar jurisdiction.",
              "मीरा भाईंदर क्षेत्रातील कार्यक्रम, मोर्चे, लाउडस्पीकर, मंडप व चित्रीकरणासाठी एकल-खिडकी परवानगी व समन्वय प्रणाली."
            )}
          </p>

          <div className="space-y-2 text-xs text-blue-100">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gov-accent flex-shrink-0 mt-0.5" />
              <span>{t("MBMC Main Building, Indira Gandhi Flyover, Bhayandar West, Maharashtra 401101", "एमबीएमसी मुख्य इमारत, इंदिरा गांधी उड्डाणपुलाजवळ, भाईंदर पश्चिम ४०११०१")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gov-accent flex-shrink-0" />
              <span>{t("Control Room: 022-28192828 / 1800-22-3424", "नियंत्रण कक्ष: ०२२-२८१९२८२८ / १८००-२२-३४२४")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gov-accent flex-shrink-0" />
              <span>{t("support.uecp@mbmc.gov.in", "support.uecp@mbmc.gov.in")}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links & Government Portals */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gov-accent uppercase tracking-wider border-b border-blue-900 pb-2">
            {t("Government Portals", "शासकीय पोर्टल व सेवा")}
          </h4>
          <ul className="space-y-2 text-xs text-blue-100">
            <li>
              <a href="https://maharashtra.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-accent flex items-center space-x-1.5 transition">
                <span>›</span> <span>{t("Government of Maharashtra (maharashtra.gov.in)", "महाराष्ट्र शासन पोर्टल")}</span>
                <ExternalLink className="w-3 h-3 text-blue-300 ml-1" />
              </a>
            </li>
            <li>
              <a href="https://digilocker.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-accent flex items-center space-x-1.5 transition">
                <span>›</span> <span>{t("DigiLocker Verification Services", "डिजीलॉकर पडताळणी")}</span>
                <ExternalLink className="w-3 h-3 text-blue-300 ml-1" />
              </a>
            </li>
            <li>
              <a href="https://umang.gov.in" target="_blank" rel="noreferrer" className="hover:text-gov-accent flex items-center space-x-1.5 transition">
                <span>›</span> <span>{t("UMANG National Mobile Governance", "उमंग नॅशनल मोबाईल गव्हर्नन्स")}</span>
                <ExternalLink className="w-3 h-3 text-blue-300 ml-1" />
              </a>
            </li>
            <li>
              <Link href="/apply" className="hover:text-gov-accent flex items-center space-x-1.5 transition">
                <span>›</span> <span>{t("Apply Event Clearance NOC", "कार्यक्रम परवानगी अर्ज")}</span>
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-gov-accent flex items-center space-x-1.5 transition">
                <span>›</span> <span>{t("Track Application Status", "अर्जाची स्थिती खेळा")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Emergency Inter-Dept Hotline Numbers */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gov-accent uppercase tracking-wider border-b border-blue-900 pb-2">
            {t("Emergency Helplines", "आपत्कालीन विभाग संपर्क")}
          </h4>
          <div className="space-y-2 text-xs text-blue-100">
            <div className="bg-blue-950/90 p-2.5 rounded border border-blue-800">
              <span className="font-bold text-gov-accent block">{t("MBVV Police Control Room", "एमबीविव्हि पोलीस नियंत्रण कक्ष")}</span>
              <span className="text-white font-mono">Tel: 112 / 022-29452100</span>
            </div>
            <div className="bg-blue-950/90 p-2.5 rounded border border-blue-800">
              <span className="font-bold text-gov-accent block">{t("MBMC Fire & Emergency Services", "अग्निशमन दल आपत्कालीन")}</span>
              <span className="text-white font-mono">Tel: 101 / 022-28192323</span>
            </div>
            <div className="bg-blue-950/90 p-2.5 rounded border border-blue-800">
              <span className="font-bold text-gov-accent block">{t("MBMC Disaster Management Cell", "आपत्ती व्यवस्थापन कक्ष")}</span>
              <span className="text-white font-mono">Tel: 022-28192828</span>
            </div>
          </div>
        </div>

        {/* Col 4: Academic Project Attribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gov-accent uppercase tracking-wider border-b border-blue-900 pb-2">
            {t("Academic Project Credit", "शैक्षणिक प्रकल्प नोंद")}
          </h4>
          <div className="bg-blue-950/90 p-3 rounded-gov-sm border border-blue-800 space-y-2">
            <div className="flex items-center space-x-3">
              <img
                src="/images/SLRTCElogo.png"
                alt="SLRTCE College Logo"
                className="w-12 h-12 object-contain bg-white/10 rounded p-1"
              />
              <img
                src="/images/IT.png"
                alt="Information Technology Dept"
                className="w-12 h-12 object-contain bg-white/10 rounded p-1"
              />
            </div>
            <p className="text-xs text-blue-100 leading-snug pt-1">
              {t(
                "Designed and developed as an Academic Prototype for Mira Bhayandar Municipal Corporation (MBMC) by the Department of Information Technology, Shree L. R. Tiwari College of Engineering (SLRTCE).",
                "श्री एल. आर. तिवारी कॉलेज ऑफ इंजिनिअरिंग, माहिती तंत्रज्ञान विभागाद्वारे मीरा भाईंदर महानगरपालिकेसाठी शैक्षणिक नमुना म्हणून विकसित."
              )}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-blue-200 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t("STQC Certified • WCAG 2.1 AAA Compliant", "एसटीक्यूसी प्रमाणित • डब्ल्यूसीएजी २.१ एएए")}</span>
          </div>
        </div>

      </div>

      {/* Legal & Copyright Disclaimer Bar */}
      <div className="bg-blue-950 border-t border-blue-900 py-4 px-4 sm:px-8 text-xs text-blue-300">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>© 2026 {t("Mira Bhayandar Municipal Corporation (MBMC). Academic Prototype Project.", "मीरा भाईंदर महानगरपालिका. शैक्षणिक प्रकल्प नमुना.")}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">{t("Privacy Policy", "गोपनीयता धोरण")}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t("Terms of Service", "नियम व अटी")}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t("Hyperlinking Policy", "हायपरलिंकिंग धोरण")}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t("Disclaimer", "अस्वीकरण")}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
