import { ISuccessStory } from '@shared/interfaces';
import { Types } from 'mongoose';

export class SuccessStoryEntity implements ISuccessStory {
  _id?: Types.ObjectId;
  lat: number;
  lng: number;
  city: string;
  graduate: string;
  project: string;
  year: number;
  description: string;
  link: string;
  image: string;

  constructor(successStory: Partial<SuccessStoryEntity>) {
    this._id = successStory._id;
    this.lat = successStory.lat;
    this.lng = successStory.lng;
    this.city = successStory.city;
    this.graduate = successStory.graduate;
    this.project = successStory.project;
    this.year = successStory.year;
    this.description = successStory.description;
    this.link = successStory.link;
    this.image = successStory.image;
  }

  public getPublicInfo() {
    return {
      _id: this._id,
      lat: this.lat,
      lng: this.lng,
      city: this.city,
      graduate: this.graduate,
      project: this.project,
      year: this.year,
      description: this.description,
      link: this.link,
      image: this.image,
    };
  }
}
