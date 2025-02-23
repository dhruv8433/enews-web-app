"use client";

import React, { useState } from "react";
import CommentCard from "./CommentCard";
import ArticleInfo from "./ArticleInfo";
import ArticleBreadCrumb from "./ArticleBreadCrumb";
import useComments from "../hooks/useComments";
import { Pagination } from "@mui/material";
import useSharedArticle from "../hooks/useSharedArticle";

const COMMENTS_PER_PAGE = 3;

const DetailedNews = ({ slug }: { slug: string }) => {
    // Always call hooks in the same order
    const { article, loading: articleLoading, error } = useSharedArticle(slug);
    const [page, setPage] = useState(1);

    // Ensure article ID is derived safely
    const articleId = article?._id ? article._id.replace(/[^a-zA-Z0-9]/g, "_") : "";
    const { comments, loading: commentsLoading } = useComments(articleId);

    const startIndex = (page - 1) * COMMENTS_PER_PAGE;
    const paginatedComments = comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (articleLoading) return <p className="text-center text-gray-500">Loading article...</p>;
    if (error || !article) return <p className="text-center text-gray-500">{error || "No article found."}</p>;

    return (
        <div>
            {/* Breadcrumb */}
            <ArticleBreadCrumb headline={article} />

            {/* Article Info */}
            <ArticleInfo headline={article} />

            {/* Comments Section */}
            <div className="custom-heading breadcrumb">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">Comments</div>
            </div>

            {commentsLoading ? (
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
