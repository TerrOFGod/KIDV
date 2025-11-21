import { Types } from 'mongoose';
export interface IStaff {
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
    stats?: Array<{
        label: string;
        value: number;
    }>;
    skills?: Array<{
        name: string;
        level: number;
        description?: string;
        subskills?: Array<{
            name: string;
            description?: string;
        }>;
    }>;
    achievements?: Array<{
        title: string;
        icon: string;
        description: string;
    }>;
    id?: string | number;
    image?: string;
    tags?: string[];
    contact?: string;
}
