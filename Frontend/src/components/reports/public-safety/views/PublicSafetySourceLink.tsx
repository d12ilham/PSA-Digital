import type { ReactNode } from "react";

export const policeWorkforceSourceUrl = "https://www.pc.gov.au/ongoing/report-on-government-services/justice/police-services/";

export default function PublicSafetySourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-current underline-offset-2 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4">
    {children}
  </a>;
}
