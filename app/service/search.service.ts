import { httpAxios } from "../httpAxios";

export async function searchArticles(query: string) {
    try {
        const response = await httpAxios.get(`/search`, {
            params: { query: query },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching articles:", error);
        throw error;
    }
}