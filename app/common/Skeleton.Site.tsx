import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { BookmarkBorderOutlined, CalendarMonthOutlined, FavoriteBorderOutlined, FavoriteBorderRounded, MapsUgcOutlined, PrintOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Breadcrumbs, IconButton } from "@mui/material";
import { motion } from 'framer-motion';


export const SwiperCardSkeleton = ({ isSwiper }: { isSwiper: boolean }) => {
    return (
        <div className={`relative h-full rounded-xl ${isSwiper && "my-4"}`}>
            {/* heading */}
            {/* Like Button Placeholder */}
            <div className="absolute right-1 top-1 bg-white z-10 rounded-full p-2">
                <FavoriteBorderRounded className="opacity-30" />
            </div>

            {/* Background Image Placeholder */}
            <Skeleton variant="rectangular" className="rounded-md" width="100%" height={"96%"} />

            {/* Content Overlay Placeholder */}
            <div className={`absolute bottom-10 left-0 p-4 w-full`}>
                <div className="bg-black bg-opacity-30 p-6 rounded-lg">
                    {/* Tag & Date Placeholder */}
                    <div className="flex items-center justify-between mb-2">
                        <Skeleton variant="text" width={80} height={24} />
                        <div className="flex items-center gap-2">
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="text" width={60} height={20} />
                        </div>
                    </div>

                    {/* Headline Placeholder */}
                    <Skeleton variant="text" width="80%" height={28} />
                    <Skeleton variant="text" width="90%" height={28} />

                    {/* Abstract Placeholder */}
                    <Skeleton variant="text" width="95%" height={18} />
                    <Skeleton variant="text" width="85%" height={18} />
                </div>
            </div>
        </div>
    );
};

export const ArticleBreadCrumbSkeleton = () => {
    return (
        <div>
            {/* Breadcrumb Skeleton */}
            <Box flexDirection={{ md: "row" }} className="mt-5">
                <Skeleton variant="text" width={200} height={32} />
                <Breadcrumbs className="flex flex-col">
                    <Skeleton variant="text" width={80} height={24} />
                    <Skeleton variant="text" width={100} height={24} />
                    <Skeleton variant="text" width={150} height={24} />
                </Breadcrumbs>
            </Box>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center justify-end space-x-4 mt-6">
                <IconButton disabled><FavoriteBorderOutlined /></IconButton>
                <IconButton disabled><BookmarkBorderOutlined /></IconButton>
                <IconButton disabled><PrintOutlined /></IconButton>
                <IconButton disabled><ShareOutlined /></IconButton>
                <IconButton disabled><MapsUgcOutlined /></IconButton>
            </div>
        </div>
    );
};


export const ArticleInfoSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto rounded-xl mt-10"
            id="articleContent"
        >
            {/* 📌 Article Image Skeleton */}
            <div className="w-full h-[500px] relative rounded-lg overflow-hidden">
                <Skeleton variant="rectangular" width="100%" height={500} />
            </div>

            {/* 📰 Article Title Skeleton */}
            <Skeleton variant="text" width="60%" height={40} className="mt-5" />

            {/* ✍️ Byline Skeleton */}
            <Skeleton variant="text" width="40%" height={20} className="mt-2" />

            {/* 📅 Date & Source Skeleton */}
            <Skeleton variant="text" width="50%" height={20} className="mt-1" />

            {/* 🏷️ Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mt-4">
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} variant="rounded" width={80} height={24} />
                ))}
            </div>

            {/* 📝 Snippet Skeleton */}
            <Skeleton variant="text" width="90%" height={20} className="mt-4" />
            <Skeleton variant="text" width="85%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />

            {/* 🔗 Read More Button Skeleton */}
            <Skeleton variant="rounded" width={120} height={40} className="mt-4" />
        </motion.div>
    );
};

export const CommentCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white shadow-lg rounded-lg p-5 flex gap-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 my-2"
        >
            {/* Comment Content Skeleton */}
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={80} height={15} />
                </div>
                <Skeleton variant="text" width="90%" height={15} className="mt-2" />
                <Skeleton variant="text" width="85%" height={15} />
                <Skeleton variant="text" width="80%" height={15} />
            </div>
        </motion.div>
    );
};

export const SmallCardSkeleton: React.FC = () => {
    return (
        <div className="relative h-60 shadow-md rounded-lg overflow-hidden bg-white ">
            {/* Disabled Like Button Placeholder */}
            <div className="absolute right-1 top-1 bg-white z-10 rounded-full p-2">
                <FavoriteBorderRounded className="opacity-30" />
            </div>

            {/* Image Skeleton */}
            <Skeleton variant="rectangular" width="100%" height={240} />

            {/* Title Skeleton */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                <Skeleton variant="text" width="75%" height={24} />
                <Skeleton variant="text" width="50%" height={20} />
            </div>
        </div>
    );
};

export const HorizontalCardSkeleton: React.FC<{ isProfilePage: boolean }> = ({ isProfilePage }) => {
    return (
        <div className="relative bg-white shadow-lg rounded-xl overflow-hidden my-4 flex items-center p-2">
            {/* Like Button Placeholder (Only if not in profile page) */}
            {!isProfilePage && (
                <div className="absolute right-1 top-1 bg-white z-10 rounded-full p-2">
                    <FavoriteBorderRounded className="opacity-30" />
                </div>
            )}

            {/* Left: Image Skeleton */}
            <div className="w-1/3 h-40 overflow-hidden">
                <Skeleton variant="rectangular" width={120} height={160} />
            </div>

            {/* Right: Content Skeleton */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                {/* Tag & Date */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <Skeleton variant="rectangular" width={80} height={24} className="rounded-md" />
                    <div className="flex items-center gap-1">
                        <CalendarMonthOutlined className="text-gray-400" fontSize="small" />
                        <Skeleton variant="text" width={80} />
                    </div>
                </div>

                {/* Headline */}
                <Skeleton variant="text" width="90%" height={24} />
                <Skeleton variant="text" width="70%" height={20} />
            </div>

            {/* Delete Icon Placeholder (Only on profile page) */}
            {isProfilePage && (
                <IconButton className="absolute bottom-2 right-2 bg-white shadow-md rounded-full">
                    <Skeleton variant="circular" width={32} height={32} />
                </IconButton>
            )}
        </div>
    );
};

export const LongCardSkeleton: React.FC = () => {
    return (
        <div className="relative max-w-3xl h-[400px] bg-white shadow-lg rounded-xl overflow-hidden m-2">
            {/* Like Button Placeholder */}
            <div className="absolute right-1 top-1 bg-white z-10 rounded-full p-2">
                <FavoriteBorderRounded className="opacity-30" />
            </div>

            {/* Image Skeleton */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
                <Skeleton variant="rectangular" width="100%" height="100%" />
                <div className="absolute top-4 left-4">
                    <Skeleton variant="rectangular" width={80} height={24} className="rounded-md" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col space-y-4">
                {/* Title */}
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton variant="text" width="60%" height={28} />

                {/* Date */}
                <div className="flex items-center text-gray-600 text-sm gap-2">
                    <CalendarMonthOutlined fontSize="small" className="text-gray-400" />
                    <Skeleton variant="text" width={100} />
                </div>
            </div>
        </div>
    );
};
