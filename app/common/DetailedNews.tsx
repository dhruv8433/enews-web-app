'use client';

import CommentCard from './CommentCard';
import ArticleInfo from './ArticleInfo';
import React, { useEffect, useState } from 'react';
import ArticleBreadCrumb from './ArticleBreadCrumb';
import useComments from '../hooks/useComments';
import { Pagination } from '@mui/material';

const COMMENTS_PER_PAGE = 3; // Set pagination limit

const DetailedNews: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [article, setArticle] = useState<any>(null);
    const [page, setPage] = useState(1); // Track the current page

    
    useEffect(() => {
        setIsClient(true);
        const data = localStorage.getItem('article');
        if (data) {
            setArticle(JSON.parse(data));
        }
    }, []);

    const articleId = article?._id ? article._id.replace(/[^a-zA-Z0-9]/g, '_') : null;
    const { comments, loading } = useComments(articleId);

    // Get the comments for the current page using slice
    const startIndex = (page - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    const paginatedComments = comments.slice(startIndex, endIndex);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (!isClient) return null;
    if (!article) return <p className="text-center text-gray-500">No article found.</p>;

    return (
        <div>
            {/* Breadcrumb */}
            <ArticleBreadCrumb headline={article} />

            {/* Article Info */}
            <ArticleInfo headline={article} />

            {/* Comments Section */}
            <div className="custom-heading breadcrumb">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">
                    Comments
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading comments...</p>
            ) : paginatedComments.length > 0 ? (
                paginatedComments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        user={comment.username}
                        comment={comment.comment}
                        timestamp="2 hours ago"
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">No comments yet.</p>
            )}

            {/* Pagination */}
            {comments.length > COMMENTS_PER_PAGE && (
                <div className="flex items-center justify-center">
                    <Pagination
                        count={Math.ceil(comments.length / COMMENTS_PER_PAGE)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        className="mt-5"
                    />
                </div>
            )}
        </div>
    );
};

export default DetailedNews;
