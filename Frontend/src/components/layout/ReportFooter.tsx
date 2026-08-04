"use client";

import React from "react";

interface ReportFooterProps {
  contactUrl?: string;
  reportName?: string;
  variant?: "dark" | "pill";
}

export default function ReportFooter({
  contactUrl = "https://publicskillsaustralia.org.au/contact",
  reportName = "Local Government Workforce Insights Report",
  variant = "dark",
}: ReportFooterProps) {
  if (variant === "pill") {
    return (
      <footer className="w-full bg-white border-t border-gray200 py-4 px-4">
        <div className="max-w-360 mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="border border-gray200 bg-white text-gray800 text-xs font-semibold px-5 py-2 rounded-full text-center">
            © Public Skills Australia 2026 - {reportName}
          </div>
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray200 bg-white text-gray800 text-xs font-semibold px-5 py-2 rounded-full hover:bg-gray-50 transition-colors no-underline text-center cursor-pointer"
          >
            Contact Us
          </a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#252D02] text-white py-4 border-t border-[#E2E8F0] w-full">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-white">
          © Public Skills Australia 2026 · {reportName}
        </p>
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold no-underline"
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
}
