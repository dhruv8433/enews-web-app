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

export interface HomeScreenData {
    banners: string[];
    featuredProducts: {
        id: string;
        name: string;
        image: string;
        price: number;
    }[];
    [key: string]: any; // Or better: add more specific keys
}