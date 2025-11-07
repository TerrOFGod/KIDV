'use client';

import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        // Определяем активную секцию на основе пути
        if (pathname === '/') setActiveSection('home');
        else if (pathname === '/profile') setActiveSection('profile');
        else if (pathname === '/admin') setActiveSection('admin');
    }, [pathname]);

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    return (
        <html lang="ru">
            <head>
                <Script
                    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    strategy="beforeInteractive"
                    type="module"
                />
            </head>
            <body>
                <AuthProvider>
                    <div className="min-h-screen">
                        <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
                        <main>
                            {children}
                        </main>
                        {pathname === '/' && <Footer />}
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}