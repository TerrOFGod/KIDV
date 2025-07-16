'use client'; // Директива для клиентского компонента

import { motion } from "framer-motion";
import { 
  FaLightbulb, 
  FaDraftingCompass, 
  FaCode, 
  FaBug, 
  FaRocket 
} from "react-icons/fa";
import { ReactNode, MouseEvent } from "react";

// Тип для события временной шкалы
interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  // Дополнительные поля при необходимости
}

// Тип для пропсов компонента
interface ProjectTimelineProps {
  events?: TimelineEvent[]; // Массив событий (опциональный)
  onClick?: (event: TimelineEvent) => void; // Обработчик клика (опциональный)
}

// Типизированный объект иконок
const phaseIcons: Record<string, ReactNode> = {
  "Идея": <FaLightbulb className="text-yellow-500" />,
  "Прототип": <FaDraftingCompass className="text-blue-500" />,
  "Разработка": <FaCode className="text-indigo-500" />,
  "Тестирование": <FaBug className="text-red-500" />,
  "Релиз": <FaRocket className="text-green-500" />,
};

const ProjectTimeline = ({ events = [], onClick }: ProjectTimelineProps) => {
  // Обработчик клика по событию
  const handleEventClick = (event: TimelineEvent, e: MouseEvent) => {
    e.stopPropagation();
    onClick?.(event);
  };

  return (
    <div className="overflow-x-auto py-6">
      <div className="flex space-x-8 min-w-max px-2">
        {events.map((event, index) => (
          <motion.div
            key={`${event.title}-${index}`} // Уникальный ключ
            className="bg-white rounded-lg border shadow-md px-4 py-3 w-56 cursor-pointer hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
            onClick={(e) => handleEventClick(event, e)}
            layout // Оптимизация анимаций при изменениях
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-2xl">
                {phaseIcons[event.title] || <span>📍</span>}
              </div>
              <div className="font-semibold">{event.title}</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">{event.date}</div>
            <div className="text-sm text-gray-700">{event.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;