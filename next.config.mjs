/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://apis.google.com https://www.googletagmanager.com; connect-src 'self' https://plausible.io https://www.google.com https://www.googletagmanager.com https://*.google-analytics.com; frame-src 'self' https://kashkitchen.com https://www.kashkitchen.com https://convoninja.org https://www.convoninja.org https://v0-myisotopetracker-website.vercel.app https://v0-tensorflow-sketch-learner.vercel.app https://v0-mathematical-board-game.vercel.app; img-src 'self' data: https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://*.google-analytics.com https://www.google.com;",
          },
        ],
      },
    ]
  },
}

export default nextConfig
