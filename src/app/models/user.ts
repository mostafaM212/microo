export interface User {
  email: string;
  address: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  visa?: string;
  createdAt: Date;
  favorites: string[];
}
