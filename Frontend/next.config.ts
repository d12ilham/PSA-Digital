import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/reports/correctional-services-wir-2026/workforce_insights_detail",
        destination: "/reports/correctional-services-wir-2026/workforce_insights_2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
