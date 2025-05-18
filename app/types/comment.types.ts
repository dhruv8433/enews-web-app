interface User {
    _id: string;
    fullname: string;
    avatar_url: string;
}

interface Article {
    _id: string;
    title: string;
    slug: string;
}

interface flags {
    isFlagged: boolean;
    isReported: boolean;
    content: string;
}

export interface Comment {
    _id: string;
    content: string;
    created_at: string;  // ISO date string
    article: Article;
    user: User;
    flags: flags[];  // or define a specific type if known
}

export interface CommentsResponse {
    statusCode: number;
    data: {
        comments: Comment[];
    };
    message: string;
    success: boolean;
}
