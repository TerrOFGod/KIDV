import { SubskillDto } from './subskill.dto';
import { Level } from '../types/level.type';
export declare class StaffSkillDto {
    name: string;
    level: Level;
    description?: string;
    subskills?: SubskillDto[];
}
