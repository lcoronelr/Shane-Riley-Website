import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Third-party origins allowed to render inside an <iframe>. Video embeds are
 * only created after a visitor clicks a poster (see VideoEmbed), and only for
 * providers listed here.
 */
const VIDEO_FRAME_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://player.vimeo.com",
];

/**
 * Static pages cannot carry per-request nonces, so inline scripts that Next.js
 * emits for hydration require 'unsafe-inline'. See docs/SECURITY.md for the
 * trade-off and how to switch to a nonce-based policy.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  `frame-src ${VIDEO_FRAME_ORIGINS.join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const embedAllowList = `(self ${VIDEO_FRAME_ORIGINS.map((o) => `"${o}"`).join(" ")})`;

const permissionsPolicy = [
  "accelerometer=()",
  `autoplay=${embedAllowList}`,
  "camera=()",
  "display-capture=()",
  `encrypted-media=${embedAllowList}`,
  `fullscreen=${embedAllowList}`,
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  `picture-in-picture=${embedAllowList}`,
  "publickey-credentials-get=()",
  "usb=()",
  "web-share=(self)",
  "xr-spatial-tracking=()",
  "browsing-topics=()",
].join(", ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Browsers ignore HSTS on plain-HTTP responses, so this only takes effect
  // once the site is served over HTTPS. See docs/DEPLOYMENT.md before adding
  // includeSubDomains or preload.
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Images are pre-generated at build time (scripts/generate-images.mjs) and
    // served as static files instead of by the runtime optimiser, which can
    // hang on an image whose first request is cancelled. Keep these widths in
    // sync with WIDTHS in that script.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1920, 2400],
    imageSizes: [96, 256, 384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
