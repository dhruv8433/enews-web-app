import { httpAxios } from "../httpAxios";


// Get all favorites for the logged-in user
export const getFavorites = async () => {
    try {
        const response = await httpAxios.get("/favorites");
        return response.data;
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
};

// Add an article to favorites
export const addFavorite = async (articleId: string) => {
    try {
        const response = await httpAxios.post("/favorites", { articleId });
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
};

// Remove an article from favorites
export const removeFavorite = async (articleId: string) => {
    try {
        const response = await httpAxios.delete(`/favorites/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from favorites:", error);
    }
};

// Clear all favorites
export const clearFavorites = async () => {
    try {
        const response = await httpAxios.delete("/favorites/clear");
        return response.data;
    } catch (error) {
        console.error("Error clearing favorites:", error);
    }
};