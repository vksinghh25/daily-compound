import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent site from being embedded in an iframe (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from guessing file types (MIME sniffing protection)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control how much referrer info is shared when clicking external links
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features that aren't needed on this site
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
