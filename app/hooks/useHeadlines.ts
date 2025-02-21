import { useState, useEffect } from 'react';
import { getSpecificQueryNews } from '@/app/service/getSpecificQueryNews';

// Create the useHeadlines hook
const useHeadlines = (query: string) => {
    const [headlines, setHeadlines] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeadlines = async () => {
            setLoading(true);
            setError(null);

            // Check sessionStorage inside useEffect to get the latest data
            const storedArticles = sessionStorage.getItem(query);

            if (storedArticles) {
                console.log("data fetced from cache");
                setHeadlines(JSON.parse(storedArticles));
                setLoading(false);
                return; // Stop execution if data is already in sessionStorage
            }

            try {
                // Fetch top headlines using the query string
                const data = await getSpecificQueryNews(query);
                sessionStorage.setItem(query, JSON.stringify(data.docs)); // Store in sessionStorage
                setHeadlines(data.docs); // Assuming data.docs is the array of headlines
            } catch (err) {
                setError('Failed to fetch headlines');
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, [query]); // Re-run when the query changes

    return { headlines, loading, error };
};

export default useHeadlines;
