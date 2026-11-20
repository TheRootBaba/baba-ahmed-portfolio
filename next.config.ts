import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://raw.githubusercontent.com https://lh3.googleusercontent.com https://www.linuxfoundation.org https://commons.wikimedia.org https://*.githubusercontent.com; font-src 'self' data: https://fonts.gstatic.com; media-src 'self' blob: https://github.com https://*.githubusercontent.com https://raw.githubusercontent.com; connect-src 'self' https://vitals.vercel-insights.com${isDev ? " ws: wss:" : ""}; manifest-src 'self'; ${isDev ? "" : "upgrade-insecure-requests"}` },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "www.linuxfoundation.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" }
    ]
  }
};

export default nextConfig;
