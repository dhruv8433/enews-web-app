import { useEffect, useState } from "react";
import { getWeatherInfo } from "../service/getWeatherInfo";
import notifications from "../constants/notifications";

export const useWeather = (location: string) => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    async function getInfo() {
        try {
            const response = await getWeatherInfo(location);
            if (response.status === 200) {
                setWeather(response.data);
                setLoading(false);
            }
        } catch (error) {
            setError({
                message: notifications.error.weatherInfoFailed.message,
                details: (error as Error).message || notifications.error.weatherInfoFailed.description,
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        getInfo();
    }, [location])

    return { weather, loading, error };
}