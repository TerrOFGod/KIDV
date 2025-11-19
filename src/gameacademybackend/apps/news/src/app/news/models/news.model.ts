import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  date: string;

  @Prop()
  markdown?: string;

  @Prop()
  excerpt?: string;

  @Prop()
  content?: string;

  @Prop()
  readTime?: string;

  @Prop({ type: Object })
  author?: {
    name: string;
    slug: string;
  };

  @Prop({ type: [String] })
  tags?: string[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
