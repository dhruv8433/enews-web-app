import { httpAxios } from "../httpAxios";

export async function getArticlesById(id: string) {
    try {
        const article = await httpAxios.get(`/articles/${id}`);
        return article.data;
    } catch (error) {
        console.error("Error fetching article by ID:", error);
        throw error;
    }
}


