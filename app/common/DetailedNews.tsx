"use client";

import React, { useState } from "react";
import CommentCard from "./CommentCard";
import ArticleInfo from "./ArticleInfo";
import ArticleBreadCrumb from "./ArticleBreadCrumb";
import useComments from "../hooks/useComments";
import { Pagination } from "@mui/material";
import useSharedArticle from "../hooks/useSharedArticle";
import { ArticleBreadCrumbSkeleton, ArticleInfoSkeleton, CommentCardSkeleton } from "./Skeleton.Site";
import ErrorComponent from "./ErrorComponent";
import { CommentRounded } from "@mui/icons-material";
import MyHeading from "./MyHeading";

const COMMENTS_PER_PAGE = 3;

const DetailedNews = ({ slug }: { slug: string }) => {
    // Always call hooks in the same order
    const { article, loading: articleLoading, error } = useSharedArticle(slug);
    const [page, setPage] = useState(1);

    // Ensure article ID is derived safely
    const articleId = article?._id ? article._id.replace(/[^a-zA-Z0-9]/g, "_") : "";
    const { comments, loading: commentsLoading, error: commentError } = useComments(articleId);

    const startIndex = (page - 1) * COMMENTS_PER_PAGE;
    const paginatedComments = comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // if article is loading than display skeleton
    if (articleLoading) return <>
        <ArticleBreadCrumbSkeleton />
        <ArticleInfoSkeleton />
    </>

    // if any error occure during fetching article then display error
    if (error || !article) return <ErrorComponent error={error} />
    if (commentError) return <ErrorComponent error={commentError} />

    // if comments are loading than display skeleton
    const commentSkeletons = commentsLoading
        ? Array.from({ length: 3 }).map((_, index) => (<CommentCardSkeleton key={index} />))
        : "";

    return (
        <div>
            {/* Breadcrumb */}
            <ArticleBreadCrumb headline={article} />

            {/* Article Info */}
            <ArticleInfo headline={article} />

            {/* Comments Section */}
            <MyHeading title="Comments" />

            {comments.length === 0 ? <div className="flex items-center flex-col justify-center my-10">
                <CommentRounded className="empty-state-icon text-gray-400" />
                <p className="font-semibold ml-2">No comments for this article yet...</p>
            </div> : commentSkeletons}

            {paginatedComments.length > 0 ? (
                paginatedComments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        user={comment.username}
                        comment={comment.comment}
                        timestamp={comment.createdAt
                            ? new Date(comment.createdAt.seconds * 1000).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })
                            : ""}
                    />
                ))
            ) : (
                ""
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
