import { IsString, IsEnum } from 'class-validator';
import { PositionType } from '../types/level.type';

export class PositionDto {
  @IsEnum(['Научно-педагогический работник', 'Профессорско-преподавательский состав'])
  type: PositionType;

  @IsString()
  value: string;
}
