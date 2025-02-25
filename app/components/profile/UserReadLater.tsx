import React from 'react'
import useFetchReadLater from '@/app/hooks/useFetchReadLater';
import HorizontalCard from '@/app/common/HorizontalCard';
import MyHeading from '@/app/common/MyHeading';

const UserReadLater = () => {
  const { readLater } = useFetchReadLater();
  console.log(readLater)

  return (
    <div className='bg-white rounded-xl p-2'>
      <MyHeading title='Read Later' />

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