import React from 'react'

const MyHeading = ({ title }: { title: string }) => {
    return (
        <div className="custom-heading">
            <div style={{ background: `var(--primary)`, color: `var(--text)` }} className="p-[5px] w-40 flex justify-center text-white">
                {title}
            </div>
        </div>

    )
}

export default MyHeading