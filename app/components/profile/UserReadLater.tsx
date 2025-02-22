import React from 'react'
import useFetchReadLater from '@/app/hooks/useFetchReadLater';
import HorizontalCard from '@/app/common/HorizontalCard';

const UserReadLater = () => {
  const { readLater } = useFetchReadLater();
  console.log(readLater)

  return (
    <div>
      <div className="custom-heading">
        <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
          Read Later
        </div>
      </div>

      {readLater.length === 0 ? (
        <p>No articles saved for later.</p>
      ) : (
        <div>
          {readLater.map((article: any, index) => (
            <HorizontalCard key={index} headline={article.headline} isProfilePage={true} onRemove={() => ""} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserReadLater