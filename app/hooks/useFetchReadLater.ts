"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { auth, db } from "../site/firebase.config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Headline, HeadlineProps } from "../types/headline.types";
import notifications from "../constants/notifications";

const useFetchReadLater = () => {
    const [user] = useAuthState(auth);
    const [readLater, setReadLater] = useState<HeadlineProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    useEffect(() => {
        if (!user) {
            setReadLater([]);
            setLoading(false);
            return;
        }

        const fetchReadLater = async () => {
            setLoading(true);
            setError(null);
            try {
                const readLaterRef = collection(db, `users/${user.email}/read_later`);
                const querySnapshot = await getDocs(readLaterRef);

                const articles = querySnapshot.docs.map(doc => ({
                    headline: {
                        _id: doc.id,
                        ...doc.data(),
                    } as Headline,
                })) as HeadlineProps[];

                setReadLater(articles);
            } catch (err) {
                console.error("Error fetching Read Later:", err);
                setError({
                    message: notifications.error.bookmarkedNewsFetchFailed.message,
                    details: (err as Error).message || notifications.error.bookmarkedNewsFetchFailed.description,
                });
                toast.error(notifications.error.bookmarkedNewsFetchFailed.description);
            } finally {
                setLoading(false);
            }
        };

        fetchReadLater();
    }, [user]);

    const removeReadLater = async (articleId: string) => {
        if (!user) return;

        try {
            console.log("id", articleId);
            await deleteDoc(doc(db, `users/${user.email}/read_later/${articleId}`));
            setReadLater((prev) => prev.filter((article) => article.headline?._id !== articleId));
            toast.success(notifications.success.removeBookmarkSuccess.description);
        } catch (err) {
            console.error("Error removing article:", err);
            toast.error(notifications.error.removeBookmarkFailed.description);
        }
    };


    return { readLater, loading, error, removeReadLater };
};

export default useFetchReadLater;
