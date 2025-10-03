import { Types } from 'mongoose';

export interface INews {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  markdown: string;
  author?: { name: string; slug: string };
}