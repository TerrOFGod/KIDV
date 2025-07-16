// src/components/features/news/FullWidthImage.tsx
import Image from "next/image";

import { NewsItem } from "@/types/news";

type FullWidthImageProps = {
  article: NewsItem;
};

const FullWidthImage = ({ article }: FullWidthImageProps) => (
  <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  </div>
);

export default FullWidthImage;