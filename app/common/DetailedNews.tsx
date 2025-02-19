'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { imageUrl } from '../site/site.config';
import Link from 'next/link';
import { Breadcrumbs, IconButton } from '@mui/material';
import { Bookmark, Share, Print, SaveAlt, Favorite } from '@mui/icons-material'; // MUI Icons
import { useRouter } from 'next/navigation';
import LikeButton from './LikeButton';

const DetailedNews: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [article, setArticle] = useState<any>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [readLater, setReadLater] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const data = localStorage.getItem('article');
        if (data) {
            setArticle(JSON.parse(data));
        }
    }, []);

    if (!isClient) return null;

    if (!article) return <p className="text-center text-gray-500">No article found.</p>;

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Optionally save this in localStorage or a database
    };

    const handleReadLater = () => {
        setReadLater(!readLater);
        // Optionally save this in localStorage or a database
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.headline?.main,
                text: article.abstract,
                url: window.location.href,
            });
        } else {
            // If Web Share API isn't available, open a share dialog
            const shareUrl = `https://twitter.com/intent/tweet?text=${article.headline?.main}&url=${window.location.href}`;
            window.open(shareUrl, '_blank');
        }
    };

    const turncatedTitle = article.abstract.length > 40 ? article.abstract.slice(0, 40) + "..." : article.abstract;

    return (
        <div>
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-600 mt-5 flex justify-between items-center"
            >
                <div className="">
                    <h1 className="text-2xl font-semibold text-blue-800">{turncatedTitle}</h1>
                    <Breadcrumbs>
                        <Link href={`/`} className="hover:underline">
                            Home
                        </Link>
                        <Link href={`/query?q=${article.section_name}`} className="hover:underline">
                            {article.section_name}
                        </Link>
                        <p className="text-blue-800">{turncatedTitle}</p>
                    </Breadcrumbs>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 mt-6">
                    {/* Add to Favorites */}
                    <LikeButton article={article} />

                    {/* Read Later */}
                    <IconButton color={readLater ? 'primary' : 'default'} onClick={handleReadLater}>
                        <Bookmark />
                    </IconButton>

                    {/* Print */}
                    <IconButton color="default" onClick={handlePrint}>
                        <Print />
                    </IconButton>

                    {/* Share */}
                    <IconButton color="default" onClick={handleShare}>
                        <Share />
                    </IconButton>
                </div>
            </motion.div>

            {/* Actual Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto rounded-xl mt-10"
                id="articleContent"
            >



                {/* 📌 article Image */}
                {article.multimedia?.length > 0 && (
                    <div className="w-full h-[500px] relative rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl + article.multimedia[0].url}
                            alt="article image"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}

                {/* 📰 article */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-gray-900 mt-5"
                >
                    {article.headline?.main}
                </motion.h1>

                {/* ✍️ Byline */}
                <p className="text-gray-600 mt-2 text-sm">{article.byline?.original}</p>

                {/* 📅 Date & Source */}
                <p className="text-sm text-gray-500 mt-1">
                    {new Date(article.pub_date).toLocaleDateString()} • {article.source}
                </p>

                {/* 🏷️ Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {article.keywords?.map((keyword: any, index: number) => (
                        <span
                            key={index}
                            className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                        >
                            {keyword.value}
                        </span>
                    ))}
                </div>

                {/* 📝 Snippet */}
                <p className="mt-4 text-gray-700 leading-relaxed">{article.abstract}</p>

                {/* 🔗 Read More */}
                <motion.a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="block text-blue-600 mt-4 font-semibold hover:bg-blue-800 hover:text-white w-max p-2 rounded"
                >
                    Read Full article →
                </motion.a>
            </motion.div>
        </div>
    );
};

export default DetailedNews;
