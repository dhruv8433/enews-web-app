/**
 * @file LikeButton.tsx
 * @description Like button that saves articles in Firebase Firestore.
 * 
 * @component
 * @author Dhruv Soni
 * @date 18/02/2025
 */

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import useLikeArticle from "../hooks/useLikeArticle";
import useFetchFavorites from "../hooks/useFetchFavorites";

const LikeButton = ({ article, isProfile }: { article: any, isProfile: boolean }) => {
  const { isFavorite, toggleFavorite } = useLikeArticle(article);
  const { removeFavorite } = useFetchFavorites();
  return (
    <IconButton
      aria-label="like"
      onClick={() => (isProfile ? removeFavorite(article._id) : toggleFavorite())}
      style={{ background: `var(--background)`}}
      className="text-red-500 text-2xl transition-transform duration-200 hover:scale-110 w-min border-none"
    >
      {isFavorite ? <Favorite color="error" /> : <FavoriteBorder color="error" />}
    </IconButton>
  );
};

export default LikeButton;
