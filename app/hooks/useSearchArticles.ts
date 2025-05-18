import { useState, useEffect } from 'react';
import { searchArticles } from '../service/search.service';
import { Article } from '../types/article.types';
import { ErrorType } from '../types/error.types';


export const useSearchArticles = (query: string) => {
    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType | null>(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await searchArticles(query);
                setData(result.data.articles || []);
            } catch (err) {
                setError({
                    message: 'Failed to fetch articles',
                    details: (err as Error).message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { data, loading, error };
};
