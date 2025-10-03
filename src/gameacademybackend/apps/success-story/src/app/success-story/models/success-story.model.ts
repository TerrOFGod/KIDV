import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SuccessStoryDocument = HydratedDocument<SuccessStory>;

@Schema({ timestamps: true })
export class SuccessStory {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  graduate: string;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  image: string;
}

export const SuccessStorySchema = SchemaFactory.createForClass(SuccessStory);