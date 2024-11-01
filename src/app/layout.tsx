/**
 * Root layout component - Provides the base HTML structure.
 * Includes fonts, global styles, and metadata for the application.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonoCV - Create Professional Resumes",
  description:
    "Free online resume builder. Create ATS-friendly, professional resumes with our easy-to-use form interface and real-time preview.",
  keywords: ["resume", "cv", "resume builder", "job application", "career", "monocv"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
