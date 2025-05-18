import VerticalCard from '@/app/common/VerticalCard';
import { useFavorites } from '@/app/hooks/useFavorites'
import React from 'react'

const UserFavorites = () => {
    const { favorites, loading } = useFavorites();

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-heading">My Favorites</h2>
            <hr className='border-dashed' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {favorites.map((favorite) => (
                    <VerticalCard news={favorite} isGrid />
                ))}
            </div>
        </div>
    )
}

export default UserFavorites