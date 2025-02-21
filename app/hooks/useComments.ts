import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../site/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../site/firebase.config";
import { Comment } from "../types/comment.type";

const useComments = (articleId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);

    async function fetchComments() {
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
    }

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    // Add comment
    const addComment = async (commentText: string) => {
        if (!user) return alert("You must be logged in to comment!");
        if (!commentText.trim()) return;

        try {
            await addDoc(collection(db, "articles", articleId, "comments"), {
                userId: user.uid,
                username: user.displayName || "Anonymous",
                comment: commentText,
                createdAt: serverTimestamp(),
            });
            await fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return { comments, loading, addComment };
};

export default useComments;
