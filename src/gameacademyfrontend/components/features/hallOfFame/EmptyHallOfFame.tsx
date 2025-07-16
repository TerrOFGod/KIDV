// src/components/features/hallOfFame/EmptyHallOfFame.tsx
import Link from "next/link";

const EmptyHallOfFame = () => (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">
      Пока нет проектов, отмеченных на стене славы. Возможно, ваш проект будет первым!
    </p>
    <Link 
      href="/portfolio" 
      className="mt-4 inline-block text-blue-600 hover:underline"
    >
      Посмотреть все проекты →
    </Link>
  </div>
);

export default EmptyHallOfFame;