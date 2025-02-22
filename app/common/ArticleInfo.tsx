import React from 'react'
import { motion } from 'framer-motion'
import { HeadlineProps } from '../types/headline.types'
import Image from 'next/image'
import { imageUrl } from '../site/site.config'
import Link from 'next/link'

const ArticleInfo: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        < motion.div
            initial={{ opacity: 0, y: 50 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto rounded-xl mt-10"
            id="articleContent"
        >
            {/* 📌 article Image */}
            {
                headline.multimedia?.length > 0 && (
                    <div className="w-full h-[500px] relative rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl + headline.multimedia[0].url}
                            alt="article image"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )
            }

            {/* 📰 article */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mt-5"
            >
                {headline.headline?.main}
            </motion.h1>

            {/* ✍️ Byline */}
            <p className="text-gray-600 mt-2 text-sm">{headline.byline?.original}</p>

            {/* 📅 Date & Source */}
            <p className="text-sm text-gray-500 mt-1">
                {new Date(headline.pub_date).toLocaleDateString()} • {headline?.source}
            </p>

            {/* 🏷️ Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
                {headline?.keywords?.map((keyword: any, index: number) => (
                    <span
                        key={index}
                        className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                        {keyword.value}
                    </span>
                ))}
            </div>

            {/* 📝 Snippet */}
            <p className="mt-4 text-gray-700 leading-relaxed">{headline?.abstract}</p>

            {/* 🔗 Read More */}
            <Link href={headline?.web_url ?? "#"} target="_blank" rel="noopener noreferrer">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="block text-blue-600 mt-4 font-semibold hover:bg-blue-800 hover:text-white w-max p-2 rounded"
                >
                    Read Full Article →
                </motion.div>
            </Link>

        </motion.div>)
}

export default ArticleInfo