"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth, db } from "../site/firebase.config";
import { Headline } from "../types/headline.types";

const useReadLater = (article: Headline) => {
  const [user] = useAuthState(auth);
  const [isReadLater, setIsReadLater] = useState(false);

  useEffect(() => {
    if (user && article?._id) {
      checkReadLater();
    }
  }, [user, article]);

  // Generate a Firebase-safe article ID
  const getArticleId = () => {
    if (!article || !article._id) return null;
    return article._id.replace(/[^a-zA-Z0-9-_]/g, "_");
  };

  // Check if the article is already in Read Later
  const checkReadLater = async () => {
    const articleId = getArticleId();
    if (!user || !articleId) return;
    const docRef = doc(db, `users/${user.email}/read_later/${articleId}`);
    const docSnap = await getDoc(docRef);
    setIsReadLater(docSnap.exists());
  };

  // Toggle read later status
  const toggleReadLater = async () => {
    if (!user) {
      toast.error("Please log in to save articles for later.");
      return;
    }
    const articleId = getArticleId();
    if (!articleId) {
      toast.error("Article ID is missing.");
      return;
    }
    const docRef = doc(db, `users/${user.email}/read_later/${articleId}`);

    try {
      if (isReadLater) {
        await deleteDoc(docRef);
        setIsReadLater(false);
        toast.success("Removed from Read Later.");
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
        setIsReadLater(true);
        toast.success("Added to Read Later!");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error toggling Read Later:", error);
    }
  };

  return { isReadLater, toggleReadLater };
};

export default useReadLater;
