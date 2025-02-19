import React from "react";
import { HeadlineProps } from "../types/headline.types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { imageUrl } from "../site/site.config";
import LikeButton from "./LikeButton";
import Link from "next/link";
import slugify from "slugify";

const LongCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        // this link redirect to detaile/id page of headline and store object as string in localstorage.
        <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`} onClick={() => localStorage.setItem("article", JSON.stringify(headline))}>
            <div className="max-w-3xl h-[400px] bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl group hover:cursor-pointer">

                {/* toogle action button */}
                <div className="absolute ml-[310px] mt-[10px] bg-white z-10 rounded-full">
                    <LikeButton /> {/* Like button for bookmarking articles */}
                </div>

                {/* Article Image */}
                <div className="relative w-full h-52 rounded-xl">
                    <img
                        src={headline.multimedia[0]?.url ? imageUrl + headline.multimedia[0].url : "/placeholder.jpg"}
                        alt={headline.headline.main}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                        Featured
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col space-y-4">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        {headline.headline.main.length > 60
                            ? `${headline.headline.main.substring(0, 60)}...`
                            : headline.headline.main}
                    </h2>


                    {/* Date */}
                    <div className="flex items-center text-gray-600 text-sm gap-2">
                        <CalendarMonthIcon fontSize="small" className="text-gray-400" />
                        <p>{new Date(headline.pub_date).toLocaleDateString()}</p>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default LongCard;
