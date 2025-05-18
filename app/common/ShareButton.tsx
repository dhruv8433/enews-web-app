import React from "react";
import { FaShareAlt } from "react-icons/fa";

interface ShareButtonProps {
    onShare: () => void;
    disabled?: boolean;
    ariaLabel?: string;
    title?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
    onShare,
    disabled = false,
    ariaLabel = "Share article",
    title = "Share",
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
            onShare();
        }
    };

    return (
        <button
            aria-label={ariaLabel}
            title={title}
            onClick={handleClick}
            disabled={disabled}
            className={`
        z-20 absolute right-10 top-2 body p-1 rounded-full
        text-[1.4rem]
        transition-colors duration-300
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        bg-transparent border-none
        focus:outline-none
      `}
        >
            <FaShareAlt /> {/* purple color or gray if disabled */}
        </button>
    );
};
