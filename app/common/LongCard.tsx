import React from "react";
import MyDiv from "./MyDiv";
import Link from "next/link";
import slugify from "slugify";
import { Box } from "@mui/material";
import LikeButton from "./LikeButton";
import { imageUrl } from "../site/site.config";
import { HeadlineProps } from "../types/headline.types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { handleShareArticle } from "../service/ShareArticleService";

const LongCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        <MyDiv isSecondary className="relative max-w-3xl shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl group hover:cursor-pointer">
            <Box height={{ xs: "380px", md: "450px" }}  >

                {/* Like Button - Positioned in the top-right corner */}
                <div className="absolute top-3 right-3  rounded-full shadow-md z-10">
                    <LikeButton article={headline} isProfile={false} />
                </div>

                {/* This link redirects to detail/id page and stores the object in localStorage */}
                <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
                    <div className="" onClick={() => handleShareArticle(headline)}>
                        {/* Article Image */}
                        <Box height={{ xs: "250px", md: "300px" }} className="w-full overflow-hidden">
                            <img
                                src={headline.multimedia[0]?.url ? imageUrl + headline.multimedia[0].url : "/placeholder.jpg"}
                                alt={headline.headline.main}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div  style={{color: `var(--primarytext)`, background: `var(--background)`}} className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                                {headline.subsection_name || "Featured"}
                            </div>
                        </Box>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col space-y-4">
                            {/* Title */}
                            <h2 style={{ color:`var(--text)` }} className="text-xl font-bold  group-hover:text-blue-900 transition-colors duration-300 line-clamp-2">
                                {headline.headline.main}
                            </h2>


                            {/* Date */}
                            <div className="flex items-center text-gray-600 text-sm gap-2">
                                <CalendarMonthIcon fontSize="small" className="text-gray-400" />
                                <p>{new Date(headline.pub_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </Box>
        </MyDiv>
    );
};

export default LongCard;
