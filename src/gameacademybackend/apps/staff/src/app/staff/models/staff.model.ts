/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Object] })
  positions: Array<{ type: 'Научно-педагогический работник' | 'Профессорско-преподавательский состав'; value: string }>;

  @Prop({ required: true })
  educationLevel: string;

  @Prop({ required: true })
  researchPosition: string;

  @Prop()
  photo?: string;

  @Prop()
  bio?: string;

  @Prop({ type: [Object] })
  stats?: Array<{ label: string; value: number }>;

  @Prop({ type: [Object] })
  skills?: Array<{
    name: string;
    level: 'Junior' | 'Middle' | 'Senior';
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;

  @Prop({ type: [Object] })
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: [Object] })
  contact?: Array<{ title: string; value: string }>;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
