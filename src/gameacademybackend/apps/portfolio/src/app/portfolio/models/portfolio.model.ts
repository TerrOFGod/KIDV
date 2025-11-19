import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop()
  releaseDate?: string;

  @Prop()
  download?: string;

  @Prop({ type: [Object] })
  phases?: Array<{
    title: string;
    date: string;
    description: string;
    skills?: Array<{ name: string; level: number }>;
  }>;

  @Prop({ type: [String] })
  goals?: string[];

  @Prop({ type: [String] })
  features?: string[];

  @Prop({ type: [String] })
  screenshots?: string[];

  @Prop({ default: false })
  hallOfFame: boolean;

  @Prop({ type: [Object] })
  authors?: Array<{
    name: string;
    slug: string;
    role: string;
  }>;

  @Prop()
  year?: number;

  @Prop()
  markdown?: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
