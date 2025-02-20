import HorizontalCard from '@/app/common/HorizontalCard';
import useFetchFavorites from '@/app/hooks/useFetchFavorites';
import React from 'react'

const UserFavs = () => {
    const { favorites, loading, error } = useFetchFavorites();

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <div className='p-5 bg-white rounded-lg'>
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                    Favorites
                </div>
            </div>

            {
                favorites.map((article, index) => <HorizontalCard key={index} headline={article.headline} isProfilePage={true} />)
            }
        </div>
    )
}

export default UserFavs