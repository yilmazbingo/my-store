export interface IProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  image: string;
  qty: number;
  reviews: Review[];
}

interface Review {
  id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IUser {
  access: string;
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
  refresh: string;
  token: string;
  username: string;
}
