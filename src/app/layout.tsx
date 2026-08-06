import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AuthProvider } from "@/context/AuthContext";
import GovHeader from "@/components/layout/GovHeader";
import GovFooter from "@/components/layout/GovFooter";
import GovPreloader from "@/components/layout/GovPreloader";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/sher.png" as="image" />
        <link rel="preload" href="/images/mbmc_updated logo.jpg" as="image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gov-bg text-gov-text font-sans antialiased">
        <GovPreloader />
        <AccessibilityProvider>
          <AuthProvider>
            <GovHeader />
            <main className="flex-1 w-full">{children}</main>
            <GovFooter />
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
