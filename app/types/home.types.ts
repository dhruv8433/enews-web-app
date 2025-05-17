// types.ts

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface ArticleCategory {
  _id: string;
  name: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  image_url: string;
  category: ArticleCategory;
  published_date?: string;
}

export interface NewsData {
  _id: string;
  categories: Category[];
  popularNews: NewsArticle[];
  recentNews: NewsArticle[];
  technology: NewsArticle[];
}

export interface NewsApiResponse {
  statusCode: number;
  data: NewsData;
}

// Define the banner type, assuming banners are objects with id and image URL or link
export interface Banner {
  id: string;
  imageUrl: string;
  link?: string; // optional
}

// Define featured product type
export interface FeaturedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

// Extend HomeScreenData with explicit fields instead of index signature
export interface HomeScreenData {
  banners: Banner[];
  featuredProducts: FeaturedProduct[];
  latestNews?: NewsArticle[]; // example extra field, add others as needed
  featuredCategories?: Category[]; // example extra field
  [key: string]: unknown; // fallback for any other unknown props
}
