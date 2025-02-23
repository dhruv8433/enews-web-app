"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast"; // ✅ Add toast for feedback
import { auth, db } from "../site/firebase.config";
import { Headline } from "../types/headline.types";
import notifications from "../constants/notifications";

const useLikeArticle = (article: Headline) => {
  const [user] = useAuthState(auth);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && article?._id) {
      checkFavorite();
    }
  }, [user, article]);

  // 🔹 Get Firebase-safe article ID
  const getArticleId = () => {
    if (!article || !article._id) return null;
    return article._id.replace(/[^a-zA-Z0-9-_]/g, "_");
  };

  // 🔹 Check if article is already liked
  const checkFavorite = async () => {
    const articleId = getArticleId();
    if (!user || !articleId) return;
    const docRef = doc(db, `users/${user.email}/favorites/${articleId}`);
    const docSnap = await getDoc(docRef);
    setIsFavorite(docSnap.exists());
  };

  // 🔹 Toggle like/unlike article
  const toggleFavorite = async () => {
    if (!user) {
      toast.error(notifications.error.loginToSaveFavorite.description);
      return;
    }
    const articleId = getArticleId();
    if (!articleId) {
      toast.error(notifications.error.articleIdMissing.description);
      console.error("Article ID is missing.", articleId);
      return;
    }
    const docRef = doc(db, `users/${user.email}/favorites/${articleId}`);

    try {
      if (isFavorite) {
        await deleteDoc(docRef);
        setIsFavorite(false);
        toast.success(notifications.success.removeFavoriteSuccess.description);
      } else {
        await setDoc(docRef, {
          email: user.email,
          articleId,
          headline: article?.headline,
          abstract: article?.abstract,
          pub_date: article?.pub_date,
          imageUrl: article?.multimedia?.[0]?.url || "",
          timestamp: new Date().toISOString(),
        });
        setIsFavorite(true);
        toast.success(notifications.success.addFavoriteSuccess.description);
      }
    } catch (error) {
      toast.error(notifications.error.networkError.message);
      console.error("Error toggling favorite:", error);
    }
  };

  return { isFavorite, toggleFavorite };
};

export default useLikeArticle;
