import { Rarity } from '../types/rarity.type';
import { StaffStatDto } from './staff-stat.dto';
import { StaffSkillDto } from './staff-skill.dto';
import { StaffAchievementDto } from './staff-achievement.dto';
export declare class StaffCreateDto {
    slug: string;
    name: string;
    position: string;
    photo: string;
    title?: string;
    rarity?: Rarity;
    email?: string;
    telegram?: string;
    github?: string;
    bio?: string;
    researchInterests?: string[];
    stats?: StaffStatDto[];
    skills?: StaffSkillDto[];
    achievements?: StaffAchievementDto[];
}
