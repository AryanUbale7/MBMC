"use client";

import React from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import { MBMC_VENUES } from "@/data/mbmcData";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  DollarSign
} from "lucide-react";

export default function VenuesPage() {
  const { t } = useAccessibility();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 font-sans space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-gov-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gov-textMuted font-medium">
            <Link href="/" className="hover:underline">{t("Home", "मुख्य पृष्ठ")}</Link>
            <span>/</span>
            <span className="text-gov-primary font-bold">{t("Public Ground Schedule", "सार्वजनिक मैदान वेळापत्रक")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-dark mt-1">
            {t("MBMC Public Grounds & Event Field Matrix", "एमबीएमसी मोकळी मैदाने व सार्वजनिक चौक वेळापत्रक")}
          </h1>
        </div>

        <Link
          href="/apply"
          className="bg-gov-primary hover:bg-gov-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 transition self-start"
        >
          <span>{t("Book Venue Ground", "मैदान आरक्षित करण्यासाठी अर्ज करा")}</span>
          <ArrowRight className="w-4 h-4 text-yellow-400" />
        </Link>
      </div>

      {/* VENUE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MBMC_VENUES.map((venue) => (
          <div key={venue.id} className="bg-white rounded-xl border border-gov-border shadow-gov-md overflow-hidden flex flex-col justify-between">
            <div>
              {/* Image Banner */}
              <div className="relative h-44 w-full bg-gov-dark">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover opacity-85"
                  loading="lazy"
                  width="600"
                  height="176"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      venue.status === "Available"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {venue.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-mono">
                  {venue.wardName}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gov-dark">{t(venue.name, venue.nameMr)}</h3>
                  <p className="text-xs text-gov-textMuted flex items-center space-x-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gov-primary flex-shrink-0" />
                    <span>{venue.locationAddress}</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs bg-gov-bg p-3 rounded-lg border border-gov-border text-center">
                  <div>
                    <span className="text-gov-textMuted block">Capacity</span>
                    <span className="font-bold text-gov-dark">{venue.totalCapacity.toLocaleString()} Pax</span>
                  </div>
                  <div>
                    <span className="text-gov-textMuted block">Area</span>
                    <span className="font-bold text-gov-dark">{venue.areaSqFt.toLocaleString()} sq.ft</span>
                  </div>
                  <div>
                    <span className="text-gov-textMuted block">Gov Rate</span>
                    <span className="font-mono font-bold text-gov-primary">₹ {venue.dailyRateINR}/day</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gov-dark uppercase tracking-wider block">Facilities Available:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {venue.facilities.map((fac, idx) => (
                      <span key={idx} className="text-[11px] bg-blue-50 text-gov-primary font-medium px-2 py-0.5 rounded border border-blue-200">
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gov-surface p-4 border-t border-gov-border flex items-center justify-between">
              <span className="text-xs text-gov-textMuted">Official Municipal Property</span>
              <Link
                href={`/apply?venue=${encodeURIComponent(venue.name)}`}
                className="bg-gov-primary hover:bg-gov-dark text-white font-bold text-xs px-4 py-2 rounded-lg transition"
              >
                {t("Apply Ground Clearance", "मैदान अर्ज करा")}
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
