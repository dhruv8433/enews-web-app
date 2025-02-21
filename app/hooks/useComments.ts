import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../site/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../site/firebase.config";

interface Comment {
  id: string;
  userId: string;
  username: string;
  comment: string;
  createdAt: any;
}

const COMMENTS_PER_PAGE = 5; // Number of comments per page

const useComments = (articleId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [user] = useAuthState(auth);

  // Fetch comments with pagination
  const fetchComments = useCallback(async (loadMore = false) => {
    if (!articleId) return;

    setLoading(true);
    try {
      let commentsQuery = query(
        collection(db, "articles", articleId, "comments"),
        orderBy("createdAt", "desc"),
        limit(COMMENTS_PER_PAGE)
      );

      if (loadMore && lastDoc) {
        commentsQuery = query(
          collection(db, "articles", articleId, "comments"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(COMMENTS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(commentsQuery);

      const newComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      console.log(`Comments fetched: ${newComments.length}`);

      setComments((prev) => (loadMore ? [...prev, ...newComments] : newComments));
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  }, [articleId, lastDoc]);

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

      fetchComments(); // Refresh comments after adding a new one
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, hasMore, fetchComments, addComment };
};

export default useComments;
