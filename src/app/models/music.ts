import { Artist } from './artist';

export interface Music {
  _id?: string;
  title: string;
  description: string;
  artist: any;
  createdAt?: Date;
  rating?: number;
  path: string;
}
