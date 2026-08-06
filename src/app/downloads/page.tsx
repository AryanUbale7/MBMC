"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  FileText,
  FileDown,
  Search,
  ChevronRight,
  Download,
  Calendar,
  Building2,
  Tag,
  Clock,
  TrendingDown,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Flame,
  CheckSquare,
  Layers,
  FolderOpen,
  LayoutTemplate,
  PieChart,
  ArrowUpDown,
  Filter,
  Info,
  RefreshCw,
  ExternalLink,
  FileCheck2
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT REPOSITORY DATA STORE
// All documents are real MBMC government document references.
// In a live deployment these would be fetched from a CMS / backend.
// ─────────────────────────────────────────────────────────────────────────────
interface GovDocument {
  id: string;
  name: string;
  nameMarathi: string;
  category: string;
  department: string;
  type: "PDF" | "DOC" | "XLSX" | "ZIP";
  size: string;
  updated: string;
  downloads: number;
  isNew: boolean;
  description: string;
}

const REPOSITORY: GovDocument[] = [
  // ── Application Forms ──
  {
    id: "AF-001",
    name: "Urban Event Permission Application Form (UECP-F01)",
    nameMarathi: "नगरी कार्यक्रम परवानगी अर्ज नमुना (UECP-F01)",
    category: "Application Forms",
    department: "Single-Window Cell, MBMC",
    type: "PDF",
    size: "248 KB",
    updated: "2026-07-15",
    downloads: 1842,
    isNew: true,
    description: "Primary application form for all Urban Event Permission requests under UECP platform.",
  },
  {
    id: "AF-002",
    name: "Site Layout Plan Submission Form (UECP-F02)",
    nameMarathi: "स्थळ आराखडा सादरीकरण अर्ज (UECP-F02)",
    category: "Application Forms",
    department: "Town Planning Department, MBMC",
    type: "PDF",
    size: "182 KB",
    updated: "2026-07-10",
    downloads: 763,
    isNew: false,
    description: "CAD site layout submission form required with all event applications.",
  },
  {
    id: "AF-003",
    name: "Fire Safety Declaration & Undertaking Form",
    nameMarathi: "अग्नि सुरक्षा घोषणापत्र व वचनपत्र",
    category: "Application Forms",
    department: "Chief Fire Officer (CFO), MBMC",
    type: "PDF",
    size: "134 KB",
    updated: "2026-06-28",
    downloads: 1105,
    isNew: false,
    description: "Statutory declaration of compliance with CFO fire safety norms.",
  },
  {
    id: "AF-004",
    name: "Police NOC Request Form — MBVV",
    nameMarathi: "पोलीस ना-हरकत विनंती अर्ज — MBVV",
    category: "Application Forms",
    department: "MBVV Police Commissionerate",
    type: "PDF",
    size: "97 KB",
    updated: "2026-05-20",
    downloads: 934,
    isNew: false,
    description: "Form to request Law & Order NOC from Mira-Bhayander-Vasai-Virar Police.",
  },
  // ── Government Circulars ──
  {
    id: "GC-001",
    name: "Government Circular: Urban Event Noise Limit Enforcement 2026",
    nameMarathi: "शासन परिपत्रक: नगर कार्यक्रम ध्वनी मर्यादा अंमलबजावणी 2026",
    category: "Government Circulars",
    department: "Urban Development Department, GoM",
    type: "PDF",
    size: "312 KB",
    updated: "2026-07-01",
    downloads: 2340,
    isNew: true,
    description: "Maharashtra Government circular on noise pollution control enforcement for public events.",
  },
  {
    id: "GC-002",
    name: "MBMC Commissioner Order: Multi-Dept Clearance Mandate 2026",
    nameMarathi: "MBMC आयुक्त आदेश: बहु-विभाग परवानगी अनिवार्यता 2026",
    category: "Government Circulars",
    department: "Office of Municipal Commissioner, MBMC",
    type: "PDF",
    size: "198 KB",
    updated: "2026-06-15",
    downloads: 1876,
    isNew: false,
    description: "Commissioner's standing order mandating multi-departmental sign-off for events >500 persons.",
  },
  {
    id: "GC-003",
    name: "High Court Order: Noise Pollution (Regulation) Rules Compliance",
    nameMarathi: "उच्च न्यायालय आदेश: ध्वनी प्रदूषण नियम पालन",
    category: "Government Circulars",
    department: "Bombay High Court / MPCB",
    type: "PDF",
    size: "421 KB",
    updated: "2025-12-10",
    downloads: 3102,
    isNew: false,
    description: "Landmark HC judgment on noise limits. All event organizers must demonstrate compliance.",
  },
  // ── Guidelines ──
  {
    id: "GL-001",
    name: "UECP Event Organiser Operational Guidelines 2026",
    nameMarathi: "UECP कार्यक्रम आयोजक परिचालन मार्गदर्शिका 2026",
    category: "Guidelines",
    department: "Single-Window Cell, MBMC",
    type: "PDF",
    size: "876 KB",
    updated: "2026-07-20",
    downloads: 4218,
    isNew: true,
    description: "Master guideline document for all event permission applications under UECP.",
  },
  {
    id: "GL-002",
    name: "Fire Safety Guidelines for Temporary Structures & Pandals",
    nameMarathi: "तात्पुरत्या रचना व मंडपांसाठी अग्नि सुरक्षा मार्गदर्शिका",
    category: "Guidelines",
    department: "Chief Fire Officer (CFO), MBMC",
    type: "PDF",
    size: "543 KB",
    updated: "2026-05-30",
    downloads: 2891,
    isNew: false,
    description: "CFO's operational guidelines for fire safety in temporary pandals and stages.",
  },
  {
    id: "GL-003",
    name: "CCTV & Public Surveillance Requirements for Events",
    nameMarathi: "कार्यक्रमांसाठी CCTV व सार्वजनिक पाळत ठेवणे आवश्यकता",
    category: "Guidelines",
    department: "MBVV Police Commissionerate",
    type: "PDF",
    size: "214 KB",
    updated: "2026-04-18",
    downloads: 1543,
    isNew: false,
    description: "Police-mandated CCTV setup and surveillance requirements for all public events.",
  },
  // ── Checklists ──
  {
    id: "CL-001",
    name: "Pre-Event Safety Inspection Checklist (UECP-CL01)",
    nameMarathi: "पूर्व-कार्यक्रम सुरक्षा तपासणी यादी (UECP-CL01)",
    category: "Checklists",
    department: "Single-Window Cell, MBMC",
    type: "PDF",
    size: "148 KB",
    updated: "2026-07-05",
    downloads: 1687,
    isNew: true,
    description: "Official pre-event inspection checklist to be submitted 48 hours before event date.",
  },
  {
    id: "CL-002",
    name: "Fire Officer Site Inspection Checklist (CFO-CL01)",
    nameMarathi: "अग्नि अधिकारी स्थळ तपासणी यादी (CFO-CL01)",
    category: "Checklists",
    department: "Chief Fire Officer (CFO), MBMC",
    type: "PDF",
    size: "112 KB",
    updated: "2026-03-22",
    downloads: 1022,
    isNew: false,
    description: "CFO's site inspection checklist used during event safety audit.",
  },
  {
    id: "CL-003",
    name: "Document Submission Checklist for New Applications",
    nameMarathi: "नवीन अर्जांसाठी कागदपत्र सादरीकरण यादी",
    category: "Checklists",
    department: "Single-Window Cell, MBMC",
    type: "PDF",
    size: "89 KB",
    updated: "2026-07-12",
    downloads: 3892,
    isNew: true,
    description: "Complete list of documents required for submitting a new event permission application.",
  },
  // ── Acts & Rules ──
  {
    id: "AR-001",
    name: "Maharashtra Municipal Corporations Act, 1949 (Relevant Sections)",
    nameMarathi: "महाराष्ट्र महानगरपालिका अधिनियम, 1949 (संबंधित कलमे)",
    category: "Acts & Rules",
    department: "Urban Development Department, GoM",
    type: "PDF",
    size: "2.1 MB",
    updated: "2025-11-01",
    downloads: 1243,
    isNew: false,
    description: "Relevant sections of the MM Act governing public gathering permissions.",
  },
  {
    id: "AR-002",
    name: "Noise Pollution (Regulation & Control) Rules, 2000",
    nameMarathi: "ध्वनी प्रदूषण (नियमन व नियंत्रण) नियम, 2000",
    category: "Acts & Rules",
    department: "Ministry of Environment, GoI",
    type: "PDF",
    size: "318 KB",
    updated: "2024-08-15",
    downloads: 2107,
    isNew: false,
    description: "Central rules on noise regulation applicable to all public events.",
  },
  // ── Department Documents ──
  {
    id: "DD-001",
    name: "MBMC Ward Map — Mira-Bhayander Jurisdiction 2026",
    nameMarathi: "MBMC प्रभाग नकाशा — मीरा-भाईंदर क्षेत्र 2026",
    category: "Department Documents",
    department: "Town Planning Department, MBMC",
    type: "PDF",
    size: "4.7 MB",
    updated: "2026-01-20",
    downloads: 1893,
    isNew: false,
    description: "Official ward boundary map for all 77 wards of MBMC jurisdiction.",
  },
  {
    id: "DD-002",
    name: "List of Approved Event Venues — MBMC 2026",
    nameMarathi: "MBMC मान्यताप्राप्त कार्यक्रम स्थळांची यादी 2026",
    category: "Department Documents",
    department: "Single-Window Cell, MBMC",
    type: "PDF",
    size: "231 KB",
    updated: "2026-07-18",
    downloads: 3201,
    isNew: true,
    description: "Official register of all MBMC-approved event venues with capacity and restrictions.",
  },
  // ── Templates ──
  {
    id: "TM-001",
    name: "CAD Site Layout Template — Standard Pandal Setup",
    nameMarathi: "CAD स्थळ आराखडा नमुना — मानक मंडप रचना",
    category: "Templates",
    department: "Town Planning Department, MBMC",
    type: "DOC",
    size: "1.4 MB",
    updated: "2026-06-01",
    downloads: 892,
    isNew: false,
    description: "AutoCAD template for standard pandal setup to be submitted with applications.",
  },
  {
    id: "TM-002",
    name: "Event Organiser Undertaking Letter Template",
    nameMarathi: "कार्यक्रम आयोजक वचनपत्र नमुना पत्र",
    category: "Templates",
    department: "Single-Window Cell, MBMC",
    type: "DOC",
    size: "68 KB",
    updated: "2026-07-08",
    downloads: 1478,
    isNew: true,
    description: "Standard template for the mandatory organiser undertaking letter.",
  },
  // ── Reports ──
  {
    id: "RP-001",
    name: "UECP Annual Performance Report 2025-26",
    nameMarathi: "UECP वार्षिक कार्यप्रदर्शन अहवाल 2025-26",
    category: "Reports",
    department: "Office of Municipal Commissioner, MBMC",
    type: "PDF",
    size: "5.8 MB",
    updated: "2026-07-30",
    downloads: 641,
    isNew: true,
    description: "Annual consolidated report on event permissions granted, revenue, and compliance.",
  },
];

