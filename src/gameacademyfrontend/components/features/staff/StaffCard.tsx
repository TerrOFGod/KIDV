import Link from "next/link";
import Image from "next/image"
import SocialLinks from "@/components/features/SocialLinks";

import Label from "@/components/ui/Label";

import { NewsItem } from "@/types/news";
import { StaffMember } from "@/types/staff"; // Предполагаем наличие типов
import newsData from "@/data/news";
import roles from "@/data/roles";

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard = ({ staff }: StaffCardProps) => {
  const { 
    id, 
    photo, 
    name, 
    title, 
    email, 
    telegram, 
    github, 
    bio 
  } = staff;
  
  const authorArticles = newsData.filter(
    (article: NewsItem) => article.authorId === id
  );
  
  return (
    <div className="border-t border-gray-300 pt-8 pb-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Оптимизированное изображение Next.js */}
        <div className="relative w-40 h-40">
          <Image
            src={photo}
            alt={`Фото ${name}`}
            className="w-full h-full object-cover rounded-full border shadow-sm"
          />
        </div>

        <div className="flex-1 space-y-2 text-left">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>

          <p className="text-sm text-gray-700 font-semibold">
            <Label dict={roles} value={title!} />
          </p>

          {email && (
            <a
              href={`mailto:${email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {email}
            </a>
          )}

          <SocialLinks links={{ telegram, github }} />
        </div>
      </div>

      {bio && (
        <div className="text-gray-700 text-base leading-relaxed max-w-3xl">
          {bio}
        </div>
      )}

      {authorArticles.length > 0 && (
        <Link
          href={`/news/${authorArticles[0].slug}`}
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
          aria-label={`Читать статью автора ${name}`}
        >
          Читать статью →
        </Link>
      )}
    </div>
  );
};

export default StaffCard;