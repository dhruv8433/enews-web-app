import { httpAxios } from "../httpAxios";

export async function getHomeScreen() {
    try {
        const response = await httpAxios.get("/home")
        return response.data;
    } catch (error) {
        console.error("Error fetching home screen data:", error);
        throw error;
    }
}