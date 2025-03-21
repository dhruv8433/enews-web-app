
import React, { useState } from 'react'
import Link from 'next/link'
import LikeButton from './LikeButton'
import { motion } from 'framer-motion'
import ReadLaterButton from './ReadLaterButton'
import { HeadlineProps } from '../types/headline.types'
import { Backdrop, Box, Breadcrumbs, IconButton } from '@mui/material'
import { MapsUgcOutlined, PrintOutlined, ShareOutlined } from '@mui/icons-material'
import CommentModal from './CommentModel'
import { siteName } from '../site/site.config'
import slugify from 'slugify'

const ArticleBreadCrumb: React.FC<HeadlineProps> = ({ headline }) => {
    const [openModel, setOpenModel] = useState<boolean>(false);

    if (!headline) {
        return <p className="text-gray-500">Loading article details...</p>;
    }

    const handlePrint = () => window.print();

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: headline?.headline?.main || "Article",
                text: headline?.abstract || "",
                url: window.location.href,
            });
        } else {
            const shareUrl = `https://twitter.com/intent/tweet?text=${headline?.headline?.main || "Article"}&url=${window.location.href}`;
            window.open(shareUrl, '_blank');
        }
    };

    const truncatedTitle = headline.headline?.main.length > 40
        ? headline.headline?.main.slice(0, 40) + "..."
        : headline.headline?.main || "No Title";

    const filteredId = headline?._id?.replace(/[^a-zA-Z0-9]/g, '_') || "";

    document.title = `${siteName} | ${slugify(headline?.abstract || "Untitled", { lower: true })}`;

    return (
        <div>
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-600 mt-5"
            >
                <Box className="justify-between" display={{ xs: 'block', md: 'flex' }}>
                    <div className="">
                        <h1 style={{color: `var(--text)`}} className="text-xl md:text-2xl font-semibold my-2">{truncatedTitle}</h1>
                        <Breadcrumbs className='flex flex-col' style={{color: `var(--text)`}} aria-label="breadcrumb">
                            <Link href={`/`} style={{color: `var(--primarytext)`}} className="hover:underline">Home</Link>
                            {headline?.section_name && (
                                <Link href={`/query?q=${headline.section_name}`} style={{color: `var(--primarytext)`}} className="hover:underline">
                                    {headline.section_name}
                                </Link>
                            )}
                            <p style={{color: `var(--text)`}}>{truncatedTitle}</p>
                        </Breadcrumbs>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-4 mt-6">
                        <LikeButton article={headline} isProfile={false} />
                        <ReadLaterButton headline={headline} />
                        <IconButton aria-label="priny" style={{color: `var(--text)`}} onClick={handlePrint}><PrintOutlined /></IconButton>
                        <IconButton aria-label="share"  style={{color: `var(--text)`}} onClick={handleShare}><ShareOutlined /></IconButton>
                        <IconButton aria-label="comment"  style={{color: `var(--text)`}} onClick={() => setOpenModel(true)}><MapsUgcOutlined /></IconButton>
                    </div>
                </Box>

            </motion.div>

            {/* Comment Modal */}
            <Backdrop open={openModel} className='z-20'>
                <CommentModal articleId={filteredId} onClose={() => setOpenModel(false)} open={openModel} />
            </Backdrop>
        </div>
    );
};

export default ArticleBreadCrumb