/**
 * @file HorizontalCard.tsx
 * @description A horizontal card component displaying an article with an image on the left 
 * and details (tag, date, and headline) on the right. If on the profile page, it switches to a block-style card.
 * 
 * @prop {HeadlineProps} headline - The article data containing the headline, publication date, and multimedia.
 * @prop {boolean} isProfilePage - Determines if the card is displayed on the profile page.
 * @prop {Function} onRemove - Function to remove the article from the profile.
 * @author: Dhruv Soni
 * @Date: 18/02/2025
 */

import React from "react";
import { Headline } from "../types/headline.types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { imageUrl } from "../site/site.config";
import LikeButton from "./LikeButton";
import Link from "next/link";
import slugify from "slugify";
import { Box, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { handleShareArticle } from "../service/ShareArticleService";

const HorizontalCard = ({ headline, isProfilePage, onRemove }: { headline: Headline, isProfilePage: boolean, onRemove: (id: string) => void }) => {
  return (
    <div className={`relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl my-4 group ${isProfilePage ? 'flex flex-col' : ''}`}>

      {/* Like Button (Only if not in profile page) */}
      {!isProfilePage && (
        <div className="absolute top-3 left-3 bg-white z-10 rounded-full">
          <LikeButton article={headline} isProfile={isProfilePage} />
        </div>
      )}

      {/* Card Content */}
      <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
        <div className={`hover:cursor-pointer ${isProfilePage ? 'flex flex-col items-center' : 'flex items-center'}`} onClick={() => handleShareArticle(headline)}>
          {/* Image Section */}
          <div className={`${isProfilePage ? 'w-full h-60' : 'w-1/3 h-40'} overflow-hidden p-2`}>
            <img
              src={imageUrl + (isProfilePage ? headline?.imageUrl : headline?.multimedia?.[0]?.url || "")}
              alt={headline.headline.main}
              className={`${isProfilePage ? 'w-full h-full object-cover' : 'w-[300px] h-full object-fill'} transition-transform duration-300 group-hover:scale-110 rounded`}
            />
          </div>

          {/* Content Section */}
          <div className={`p-4 flex flex-col justify-between ${isProfilePage ? 'w-full text-center' : 'w-2/3'}`}>
            {/* Tag & Date */}
            <div className={`flex items-center justify-between text-sm text-gray-600`}>
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Trending
              </span>
              <div className="flex items-center gap-1">
                <CalendarMonthIcon className="text-gray-400" fontSize="small" />
                <p>{new Date(headline.pub_date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2 transition-all duration-300 hover:text-blue-900">
              {headline.headline.main}
            </h3>
          </div>
        </div>
      </Link>

      {/* Delete Icon (Only on profile page) */}
      {isProfilePage && (
        <>
          <Box display={{ xs: "none", md: "block" }}>
            <IconButton
              aria-label="delete"
              className="myDeleteIcon w-max bottom-2 left-[90%] bg-white shadow-md rounded-full"
              onClick={() => onRemove(headline._id)}
            >
              <DeleteOutline className="text-red-500" />
            </IconButton>
          </Box>
          {/* block card */}
          <Box display={{ xs: "block", md: "none" }}>
            <IconButton
              aria-label="delete"
              className="myDeleteIcon w-max top-2 left-[85%] z-10 bg-white shadow-md rounded-full"
              onClick={() => onRemove(headline._id)}
            >
              <DeleteOutline className="text-red-500" />
            </IconButton>
          </Box>
        </>
      )}
    </div>
  );
};

export default HorizontalCard;
