// src/app/staff/[slug]/page.tsx
import { StaffMember } from "@/types/staff";
import { PortfolioItem } from "@/types/portfolio";

import staffList from "@/data/staff";
import portfolioData from "@/data/portfolio";

import StaffHeader from "@/components/features/staff/detail/StaffHeader";
import StaffSkills from "@/components/features/staff/detail/StaffSkills";
import StaffProjects from "@/components/features/staff/detail/StaffProjects";
import StaffAchievements from "@/components/features/staff/detail/StaffAchievements";
import StaffContacts from "@/components/features/staff/detail/StaffContacts";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/layout/AnimatedSection";

// Генерация статических путей
export async function generateStaticParams() {
  return staffList.map((staff) => ({
    slug: staff.slug,
  }));
}

type StaffDetailPageProps = {
  params: { slug: string };
};

export default async function StaffDetailPage({ params }: StaffDetailPageProps) {
  const { slug } = await params;
  
  const staff = staffList.find((s: StaffMember) => s.slug === slug) as StaffMember | undefined;
  
  const relatedProjects = portfolioData.filter((project: PortfolioItem) =>
    project.authors?.some(author => author.slug === staff?.slug)
  );

  if (!staff) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        Преподаватель не найден
      </div>
    );
  }

  return (
    <AnimatedSection 
      className="space-y-10"       
      transition={{ duration: 0.5 }}>
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <StaffHeader staff={staff} />
        
        <StaffSkills skills={staff.skills || []} />
        
        <StaffProjects projects={relatedProjects} />
        
        <StaffAchievements staff={staff} projects={relatedProjects} />
        
        <StaffContacts staff={staff} />
      </div>
    </AnimatedSection>
  );
}