
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

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: headline.headline?.main,
                text: headline.abstract,
                url: window.location.href,
            });
        } else {
            // If Web Share API isn't available, open a share dialog
            const shareUrl = `https://twitter.com/intent/tweet?text=${headline.headline?.main}&url=${window.location.href}`;
            window.open(shareUrl, '_blank');
        }
    };

    const turncatedTitle = headline.abstract.length > 40 ? headline.abstract.slice(0, 40) + "..." : headline.abstract;

    const filterdId = headline._id.replace(/[^a-zA-Z0-9]/g, '_');

    document.title = `${siteName} | ${slugify(headline.abstract, { lower: true })}`;

    return (
        <div>{/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-600 mt-5 "
            >
                <Box flexDirection={{ md: "row" }} className="">
                    <h1 className="text-2xl font-semibold text-blue-800">{turncatedTitle}</h1>
                    <Breadcrumbs className='flex flex-col'>
                        <Link href={`/`} className="hover:underline">
                            Home
                        </Link>
                        <Link href={`/query?q=${headline?.section_name}`} className="hover:underline">
                            {headline?.section_name}
                        </Link>
                        <p className="text-blue-800">{turncatedTitle}</p>
                    </Breadcrumbs>
                </Box>
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 mt-6">
                    {/* Add to Favorites */}
                    <LikeButton article={headline} isProfile={false} />

                    {/* Read later action button */}
                    <ReadLaterButton article={headline} />

                    {/* Print */}
                    <IconButton color="default" onClick={handlePrint}>
                        <PrintOutlined />
                    </IconButton>

                    {/* Share */}
                    <IconButton color="default" onClick={handleShare}>
                        <ShareOutlined />
                    </IconButton>

                    {/* comment */}
                    <IconButton color="default" onClick={() => setOpenModel(true)}>
                        <MapsUgcOutlined />
                    </IconButton>
                </div>
            </motion.div>

            <Backdrop open={openModel} className='z-20'>
                <CommentModal articleId={filterdId} onClose={() => setOpenModel(false)} />
            </Backdrop>
        </div>
    )
}

export default ArticleBreadCrumb