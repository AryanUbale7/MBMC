"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function GovPreloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1800ms
    const startTime = Date.now();
    const duration = 1800;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    // Start fade at 1.9s, hide at 2.4s
    const fadeTimer = setTimeout(() => setFading(true), 1900);
    const hideTimer = setTimeout(() => setVisible(false), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.55s ease",
        pointerEvents: fading ? "none" : "all",
        fontFamily: "'Inter', 'Noto Sans', sans-serif",
      }}
    >
      {/* ── Government Emblem Row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
        {/* National Emblem */}
        <img
          src="/images/sher.png"
          alt="Emblem of India"
          style={{ width: "52px", height: "80px", objectFit: "contain", opacity: 0.88 }}
        />

        {/* Vertical Divider */}
        <div style={{ width: "1px", height: "90px", backgroundColor: "#D0D9E8" }} />

        {/* MBMC Logo */}
        <img
          src="/images/mbmc_updated logo.jpg"
          alt="MBMC Logo"
          style={{ width: "110px", height: "110px", objectFit: "contain" }}
        />

        {/* Vertical Divider */}
        <div style={{ width: "1px", height: "64px", backgroundColor: "#D0D9E8" }} />

        {/* Maharashtra Seal text block */}
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#6B7FA3",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            Government of Maharashtra
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#0D2D5E",
              letterSpacing: "0.01em",
              lineHeight: "1.2",
            }}
          >
            Mira Bhayandar
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#0D2D5E",
              letterSpacing: "0.01em",
              lineHeight: "1.2",
            }}
          >
            Municipal Corporation
          </div>
        </div>
      </div>

      {/* ── Horizontal Rule ── */}
      <div
        style={{
          width: "340px",
          height: "1px",
          backgroundColor: "#D0D9E8",
          marginBottom: "22px",
        }}
      />

      {/* ── Platform Name ── */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#123B7A",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          Urban Event Permission &amp; Coordination Platform
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "#8A9BBE",
            textTransform: "uppercase",
          }}
        >
          Single-Window Clearance System &nbsp;·&nbsp; UECP v2026
        </div>
      </div>

      {/* ── Progress Bar Track ── */}
      <div
        style={{
          width: "320px",
          height: "2px",
          backgroundColor: "#E8EDF5",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#123B7A",
            borderRadius: "1px",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* ── Status Text ── */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.09em",
          color: "#8A9BBE",
          textTransform: "uppercase",
        }}
      >
        Loading Government Services&hellip;
      </div>

      {/* ── STQC Footer ── */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "9px",
          fontWeight: 600,
          color: "#B0BDCF",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>STQC Certified</span>
        <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#B0BDCF", display: "inline-block" }} />
        <span>NIC Compliant</span>
        <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#B0BDCF", display: "inline-block" }} />
        <span>NeGP Framework</span>
      </div>
    </div>
  );
}
