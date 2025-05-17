import { Headline } from "../types/headline.types";
import { saveArticleToFirestore } from "../hooks/useSharedArticle"; // Import function instead of hook
import { NewsArticle } from "../types/home.types";

const shareArticle = async (articleData: NewsArticle) => {
    // const articleId = await saveArticleToFirestore(articleData);
    // return articleId;
    console.log("Article shared:", articleData);
};

export const handleShareArticle = (headline: NewsArticle) => {
    shareArticle(headline);
};

export default shareArticle;
