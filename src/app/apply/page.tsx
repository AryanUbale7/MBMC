"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useAuth } from "@/context/AuthContext";
import { createNewApplication, addNotification, UploadedDoc } from "@/lib/govStore";
import { MBMC_WARDS, MBMC_VENUES, DEPARTMENTS } from "@/data/mbmcData";
import confetti from "canvas-confetti";
import {
  FileText,
  Building2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Calendar,
  ShieldCheck,
  Flame,
  Volume2,
  Users,
  Printer,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Check,
  Clock,
  Download,
  PhoneCall,
  Mail,
  HelpCircle,
  FileCheck2,
  ShieldAlert,
  Save,
  Lock,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";

function ApplyFormContent() {
  const { t } = useAccessibility();
  const { citizen } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("cat") || "religious";

  useEffect(() => {
    if (!citizen) {
      router.push("/citizen/login?redirect=/apply");
    }
  }, [citizen, router]);

  // Wizard Step State (1 to 6)
  const [step, setStep] = useState<number>(1);
  const [submittedRef, setSubmittedRef] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedDoc>>({});

  // Handle real file upload — read as base64 dataUrl
  const handleFileUpload = (key: string, label: string, file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert(`${label}: File exceeds 5 MB limit.`); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const sizeFmt = file.size < 1024 * 1024
        ? `${Math.round(file.size / 1024)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: {
          key,
          label,
          fileName: file.name,
          fileSize: sizeFmt,
          uploadedAt: new Date().toLocaleString("en-IN"),
          dataUrl: e.target?.result as string
        }
      }));
    };
    reader.readAsDataURL(file);
  };
  const [isSavedDraft, setIsSavedDraft] = useState<boolean>(false);

  // Validation Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    // STEP 1: EVENT DETAILS
    wardId: "W04",
    policeStation: "Kashimira Police Station",
    wardOffice: "Prabhag Samiti No. 04 (Kashimira - Ghodbunder)",
    groundName: "Shanti Nagar Cultural & Community Field",
    eventCategory: "Religious / Cultural Festival",
    eventType: "Sarvajanik Ganesh Utsav 2026",
    eventName: "",
    eventDescription: "",
    expectedCrowd: "",
    startDate: "",
    endDate: "",
    startTime: "06:00",
    endTime: "23:00",

    // STEP 2: APPLICANT DETAILS
    applicantName: citizen?.fullName || "",
    organization: "",
    email: citizen?.email || "",
    mobile: citizen?.mobile || "",
    alternateMobile: "",
    address: citizen?.address || "",
    city: "Mira Bhayandar",
    state: "Maharashtra",
    pinCode: "401107",
    identityProofType: "Aadhaar Card",
    identityProofNo: citizen?.aadhaarPan || "",

    // STEP 3: VENUE DETAILS
    venueName: "",
    latitude: "19.2812 N",
    longitude: "72.8542 E",
    googleMapLink: "",
    nearbyLandmark: "",
    parkingAvailability: "",
    emergencyExit: "",

    // STEP 4: DEPARTMENT REQUIREMENTS
    needFireNoc: true,
    needPoliceNoc: true,
    needTrafficNoc: true,
    needHealthSanitationNoc: true,
    needElectricityNoc: true,
    needNoisePermission: true,
    needPublicWorksPermission: true,
    bioToiletsQty: 4,
    stageLengthFt: 40,
    stageWidthFt: 30,
    cctvCount: 8,
    fireExtinguishers: 6,
    soundWattage: "5000W RMS",
    soundDecibelAgree: true,
    flameRetardantAgree: true,

    // STEP 5: DOCUMENTS UPLOAD
    docAadhaar: true,
    docPan: true,
    docSocietyNoc: true,
    docVenueLayout: true,
    docSiteMap: true,
    docFireCert: true,
    docIdentityProof: true,
    docInsurance: true,

    // STEP 6: DECLARATION
    declarationAgreed: false,
    digitalSignature: "",
    declarationPlace: "Mira Road",
    declarationDate: new Date().toISOString().split("T")[0]
  });

  // Dynamic Fee Calculation
  const daysCount = Math.max(1, Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 3600 * 24)) || 1);
  const areaSqFt = formData.stageLengthFt * formData.stageWidthFt;
  const basePermitFee = 2500;
  const groundLeaseFee = Math.round(areaSqFt * 0.25 * daysCount);
  const sanitationDeposit = formData.needHealthSanitationNoc ? 3000 : 0;
  const fireInspectionFee = formData.needFireNoc ? 1500 : 0;
  const policeSecurityBond = 5000;
  const totalFeeCalculated = basePermitFee + groundLeaseFee + sanitationDeposit + fireInspectionFee + policeSecurityBond;

  // Save Draft Notification
  const handleSaveDraft = () => {
    setIsSavedDraft(true);
    setTimeout(() => setIsSavedDraft(false), 3000);
  };

  // Validate Step Inputs
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.eventName.trim()) newErrors.eventName = "Event Name is required as per official rules.";
      if (!formData.startDate) newErrors.startDate = "Start Date is required.";
      if (!formData.endDate) newErrors.endDate = "End Date is required.";
      if (!formData.expectedCrowd) newErrors.expectedCrowd = "Expected Crowd estimate is required.";
    } else if (currentStep === 2) {
      if (!formData.applicantName.trim()) newErrors.applicantName = "Applicant Full Name is required.";
      if (!formData.mobile.trim()) {
        newErrors.mobile = "10-Digit Mobile Number is required.";
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
        newErrors.mobile = "Invalid Indian Mobile Number (Must be 10 digits starting 6-9).";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email Address is required for digital pass delivery.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
        newErrors.email = "Invalid Email Address format.";
      }
      if (!formData.address.trim()) newErrors.address = "Complete Applicant Address is required.";
    } else if (currentStep === 3) {
      if (!formData.venueName.trim()) newErrors.venueName = "Venue Name & Address is required.";
      if (!formData.nearbyLandmark.trim()) newErrors.nearbyLandmark = "Nearby Landmark is required for emergency routing.";
    } else if (currentStep === 4) {
      if (!formData.soundDecibelAgree) newErrors.soundDecibelAgree = "You must agree to High Court Sound Rules (<55dB).";
      if (!formData.flameRetardantAgree) newErrors.flameRetardantAgree = "You must agree to mandatory CFO Fire Retardant Coating.";
    } else if (currentStep === 5) {
      if (!formData.docAadhaar) newErrors.docAadhaar = "Aadhaar Card PDF upload is mandatory.";
      if (!formData.docVenueLayout) newErrors.docVenueLayout = "Venue Layout CAD/Plan PDF upload is mandatory.";
      if (!formData.docFireCert) newErrors.docFireCert = "Fire Retardant Self-Declaration PDF upload is mandatory.";
    } else if (currentStep === 6) {
      if (!formData.declarationAgreed) newErrors.declarationAgreed = "You must check the official Government legal declaration box.";
      if (!formData.digitalSignature.trim()) newErrors.digitalSignature = "Digital Signature (Full Applicant Name) is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      if (step < 5) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (step === 5) {
        setStep(6);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(6)) {
      const randomRef = `MBMC/UECP/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedRef(randomRef);

      // Build uploaded docs array from state
      const uploadedDocsArr: UploadedDoc[] = Object.values(uploadedFiles);

      // Save to Persistent Store with all 8 departments + timeline
      createNewApplication({
        id: randomRef,
        citizenId: citizen?.id || "CIT-GUEST",
        eventName: formData.eventName,
        eventCategory: formData.eventCategory,
        eventType: formData.eventType,
        wardId: formData.wardId,
        wardName: formData.wardOffice,
        policeStation: formData.policeStation,
        venueName: formData.venueName,
        applicantName: formData.applicantName,
        organizationName: formData.organization,
        mobile: formData.mobile,
        email: formData.email,
        aadhaarPan: formData.identityProofNo,
        address: formData.address,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        expectedCrowd: formData.expectedCrowd,
        stageDimensions: `${formData.stageLengthFt}ft x ${formData.stageWidthFt}ft`,
        cctvCount: formData.cctvCount,
        fireExtinguishers: formData.fireExtinguishers,
        totalFeeCalculated: totalFeeCalculated,
        paymentStatus: "PAID",
        status: "PENDING_SCRUTINY",
        submittedAt: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN"),
        cfoFireStatus: "PENDING",
        policeStatus: "PENDING",
        trafficStatus: "PENDING",
        pwdStatus: "PENDING",
        healthStatus: "PENDING",
        electricityStatus: "PENDING",
        wardStatus: "PENDING",
        commissionerSanction: false,
        officerRemarks: "Logged into single-window clearance cell. Desk audit in progress."
      });

      // Dispatch Notification
      addNotification({
        citizenId: citizen?.id || "CIT-GUEST",
        applicationId: randomRef,
        title: "📝 Application Submitted & Logged",
        message: `Your application ${randomRef} for ${formData.eventName} has been logged under Pending Scrutiny.`,
        type: "SUBMITTED"
      });

      setStep(7); // Pending Scrutiny View
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] font-sans text-[#1B2B4D] py-6 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* -------------------------------------------------
            PAGE HEADER & BREADCRUMB HIERARCHY
        ------------------------------------------------- */}
        <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 sm:p-6 shadow-xs space-y-4 print:hidden">
          
          {/* Official Hierarchy Breadcrumb */}
          <div className="text-[11px] font-bold text-[#1E4F91] uppercase tracking-wider flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span>{t("Government of Maharashtra", "महाराष्ट्र शासन")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{t("Mira Bhayandar Municipal Corporation", "मीरा भाईंदर महानगरपालिका")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{t("Urban Event Permission Portal (UECP)", "नागरी कार्यक्रम परवानगी केंद्र")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-extrabold">{t("Apply for Event Permission", "कार्यक्रम परवानगी ऑनलाईन अर्ज")}</span>
          </div>

          {/* Header Title & Reference Number Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-[#D9E4F4] pt-4 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#123B7A] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-xs uppercase tracking-wider">
                  FORM E-PERMIT 2026
                </span>
                <span className="text-xs text-slate-600 font-mono font-bold">
                  {submittedRef ? `Ref No: ${submittedRef}` : t("Draft Reference: MBMC/UECP/2026/89412", "मसुदा संदर्भ: एमबीएमसी/यूईसीपी/२०२६/८९४१२")}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-[#123B7A] mt-1">
                {t("Application for Event & Sarvajanik Mandap Permission", "सार्वजनिक उत्सव व मंडप उभारणी ना-हरकत ऑनलाईन अर्ज")}
              </h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 text-xs font-bold self-start md:self-auto">
              <button
                onClick={handleSaveDraft}
                className="bg-[#F6F8FC] border border-[#D9E4F4] text-[#123B7A] hover:bg-[#D9E4F4]/50 px-3 py-1.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavedDraft ? t("Draft Saved!", "मसुदा जतन झाला!") : t("Save Draft", "मसुदा जतन करा")}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-[#F6F8FC] border border-[#D9E4F4] text-[#123B7A] hover:bg-[#D9E4F4]/50 px-3 py-1.5 rounded-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t("Print Application", "अर्जाची प्रत घ्या")}</span>
              </button>

              <a
                href="#help-panel"
                className="bg-[#123B7A] text-white hover:bg-[#1E4F91] px-3 py-1.5 rounded-xs flex items-center space-x-1.5 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t("Help", "मदत")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            SAVE DRAFT ALERT NOTIFICATION
        ------------------------------------------------- */}
        {isSavedDraft && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold p-3 rounded-xs flex items-center space-x-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Application draft saved successfully. Reference Number: MBMC/UECP/2026/89412. You can resume anytime.</span>
          </div>
        )}

        {/* -------------------------------------------------
            GOVERNMENT WARNING NOTICE PANEL
        ------------------------------------------------- */}
        <div className="bg-amber-50 border-l-4 border-l-[#F4B400] border border-[#D9E4F4] p-4 rounded-xs text-xs space-y-1 print:hidden">
          <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>IMPORTANT GOVERNMENT NOTICE / महत्त्वाचे प्रशासकीय परिपत्रक</span>
          </div>
          <p className="text-amber-950 leading-relaxed font-medium pl-6">
            {t(
              "Submitting false information or forged documents is punishable under Indian Penal Code (IPC) & Disaster Management Act 2005. Please verify all uploaded documents before final submission.",
              "खोटी माहिती देणे किंवा बनावट कागदपत्रे सादर करणे भारतीय न्याय संहिता व आपत्ती व्यवस्थापन कायद्यानुसार दंडनीय अपराध आहे. अंतिम सादरीकरणापूर्वी सर्व कागदपत्रांची पडताळणी करा."
            )}
          </p>
        </div>


        {/* -------------------------------------------------
            MAIN 75% FORM & 25% SIDEBAR LAYOUT
        ------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* -----------------------------------------------
              FORM AREA (75% WIDTH)
          ----------------------------------------------- */}
          <div className="lg:col-span-9 space-y-6">

            {/* IF SUBMITTED: DISPLAY PENDING SCRUTINY ACKNOWLEDGEMENT */}
            {step === 7 ? (
              <div className="bg-white rounded-xs border border-[#D9E4F4] p-6 sm:p-8 shadow-xs space-y-6">
                
                {/* Header */}
                <div className="border-b border-[#D9E4F4] pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-extrabold px-3 py-1 rounded">
                      STATUS: PENDING SCRUTINY (DESK-1 AUDIT)
                    </span>
                    <span className="text-xs font-mono text-slate-500">Submitted: {new Date().toLocaleTimeString('en-IN')}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B7A]">
                    {t("Application Submitted Successfully — Awaiting Department Scrutiny", "अर्ज यशस्वीरीत्या दाखल करण्यात आला — विभागीय पडताळणी प्रलंबित")}
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Your application has been logged into the MBMC Single-Window e-Governance System under Application Ref: <strong className="text-slate-900 font-mono">{submittedRef}</strong>. As per municipal rules, permissions are <strong>NOT instantly generated</strong> and require multi-department scrutiny.
                  </p>
                </div>

                {/* Live Approval Pipeline Timeline */}
                <div className="space-y-3 bg-slate-50 border border-[#D9E4F4] p-4 rounded-xs">
                  <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                    LIVE MBMC DEPARTMENTAL APPROVAL PIPELINE
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold rounded-xs">
                      <span className="flex items-center space-x-2">
                        <span>1. Citizen Application Form Submission</span>
                      </span>
                      <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded">COMPLETED</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200 text-amber-900 font-bold rounded-xs">
                      <span className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                        <span>2. Desk Scrutiny & CAD Layout Verification</span>
                      </span>
                      <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded">IN PROGRESS</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white border border-slate-200 text-slate-600 rounded-xs">
                      <span>3. Chief Fire Officer (CFO) Fire Safety Inspection</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">PENDING</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white border border-slate-200 text-slate-600 rounded-xs">
                      <span>4. MBVV Police Law & Order Clearance</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">PENDING</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white border border-slate-200 text-slate-600 rounded-xs">
                      <span>5. MBVV Traffic Route Diversion Audit</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">PENDING</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white border border-slate-200 text-slate-600 rounded-xs">
                      <span>6. MBMC Ward Officer Field Recommendation</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">PENDING</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white border border-slate-200 text-slate-600 rounded-xs">
                      <span>7. Municipal Commissioner Final Sanction & QR Pass Generation</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">PENDING</span>
                    </div>
                  </div>
                </div>

                {/* Application Details Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white border border-[#D9E4F4] p-4 rounded-xs">
                  <div><span className="font-bold text-slate-900">Application Ref ID:</span> <span className="font-mono text-[#123B7A] font-extrabold">{submittedRef}</span></div>
                  <div><span className="font-bold text-slate-900">Event Name:</span> {formData.eventName}</div>
                  <div><span className="font-bold text-slate-900">Applicant:</span> {formData.applicantName} ({formData.organization})</div>
                  <div><span className="font-bold text-slate-900">Venue:</span> {formData.venueName}</div>
                  <div><span className="font-bold text-slate-900">Dates:</span> {formData.startDate} to {formData.endDate}</div>
                  <div><span className="font-bold text-slate-900">Estimated SLA:</span> 72 Hours Processing Window</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D9E4F4] pt-4">
                  <Link
                    href={`/track?ref=${encodeURIComponent(submittedRef)}`}
                    className="w-full sm:w-auto bg-[#123B7A] hover:bg-[#1E4F91] text-white font-extrabold text-xs px-5 py-2.5 rounded-xs flex items-center justify-center space-x-1.5 transition shadow-xs"
                  >
                    <span>Track Live Status on Citizen Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/department?ref=${encodeURIComponent(submittedRef)}`}
                    className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xs flex items-center justify-center space-x-1.5 transition shadow-xs"
                  >
                    <span>Go to Officer Admin Portal (Simulate Approval)</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ) : (

              /* FORM STEP CONTAINER */
              <div className="bg-white rounded-xs border border-[#D9E4F4] shadow-xs p-6 sm:p-8 space-y-6">

                {/* STEP 1: EVENT DETAILS */}
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        A. EVENT DETAILS & CLASSIFICATION
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 1 OF 6</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      
                      {/* Ward Selection */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Ward Jurisdiction <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.wardId}
                          onChange={(e) => setFormData({ ...formData, wardId: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        >
                          {MBMC_WARDS.map((w) => (
                            <option key={w.id} value={w.id}>
                              {w.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Police Station */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Local Police Station Jurisdiction <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.policeStation}
                          onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        >
                          <option value="Kashimira Police Station">Kashimira Police Station</option>
                          <option value="Naya Nagar Police Station">Naya Nagar Police Station</option>
                          <option value="Bhayandar Police Station">Bhayandar Police Station</option>
                          <option value="Navghar Police Station">Navghar Police Station</option>
                          <option value="Uttan Coastal Police Station">Uttan Coastal Police Station</option>
                        </select>
                      </div>

                      {/* Ward Office */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Designated MBMC Ward Office <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.wardOffice}
                          onChange={(e) => setFormData({ ...formData, wardOffice: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                          readOnly
                        />
                      </div>

                      {/* Event Category */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Event Category <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.eventCategory}
                          onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        >
                          <option value="Religious / Cultural Festival">Religious / Cultural Festival</option>
                          <option value="Public Exhibition / Fair">Public Exhibition / Fair</option>
                          <option value="Social Gathering / Concert">Social Gathering / Concert</option>
                          <option value="Political Rally / Public Speech">Political Rally / Public Speech</option>
                        </select>
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Event Type / Festival Title <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Event Name */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Official Event Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.eventName}
                          onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.eventName ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.eventName && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.eventName}</span>}
                      </div>

                      {/* Event Description */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Detailed Event Description
                        </label>
                        <textarea
                          rows={3}
                          value={formData.eventDescription}
                          onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Expected Crowd */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Expected Daily Attendance / Crowd Estimate <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.expectedCrowd}
                          onChange={(e) => setFormData({ ...formData, expectedCrowd: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.expectedCrowd ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.expectedCrowd && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.expectedCrowd}</span>}
                      </div>

                      {/* Empty Column */}
                      <div />

                      {/* Dates */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Start Date <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          End Date <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Times */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Daily Program Start Time <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Daily Loudspeaker Closure Time <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                    </div>
                  </div>
                )}


                {/* STEP 2: APPLICANT DETAILS */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        B. APPLICANT & TRUSTEE PARTICULARS
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 2 OF 6</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      
                      {/* Applicant Name */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Applicant Full Name (As per Aadhaar) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.applicantName}
                          onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.applicantName ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.applicantName && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.applicantName}</span>}
                      </div>

                      {/* Organization */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Organization / Public Trust Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Email Address (For Digital Pass Delivery) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.email ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.email && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.email}</span>}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          10-Digit Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.mobile ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.mobile && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.mobile}</span>}
                      </div>

                      {/* Alternate Mobile */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Alternate Emergency Mobile Number
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.alternateMobile}
                          onChange={(e) => setFormData({ ...formData, alternateMobile: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Identity Proof Type */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Government Identity Proof Type <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.identityProofType}
                          onChange={(e) => setFormData({ ...formData, identityProofType: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        >
                          <option value="Aadhaar Card">Aadhaar Card</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Voter ID">Voter ID</option>
                          <option value="Passport">Passport</option>
                        </select>
                      </div>

                      {/* Address */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Complete Residence / Office Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.address ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.address && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.address}</span>}
                      </div>

                      {/* City, State, PIN Code */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">City / Municipal Area</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">PIN Code <span className="text-red-600">*</span></label>
                        <input
                          type="text"
                          maxLength={6}
                          value={formData.pinCode}
                          onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                    </div>
                  </div>
                )}


                {/* STEP 3: VENUE DETAILS */}
                {step === 3 && (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        C. VENUE & LOCATION SPECIFICATIONS
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 3 OF 6</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      
                      {/* Venue Name */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Venue Name & Land Plot Details <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.venueName}
                          onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.venueName ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.venueName && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.venueName}</span>}
                      </div>

                      {/* Coordinates */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">Geo Latitude</label>
                        <input
                          type="text"
                          value={formData.latitude}
                          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">Geo Longitude</label>
                        <input
                          type="text"
                          value={formData.longitude}
                          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                          readOnly
                        />
                      </div>

                      {/* Google Map Link */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Google Maps URL Link
                        </label>
                        <input
                          type="text"
                          value={formData.googleMapLink}
                          onChange={(e) => setFormData({ ...formData, googleMapLink: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Nearby Landmark */}
                      <div className="sm:col-span-2">
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                          Nearby Landmark (For Emergency Fire Brigade & Ambulance Access) <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.nearbyLandmark}
                          onChange={(e) => setFormData({ ...formData, nearbyLandmark: e.target.value })}
                          className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A] ${
                            errors.nearbyLandmark ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                          }`}
                        />
                        {errors.nearbyLandmark && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.nearbyLandmark}</span>}
                      </div>

                      {/* Parking Availability */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">Parking Capacity</label>
                        <input
                          type="text"
                          value={formData.parkingAvailability}
                          onChange={(e) => setFormData({ ...formData, parkingAvailability: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                      {/* Emergency Exit */}
                      <div>
                        <label className="font-bold text-[#1B2B4D] mb-1.5 block">Emergency Exit Gates Setup</label>
                        <input
                          type="text"
                          value={formData.emergencyExit}
                          onChange={(e) => setFormData({ ...formData, emergencyExit: e.target.value })}
                          className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                        />
                      </div>

                    </div>
                  </div>
                )}


                {/* STEP 4: DEPARTMENT REQUIREMENTS */}
                {step === 4 && (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        D. DEPARTMENT SAFETY NOC & CLEARANCE REQUIREMENTS
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 4 OF 6</span>
                    </div>

                    <div className="space-y-4 text-xs">
                      
                      {/* Department NOC Checks */}
                      <div className="bg-slate-50 p-4 border border-[#D9E4F4] rounded-xs space-y-3">
                        <span className="font-bold text-[#123B7A] text-sm block">Select Required Single-Window Clearances:</span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needFireNoc}
                              onChange={(e) => setFormData({ ...formData, needFireNoc: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">Chief Fire Officer (CFO) Fire Safety NOC</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needPoliceNoc}
                              onChange={(e) => setFormData({ ...formData, needPoliceNoc: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">MBVV Police Law & Order Clearance</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needTrafficNoc}
                              onChange={(e) => setFormData({ ...formData, needTrafficNoc: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">Traffic Route Diversion Clearance</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needHealthSanitationNoc}
                              onChange={(e) => setFormData({ ...formData, needHealthSanitationNoc: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">MBMC Health & Sanitation Permit</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needElectricityNoc}
                              onChange={(e) => setFormData({ ...formData, needElectricityNoc: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">MSEDCL Electrical Temporary Load Sanction</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.needPublicWorksPermission}
                              onChange={(e) => setFormData({ ...formData, needPublicWorksPermission: e.target.checked })}
                              className="w-4 h-4 text-[#123B7A] rounded-xs"
                            />
                            <span className="font-bold text-slate-900">MBMC PWD Structural Stability Certificate</span>
                          </label>
                        </div>
                      </div>

                      {/* Safety Equipment Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Stage Length (Feet)</label>
                          <input
                            type="number"
                            value={formData.stageLengthFt}
                            onChange={(e) => setFormData({ ...formData, stageLengthFt: Number(e.target.value) })}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Stage Width (Feet)</label>
                          <input
                            type="number"
                            value={formData.stageWidthFt}
                            onChange={(e) => setFormData({ ...formData, stageWidthFt: Number(e.target.value) })}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Mandatory CCTV Security Cameras</label>
                          <input
                            type="number"
                            value={formData.cctvCount}
                            onChange={(e) => setFormData({ ...formData, cctvCount: Number(e.target.value) })}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Fire Extinguishers Count (ABC Type)</label>
                          <input
                            type="number"
                            value={formData.fireExtinguishers}
                            onChange={(e) => setFormData({ ...formData, fireExtinguishers: Number(e.target.value) })}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-white text-slate-900 font-medium focus:outline-none focus:border-[#123B7A]"
                          />
                        </div>
                      </div>

                      {/* Statutory Declarations */}
                      <div className="space-y-3 pt-2">
                        <label className={`p-3 border rounded-xs flex items-start space-x-2 cursor-pointer ${
                          errors.soundDecibelAgree ? "bg-red-50 border-red-400" : "bg-white border-[#D9E4F4]"
                        }`}>
                          <input
                            type="checkbox"
                            checked={formData.soundDecibelAgree}
                            onChange={(e) => setFormData({ ...formData, soundDecibelAgree: e.target.checked })}
                            className="w-4 h-4 text-[#123B7A] rounded-xs mt-0.5"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">High Court Decibel Rule Undertaking <span className="text-red-600">*</span></span>
                            <span className="text-[11px] text-slate-600">I undertake to maintain sound levels strictly below 55 dB daytime and shut down loudspeakers by 10:00 PM.</span>
                          </div>
                        </label>
                        {errors.soundDecibelAgree && <span className="text-[11px] font-bold text-red-600 block">{errors.soundDecibelAgree}</span>}

                        <label className={`p-3 border rounded-xs flex items-start space-x-2 cursor-pointer ${
                          errors.flameRetardantAgree ? "bg-red-50 border-red-400" : "bg-white border-[#D9E4F4]"
                        }`}>
                          <input
                            type="checkbox"
                            checked={formData.flameRetardantAgree}
                            onChange={(e) => setFormData({ ...formData, flameRetardantAgree: e.target.checked })}
                            className="w-4 h-4 text-[#123B7A] rounded-xs mt-0.5"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">CFO Fire Retardant Mandate Undertaking <span className="text-red-600">*</span></span>
                            <span className="text-[11px] text-slate-600">I confirm that all pandal canvas and wooden structures have been treated with ammonium phosphate fire-retardant solution.</span>
                          </div>
                        </label>
                        {errors.flameRetardantAgree && <span className="text-[11px] font-bold text-red-600 block">{errors.flameRetardantAgree}</span>}
                      </div>

                    </div>
                  </div>
                )}


                {/* STEP 5: DOCUMENTS UPLOAD */}
                {step === 5 && (
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        E. UPLOAD MANDATORY SUPPORTING DOCUMENTS
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 5 OF 6</span>
                    </div>

                    <div className="space-y-4 text-xs">
                      
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-xs text-[#123B7A] font-medium flex items-center space-x-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <span>Accepted File Formats: <strong>PDF, JPG, PNG</strong>. Maximum File Size: <strong>5 MB per document</strong>.</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Aadhaar */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">1. Applicant Aadhaar Card <span className="text-red-600">*</span></span>
                            {uploadedFiles["aadhaar"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">PENDING</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("aadhaar", "Applicant Aadhaar Card", e.target.files?.[0] || null)} />
                          {uploadedFiles["aadhaar"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["aadhaar"].fileName} ({uploadedFiles["aadhaar"].fileSize})</span>}
                        </div>

                        {/* PAN Card */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">2. Organization PAN Card <span className="text-red-600">*</span></span>
                            {uploadedFiles["pan"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">PENDING</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("pan", "Organization PAN Card", e.target.files?.[0] || null)} />
                          {uploadedFiles["pan"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["pan"].fileName} ({uploadedFiles["pan"].fileSize})</span>}
                        </div>

                        {/* Society NOC */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">3. Land Owner / Society NOC <span className="text-red-600">*</span></span>
                            {uploadedFiles["society_noc"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">PENDING</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("society_noc", "Land Owner / Society NOC", e.target.files?.[0] || null)} />
                          {uploadedFiles["society_noc"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["society_noc"].fileName} ({uploadedFiles["society_noc"].fileSize})</span>}
                        </div>

                        {/* Venue Layout */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">4. Venue Layout CAD / Plan <span className="text-red-600">*</span></span>
                            {uploadedFiles["venue_layout"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">PENDING</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("venue_layout", "Venue Layout CAD / Plan", e.target.files?.[0] || null)} />
                          {uploadedFiles["venue_layout"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["venue_layout"].fileName} ({uploadedFiles["venue_layout"].fileSize})</span>}
                        </div>

                        {/* Fire Certificate */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">5. Fire Retardant Certificate <span className="text-red-600">*</span></span>
                            {uploadedFiles["fire_cert"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">PENDING</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("fire_cert", "Fire Retardant Certificate", e.target.files?.[0] || null)} />
                          {uploadedFiles["fire_cert"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["fire_cert"].fileName} ({uploadedFiles["fire_cert"].fileSize})</span>}
                        </div>

                        {/* Insurance */}
                        <div className="p-3.5 border border-[#D9E4F4] rounded-xs space-y-2 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">6. Public Liability Insurance</span>
                            {uploadedFiles["insurance"] ? <span className="text-emerald-700 font-extrabold text-[10px]">✔ UPLOADED</span> : <span className="text-slate-400 font-bold text-[10px]">OPTIONAL</span>}
                          </div>
                          <input type="file" accept=".pdf,.jpg,.png" className="w-full text-xs text-slate-700 cursor-pointer" onChange={(e) => handleFileUpload("insurance", "Public Liability Insurance", e.target.files?.[0] || null)} />
                          {uploadedFiles["insurance"] && <span className="text-[10px] text-emerald-700 font-mono block">{uploadedFiles["insurance"].fileName} ({uploadedFiles["insurance"].fileSize})</span>}
                        </div>

                      </div>
                    </div>
                  </div>
                )}


                {/* STEP 6: DECLARATION & SUBMISSION */}
                {step === 6 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    {/* Section Header */}
                    <div className="border-b-2 border-[#123B7A] pb-2 flex items-center justify-between">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#123B7A] tracking-wide uppercase">
                        F. STATUTORY GOVERNMENT DECLARATION & FINAL SUBMISSION
                      </h2>
                      <span className="text-xs font-bold text-[#1E4F91] font-mono">STEP 6 OF 6</span>
                    </div>

                    <div className="space-y-4 text-xs">
                      
                      {/* Legal Declaration Text Box */}
                      <div className="bg-slate-50 border border-slate-300 p-4 rounded-xs text-slate-800 leading-relaxed font-mono space-y-2 max-h-48 overflow-y-auto">
                        <span className="font-bold text-[#123B7A] block uppercase text-xs">FORM OF LEGAL UNDERTAKING (MAHARASHTRA MUNICIPAL CORPORATIONS ACT)</span>
                        <p>
                          I, <strong>{formData.applicantName}</strong>, representing <strong>{formData.organization}</strong>, hereby solemnly affirm and declare that the statements made in this online application for <strong>{formData.eventName}</strong> at <strong>{formData.venueName}</strong> are true, correct and complete to the best of my knowledge and belief.
                        </p>
                        <p>
                          I agree to abide strictly by all conditions imposed by the Chief Fire Officer, Mira-Bhayandar Police Commissionerate, MBMC Public Works Department, and Maharashtra Pollution Control Board.
                        </p>
                      </div>

                      {/* Declaration Checkbox */}
                      <label className={`p-4 border rounded-xs flex items-start space-x-3 cursor-pointer ${
                        errors.declarationAgreed ? "bg-red-50 border-red-500" : "bg-white border-[#D9E4F4]"
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.declarationAgreed}
                          onChange={(e) => setFormData({ ...formData, declarationAgreed: e.target.checked })}
                          className="w-4 h-4 text-[#123B7A] rounded-xs mt-0.5"
                        />
                        <div className="text-xs">
                          <span className="font-extrabold text-[#123B7A] block">
                            I ACCEPT THE LEGAL DECLARATION & UNDERTAKING <span className="text-red-600">*</span>
                          </span>
                          <span className="text-slate-600">I understand that any misrepresentation will lead to instant cancellation of NOC and legal proceedings.</span>
                        </div>
                      </label>
                      {errors.declarationAgreed && <span className="text-[11px] font-bold text-red-600 block">{errors.declarationAgreed}</span>}

                      {/* Signature, Place & Date Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        
                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">
                            Digital Signature (Full Name) <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Type Applicant Name"
                            value={formData.digitalSignature}
                            onChange={(e) => setFormData({ ...formData, digitalSignature: e.target.value })}
                            className={`w-full border p-2.5 rounded-xs bg-white text-slate-900 font-mono font-bold focus:outline-none focus:border-[#123B7A] ${
                              errors.digitalSignature ? "border-red-600 bg-red-50" : "border-[#D9E4F4]"
                            }`}
                          />
                          {errors.digitalSignature && <span className="text-[11px] font-bold text-red-600 mt-1 block">{errors.digitalSignature}</span>}
                        </div>

                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Place of Submission</label>
                          <input
                            type="text"
                            value={formData.declarationPlace}
                            onChange={(e) => setFormData({ ...formData, declarationPlace: e.target.value })}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="font-bold text-[#1B2B4D] mb-1.5 block">Submission Date</label>
                          <input
                            type="date"
                            value={formData.declarationDate}
                            className="w-full border border-[#D9E4F4] p-2.5 rounded-xs bg-slate-50 text-slate-900 font-medium focus:outline-none"
                            readOnly
                          />
                        </div>

                      </div>

                    </div>
                  </form>
                )}


                {/* FORM WIZARD NAVIGATION BUTTONS */}
                <div className="pt-6 border-t border-[#D9E4F4] flex items-center justify-between gap-3 text-xs">
                  
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={step === 1}
                    className={`px-4 py-2.5 rounded-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                      step === 1
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                        : "bg-white border border-[#123B7A] text-[#123B7A] hover:bg-[#123B7A]/10"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("Previous Step", "मागील टप्पा")}</span>
                  </button>

                  {/* Save Draft & Next / Submit Buttons */}
                  <div className="flex items-center space-x-2">
                    
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="hidden sm:flex border border-[#D9E4F4] text-[#123B7A] hover:bg-slate-100 px-4 py-2.5 rounded-xs font-bold transition items-center space-x-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t("Save Draft", "मसुदा जतन करा")}</span>
                    </button>

                    {step < 6 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-[#123B7A] hover:bg-[#1E4F91] text-white px-5 py-2.5 rounded-xs font-extrabold transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
                      >
                        <span>{t("Save & Continue", "पुढील टप्पा")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xs font-extrabold transition flex items-center space-x-1.5 shadow-md cursor-pointer uppercase tracking-wider"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>{t("Submit Application", "अंतिम अर्ज सादर करा")}</span>
                      </button>
                    )}

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* -----------------------------------------------
              RIGHT SIDEBAR (25% WIDTH - GOVERNMENT PROGRESS & HELP)
          ----------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">

            {/* 1. APPLICATION PROGRESS TRACKER */}
            <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-3">
              <div className="border-b border-[#D9E4F4] pb-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block">
                  APPLICATION PROGRESS
                </span>
                <span className="text-[11px] font-mono font-bold text-[#1E4F91]">
                  STEP {step} / 6
                </span>
              </div>

              <div className="space-y-2 text-xs font-bold">
                {[
                  { num: 1, label: "A. Event Details" },
                  { num: 2, label: "B. Applicant Details" },
                  { num: 3, label: "C. Venue Details" },
                  { num: 4, label: "D. Department Requirements" },
                  { num: 5, label: "E. Upload Documents" },
                  { num: 6, label: "F. Final Declaration" },
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (s.num <= step) setStep(s.num);
                    }}
                    disabled={s.num > step}
                    className={`w-full text-left p-2 rounded-xs flex items-center space-x-2 transition ${
                      step === s.num
                        ? "bg-[#123B7A] text-white"
                        : step > s.num
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200 cursor-pointer"
                        : "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      step === s.num
                        ? "bg-[#F4B400] text-slate-900 font-black"
                        : step > s.num
                        ? "bg-emerald-700 text-white font-bold"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      {step > s.num ? "✓" : s.num}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. FEE SUMMARY SUMMARY BOX */}
            <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-[#123B7A] uppercase tracking-wider block border-b border-[#D9E4F4] pb-2">
                ESTIMATED STATUTORY FEES
              </span>

              <div className="space-y-1.5 text-xs text-slate-700 font-mono">
                <div className="flex justify-between">
                  <span>Base Permit Fee:</span>
                  <span className="font-bold">₹{basePermitFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ground Lease ({daysCount}d):</span>
                  <span className="font-bold">₹{groundLeaseFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CFO Fire Audit:</span>
                  <span className="font-bold">₹{fireInspectionFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sanitation Deposit:</span>
                  <span className="font-bold text-amber-700">₹{sanitationDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#D9E4F4] pt-2 text-slate-900 font-bold">
                  <span>TOTAL ESTIMATED:</span>
                  <span className="text-[#123B7A] font-extrabold text-sm">₹{totalFeeCalculated.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 3. NEED HELP & EMERGENCY HELP DESK */}
            <div id="help-panel" className="bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-3 text-xs">
              <span className="font-extrabold text-[#123B7A] uppercase tracking-wider block border-b border-[#D9E4F4] pb-2 flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                <span>MBMC HELP DESK & HOURS</span>
              </span>

              <div className="space-y-2 text-slate-800">
                <div>
                  <span className="font-bold text-slate-900 block">Toll-Free Helpline:</span>
                  <span className="font-mono font-bold text-[#123B7A] text-sm block">1800-22-3424</span>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block">Helpdesk Email:</span>
                  <span className="font-mono text-slate-700">support.uecp@mbmc.gov.in</span>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block">Office Timings:</span>
                  <span className="text-slate-600 block">Mon - Sat: 09:45 AM to 05:30 PM</span>
                  <span className="text-[10px] text-slate-500 block">(Closed on 2nd & 4th Saturdays)</span>
                </div>
              </div>
            </div>

            {/* 4. DOWNLOAD GUIDELINES & SAMPLE FORM */}
            <div className="bg-white rounded-xs border border-[#D9E4F4] p-4 shadow-xs space-y-2 text-xs">
              <span className="font-extrabold text-[#123B7A] uppercase tracking-wider block border-b border-[#D9E4F4] pb-2">
                OFFICIAL DOWNLOADS
              </span>

              <Link
                href="/guidelines"
                className="w-full text-left p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xs font-bold text-[#123B7A] flex items-center justify-between transition block"
              >
                <span>Download Sample Form</span>
                <Download className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/guidelines"
                className="w-full text-left p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xs font-bold text-[#123B7A] flex items-center justify-between transition block"
              >
                <span>Event Guidelines PDF</span>
                <Download className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center font-mono text-xs text-gov-primary font-bold">
        Loading MBMC e-Governance Application Form...
      </div>
    }>
      <ApplyFormContent />
    </Suspense>
  );
}
