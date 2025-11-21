/* eslint-disable prettier/prettier */
import { IStaff } from '@shared/interfaces';
import { Types } from 'mongoose';

export class StaffEntity implements IStaff {
  _id?: Types.ObjectId;
  slug: string;
  name: string;
  position: string;
  photo?: string;
  title?: string;
  rarity?: "LEGENDARY" | "RARE" | "COMMON";
  email?: string;
  telegram?: string;
  github?: string;
  bio?: string;
  researchInterests?: string[];
  stats?: Array<{ label: string; value: number }>;
  skills?: Array<{
    name: string;
    level: number;
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  // Устаревшие/альтернативные поля
  id?: string | number;
  image?: string;
  tags?: string[];
  contact?: string;

  constructor(staff: Partial<StaffEntity>) {
    this._id = staff._id;
    this.slug = staff.slug || '';
    this.name = staff.name || '';
    this.position = staff.position || '';
    this.photo = staff.photo;
    this.title = staff.title;
    this.rarity = staff.rarity;
    this.email = staff.email;
    this.telegram = staff.telegram;
    this.github = staff.github;
    this.bio = staff.bio;
    this.researchInterests = staff.researchInterests;
    this.stats = staff.stats;
    this.skills = staff.skills;
    this.achievements = staff.achievements;
    // Устаревшие/альтернативные поля
    this.id = staff.id;
    this.image = staff.image;
    this.tags = staff.tags;
    this.contact = staff.contact;
  }

  public getPublicInfo() {
    return {
      _id: this._id?.toString(),
      slug: this.slug,
      name: this.name,
      position: this.position,
      photo: this.photo,
      title: this.title,
      rarity: this.rarity,
      email: this.email,
      telegram: this.telegram,
      github: this.github,
      bio: this.bio,
      researchInterests: this.researchInterests,
      stats: this.stats,
      skills: this.skills,
      achievements: this.achievements,
      // Устаревшие/альтернативные поля
      id: this.id || this._id?.toString(),
      image: this.image || this.photo,
      tags: this.tags,
      contact: this.contact,
    };
  }
}
