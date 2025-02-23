import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../site/firebase.config";
import { Headline } from "../types/headline.types";
import slugify from "slugify";
import notifications from "../constants/notifications";

// Custom hook to fetch and save articles
const useSharedArticle = (articleSlug?: string) => {
    const [article, setArticle] = useState<Headline | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    useEffect(() => {
        if (!articleSlug) return;

        const fetchArticle = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, `shared_articles/${articleSlug}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArticle(docSnap.data() as Headline);
                } else {
                    setError({
                        message: notifications.error.newsFetchFailed.message,
                        details: notifications.error.newsFetchFailed.description,
                    });
                }
            } catch (err) {
                console.error("Error fetching article:", err);
                setError({
                    message: notifications.error.newsFetchFailed.message,
                    details: (err as Error).message || notifications.error.newsFetchFailed.description,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleSlug]);

    return { article, loading, error };
};

// Function to store article in Firestore (NOT a hook)
export const saveArticleToFirestore = async (articleData: Headline) => {
    try {
        const articleSlug = slugify(articleData.abstract).toLowerCase();
        const docRef = doc(db, `shared_articles/${articleSlug}`);
        await setDoc(docRef, articleData);
        return articleData._id; // Return ID for shareable URL
    } catch (error) {
        console.error("Error saving article:", error);
        return null;
    }
};

export default useSharedArticle;
