import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../site/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../site/firebase.config";
import { Comment } from "../types/comment.type";
import notifications from "../constants/notifications";
import toast from "react-hot-toast";

const useComments = (articleId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    const [user] = useAuthState(auth);

    async function fetchComments() {
        try {
            if (!articleId) return;

            setLoading(true);
            // for doc ref path
            const commentsRef = collection(db, "articles", articleId, "comments");
            // for order coment based on time 
            const commentOrder = query(commentsRef, orderBy("createdAt", "desc"))
            // get comments from doc
            const unsubscribe = onSnapshot(commentOrder, (snapshot) => {
                const newComments = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Comment[];

                setComments(newComments);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.log("Error fetching comments:", err);
            setError({
                message: notifications.error.commentFetchFailed.message,
                details: (err as Error).message || notifications.error.commentFetchFailed.description,
            });
        }
    }

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    // Add comment
    const addComment = async (commentText: string) => {
        if (!user) return toast.error(notifications.error.loginForComment.description);
        if (!commentText.trim()) return;

        try {
            await addDoc(collection(db, "articles", articleId, "comments"), {
                userId: user.uid,
                username: user.displayName || "Anonymous",
                comment: commentText,
                createdAt: serverTimestamp(),
            });
            await fetchComments();
        } catch (err) {
            console.error("Error adding comment:", error);
            setError({
                message: notifications.error.commentFailed.message,
                details: (err as Error).message || notifications.error.commentFailed.description,
            });
        }
    };

    return { comments, loading, addComment, error };
};

export default useComments;
