'use client';

import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Script from 'next/script'
import './globals.css'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname(); // Получаем текущий путь в Next.js
    const isNewsDetail = pathname?.startsWith("/news/") || false;
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    strategy="beforeInteractive"
                    type="module"
                />
            </head>
            <body>
                <div className="bg-light min-h-screen font-montserrat">
                    <Header />
                    <main
                        className={`max-w-7xl mx-auto p-4 ${
                        isNewsDetail ? "pt-0" : "pt-16 md:pt-24"
                        } space-y-12`}
                    >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}