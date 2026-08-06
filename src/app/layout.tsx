import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import GovHeader from "@/components/layout/GovHeader";
import GovFooter from "@/components/layout/GovFooter";

export const metadata: Metadata = {
  title: "Urban Event Permission & Coordination Platform (UECP) | MBMC",
  description: "Official Single-Window Clearance Portal for Event Permissions, Pandals, Rallies, Loudspeakers & Filming NOCs under Mira Bhayandar Municipal Corporation (MBMC).",
  keywords: ["MBMC", "Mira Bhayandar Municipal Corporation", "Event Permission", "NOC Clearance", "Single Window Portal", "Ganesh Utsav Permit", "Maharashtra Government"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/images/MBMC logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-gov-bg text-gov-text font-sans antialiased">
        <AccessibilityProvider>
          <GovHeader />
          <main className="flex-1 w-full">{children}</main>
          <GovFooter />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
