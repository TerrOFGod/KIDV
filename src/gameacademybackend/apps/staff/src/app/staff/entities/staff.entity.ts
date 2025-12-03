/* eslint-disable prettier/prettier */
import { IStaff } from '@shared/interfaces';
import { Types } from 'mongoose';

export class StaffEntity implements IStaff {
  _id?: Types.ObjectId;
  name: string;
  positions: Array<{ type: 'Научно-педагогический работник' | 'Профессорско-преподавательский состав'; value: string }>;
  educationLevel: string;
  researchPosition: string;
  photo?: string;
  bio?: string;
  stats?: Array<{ label: string; value: number }>;
  skills?: Array<{
    name: string;
    level: 'Junior' | 'Middle' | 'Senior';
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  tags?: string[];
  contact?: Array<{ title: string; value: string }>;

  constructor(staff: Partial<StaffEntity>) {
    this._id = staff._id;
    this.name = staff.name || '';
    this.positions = staff.positions || [];
    this.photo = staff.photo || '';
    this.educationLevel = staff.educationLevel || '';
    this.researchPosition = staff.researchPosition || '';
    this.bio = staff.bio || '';
    this.stats = staff.stats || [];
    this.skills = staff.skills || [];
    this.achievements = staff.achievements || [];
    this.tags = staff.tags;
    this.contact = staff.contact;
  }

  public getPublicInfo() {
    return {
      _id: this._id?.toString(),
      name: this.name,
      positions: this.positions,
      educationLevel: this.educationLevel,
      researchPosition: this.researchPosition,
      photo: this.photo,
      bio: this.bio,
      stats: this.stats,
      skills: this.skills,
      achievements: this.achievements,
      tags: this.tags,
      contact: this.contact,
    };
  }
}
