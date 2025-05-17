// Types for category inside news and categories list
export interface Category {
    _id: string;
    name: string;
    slug?: string; // slug is present in categories but not inside news.category, so optional here
}

// Type for a single news item (popularNews, recentNews, technology, travelNews, etc.)
export interface NewsItem {
    _id: string;
    title: string;
    slug: string;
    image_url: string;
    category: {
        _id: string;
        name: string;
    };
}

// The main HomeScreenData structure returned in data key
export interface HomeScreenData {
    categories: Category[];
    popularNews: NewsItem[];
    recentNews: NewsItem[];
    technology: NewsItem[];
    travelNews: NewsItem[];
    // Add other keys if your API returns more (like sports, health, etc.)
}