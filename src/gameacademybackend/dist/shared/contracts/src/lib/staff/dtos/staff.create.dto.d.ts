import { PositionDto } from './position.dto';
import { ContactDto } from './contact.dto';
import { StaffStatDto } from './staff-stat.dto';
import { StaffSkillDto } from './staff-skill.dto';
import { StaffAchievementDto } from './staff-achievement.dto';
export declare class StaffCreateDto {
    name: string;
    positions: PositionDto[];
    educationLevel: string;
    researchPosition: string;
    photo?: string;
    bio?: string;
    stats?: StaffStatDto[];
    skills?: StaffSkillDto[];
    achievements?: StaffAchievementDto[];
    tags?: string[];
    contact?: ContactDto[];
}
