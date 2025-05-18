// types/article.types.ts
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
}

export interface Tag {
    _id: string;
    name: string;
    slug: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
}

export interface Article {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    read_time: number;
    image_url: string;
    video_url?: string | null;
    total_likes: number;
    total_reads: number;
    total_shares: number;
    total_comments: number;
    published_at: string;
    category: Category;
    subcategory: Subcategory;
    tags: Tag[];
    is_featured: boolean;
    is_breaking_news: boolean;
}

export interface ArticleResponse {
    article: Article;
}
