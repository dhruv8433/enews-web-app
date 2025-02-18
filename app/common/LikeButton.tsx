/**
 * @file LikeButton.tsx
 * @description A toggleable heart button component that switches between outlined and filled states when clicked.
 * 
 * @component
 * @author Dhruv Soni
 * @date 18/02/2025
 */

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

const LikeButton: React.FC = () => {
  // State to track liked/unliked status
  const [liked, setLiked] = useState(false);

  return (
    <IconButton
      onClick={() => setLiked(!liked)}
      className="text-red-500 text-2xl transition-transform duration-200 hover:scale-110 w-min"
    >
      {liked ? <Favorite color="error"/> : <FavoriteBorder color="error"/>}
    </IconButton>
  );
};

export default LikeButton;
