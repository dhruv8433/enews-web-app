/**
 * @file HorizontalCard.tsx
 * @description A horizontal card component displaying an article with an image on the left 
 * and details (tag, date, and headline) on the right.
 * 
 * @prop {HeadlineProps} headline - The article data containing the headline, publication date, and multimedia.
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
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { handleShareArticle } from "../service/ShareArticleService";

const HorizontalCard = ({ headline, isProfilePage, onRemove }: { headline: Headline, isProfilePage: boolean, onRemove: (id: string) => void }) => {

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl my-4 group">

      {/* Like Button (Only if not in profile page) */}
      {!isProfilePage && (
        <div className="absolute top-2 left-2 bg-white z-10 rounded-full">
          <LikeButton article={headline} isProfile={isProfilePage} />
        </div>
      )}

      {/* Card Content */}
      <Link
        href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
        <div className="flex items-center hover:cursor-pointer" onClick={() => handleShareArticle(headline)}>
          {/* Left: Image Section */}
          <div className="w-1/3 h-40 overflow-hidden p-2" >
            <img
              src={imageUrl + (isProfilePage ? headline?.imageUrl : headline?.multimedia?.[0]?.url || "")}
              alt={headline.headline.main}
              className="w-[300px] h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded"
            />
          </div>

          {/* Right: Content Section */}
          <div className="w-2/3 p-4 flex flex-col justify-between">
            {/* Tag & Date */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Trending
              </span>
              <div className="flex items-center gap-1">
                <CalendarMonthIcon className="text-gray-400" fontSize="small" />
                <p>{new Date(headline.pub_date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2 transition-all duration-300 hover:text-blue-700">
              {headline.headline.main}
            </h3>
          </div>
        </div>
      </Link>

      {/* Delete Icon (Only on profile page) */}
      {isProfilePage && (
        <IconButton
          className="myDeleteIcon w-max bottom-2 left-[94%] bg-white shadow-md rounded-full"
          onClick={() => onRemove(headline._id)}
        >
          <DeleteOutline className="text-red-500" />
        </IconButton>
      )}
    </div>
  );
};

export default HorizontalCard;
