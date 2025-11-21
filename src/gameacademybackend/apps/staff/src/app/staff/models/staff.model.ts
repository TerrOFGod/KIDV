/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: string;

  @Prop()
  photo?: string;

  @Prop()
  title?: string;

  @Prop({ enum: ['LEGENDARY', 'RARE', 'COMMON'] })
  rarity?: "LEGENDARY" | "RARE" | "COMMON";

  @Prop()
  email?: string;

  @Prop()
  telegram?: string;

  @Prop()
  github?: string;

  @Prop()
  bio?: string;

  @Prop({ type: [String] })
  researchInterests?: string[];

  @Prop({ type: [Object] })
  stats?: Array<{ label: string; value: number }>;

  @Prop({ type: [Object] })
  skills?: Array<{
    name: string;
    level: number;
    description?: string;
    subskills?: Array<{ name: string; description?: string }>;
  }>;

  @Prop({ type: [Object] })
  achievements?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;

  // Устаревшие/альтернативные поля
  @Prop()
  image?: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop()
  contact?: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
