'use client';

import React from 'react';
import { formatPublishedDate } from '../util/dateFormatter';

interface User {
    _id: string;
    fullname: string;
    avatar_url: string;
}

interface Article {
    _id: string;
    title: string;
    slug: string;
}

interface Comment {
    _id: string;
    content: string;
    created_at: string;
    user: User;
    article: Article;
}

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="flex gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow card">
            {/* User Avatar */}
            <img
                src={comment.user.avatar_url}
                alt={comment.user.fullname}
                className="w-12 h-12 rounded-full object-cover"
            />

            {/* Comment Content */}
            <div className="flex flex-col w-full">
                {/* User name and date */}
                <div className="flex items-center justify-between text-sm text-secondary mb-1 w-full">
                    <h1 className="font-semibold text-gray-700">{comment.user.fullname}</h1>
                    <h1>{formatPublishedDate(comment.created_at)}</h1>
                </div>

                {/* Comment Text */}
                <p className="text-gray-800">{comment.content}</p>

            </div>
        </div>
    );
};

export default CommentCard;
