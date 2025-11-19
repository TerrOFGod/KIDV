import { Types } from 'mongoose';

export interface IPortfolio {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image?: string;
  description?: string;
  releaseDate?: string;
  download?: string;
  phases?: Array<{
    title: string;
    date: string;
    description: string;
    skills?: Array<{ name: string; level: number }>;
  }>;
  goals?: string[];
  features?: string[];
  screenshots?: string[];
  hallOfFame?: boolean;
  authors?: Array<{
    name: string;
    slug: string;
    role: string;
  }>;
  year?: number;
  markdown?: string;
  tags?: string[];
}
