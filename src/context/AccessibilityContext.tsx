"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type FontSize = "sm" | "md" | "lg";
type Language = "EN" | "MR";

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (active: boolean | ((prev: boolean) => boolean)) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, mr?: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    // Apply font scale class to html tag
    document.documentElement.classList.remove("font-scale-sm", "font-scale-md", "font-scale-lg");
    document.documentElement.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast class
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  const t = (en: string, mr?: string): string => {
    if (language === "MR" && mr) {
      return mr;
    }
    return en;
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
