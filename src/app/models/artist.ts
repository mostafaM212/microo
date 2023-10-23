export interface Artist {
  name: string;
  description: string;
  dateOfBirth: Date;
  image: any;

  rating: number;
  _id?: string;
  createdAt?: Date;
}
