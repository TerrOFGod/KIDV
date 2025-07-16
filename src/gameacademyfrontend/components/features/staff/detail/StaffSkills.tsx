// src/components/features/staff/StaffSkills.tsx
'use client';

import SkillTree from "@/components/features/SkillTree";
import { StaffSkill } from "@/types/staff";

type StaffSkillsProps = {
  skills: StaffSkill[];
};

const StaffSkills = ({ skills }: StaffSkillsProps) => {
  if (skills.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Навыки</h2>
      <SkillTree skills={skills} />
    </div>
  );
};

export default StaffSkills;