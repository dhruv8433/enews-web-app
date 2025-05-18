// hooks/useArticle.ts
import { useEffect, useState } from 'react';
import { getArticlesById } from '../service/articles.service';
import { ArticleResponse } from '../types/article.types';
import { ErrorType } from '../types/error.types';

export function useArticle(id: string) {
    const [data, setData] = useState<ArticleResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null)

    useEffect(() => {
        if (!id) return;

        const fetchArticle = async () => {
            try {
                const res = await getArticlesById(id);
                setData(res.data);
            } catch (err) {
                setError({
                    message: 'Failed to fetch Article',
                    details: (err as Error).message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    return { data, loading, error };
}