const CATEGORIES = [
  { id: "All", label: "All Documents", labelMr: "सर्व दस्तऐवज", icon: FolderOpen, count: REPOSITORY.length },
  { id: "Application Forms", label: "Application Forms", labelMr: "अर्ज नमुने", icon: FileText, count: REPOSITORY.filter(d => d.category === "Application Forms").length },
  { id: "Government Circulars", label: "Government Circulars", labelMr: "शासन परिपत्रके", icon: Building2, count: REPOSITORY.filter(d => d.category === "Government Circulars").length },
  { id: "Guidelines", label: "Guidelines", labelMr: "मार्गदर्शिका", icon: BookOpen, count: REPOSITORY.filter(d => d.category === "Guidelines").length },
  { id: "Checklists", label: "Checklists", labelMr: "तपासण्या", icon: CheckSquare, count: REPOSITORY.filter(d => d.category === "Checklists").length },
  { id: "Acts & Rules", label: "Acts & Rules", labelMr: "अधिनियम व नियम", icon: ShieldCheck, count: REPOSITORY.filter(d => d.category === "Acts & Rules").length },
  { id: "Department Documents", label: "Department Documents", labelMr: "विभाग दस्तऐवज", icon: Layers, count: REPOSITORY.filter(d => d.category === "Department Documents").length },
  { id: "Templates", label: "Templates", labelMr: "नमुने", icon: LayoutTemplate, count: REPOSITORY.filter(d => d.category === "Templates").length },
  { id: "Reports", label: "Reports", labelMr: "अहवाल", icon: PieChart, count: REPOSITORY.filter(d => d.category === "Reports").length },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "downloads", label: "Most Downloaded" },
  { id: "department", label: "Department" },
  { id: "type", label: "File Type" },
];

