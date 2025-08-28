export interface ProductPost {
  id: string;
  user: { name: string; avatar: string };
  image: string;
  likes: number;
  comments: number;
  shares: number;
  title: string;
  category: string;
  oldPrice: string;
  price: string;
  store: string;
  description: string;
  isLiked: boolean;
  createdAt: string;
  location: string;
  isSaved: boolean;
}

export interface ProductInfo {
  title: string;
  brand: string;
  category: string;
  price: string;
  oldPrice?: string;
  image: string;
  tag?: string;
  stock: number;
  rating: number;
}

export interface UserInfo {
  name: string;
  avatar: string;
  location: string;
  followers: number;
  verified: boolean;
}

export interface StoreInfo {
  name: string;
  logo: string;
  location: string;
  rating: number;
  followers: number;
}
