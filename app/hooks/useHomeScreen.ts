import { useEffect, useState } from "react";
import { getHomeScreen } from "../service/home.service";
import { ErrorType } from "../types/error,types";

const useHomeScreen = () => {
    const [homeData, setHomeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);

    const fetchHomeData = async () => {
        setLoading(true);
        try {
            const response = await getHomeScreen();
            console.log("Home screen data:", response.data);
            setHomeData(response.data);
        } catch (err) {
            console.error("Error fetching settings:", err);
            setError({
                message: "Failed to fetch settings",
                details: (err as Error).message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, [])

    return {
        homeData, loading, error, fetchHomeData
    }
}

export default useHomeScreen;