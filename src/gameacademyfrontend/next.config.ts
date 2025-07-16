/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983'),
      new URL('https://www.tinkercoders.com/wp-content/uploads/2022/06/game-developme.jpeg'),
      new URL('https://www.agilitypr.com/wp-content/uploads/2024/10/gamification-1080x497.jpg'),
      new URL('https://miro.medium.com/v2/resize:fit:1400/1*S8aT0HfsYQ5XkWC48wV4NA.jpeg'),
      new URL('https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/07/stylized-3d-characters-cowboy-office-construction-worker.jpg'),
      new URL('https://placehold.co/600x400?text=Puzzle+Game'),
      new URL('https://kpfu.ru/docs/F13042469430/img854158901.jpg'),
      new URL('https://shelly.kpfu.ru/e-ksu/docs/F738761626/sm6BPVcIJ_g.jpg?rnd=7502'),
      new URL('https://shelly.kpfu.ru/e-ksu/docs/F478398570/AsuwoTT94E8.jpg?rnd=5174'),
      new URL('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'),
      new URL('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'),
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