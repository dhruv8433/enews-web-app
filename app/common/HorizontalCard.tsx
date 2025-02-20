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
import { Headline, HeadlineProps } from "../types/headline.types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { imageUrl } from "../site/site.config";
import LikeButton from "./LikeButton";
import Link from "next/link";
import slugify from "slugify";

const HorizontalCard = ({ headline, isProfilePage }: { headline: Headline, isProfilePage: boolean }) => {
  return (
    // {/* Main card container with a side-by-side layout */}
    <div className="">
      {/* toogle action button */}
      <div className="absolute ml-2 mt-2 bg-white z-10 rounded-full">
        <LikeButton article={headline} /> {/* Like button for bookmarking articles */}
      </div>

      {/* this link redirect to detaile/id page of headline and store object as string in localstorage. */}
      <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`} onClick={() => localStorage.setItem("article", JSON.stringify(headline))} className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl my-4 group hover:cursor-pointer">

        {/* Left: Image Section */}
        <div className="w-1/3 h-40 overflow-hidden p-2">
          <img
            src={imageUrl + (isProfilePage ? headline?.imageUrl : headline?.multimedia?.[0]?.url || "")}
            alt={headline.headline.main} // Provides alternative text for accessibility 
            className="w-[300px] h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded" // Applies zoom effect on hover 
          />
        </div>

        {/* Right: Content Section */}
        <div className="w-2/3 p-4 flex flex-col justify-between">

          {/* Tag & Date Section */}
          <div className="flex items-center justify-between text-sm text-gray-600">

            {/* Tag Label */}
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Trending {/* Static label for trending articles */}
            </span>

            {/* Date with Icon */}
            <div className="flex items-center gap-1">
              <CalendarMonthIcon className="text-gray-400" fontSize="small" />
              <p>{new Date(headline.pub_date).toLocaleDateString()}</p> {/* Formats date */}
            </div>
          </div>


          {/* Headline Section */}
          <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2 transition-all duration-300 hover:text-blue-700">
            {headline.headline.main} {/* Displays the main headline */}
          </h3>
        </div>
      </Link >
    </div>
  );
};

export default HorizontalCard;
