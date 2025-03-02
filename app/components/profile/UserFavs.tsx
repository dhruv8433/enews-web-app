import React, { useState, useMemo } from "react";
import HorizontalCard from "@/app/common/HorizontalCard";
import useFetchFavorites from "@/app/hooks/useFetchFavorites";
import { Grid, Grid2, Pagination } from "@mui/material";
import ErrorComponent from "@/app/common/ErrorComponent";
import MyHeading from "@/app/common/MyHeading";
import Lottie from "lottie-react";
import LikeAnimation from "@/app/Animation/LikeAnimation.json";
import { HorizontalCardSkeleton } from "@/app/common/Skeleton.Site";

const UserFavs = () => {
    const { favorites, loading, error, removeFavorite } = useFetchFavorites();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const displayedFavorites = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return favorites.slice(startIndex, startIndex + itemsPerPage);
    }, [favorites, currentPage]);

    const handleRemove = (articleId: string) => {
        removeFavorite(articleId);
    };

    const skeletonContainer = Array.from({ length: 2 }).map((_, index) => (
        <div className="my-2" key={index}>
            <HorizontalCardSkeleton isProfilePage={false} />
        </div>
    ));

    if (loading)
        return (
            <div className="p-5 bg-white rounded-lg min-h-full">
                <MyHeading title="Favorites" />
                {skeletonContainer}
            </div>
        );

    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="p-5 bg-white rounded-lg min-h-full">
            <div className="px-2">
                <MyHeading title="Favorites" />
            </div>

            {/* Empty State */}
            {favorites.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <Lottie animationData={LikeAnimation} className="h-64 w-64" />
                    <p className="text-lg text-gray-500">You have no favorites yet.</p>
                </div>
            ) : (
                <>
                    {/* Display Favorites in a Grid */}
                    <Grid container spacing={2}>
                        {displayedFavorites.map((article) => (
                            <Grid item xs={12} md={6} key={article.headline._id}>
                                <HorizontalCard
                                    headline={article.headline}
                                    isProfilePage={true}
                                    onRemove={() => handleRemove(article.headline._id)}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {favorites.length >= 3 && (
                        <div className="flex justify-center mt-6">
                            <Pagination
                                count={Math.ceil(favorites.length / itemsPerPage)}
                                page={currentPage}
                                onChange={(_, value) => setCurrentPage(value)}
                                color="primary"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserFavs;
