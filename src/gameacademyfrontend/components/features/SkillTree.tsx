'use client'; // Директива для клиентского компонента

import { useState } from "react";
import SkillDetailModal from "@/components/features/SkillDetailModal";

// Типы для структур данных
interface Subskill {
  name: string;
  // Можно добавить дополнительные поля при необходимости
}

interface Skill {
  name: string;
  level: number; // Уровень как число (1-5)
  description?: string;
  subskills?: Subskill[];
}

interface SkillTreeProps {
  skills: Skill[]; // Массив навыков
}

const SkillTree = ({ skills }: SkillTreeProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-full overflow-x-auto py-8">
      <div className="flex justify-center gap-8 flex-wrap md:flex-nowrap">
        {skills.map((skill, index) => (
          <div 
            key={`${skill.name}-${index}`} 
            className="relative flex flex-col items-center group"
          >
            {/* Основной навык */}
            <div
              onClick={() => setSelectedSkill(skill)}
              className="w-36 h-24 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex flex-col justify-center items-center shadow-xl border-4 border-white hover:scale-105 transition-all duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedSkill(skill)}
              aria-label={`Подробнее о навыке ${skill.name}, уровень ${skill.level}`}
            >
              <div className="font-semibold text-base">{skill.name}</div>
              <div className="text-xs mb-1">Уровень: {skill.level}</div>

              {/* Прогресс-бар */}
              <div className="w-28 h-2 bg-white bg-opacity-20 rounded overflow-hidden mt-1">
                <div
                  className="h-full bg-white rounded"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                  aria-valuenow={skill.level}
                  aria-valuemin={1}
                  aria-valuemax={5}
                  role="progressbar"
                ></div>
              </div>
            </div>

            {/* Линия к поднавыкам */}
            {skill.subskills && skill.subskills.length > 0 && (
              <div className="h-8 w-0.5 bg-gray-300 mt-1"></div>
            )}

            {/* Поднавыки */}
            {skill.subskills && skill.subskills.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-4 px-4 max-w-5xl mx-auto">
                {skill.subskills.map((sub, i) => (
                  <div
                    key={`${sub.name}-${i}`}
                    className="bg-gray-100 rounded-md px-4 py-2 text-sm shadow-sm hover:bg-gray-200 transition"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно деталей навыка */}
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
    </div>
  );
};

export default SkillTree;