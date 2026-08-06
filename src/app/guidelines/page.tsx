"use client";

import React from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  BookOpen,
  Volume2,
  Flame,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Download,
  AlertTriangle
} from "lucide-react";

export default function GuidelinesPage() {
  const { t } = useAccessibility();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 font-sans space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-gov-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gov-textMuted font-medium">
            <Link href="/" className="hover:underline">{t("Home", "मुख्य पृष्ठ")}</Link>
            <span>/</span>
            <span className="text-gov-primary font-bold">{t("Guidelines & Rules", "मार्गदर्शक नियम व अटी")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-dark mt-1">
            {t("Mandatory Government Guidelines & Decibel Standards", "शासकीय मार्गदर्शक तत्वे व ध्वनी मर्यादा नियमावली")}
          </h1>
        </div>

        <Link
          href="/apply"
          className="bg-gov-primary hover:bg-gov-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 transition self-start"
        >
          <span>{t("Proceed to Application", "परवानगी अर्जाकडे जा")}</span>
          <ArrowRight className="w-4 h-4 text-yellow-400" />
        </Link>
      </div>

      {/* GUIDELINE CARDS */}
      <div className="space-y-6">
        
        {/* Section 1: Sound Decibel Standards */}
        <div className="bg-white rounded-xl border border-gov-border p-6 shadow-gov-sm space-y-4">
          <div className="flex items-center space-x-3 border-b border-gov-border pb-3">
            <div className="w-10 h-10 bg-blue-50 text-gov-primary rounded-lg flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gov-dark">1. Noise Pollution (Control & Regulation) Rules</h2>
              <p className="text-xs text-gov-textMuted">High Court of Judicature at Bombay Mandated Noise Thresholds</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
              <span className="text-gov-textMuted block font-semibold">Residential Zones</span>
              <span className="font-bold text-gov-dark text-sm mt-1 block">Day: 55 dB(A) | Night: 45 dB(A)</span>
              <span className="text-[11px] text-gov-textMuted">Night curfew starts strictly at 10:00 PM.</span>
            </div>
            <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
              <span className="text-gov-textMuted block font-semibold">Commercial Zones</span>
              <span className="font-bold text-gov-dark text-sm mt-1 block">Day: 65 dB(A) | Night: 55 dB(A)</span>
              <span className="text-[11px] text-gov-textMuted">Requires acoustic sound barriers.</span>
            </div>
            <div className="bg-gov-bg p-3 rounded-lg border border-gov-border">
              <span className="text-gov-textMuted block font-semibold">Silence Zones (Hospitals/Schools)</span>
              <span className="font-bold text-gov-dark text-sm mt-1 block">Day: 50 dB(A) | Night: 40 dB(A)</span>
              <span className="text-[11px] text-gov-textMuted">Within 100m radius of healthcare/schools.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Fire Safety Regulations */}
        <div className="bg-white rounded-xl border border-gov-border p-6 shadow-gov-sm space-y-4">
          <div className="flex items-center space-x-3 border-b border-gov-border pb-3">
            <div className="w-10 h-10 bg-amber-50 text-gov-accent rounded-lg flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gov-dark">2. Fire & Life Safety Standards for Pandals</h2>
              <p className="text-xs text-gov-textMuted">MBMC Chief Fire Officer (CFO) Mandatory Code</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-gov-text list-disc pl-5">
            <li>Mandap fabric and wooden supports must be treated with ammonium phosphate fire-retardant compound.</li>
            <li>Minimum 6-meter wide unencumbered emergency egress corridors on all four sides of temporary pandals.</li>
            <li>Deploy at least 1 ABC Type Fire Extinguisher (6kg capacity) per 500 sq.ft of covered pandal area.</li>
            <li>Main electrical distribution box must be equipped with ELCD/RCCB circuit breaker protection.</li>
          </ul>
        </div>

        {/* Section 3: Solid Waste Management */}
        <div className="bg-white rounded-xl border border-gov-border p-6 shadow-gov-sm space-y-4">
          <div className="flex items-center space-x-3 border-b border-gov-border pb-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gov-dark">3. MBMC Zero-Litter Clean Event Protocol</h2>
              <p className="text-xs text-gov-textMuted">Public Health & Solid Waste Management Norms</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-gov-text list-disc pl-5">
            <li>Organizers must install separate Wet Waste and Dry Waste collection bins at 20-meter intervals.</li>
            <li>Single-use plastic cutlery and thermocol decorations are strictly banned under Maharashtra Plastic Waste Rules.</li>
            <li>Sanitation cleanup deposit will be refunded within 7 working days following zero-litter site inspection.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
