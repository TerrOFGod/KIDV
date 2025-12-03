import { Types } from 'mongoose';

export interface IStaff {
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
}
