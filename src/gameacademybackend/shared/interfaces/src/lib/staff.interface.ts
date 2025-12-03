import { Types } from 'mongoose';

export type Level = 'Junior' | 'Middle' | 'Senior';
export type PositionType = 'Научно-педагогический работник' | 'Профессорско-преподавательский состав';

export interface StaffStat {
  label: string;
  value: number;
}

export interface Subskill {
  name: string;
  description?: string;
}

export interface StaffSkill {
  name: string;
  level: Level;
  description?: string;
  subskills?: Subskill[];
}

export interface StaffAchievement {
  title: string;
  icon: string;
  description: string;
}

export interface Contact {
  title: string;
  value: string;
}

export interface Position {
  type: PositionType;
  value: string;
}

export interface IStaff {
  _id?: Types.ObjectId;
  name: string;
  positions: Position[];
  educationLevel: string;
  researchPosition: string;
  photo?: string;
  bio?: string;
  stats?: StaffStat[];
  skills?: StaffSkill[];
  achievements?: StaffAchievement[];
  tags?: string[];
  contact?: Contact[];
}
