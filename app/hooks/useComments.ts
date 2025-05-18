// hooks/useComments.ts
import { useState, useEffect, useCallback } from 'react';
import { createComments, getComments } from '../service/comment.service';

export function useComments(articleId: string) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getComments(articleId);
            setComments(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [articleId]);

    const addComment = async (content: string) => {
        try {
            const newComment = await createComments(articleId, content);
            setComments(prev => [newComment, ...prev]);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (articleId) {
            fetchComments();
        }
    }, [articleId, fetchComments]);

    return { comments, loading, error, addComment, refetch: fetchComments };
}
