import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  markdown: string;

  @Prop({ type: Object })
  author?: {
    name: string;
    slug: string;
  };
}

export const NewsSchema = SchemaFactory.createForClass(News);