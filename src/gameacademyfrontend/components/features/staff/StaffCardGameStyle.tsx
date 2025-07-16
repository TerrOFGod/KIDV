import Link from "next/link";
import classNames from "classnames";

// Типизация для редкости
type Rarity = 'LEGENDARY' | 'RARE' | 'COMMON';

// Типизация для стилей редкости
interface RarityStyles {
  [key: string]: {
    bg: string;
    border: string;
    badge: string;
    glow: string;
  };
}

// Тип для статистики
interface Stat {
  label: string;
  value: number;
}

// Пропсы компонента
interface StaffCardGameStyleProps {
  slug: string;
  name: string;
  position: string;
  image?: string;
  rarity?: Rarity | string; // Допускаем другие строки, но предпочтительно Rarity
  stats?: Stat[];
}

const rarityStyles: RarityStyles = {
  LEGENDARY: {
    bg: "bg-yellow-50",
    border: "border-2 border-yellow-400",
    badge: "bg-yellow-300 text-yellow-900",
    glow: "hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
  },
  RARE: {
    bg: "bg-blue-50",
    border: "border border-blue-300",
    badge: "bg-blue-200 text-blue-800",
    glow: "hover:shadow-[0_0_20px_rgba(147,197,253,0.5)]"
  },
  COMMON: {
    bg: "bg-white",
    border: "border border-gray-200",
    badge: "bg-gray-200 text-gray-700",
    glow: "hover:shadow-[0_0_20px_rgba(209,213,219,0.4)]"
  }
};

const StaffCardGameStyle = ({ 
  slug, 
  name, 
  position, 
  image, 
  rarity = "COMMON", 
  stats = [] 
}: StaffCardGameStyleProps) => {
  // Нормализуем значение редкости к верхнему регистру
  const normalizedRarity = rarity.toUpperCase();
  
  // Получаем стили для редкости или используем COMMON как запасной вариант
  const styles = rarityStyles[normalizedRarity] || rarityStyles.COMMON;

  return (
    <Link href={`/staff/${slug}`} passHref legacyBehavior>
      <a className="block">
        <div
          className={classNames(
            "rounded-xl overflow-hidden p-4 transition-transform transform hover:scale-[1.02] shadow-md",
            styles.bg,
            styles.border,
            styles.glow,
            "cursor-pointer" // Явное указание курсора
          )}
          aria-label={`Карточка сотрудника: ${name}`}
        >
          {/* Область фото */}
          <div className="w-full h-60 flex items-center justify-center overflow-hidden rounded-md mb-4 bg-white">
            {/* Используем next/image для оптимизации */}
            <img
              src={image}
              alt={`Фото ${name}`}
              className="h-full object-contain"
              loading="lazy" // Ленивая загрузка
            />
          </div>

          {/* Контент карточки */}
          <div className="space-y-2 px-1 pb-1">
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{position}</p>

            <span className={classNames(
              "inline-block text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider",
              styles.badge
            )}>
              {normalizedRarity}
            </span>

            {/* Статистика */}
            {stats.length > 0 && (
              <div className="pt-3 space-y-1 text-sm">
                {stats.map((stat, i) => (
                  <div key={`stat-${i}`} className="flex justify-between">
                    <span className="text-gray-700">{stat.label}</span>
                    <span className="font-medium text-gray-900">
                      {stat.value}/100
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default StaffCardGameStyle;