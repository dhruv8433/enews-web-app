"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { auth, db } from "../site/firebase.config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Headline, HeadlineProps } from "../types/headline.types";
import { User } from "firebase/auth";
import notifications from "../constants/notifications";

const useFetchFavorites = () => {
    const [user] = useAuthState(auth);
    const [favorites, setFavorites] = useState<HeadlineProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    const fetchFavorites = async (user: User) => {
        setLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, `users/${user.email}/favorites`));
            const favsList = querySnapshot.docs.map(doc => ({
                headline: {
                    _id: doc.id,
                    ...doc.data(),
                } as Headline,
            })) as HeadlineProps[];

            console.log("Fetched favorites:", favsList);
            setFavorites(favsList);
        } catch (err) {
            console.error("Error fetching favorites:", err);
            setError({
                message: notifications.error.likedNewsFetchFailed.message,
                details: (err as Error).message || notifications.error.likedNewsFetchFailed.description,
            });
            toast.error(notifications.error.likedNewsFetchFailed.description);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }
        fetchFavorites(user);
    }, [user]); // ✅ Only depend on `user`

    const removeFavorite = async (articleId: string) => {
        if (!user) return;
    
        console.log("Removing article:", articleId);
    
        try {
            await deleteDoc(doc(db, `users/${user.email}/favorites/${articleId}`));
    
            // ✅ Ensure a new state reference for React to detect change
            setFavorites((prev) => {
                const updatedFavorites = prev.filter((fav) => fav.headline._id !== articleId);
                console.log("Updated favorites after removal:", updatedFavorites);
                return [...updatedFavorites]; // ✅ New array reference ensures UI updates
            });
    
            toast.success(notifications.success.removeFavoriteSuccess.description);
        } catch (err) {
            console.error("Error removing favorite:", err);
            toast.error(notifications.error.removeFavoriteFailed.description);
        }
    };

    return { favorites, loading, error, removeFavorite };
};

export default useFetchFavorites;
