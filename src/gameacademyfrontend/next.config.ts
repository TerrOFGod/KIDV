/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      //'your-minio-domain.com', // для MINIO изображений
      'localhost',
      // другие домены, если используются
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      // HTTPS
      {
        protocol: 'https',
        hostname: 'verpex.com',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'www.tinkercoders.com',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'www.agilitypr.com',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'images-rsg.storage.googleapis.com',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'kpfu.ru',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'shelly.kpfu.ru',
        port: '',
        pathname: '**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '**',
      },
      // HTTP
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/game-images/**',
      },
      // HTTPS
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/game-images/**',
      },
      // если видеоролики тоже HTTPS
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/game-videos/**',
      },
      // и HTTP для видео, если нужно
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/game-videos/**',
      },
    ],
  },
  serverExternalPackages : ['framer-motion', 'fs'],
  webpack: (config: { module: { rules: { test: RegExp; use: string; }[]; }; }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/content/:path*',
        destination: '/content/:path*',
      }
    ]
  },
  //transpilePackages: ['framer-motion'],
};

module.exports = nextConfig;