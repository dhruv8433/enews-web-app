import toast from "react-hot-toast";
import { httpAxios } from "../httpAxios";

export async function createComments(article_id: string, content: string) {

    try {
        const response = await httpAxios.post(`/comments`, { articleId: article_id, content });
        return response.data?.data?.comment;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}
export async function getComments(article_id: string) {

    try {
        const response = await httpAxios.get(`/comments/article/${article_id}`);
        console.log("🚀 Comments API response:", response.data);
        return response.data?.data?.comments || [];
    } catch (error) {

        console.error("Error fetching settings:", error);
        throw error;
    }
}