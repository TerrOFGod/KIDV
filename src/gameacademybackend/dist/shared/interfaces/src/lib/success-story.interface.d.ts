import { Types } from 'mongoose';
export interface ISuccessStory {
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
}
