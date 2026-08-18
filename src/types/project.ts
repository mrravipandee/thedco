export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  coverImage: string;
  gallery: string[];
  year: number;
  services: string[];
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}
