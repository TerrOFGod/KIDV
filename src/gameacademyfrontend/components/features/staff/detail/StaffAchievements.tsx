// src/components/features/staff/StaffAchievements.tsx
'use client';

import { motion } from "framer-motion";
import { 
  FaStar, 
  FaServer, 
  FaCrown, 
  FaMedal 
} from "react-icons/fa";
import { StaffAchievement } from "@/types/staff";
import { PortfolioItem } from "@/types/portfolio";
import { StaffMember } from "@/types/staff";

type StaffAchievementsProps = {
  staff: StaffMember;
  projects: PortfolioItem[];
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaStar": return <FaStar className="text-2xl text-yellow-500 shrink-0" />;
    case "FaUserGear": return <FaServer className="text-2xl text-yellow-500 shrink-0" />;
    case "FaCrown": return <FaCrown className="text-2xl text-yellow-500 shrink-0" />;
    default: return <FaMedal className="text-2xl text-yellow-500 shrink-0" />;
  }
};

const generateDynamicAchievements = (
  staff: StaffMember, 
  projects: PortfolioItem[]
): StaffAchievement[] => {
  const achievements: StaffAchievement[] = [];

  // 🧠 Навыки выше 4
  staff.skills?.forEach(skill => {
    if (skill.level >= 4) {
      achievements.push({
        title: `Эксперт в ${skill.name}`,
        description: `Достиг высокого уровня в умении "${skill.name}"`,
        icon: "FaStar"
      });
    }
  });

  // 🛠 Больше 3 проектов
  if (projects.length >= 3) {
    achievements.push({
      title: "Опытный наставник",
      description: `Участвовал(а) в ${projects.length} проектах студентов`,
      icon: "FaUserGear"
    });
  }

  // 🔥 Роль "Руководитель" и есть проекты
  if (staff.position?.toLowerCase().includes("руководитель") && projects.length > 0) {
    achievements.push({
      title: "Лидер команды",
      description: "Руководил(а) разработкой студенческих проектов",
      icon: "FaCrown"
    });
  }

  return achievements;
};

const StaffAchievements = ({ staff, projects }: StaffAchievementsProps) => {
  const allAchievements = [
    ...(staff.achievements || []),
    ...generateDynamicAchievements(staff, projects)
  ];

  if (allAchievements.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Достижения</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAchievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white border rounded-lg shadow p-4 flex items-start space-x-3 transition duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.6)]"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getIconComponent(a.icon)}
            </motion.div>
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-600">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffAchievements;