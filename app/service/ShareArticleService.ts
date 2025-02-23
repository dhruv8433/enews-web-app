import { Headline } from "../types/headline.types";
import { saveArticleToFirestore } from "../hooks/useSharedArticle"; // Import function instead of hook

const shareArticle = async (articleData: Headline) => {
    const articleId = await saveArticleToFirestore(articleData);
    return articleId;
};

export const handleShareArticle = (headline: Headline) => {
    shareArticle(headline);
};

export default shareArticle;
