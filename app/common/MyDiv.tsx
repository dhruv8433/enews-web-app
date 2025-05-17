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
            className={className}
        >
            {children}
        </div>
    );
};

export default MyDiv;
