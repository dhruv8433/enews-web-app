import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
    articleId: string;
    isFavorited: boolean;
    onToggleFavorite: (articleId: string) => void;
    disabled?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    articleId,
    isFavorited,
    onToggleFavorite,
    disabled = false,
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
            onToggleFavorite(articleId);
        }
    };

    const heartColor = isFavorited ? "#dc2626" /* red-600 */ : "#9ca3af" /* gray-400 */;
    return (

        <button
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={handleClick}
            disabled={disabled}
            className={`
      z-20 absolute right-2 top-2 body p-1 rounded-full
      text-[1.4rem]
      transition-colors duration-300
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      bg-transparent border-none
      focus:outline-none
    `}
        >
            {isFavorited ? <FaHeart color={heartColor} /> : <FaRegHeart color={heartColor} />}
        </button>

    );
};
