import { FaTelegram, FaGithub } from "react-icons/fa";

// Типизация пропсов
interface SocialLinksProps {
  links?: {
    telegram?: string;
    github?: string;
    // Можно расширить для других соцсетей
    twitter?: string;
    linkedin?: string;
  };
}

const SocialLinks = ({ links = {} }: SocialLinksProps) => {
  const { telegram, github } = links;

  // Проверка наличия хотя бы одной ссылки
  const hasLinks = telegram || github;
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {telegram && (
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors"
          aria-label="Наш Telegram"
        >
          <FaTelegram className="text-blue-500 text-base" />
          Telegram
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Наш GitHub"
        >
          <FaGithub className="text-gray-800 text-base" />
          GitHub
        </a>
      )}
    </div>
  );
};

export default SocialLinks;