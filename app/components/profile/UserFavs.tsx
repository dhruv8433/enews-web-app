import React, { useState, useMemo } from "react";
import HorizontalCard from "@/app/common/HorizontalCard";
import useFetchFavorites from "@/app/hooks/useFetchFavorites";
import { Pagination } from "@mui/material";

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
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-5 bg-white rounded-lg">
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">
                    Favorites
                </div>
            </div>

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
