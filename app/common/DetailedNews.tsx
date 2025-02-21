'use client'

import CommentCard from './CommentCard';
import ArticleInfo from './ArticleInfo';
import React, { useEffect, useState } from 'react';
import ArticleBreadCrumb from './ArticleBreadCrumb';
import useComments from '../hooks/useComments';

const DetailedNews: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        const data = localStorage.getItem('article');
        if (data) {
            setArticle(JSON.parse(data));
        }
    }, []);

    const articleId = article?._id ? article._id.replace(/[^a-zA-Z0-9]/g, '_') : null;
    const { comments, fetchComments, loading } = useComments(articleId);


    useEffect(() => {
        if (article) {
            fetchComments();
        }
    }, [article]);


    if (!isClient) return null;

    if (!article) return <p className="text-center text-gray-500">No article found.</p>;
    return (
        <div>
            {/* breadcrumb */}
            <ArticleBreadCrumb headline={article} />

            {/* article info */}
            <ArticleInfo headline={article} />

            {/* TODO Comments - 1 to 5 here and view more than open drawer */}
            <div className="custom-heading breadcrumb">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">
                    Comments
                </div>
            </div>

            {
                comments.map((comment) => (
                    <CommentCard
                        user={comment.username}
                        comment={comment.comment}
                        timestamp="2 hours ago"
                    />
                ))
            }

        </div>
    );
};

export default DetailedNews;
