import { useState, useEffect, useCallback } from "react";
import { addFavorite, clearFavorites, getFavorites, removeFavorite } from "../service/like.service";
import { useAuth } from "../context/AuthContext";
import { Article } from "../types/article.types";
import toast from "react-hot-toast";

export const useFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    const fetchFavorites = async () => {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data.data.favorites.articles);
        setLoading(false);
        setFetched(true);
    };

    useEffect(() => {
        if (!user || fetched) return;

        fetchFavorites();
    }, [user, fetched]);

    const addToFavorites = useCallback(
        async (articleId: string) => {
            if (!user) {
                toast.error("please login to add Favorite")
                return
            };
            const res = await addFavorite(articleId);
            if (res) {
                setFavorites((prev) => [...prev, res.data.article]);
            }
            toast.success(res.message || "article added to favorites.")
            fetchFavorites();
        },
        [user]
    );

    const removeFromFavorites = useCallback(
        async (articleId: string) => {
            if (!user) return; // Prevent removing if no user
            const res = await removeFavorite(articleId);
            if (res) {
                setFavorites((prev) => prev.filter((article) => article._id !== articleId));
            }
            toast.success(res.message || "article removed from favorites.")
            fetchFavorites();
        },
        [user]
    );

    const clearAllFavorites = useCallback(
        async () => {
            if (!user) return; // Prevent clearing if no user
            const res = await clearFavorites();
            if (res) {
                setFavorites([]);
            }
        },
        [user]
    );

    return {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        clearAllFavorites,
    };
};
