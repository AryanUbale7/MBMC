"use client";

import React from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Award,
  Globe,
  Building2,
  FileCheck2,
  Lock,
  PhoneCall,
  CheckCircle2
} from "lucide-react";

export default function GovFooter() {
  const { t } = useAccessibility();

  return (
    <footer className="w-full bg-[#D9D9D9] text-slate-900 border-t-4 border-gov-accent font-sans shadow-gov-md print:hidden">
      
      {/* -------------------------------------------------
          TOP CENTER: PROMINENT CENTERED LOGOS BAR
      ------------------------------------------------- */}
      <div className="bg-[#CCCCCC] py-8 px-4 sm:px-8 border-b border-slate-400/60">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center space-y-4">
          
          <span className="text-xs font-mono font-extrabold text-gov-primary tracking-widest uppercase">
            {t("MIRA BHAYANDAR MUNICIPAL CORPORATION • ACADEMIC E-GOVERNANCE PROTOTYPE", "मीरा भाईंदर महानगरपालिका • शैक्षणिक ई-प्रशासकीय नमुना")}
          </span>

          {/* Centered Extra-Large Logos Row (Uniform Equal Size) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-4">
            
            {/* Emblem of India */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src="/images/sher.png"
                  alt="State Emblem of India"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width="112"
                  height="112"
                />
              </div>
              <span className="text-xs text-gov-primary font-extrabold uppercase tracking-wider">{t("Emblem of India", "भारत राजमुद्रा")}</span>
            </div>

            <div className="hidden sm:block h-20 w-px bg-slate-400/80" />

            {/* MBMC Official Seal */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src="/images/mbmc_updated logo.jpg"
                  alt="MBMC Official Seal"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width="112"
                  height="112"
                />
              </div>
              <span className="text-xs text-gov-primary font-black uppercase tracking-wider">{t("MBMC Municipal Seal", "मीरा भाईंदर मनपा मुद्रा")}</span>
            </div>

            <div className="hidden sm:block h-20 w-px bg-slate-400/80" />

            {/* SLRTCE College Logo */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src="/images/SLRTCElogo.png"
                  alt="SLRTCE College Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width="112"
                  height="112"
                />
              </div>
              <span className="text-xs text-gov-primary font-extrabold uppercase tracking-wider">SLRTCE Mumbai</span>
            </div>

            <div className="hidden sm:block h-20 w-px bg-slate-400/80" />

            {/* IT Department Seal */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src="/images/IT.png"
                  alt="IT Department Seal"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width="112"
                  height="112"
                />
              </div>
              <span className="text-xs text-gov-primary font-extrabold uppercase tracking-wider">IT Department</span>
            </div>

          </div>

          <p className="text-xs text-slate-800 max-w-2xl text-center leading-relaxed font-bold">
            {t(
              "Urban Event Permission & Coordination Platform (UECP) — Single-Window clearance system designed for Sarvajanik festival pandals, sound permissions, rallies, and public venue approvals within MBMC jurisdiction.",
              "नागरी कार्यक्रम परवानगी व समन्वय प्रणाली (यूईसीपी) — मीरा भाईंदर क्षेत्रातील उत्सव मंडप, ध्वनी परवानग्या व सभा मैदानांसाठी एकल खिडकी मंजुरी पोर्टल."
            )}
          </p>

        </div>
      </div>


      {/* -------------------------------------------------
          MAIN CONTENT GRID: LEFT (CONTACTS) & RIGHT (LINKS & HELPLINES)
      ------------------------------------------------- */}
      <div className="py-10 px-4 sm:px-8 border-b border-slate-400/60">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* LEFT SIDE: MUNICIPAL HEADQUARTERS & CONTACTS (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="border-b border-slate-400 pb-2">
              <h3 className="text-base font-extrabold text-gov-primary uppercase tracking-wider flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gov-primary" />
                <span>{t("Municipal Headquarters & Support", "महानगरपालिका मुख्यालय व संपर्क")}</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-900 font-semibold">
              <div className="flex items-start space-x-3 bg-white p-3.5 rounded-gov-sm border border-slate-300 shadow-gov-sm">
                <MapPin className="w-4 h-4 text-gov-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-gov-primary block text-sm">Mira Bhayandar Municipal Corporation</span>
                  <span className="text-slate-800">MBMC Main Administrative Building, Indira Gandhi Flyover, Bhayandar West, Maharashtra 401101</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2.5 bg-white p-3 rounded-gov-sm border border-slate-300 shadow-gov-sm">
                  <Phone className="w-4 h-4 text-gov-primary flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold block">Control Room Helpline</span>
                    <span className="font-extrabold text-gov-primary">022-28192828 / 1800-22-3424</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 bg-white p-3 rounded-gov-sm border border-slate-300 shadow-gov-sm">
                  <Mail className="w-4 h-4 text-gov-primary flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold block">Official Support Email</span>
                    <span className="font-extrabold text-gov-primary">support.uecp@mbmc.gov.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* RIGHT SIDE: GOVERNMENT PORTALS & EMERGENCY HELPLINES (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Government Links */}
            <div className="space-y-3">
              <div className="border-b border-slate-400 pb-2">
                <h4 className="text-sm font-extrabold text-gov-primary uppercase tracking-wider flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gov-primary" />
                  <span>{t("Government Portals", "शासकीय दालने")}</span>
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-900 font-bold">
                <li>
                  <a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-gov-primary transition flex items-center space-x-1.5">
                    <span>Government of Maharashtra</span>
                    <ExternalLink className="w-3 h-3 text-gov-primary" />
                  </a>
                </li>
                <li>
                  <a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-gov-primary transition flex items-center space-x-1.5">
                    <span>DigiLocker Verification Services</span>
                    <ExternalLink className="w-3 h-3 text-gov-primary" />
                  </a>
                </li>
                <li>
                  <a href="https://umang.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-gov-primary transition flex items-center space-x-1.5">
                    <span>UMANG Mobile Governance</span>
                    <ExternalLink className="w-3 h-3 text-gov-primary" />
                  </a>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-gov-primary transition flex items-center space-x-1 text-gov-primary">
                    <span>• Apply Event Clearance NOC</span>
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="hover:text-gov-primary transition flex items-center space-x-1 text-gov-primary">
                    <span>• Track Application Status</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Emergency Helplines */}
            <div className="space-y-3">
              <div className="border-b border-slate-400 pb-2">
                <h4 className="text-sm font-extrabold text-red-700 uppercase tracking-wider flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>{t("Emergency Helplines", "आपत्कालीन नंबर")}</span>
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-red-50 border border-red-300 p-2.5 rounded-gov-sm shadow-xs">
                  <span className="font-extrabold text-red-900 block">MBVV Police Control Room</span>
                  <span className="font-mono text-red-700 font-extrabold">Tel: 112 / 022-29452100</span>
                </div>

                <div className="bg-amber-50 border border-amber-300 p-2.5 rounded-gov-sm shadow-xs">
                  <span className="font-extrabold text-amber-900 block">MBMC Fire & Emergency Cell</span>
                  <span className="font-mono text-amber-800 font-extrabold">Tel: 101 / 022-28192323</span>
                </div>

                <div className="bg-blue-50 border border-blue-300 p-2.5 rounded-gov-sm shadow-xs">
                  <span className="font-extrabold text-gov-primary block">MBMC Disaster Control</span>
                  <span className="font-mono text-gov-primary font-extrabold">Tel: 1800-22-3424</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* -------------------------------------------------
          LOWER FOOTER / BOTTOM BAR: COPYRIGHT & ACADEMIC CREDIT
      ------------------------------------------------- */}
      <div className="bg-[#B3B3B3] py-4 px-4 sm:px-8 text-xs text-slate-900 font-bold border-t border-slate-400">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          <div className="space-y-1">
            <div>
              © 2026 <span className="font-extrabold text-gov-primary">Mira Bhayandar Municipal Corporation (MBMC)</span>. All Rights Reserved.
            </div>
            <div className="text-[11px] text-slate-800 font-semibold">
              Academic Prototype developed for MBMC by <span className="font-extrabold text-gov-primary">Department of Information Technology, Shree L. R. Tiwari College of Engineering (SLRTCE)</span>.
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-extrabold text-slate-900">
            <Link href="/guidelines" className="hover:text-gov-primary transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/guidelines" className="hover:text-gov-primary transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/guidelines" className="hover:text-gov-accent transition">Hyperlinking Policy</Link>
            <span>•</span>
            <Link href="/guidelines" className="hover:text-gov-primary transition">Disclaimer</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}
