import React from 'react'

const MyHeading = ({ title }: { title: string }) => {
    return (
        <div className="custom-heading">
            <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                {title}
            </div>
        </div>

    )
}

export default MyHeading