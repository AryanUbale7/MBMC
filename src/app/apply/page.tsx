"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { MBMC_WARDS, MBMC_VENUES, DEPARTMENTS } from "@/data/mbmcData";
import confetti from "canvas-confetti";
import {
  FileText,
  Building2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Calendar,
  DollarSign,
  ShieldCheck,
  Flame,
  Volume2,
  Users,
  Printer,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Check,
  Clock,
  Download
} from "lucide-react";

function ApplyFormContent() {
  const { t } = useAccessibility();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("cat") || "religious";

  // Wizard Step State (1 to 6)
  const [step, setStep] = useState<number>(1);
  const [submittedRef, setSubmittedRef] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    wardId: "W04",
    eventType: "Religious / Cultural Festival",
    eventName: "Shanti Nagar Sarvajanik Ganesh Utsav 2026",
    venueName: "Shanti Nagar Cultural & Community Field",
    startDate: "2026-09-10",
    endDate: "2026-09-20",
    // Step 2
    applicantType: "Trust",
    organizationName: "Shanti Nagar Welfare Mandal Trust",
    applicantName: "Pravin Kumar Raut",
    mobile: "9820199482",
    email: "pravin.raut@mandal.org",
    aadhaarPan: "4589 1204 8812 / ABCDE1234F",
    address: "Flat 402, Building A, Shanti Nagar, Mira Road East, 401107",
    // Step 3
    needFireNoc: true,
    needPoliceNoc: true,
    needSanitationNoc: true,
    needPowerNoc: true,
    needTrafficNoc: false,
    bioToiletsQty: 4,
    // Step 4
    stageLengthFt: 40,
    stageWidthFt: 30,
    maxAttendance: 10000,
    cctvCount: 8,
    fireExtinguishers: 6,
    soundWattage: "5000W RMS",
    soundDecibelAgree: true,
    flameRetardantAgree: true,
    // Step 5
    docAadhaarUploaded: true,
    docSitePlanUploaded: true,
    docLandNocUploaded: true,
  });

  // Dynamic Fee Calculation
  const daysCount = Math.max(1, Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 3600 * 24)) || 1);
  const areaSqFt = formData.stageLengthFt * formData.stageWidthFt;
  const basePermitFee = 2500;
  const groundLeaseFee = Math.round(areaSqFt * 0.25 * daysCount);
  const sanitationDeposit = formData.needSanitationNoc ? 3000 : 0;
  const fireInspectionFee = formData.needFireNoc ? 1500 : 0;
  const policeSecurityBond = 5000;
  const totalFeeCalculated = basePermitFee + groundLeaseFee + sanitationDeposit + fireInspectionFee + policeSecurityBond;

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 5) {
      const randomRef = `MBMC/UECP/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedRef(randomRef);
      setStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1 && step < 6) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 font-sans space-y-8">
      {/* HEADER BREADCRUMB */}
      <div className="border-b border-gov-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gov-textMuted font-medium">
            <Link href="/" className="hover:underline">{t("Home", "मुख्य पृष्ठ")}</Link>
            <span>/</span>
            <span className="text-gov-primary font-bold">{t("Single Window Permission Form", "एकल खिडकी अर्ज फॉर्म")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-dark mt-1">
            {t("Event Clearance & NOC Application (UECP)", "कार्यक्रम व परवानगी (NOC) डिजिटल अर्ज")}
          </h1>
        </div>
        <div className="text-xs bg-gov-badgeBg text-gov-badgeText border border-gov-badgeBorder px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 self-start">
          <Clock className="w-4 h-4 text-gov-primary" />
          <span>{t("Guaranteed Clearance SLA: 72 Hours", "हमी दिलेला कालावधी: ७२ तास")}</span>
        </div>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gov-border shadow-gov-sm no-print">
        <div className="grid grid-cols-6 gap-2 text-center text-xs font-semibold">
          {[
            { num: 1, label: t("Ward & Event", "प्रभाग व प्रकार") },
            { num: 2, label: t("Applicant", "अर्जदार माहिती") },
            { num: 3, label: t("Inter-Dept NOC", "विभाग मंजुरी") },
            { num: 4, label: t("Safety & Sound", "सुरक्षा व ध्वनी") },
            { num: 5, label: t("Fee & Docs", "शुल्क व कागदपत्रे") },
            { num: 6, label: t("Receipt", "पावती / परवाना") }
          ].map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;
            return (
              <div key={s.num} className="flex flex-col items-center space-y-1.5">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-gov-primary text-yellow-400 ring-4 ring-blue-100"
                      : "bg-gov-surface text-gov-textMuted border border-gov-border"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`hidden sm:block text-[11px] leading-tight ${
                    isActive ? "text-gov-primary font-bold" : "text-gov-textMuted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM STEP CONTENT PANELS */}
      <div className="bg-white rounded-xl border border-gov-border shadow-gov-md p-6 sm:p-8 space-y-6">

        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gov-border pb-3">
              <h2 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-gov-primary" />
                <span>{t("Step 1: Event Categorization & MBMC Jurisdiction Ward", "टप्पा १: कार्यक्रमाचा प्रकार व मनपा प्रभाग निवड")}</span>
              </h2>
              <p className="text-xs text-gov-textMuted mt-1">
                {t("Select the appropriate MBMC administrative ward where the event or structure will be located.", "कार्यक्रमाचे ठिकाण ज्या मीरा भाईंदर मनपा प्रभागात येते तो प्रभाग निवडा.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("MBMC Administrative Ward *", "मीरा भाईंदर मनपा प्रशासकीय प्रभाग *")}
                </label>
                <select
                  value={formData.wardId}
                  onChange={(e) => setFormData({ ...formData, wardId: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                >
                  {MBMC_WARDS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {t(w.name, w.nameMr)}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gov-textMuted">
                  {MBMC_WARDS.find((w) => w.id === formData.wardId)?.headquarters}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Event Category *", "कार्यक्रमाचा मुख्य प्रकार *")}
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                >
                  <option value="Religious / Cultural Festival">{t("Religious / Cultural Festival (Ganesh Utsav, Garba, Eid)", "धार्मिक व सांस्कृतिक उत्सव (गणेशोत्सव, गरबा, ईद)")}</option>
                  <option value="Commercial Exhibition & Trade Fair">{t("Commercial Exhibition & Trade Fair", "व्यावसायिक प्रदर्शन व ग्राहक मेळावा")}</option>
                  <option value="Political Rally & Public Address Gathering">{t("Political Rally & Public Gathering", "राजकीय सभा व सार्वजनिक कार्यक्रम")}</option>
                  <option value="Film, TV & Commercial Video Shooting">{t("Film & Web Series Shooting Permit", "चित्रपट व मालिका चित्रीकरण")}</option>
                  <option value="Loudspeaker & Temporary Stage Permit">{t("Loudspeaker & Stage Mandap Permit Only", "ध्वनीक्षेपक व तात्पुरता मंडप परवाना")}</option>
                  <option value="Sports Tournament & Community Marathon">{t("Sports & Public Marathon Event", "क्रीडा व नागरी मॅरेथॉन")}</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Full Event Title / Festival Name *", "कार्यक्रमाचे / उत्सवाचे पूर्ण नाव *")}
                </label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                  placeholder={t("e.g. Shanti Nagar Sarvajanik Ganeshotsav 2026", "उदा. शांती नगर सार्वजनिक गणेशोत्सव २०२६")}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Exact Venue Field / Address *", "कार्यक्रमाचे नक्की ठिकाण / मैदान पत्ता *")}
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                  placeholder={t("e.g. Sector 3 Field, Shanti Nagar, Mira Road East", "उदा. सेक्टर ३ मैदान, शांती नगर, मीरा रोड पूर्व")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Event Commencement Date *", "कार्यक्रम सुरु होण्याची तारीख *")}
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Event Concluding Date *", "कार्यक्रम संपण्याची तारीख *")}
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gov-border pb-3">
              <h2 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                <Users className="w-5 h-5 text-gov-primary" />
                <span>{t("Step 2: Applicant & Organization Verification", "टप्पा २: अर्जदार व संस्था पडताळणी माहिती")}</span>
              </h2>
              <p className="text-xs text-gov-textMuted mt-1">
                {t("Provide valid Identity & Registration details. All declarations are verified against UIDAI & PAN records.", "आधार व पॅन क्रमांकाची खरी माहिती द्या. माहितीची शासकीय पोर्टलद्वारे पडताळणी केली जाते.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Applicant Category *", "अर्जदाराचा प्रकार *")}
                </label>
                <select
                  value={formData.applicantType}
                  onChange={(e) => setFormData({ ...formData, applicantType: e.target.value as any })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                >
                  <option value="Trust">{t("Registered Public Trust / Mandal", "नोंदणीकृत ट्रस्ट / सार्वजनिक मंडळ")}</option>
                  <option value="NGO">{t("Registered NGO / Non-Profit", "एनजीओ / सेवाभावी संस्था")}</option>
                  <option value="Corporate">{t("Private Commercial Enterprise / Agency", "खाजगी कंपनी / इव्हेंट संस्था")}</option>
                  <option value="Individual">{t("Individual Resident of MBMC", "वैयक्तिक रहिवासी")}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Registered Organization / Mandal Name *", "नोंदणीकृत संस्थेचे / मंडळाचे नाव *")}
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Authorized Contact Representative *", "अधिकृत प्रतिनिधीचे नाव *")}
                </label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Primary Mobile Number (OTP Verified) *", "मोबाईल क्रमांक (ओटीपी द्वारे पडताळलेला) *")}
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Official Email Address *", "अधिकृत ई-मेल आयडी *")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Aadhaar No. / PAN No. *", "आधार क्रमांक / पॅन क्रमांक *")}
                </label>
                <input
                  type="text"
                  value={formData.aadhaarPan}
                  onChange={(e) => setFormData({ ...formData, aadhaarPan: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none font-mono"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Registered Address in Mira Bhayandar Jurisdiction *", "मीरा भाईंदर क्षेत्रातील नोंदणीकृत पूर्ण पत्ता *")}
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gov-border pb-3">
              <h2 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-gov-primary" />
                <span>{t("Step 3: Inter-Departmental Clearance Auto-Routing", "टप्पा ३: स्वयंचलित आंतर-विभागीय परवानगी मार्गक्रमण")}</span>
              </h2>
              <p className="text-xs text-gov-textMuted mt-1">
                {t(
                  "Based on your event category, our single window engine routes your application concurrently to the required government departments.",
                  "आपल्या कार्यक्रमाच्या स्वरूपानुसार सिस्टीमद्वारे आवश्यक त्या सर्व शासकीय विभागांकडे एकाच वेळी अर्ज पाठवला जाईल."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gov-border bg-blue-50/50 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">MBMC Public Works Department (Mandatory)</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Ground usage lease approval, structural height limits, and public boundary verification.</p>
                  <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Auto-Routed</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-white flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.needFireNoc}
                  onChange={(e) => setFormData({ ...formData, needFireNoc: e.target.checked })}
                  className="w-4 h-4 text-gov-primary mt-1 rounded border-gov-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">MBMC Fire & Rescue Services Brigade</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Fire safety audit, extinguisher counts, pandal material flame retardant check.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-white flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.needPoliceNoc}
                  onChange={(e) => setFormData({ ...formData, needPoliceNoc: e.target.checked })}
                  className="w-4 h-4 text-gov-primary mt-1 rounded border-gov-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">Mira-Bhayandar Vasai-Virar (MBVV) Police</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Law & order NOC, sound decibel limit audit (55dB), crowd management plan.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-white flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.needSanitationNoc}
                  onChange={(e) => setFormData({ ...formData, needSanitationNoc: e.target.checked })}
                  className="w-4 h-4 text-gov-primary mt-1 rounded border-gov-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">MBMC Solid Waste Management & Sanitation</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Bio-toilet installation deployment and post-event zero-litter cleanup deposit.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-white flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.needPowerNoc}
                  onChange={(e) => setFormData({ ...formData, needPowerNoc: e.target.checked })}
                  className="w-4 h-4 text-gov-primary mt-1 rounded border-gov-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">MSEDCL Temporary Electricity Load</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Sanction temporary 3-phase power load connection for stage lights & sound.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-white flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.needTrafficNoc}
                  onChange={(e) => setFormData({ ...formData, needTrafficNoc: e.target.checked })}
                  className="w-4 h-4 text-gov-primary mt-1 rounded border-gov-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-gov-dark">MBVV Police Traffic Control Branch</h4>
                  <p className="text-xs text-gov-textMuted mt-0.5">Road closure permissions, traffic diversion advisory, and VIP parking setup.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-gov-border pb-3">
              <h2 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                <Flame className="w-5 h-5 text-gov-accent" />
                <span>{t("Step 4: Infrastructure & Safety Declarations", "टप्पा ४: मंडप, सुरक्षा व ध्वनी घोषणापत्र")}</span>
              </h2>
              <p className="text-xs text-gov-textMuted mt-1">
                {t("Declare stage dimensions, fire fighting gear, and noise control measures as per High Court guidelines.", "मंडप आकारमान, अग्निरोधक साहित्य व मा. उच्च न्यायालयाच्या ध्वनी प्रदूषण नियमांचे पालन बंधनकारक आहे.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Stage / Pandal Length (Feet) *", "मंडपाची लांबी (फूट) *")}
                </label>
                <input
                  type="number"
                  value={formData.stageLengthFt}
                  onChange={(e) => setFormData({ ...formData, stageLengthFt: Number(e.target.value) })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Stage / Pandal Width (Feet) *", "मंडपाची रुंदी (फूट) *")}
                </label>
                <input
                  type="number"
                  value={formData.stageWidthFt}
                  onChange={(e) => setFormData({ ...formData, stageWidthFt: Number(e.target.value) })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Expected Peak Visitor Count *", "अपेक्षित सर्वोच्च नागरिक संख्या *")}
                </label>
                <input
                  type="number"
                  value={formData.maxAttendance}
                  onChange={(e) => setFormData({ ...formData, maxAttendance: Number(e.target.value) })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("ABC Fire Extinguishers on-site *", "अग्निशामक उपकरणांची संख्या *")}
                </label>
                <input
                  type="number"
                  value={formData.fireExtinguishers}
                  onChange={(e) => setFormData({ ...formData, fireExtinguishers: Number(e.target.value) })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("CCTV Surveillance Cameras Installed *", "सीसीटीव्ही कॅमेऱ्यांची संख्या *")}
                </label>
                <input
                  type="number"
                  value={formData.cctvCount}
                  onChange={(e) => setFormData({ ...formData, cctvCount: Number(e.target.value) })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gov-dark block">
                  {t("Sound Output Capacity *", "ध्वनी प्रणाली क्षमता (RMS) *")}
                </label>
                <input
                  type="text"
                  value={formData.soundWattage}
                  onChange={(e) => setFormData({ ...formData, soundWattage: e.target.value })}
                  className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-gov-primary outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-3 bg-gov-bg p-4 rounded-xl border border-gov-border text-xs text-gov-text">
              <h4 className="font-bold text-gov-dark uppercase text-[11px] tracking-wider">{t("Mandatory Compliance Declarations", "अनिवार्य कायदेशीर हमीपत्र")}</h4>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.soundDecibelAgree}
                  onChange={(e) => setFormData({ ...formData, soundDecibelAgree: e.target.checked })}
                  className="w-4 h-4 text-gov-primary rounded mt-0.5"
                />
                <span>
                  {t(
                    "I hereby undertake to strictly adhere to the Noise Pollution (Regulation and Control) Rules. Sound levels will not exceed 55 dB during daytime and 45 dB after 10:00 PM.",
                    "मी अशी हमी देतो/देते की मा. न्यायालयाच्या ध्वनी प्रदूषण नियमांचे पालन केले जाईल. रात्री १०:०० नंतर ध्वनी मर्यादा ४५ डेसिबलपेक्षा जास्त असणार नाही."
                  )}
                </span>
              </label>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.flameRetardantAgree}
                  onChange={(e) => setFormData({ ...formData, flameRetardantAgree: e.target.checked })}
                  className="w-4 h-4 text-gov-primary rounded mt-0.5"
                />
                <span>
                  {t(
                    "I certify that the pandal fabric, wooden supports, and electrical wiring installed are coated with certified fire-retardant solution as mandated by MBMC CFO.",
                    "मी प्रमाणित करतो/करते की वापरलेले कापड व वीज जोडणी एमबीएमसी मुख्य अग्निशमन अधिकाऱ्यांच्या निकषानुसार अग्निरोधक द्रावणाने प्रक्रियाकृत आहे."
                  )}
                </span>
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="border-b border-gov-border pb-3">
              <h2 className="text-lg font-bold text-gov-dark flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>{t("Step 5: Document Submission & Fee Calculation Matrix", "टप्पा ५: कागदपत्रे अपलोड व शासकीय शुल्क गणित")}</span>
              </h2>
              <p className="text-xs text-gov-textMuted mt-1">
                {t("Verify uploaded credentials and review the computed municipal fee breakdown.", "अपलोड केलेल्या कागदपत्रांची खात्री करा व गणलेले एकूण मनपा शुल्क तपासा.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gov-border bg-gov-bg flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gov-dark block">{t("1. Aadhaar / PAN Proof", "१. आधार / पॅन पुरावा")}</span>
                  <p className="text-[11px] text-gov-textMuted">PDF or JPG up to 5MB</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-emerald-700 font-bold bg-emerald-100 p-2 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified_Aadhaar_Doc.pdf</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-gov-bg flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gov-dark block">{t("2. Site Plan Layout", "२. मंडप व जागा आराखडा")}</span>
                  <p className="text-[11px] text-gov-textMuted">CAD / PDF layout plan</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-emerald-700 font-bold bg-emerald-100 p-2 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Site_Layout_Drawing_2026.pdf</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gov-border bg-gov-bg flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gov-dark block">{t("3. Land Owner / Society NOC", "३. जागा मालकाचे ना हरकत प्रमाणपत्र")}</span>
                  <p className="text-[11px] text-gov-textMuted">MBMC land lease consent copy</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-emerald-700 font-bold bg-emerald-100 p-2 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Society_NOC_Letter.pdf</span>
                </div>
              </div>
            </div>

            <div className="bg-gov-surface border border-gov-border rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-gov-primary uppercase tracking-wider flex items-center justify-between">
                <span>{t("Computed Municipal Fee Breakdown", "मनपा शुल्क तपशील गणित")}</span>
                <span className="text-xs font-normal text-gov-textMuted">Calculated for {daysCount} Days • {areaSqFt} sq.ft area</span>
              </h3>

              <div className="divide-y divide-gov-border text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-gov-textMuted">{t("MBMC Single Window Processing Base Fee", "मनपा एकल खिडकी मूळ प्रक्रिया शुल्क")}</span>
                  <span className="font-mono font-bold">₹ {basePermitFee.toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gov-textMuted">{t("Public Ground Lease Rate (Area × Days)", "सार्वजनिक जागा भाडे आकार (आकारमान × दिवस)")}</span>
                  <span className="font-mono font-bold">₹ {groundLeaseFee.toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gov-textMuted">{t("Sanitation Deposit (Refundable post Zero-Litter inspection)", "स्वच्छता अनामत रक्कम (परतफेडी योग्य)")}</span>
                  <span className="font-mono font-bold">₹ {sanitationDeposit.toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gov-textMuted">{t("MBMC Fire & Emergency Safety Audit Fee", "अग्निशमन दल सुरक्षा तपासणी शुल्क")}</span>
                  <span className="font-mono font-bold">₹ {fireInspectionFee.toLocaleString()}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gov-textMuted">{t("Police Security Performance Assurance Bond", "पोलीस सुरक्षा अनामत हमी बंधपत्र")}</span>
                  <span className="font-mono font-bold">₹ {policeSecurityBond.toLocaleString()}</span>
                </div>
                <div className="py-3 flex justify-between text-sm sm:text-base font-extrabold text-gov-dark bg-white p-3 rounded-lg border border-gov-border mt-2">
                  <span className="text-gov-primary">{t("Total Payable Amount (INR)", "एकूण देय रक्कम (रुपये)")}</span>
                  <span className="font-mono text-gov-primary text-lg">₹ {totalFeeCalculated.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 text-gov-text">
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-emerald-950">
                {t("Application Submitted Successfully!", "अर्ज यशस्वीरित्या सादर करण्यात आला आहे!")}
              </h2>
              <p className="text-xs text-emerald-800 max-w-xl mx-auto">
                {t(
                  "Your single-window clearance application has been registered with Mira Bhayandar Municipal Corporation and routed to Fire, Police, PWD, and Sanitation departments.",
                  "आपला एकल खिडकी अर्ज मीरा भाईंदर महानगरपालिकेकडे नोंदवला गेला असून तो अग्निशमन, पोलीस, बांधकाम व आरोग्य विभागास पाठवण्यात आला आहे."
                )}
              </p>

              <div className="inline-block bg-white border-2 border-emerald-600 px-6 py-2 rounded-lg text-lg font-mono font-extrabold text-gov-dark shadow-sm">
                <span className="text-xs text-gov-textMuted block font-sans uppercase tracking-wider">
                  {t("Unique Reference Number", "अद्वितीय संदर्भ क्रमांक")}
                </span>
                <span className="text-gov-primary">{submittedRef}</span>
              </div>
            </div>

            <div className="bg-gov-bg p-6 rounded-xl border border-gov-border space-y-4">
              <div className="flex items-center justify-between border-b border-gov-border pb-3">
                <div className="flex items-center space-x-3">
                  <img src="/images/MBMC logo.jpg" alt="MBMC Seal" className="w-10 h-10 object-contain rounded-full" />
                  <div>
                    <h3 className="text-sm font-bold text-gov-dark">Mira Bhayandar Municipal Corporation</h3>
                    <p className="text-[11px] text-gov-textMuted">Digital Clearance Acknowledgement • 2026 Edition</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold bg-gov-primary text-yellow-400 px-2.5 py-1 rounded">
                    STATUS: IN_REVIEW
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gov-textMuted block">{t("Applicant Name:", "अर्जदाराचे नाव:")}</span>
                  <span className="font-bold text-gov-dark">{formData.applicantName}</span>
                </div>
                <div>
                  <span className="text-gov-textMuted block">{t("Organization / Mandal:", "संस्था / मंडळ:")}</span>
                  <span className="font-bold text-gov-dark">{formData.organizationName}</span>
                </div>
                <div>
                  <span className="text-gov-textMuted block">{t("Event Type:", "प्रकार:")}</span>
                  <span className="font-bold text-gov-dark">{formData.eventType}</span>
                </div>
                <div>
                  <span className="text-gov-textMuted block">{t("Ward Jurisdiction:", "प्रभाग:")}</span>
                  <span className="font-bold text-gov-dark">{MBMC_WARDS.find(w => w.id === formData.wardId)?.name}</span>
                </div>
                <div>
                  <span className="text-gov-textMuted block">{t("Event Dates:", "तारखा:")}</span>
                  <span className="font-bold text-gov-dark">{formData.startDate} to {formData.endDate}</span>
                </div>
                <div>
                  <span className="text-gov-textMuted block">{t("Total Calculated Fee:", "एकूण फी:")}</span>
                  <span className="font-mono font-extrabold text-gov-primary">₹ {totalFeeCalculated.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gov-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-gov-textMuted">
                  {t("Target SLA Completion: Within 72 Hours", "मंजुरी अंतिम मुदत: ७२ तासांच्या आत")}
                </span>
                <div className="flex items-center space-x-3 no-print">
                  <button
                    onClick={() => window.print()}
                    className="bg-gov-primary hover:bg-gov-dark text-white font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t("Print Receipt", "पावती मुद्रित करा")}</span>
                  </button>

                  <Link
                    href={`/track?ref=${encodeURIComponent(submittedRef)}`}
                    className="bg-gov-accent hover:bg-amber-600 text-gov-dark font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t("Track Live Workflow", "स्थितीचा पाठपुरावा करा")}</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {step < 6 && (
          <div className="flex items-center justify-between pt-4 border-t border-gov-border no-print">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition ${
                step === 1
                  ? "bg-gov-surface text-gov-textMuted cursor-not-allowed"
                  : "bg-gov-surface hover:bg-gov-border text-gov-dark cursor-pointer"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("Previous Step", "मागील टप्पा")}</span>
            </button>

            <div className="text-xs text-gov-textMuted font-medium">
              {t(`Step ${step} of 5`, `टप्पा ${step} पैकी ५`)}
            </div>

            <button
              onClick={handleNextStep}
              className="bg-gov-primary hover:bg-gov-dark text-white font-bold px-6 py-2.5 rounded-lg text-xs sm:text-sm flex items-center space-x-2 transition shadow-gov-md cursor-pointer"
            >
              <span>{step === 5 ? t("Submit & Generate Receipt", "अर्ज सबमिट करा व पावती मिळवा") : t("Save & Continue", "पुढे जा")}</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gov-primary font-bold">Loading Single Window Portal...</div>}>
      <ApplyFormContent />
    </Suspense>
  );
}
