// src/utils/imageUtils.ts
import { StaticImageData } from "next/image";

export const getImageUrl = (image: string | StaticImageData): string => {
  return typeof image === 'string' ? image : image.src;
};