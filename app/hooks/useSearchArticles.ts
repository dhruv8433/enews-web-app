import { useState, useEffect } from 'react';
import { searchArticles } from '../service/search.service';


export const useSearchArticles = (query: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await searchArticles(query);
                console.log(result);
                setData(result.data.articles || []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    return { data, loading, error };
};
