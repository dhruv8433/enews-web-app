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

interface LikeButtonProps {
  article: {
    _id: string;
    headline: string;
    abstract: string;
    pub_date: string;
    multimedia?: { url: string }[];
  };
}

const LikeButton: React.FC<any> = ({ article }) => {

  const { isFavorite, toggleFavorite } = useLikeArticle(article);
  return (
    <IconButton
      onClick={toggleFavorite}
      className="text-red-500 text-2xl transition-transform duration-200 hover:scale-110 w-min"
    >
      {isFavorite ? <Favorite color="error" /> : <FavoriteBorder color="error" />}
    </IconButton>
  );
};

export default LikeButton;