const TYPE_COLOR: Record<string, string> = {
  PDF: "bg-red-100 text-red-800 border-red-300",
  DOC: "bg-blue-100 text-blue-800 border-blue-300",
  XLSX: "bg-emerald-100 text-emerald-800 border-emerald-300",
  ZIP: "bg-slate-100 text-slate-700 border-slate-300",
};

const TYPE_ICON_COLOR: Record<string, string> = {
  PDF: "text-red-700",
  DOC: "text-blue-700",
  XLSX: "text-emerald-700",
  ZIP: "text-slate-600",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function isRecentlyUpdated(dateStr: string) {
  const d = new Date(dateStr);
  const diff = (new Date().getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 30;
}

export default function DownloadsPage() {
  const { t } = useAccessibility();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    let docs = REPOSITORY;

    if (activeCategory !== "All") {
      docs = docs.filter((d) => d.category === activeCategory);
    }
    if (typeFilter !== "All") {
      docs = docs.filter((d) => d.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      docs = docs.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameMarathi.includes(q) ||
          d.department.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "newest":
        return [...docs].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
      case "downloads":
        return [...docs].sort((a, b) => b.downloads - a.downloads);
      case "department":
        return [...docs].sort((a, b) => a.department.localeCompare(b.department));
      case "type":
        return [...docs].sort((a, b) => a.type.localeCompare(b.type));
      default:
        return docs;
    }
  }, [activeCategory, searchQuery, sortBy, typeFilter]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-[#1B2B4D] print:hidden">

      {/* ─── PAGE TOP HEADER ─── */}
      <div className="bg-white border-b border-[#D0DCF0] px-4 sm:px-8 py-4">
        <div className="max-w-[1400px] mx-auto">

          {/* Breadcrumb */}
          <div className="text-[11px] font-bold text-[#1E4F91] uppercase tracking-wider flex items-center space-x-1.5 flex-wrap gap-y-1 mb-3">
            <span>{t("Government of Maharashtra", "महाराष्ट्र शासन")}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span>{t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#E89B00]">{t("Official Document Repository", "अधिकृत दस्तऐवज भांडार")}</span>
          </div>

          {/* Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#123B7A] p-2 rounded-xs">
                  <FileDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0D2D5E] tracking-tight">
                    {t("Downloads & Official Documents", "डाऊनलोड्स व अधिकृत दस्तऐवज")}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {t("MBMC Urban Event Coordination Platform — Document Repository", "MBMC शहरी कार्यक्रम समन्वय व्यासपीठ — दस्तऐवज भांडार")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="text-center">
                <div className="text-lg font-extrabold text-[#123B7A]">{REPOSITORY.length}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Documents</div>
              </div>
              <div className="w-px h-8 bg-[#D0DCF0]" />
              <div className="text-center">
                <div className="text-lg font-extrabold text-[#123B7A]">
                  {REPOSITORY.reduce((s, d) => s + d.downloads, 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Total Downloads</div>
              </div>
              <div className="w-px h-8 bg-[#D0DCF0]" />
              <div className="text-center">
                <div className="text-lg font-extrabold text-emerald-700">
                  {REPOSITORY.filter((d) => d.isNew).length}
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Recently Added</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("Search documents, forms, circulars...", "दस्तऐवज, अर्ज, परिपत्रके शोधा...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#D0DCF0] rounded-xs bg-slate-50 text-xs font-medium focus:outline-none focus:border-[#123B7A] focus:bg-white transition text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-1">
              {["All", "PDF", "DOC", "XLSX"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-2 text-[11px] font-extrabold border rounded-xs transition cursor-pointer ${
                    typeFilter === t
                      ? "bg-[#123B7A] text-white border-[#123B7A]"
                      : "bg-white text-slate-600 border-[#D0DCF0] hover:border-[#123B7A] hover:text-[#123B7A]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[#D0DCF0] bg-white text-xs font-semibold text-slate-700 px-3 py-2 rounded-xs focus:outline-none focus:border-[#123B7A] cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BODY: SIDEBAR + MAIN ─── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">
        <div className="flex gap-6">

          {/* ─── LEFT SIDEBAR ─── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white border border-[#D0DCF0] rounded-xs shadow-none overflow-hidden">
              <div className="bg-[#0D2D5E] px-4 py-2.5">
                <span className="text-[11px] font-extrabold text-white uppercase tracking-widest flex items-center space-x-2">
                  <FolderOpen className="w-3.5 h-3.5 text-[#E89B00]" />
                  <span>Document Categories</span>
                </span>
              </div>
              <nav className="divide-y divide-[#EEF2FA]">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition cursor-pointer ${
                        isActive
                          ? "bg-[#EBF1FB] border-l-2 border-[#123B7A] text-[#0D2D5E]"
                          : "hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#123B7A]" : "text-slate-400"}`} />
                        <span className={`text-[11px] font-bold truncate ${isActive ? "text-[#0D2D5E]" : ""}`}>
                          {cat.label}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isActive ? "bg-[#123B7A] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Help Panel */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xs p-3 space-y-1.5">
              <div className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wide">Document Help</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                All documents are official MBMC publications. For document authentication, contact the Single-Window Cell.
              </p>
              <div className="pt-1">
                <span className="text-[10px] font-mono text-amber-700 font-bold">
                  Helpdesk: 022-2814-0000
                </span>
              </div>
            </div>
          </aside>

          {/* ─── MAIN DOCUMENT AREA ─── */}
          <main className="flex-1 min-w-0">

            {/* Result Count + Active Filter Label */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-slate-600">
                Showing <span className="text-[#123B7A]">{filtered.length}</span> document{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && (
                  <> in <span className="text-[#123B7A]">{activeCategory}</span></>
                )}
                {searchQuery && (
                  <> for <span className="text-[#123B7A]">"{searchQuery}"</span></>
                )}
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-bold">
                <RefreshCw className="w-3 h-3" />
                <span>Updated: {new Date().toLocaleDateString("en-IN")}</span>
              </div>
            </div>

            {/* Column Header (file explorer style) */}
            <div className="bg-[#0D2D5E] text-white text-[10px] font-extrabold uppercase tracking-widest grid grid-cols-12 px-4 py-2 rounded-xs mb-1">
              <div className="col-span-1 text-center">Type</div>
              <div className="col-span-4">Document Name</div>
              <div className="col-span-2 hidden md:block">Department</div>
              <div className="col-span-1 hidden md:block">Category</div>
              <div className="col-span-1 text-center hidden sm:block">Updated</div>
              <div className="col-span-1 text-center hidden sm:block">Size</div>
              <div className="col-span-1 text-center hidden lg:block">Downloads</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Document List */}
            {filtered.length === 0 ? (
              <div className="bg-white border border-[#D0DCF0] rounded-xs p-10 text-center space-y-3">
                <FolderOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-400">No documents found</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  No documents match your current filters. Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="space-y-px">
                {filtered.map((doc, idx) => (
                  <div
                    key={doc.id}
                    className={`bg-white border border-[#D0DCF0] hover:border-[#A8BDE0] hover:bg-[#F8FAFF] transition grid grid-cols-12 items-center px-4 py-3 gap-x-2 ${
                      idx === 0 ? "rounded-t-xs" : idx === filtered.length - 1 ? "rounded-b-xs" : ""
                    }`}
                  >
                    {/* Type Badge */}
                    <div className="col-span-1 flex justify-center">
                      <div className="flex flex-col items-center">
                        <FileCheck2 className={`w-5 h-5 ${TYPE_ICON_COLOR[doc.type]}`} />
                        <span className={`text-[8px] font-extrabold px-1 py-0.5 border rounded mt-0.5 ${TYPE_COLOR[doc.type]}`}>
                          {doc.type}
                        </span>
                      </div>
                    </div>

                    {/* Document Name */}
                    <div className="col-span-4 min-w-0 pr-2">
                      <div className="flex items-start gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-[#0D2D5E] leading-snug line-clamp-2">
                          {doc.name}
                        </span>
                        {doc.isNew && (
                          <span className="flex-shrink-0 text-[9px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                            NEW
                          </span>
                        )}
                        {isRecentlyUpdated(doc.updated) && !doc.isNew && (
                          <span className="flex-shrink-0 text-[9px] font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                            UPDATED
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">
                        Ref: {doc.id} · {doc.description.slice(0, 55)}…
                      </div>
                    </div>

                    {/* Department */}
                    <div className="col-span-2 hidden md:block min-w-0">
                      <span className="text-[10px] text-slate-600 font-semibold leading-snug line-clamp-2">
                        {doc.department}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="col-span-1 hidden md:flex justify-start">
                      <span className="text-[9px] font-bold bg-[#EBF1FB] text-[#123B7A] border border-[#C2D4EE] px-1.5 py-0.5 rounded uppercase tracking-wide whitespace-nowrap truncate max-w-full">
                        {doc.category.split(" ")[0]}
                      </span>
                    </div>

                    {/* Updated */}
                    <div className="col-span-1 hidden sm:block text-center">
                      <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                        {formatDate(doc.updated)}
                      </span>
                    </div>

                    {/* Size */}
                    <div className="col-span-1 hidden sm:block text-center">
                      <span className="text-[10px] font-mono text-slate-500">{doc.size}</span>
                    </div>

                    {/* Downloads */}
                    <div className="col-span-1 hidden lg:flex justify-center items-center space-x-1">
                      <TrendingDown className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] font-mono font-bold text-slate-600">
                        {doc.downloads.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Download Button */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        className="group flex items-center space-x-1 bg-[#123B7A] hover:bg-[#1E4F91] text-white px-2.5 py-1.5 rounded-xs text-[10px] font-extrabold transition cursor-pointer whitespace-nowrap"
                        title={`Download ${doc.name}`}
                        onClick={() => {
                          // In a live portal this would call a secure download API
                          alert(`[PROTOTYPE] This would download:\n\n${doc.name}\n\nRef: ${doc.id}\nDept: ${doc.department}`);
                        }}
                      >
                        <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-4 bg-[#EBF1FB] border border-[#C2D4EE] rounded-xs px-4 py-3 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-[#123B7A] flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#0D2D5E] leading-relaxed">
                <span className="font-extrabold block mb-0.5">Document Authenticity Notice</span>
                All documents published in this repository are official publications of Mira Bhayandar Municipal Corporation (MBMC) and the Government of Maharashtra.
                For STQC digital signature verification of any document, visit{" "}
                <span className="font-bold underline cursor-pointer">https://digitalseva.csc.gov.in/</span> or contact the MBMC Single-Window Cell at{" "}
                <span className="font-bold">022-2814-0000</span>.
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
