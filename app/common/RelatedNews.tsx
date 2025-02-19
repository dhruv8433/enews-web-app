import React, { useEffect, useState } from 'react';
import useHeadlines from '../hooks/useHeadlines';
import SmallCard from './SmallCard';

const RelatedNews = () => {
    const [isClient, setIsClient] = useState(false);
    const [article, setArticle] = useState<any>(null);
    const { error, headlines, loading } = useHeadlines(article?.section_name);

    useEffect(() => {
        setIsClient(true);
        const data = localStorage.getItem('article');
        if (data) {
            setArticle(JSON.parse(data));
        }
    }, []);

    if (!isClient) return null; // Early return to handle client-side rendering

    if (!article) return <p className="text-center text-gray-500">No article found.</p>;

    return (
        <div>
            <div className="custom-heading breadcrumb">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">
                    Related News
                </div>
            </div>

            <div className="">
                {loading ? (
                    <h1>loading</h1>
                ) : error ? (
                    <div className="bg-red-500">Error {error}</div>
                ) : (
                    headlines.slice(0, 5).map((article, index) => (
                        <div className="my-2" key={index} >
                            <SmallCard headline={article} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RelatedNews;
