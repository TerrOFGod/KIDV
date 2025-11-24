/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Team from '@/components/sections/Team';
import Blog from '@/components/sections/Blog';
import Partners from '@/components/sections/Partners';
import Awards from '@/components/sections/Awards';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { HealthStatus } from '@/app/health/health-status';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Главная', component: Hero },
    { id: 'projects', label: 'Проекты', component: Projects },
    { id: 'team', label: 'Команда', component: Team },
    { id: 'blog', label: 'Блог', component: Blog },
    { id: 'partners', label: 'Партнеры', component: Partners },
    { id: 'awards', label: 'Награды', component: Awards },
    { id: 'faq', label: 'FAQ', component: FAQ },
    { id: 'contact', label: 'Контакты', component: Contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-20">
      {sections.map((section, index) => {
        const SectionComponent = section.component;
        return (
          <section 
            key={section.id}
            id={section.id}
            className="min-h-screen"
          >
            <SectionComponent />
          </section>
        );
      })}
    </div>
  );
}