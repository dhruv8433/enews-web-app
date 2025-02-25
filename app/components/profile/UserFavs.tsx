import React, { useState, useMemo } from "react";
import HorizontalCard from "@/app/common/HorizontalCard";
import useFetchFavorites from "@/app/hooks/useFetchFavorites";
import { Pagination } from "@mui/material";
import ErrorComponent from "@/app/common/ErrorComponent";
import MyHeading from "@/app/common/MyHeading";

const UserFavs = () => {
    const { favorites, loading, error, removeFavorite } = useFetchFavorites();
    const [currentPage, setCurrentPage] = useState(1);
    const [trigger, setTrigger] = useState(false); // ✅ Force re-render when needed
    const itemsPerPage = 5;

    const displayedFavorites = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return favorites.slice(startIndex, startIndex + itemsPerPage);
    }, [favorites, currentPage]); 

    const handleRemove = (articleId: string) => {
        removeFavorite(articleId);
        setTrigger((prev) => !prev); // ✅ Force re-render
    };

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="p-5 bg-white rounded-lg">
            <MyHeading title="Favorites" />

            {/* Display Updated Favorites */}
            {displayedFavorites.map((article, index) => (
                <HorizontalCard 
                    key={index} 
                    headline={article.headline} 
                    isProfilePage={true} 
                    onRemove={() => handleRemove(article.headline._id)} 
                />
            ))}

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    count={Math.ceil(favorites.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default UserFavs;
