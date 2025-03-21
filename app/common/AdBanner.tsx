import React from 'react'

const AdBanner = () => {
  return (
    <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_AD_CLIENT_SECRET_KEY}
    >

    </ins>
  )
}

export default AdBanner