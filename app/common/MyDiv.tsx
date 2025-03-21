import React from 'react';

interface MyDivProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    isPrimary?: boolean;
    isSecondary?: boolean;
}

const MyDiv: React.FC<MyDivProps> = ({ children, className, style, isPrimary, isSecondary }) => {
    return (
        <div
            style={isPrimary ? {
                background: isPrimary ? `var(--primary)` : `var(--background)`, // Apply theme colors
                color: `var(--text)`,
                ...style, // Merge styles
            } : {
                background: isSecondary ? `var(--secondary)` : `var(--background)`, // Apply theme colors
                color: `var(--text)`,
                ...style, // Merge styles
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export default MyDiv;
