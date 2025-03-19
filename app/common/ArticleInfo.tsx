import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Slider, Box } from '@mui/material';
import { imageUrl } from '../site/site.config';
import { HeadlineProps } from '../types/headline.types';

const ArticleInfo: React.FC<HeadlineProps> = ({ headline }) => {
    // 🔥 State for font size
    const [fontSize, setFontSize] = useState(16);

    const fontSizes = [14, 16, 18, 20, 22];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto rounded-xl mt-10"
            id="articleContent"
        >
            {/* 📷 Article Image */}
            {headline.multimedia?.length > 0 && (
                <div className="w-full h-full relative rounded-lg overflow-hidden">
                    <img
                        src={imageUrl + headline.multimedia[0].url}
                        alt="article image"
                        className="w-full h-[500px] object-fill relative"
                    />
                </div>
            )}

            {/* 📰 Article Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-5"
            >
                {headline.headline?.main.toUpperCase()}
            </motion.h1>

            {/* ✍️ Byline */}
            <p className="text-gray-600 mt-2 text-sm">{headline.byline?.original}</p>

            {/* 📅 Date & Source */}
            <p className="text-sm text-gray-500 mt-1">
                {new Date(headline.pub_date).toLocaleDateString()} • {headline?.source}
            </p>

            {/* 🔠 Font Size Adjuster */}
            <Box className="mt-4 border p-4 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold mb-2">
                    Adjust Font Size:
                </p>
                <Slider
                    value={fontSize}
                    onChange={(_, newValue) => setFontSize(newValue as number)}
                    step={2}
                    marks={fontSizes.map(size => ({ value: size, label: `${size}px` }))}
                    min={14}
                    max={22}
                    className='p-2'
                    valueLabelDisplay="auto"
                />
            </Box>

            {/* 📝 Snippet (Font size changes dynamically) */}
            <p className="mt-4 text-gray-700 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                {headline?.abstract}
            </p>

            {/* 🔗 Read More */}
            <Link href={headline?.web_url ?? "#"} target="_blank" rel="noopener noreferrer">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="block text-blue-900 mt-4 font-semibold hover:bg-blue-800 hover:text-white w-max p-2 rounded"
                >
                    Read Full Article →
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default ArticleInfo;