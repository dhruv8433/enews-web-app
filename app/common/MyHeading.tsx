import React from 'react'

const MyHeading = ({ title, isBackground }: { title: string, isBackground?: boolean }) => {
    return (
        <div className="custom-heading">
            <div style={{ background: isBackground ? `var(--background)` :`var(--primary)`, color: `var(--text)` }} className="p-[5px] w-40 flex justify-center text-white">
                {title}
            </div>
        </div>

    )
}

export default MyHeading