import { useEffect, useState } from "react";
import { getWeatherInfo } from "../service/getWeatherInfo";

export const useWeather = (location: string) => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function getInfo(){
        const response = await getWeatherInfo(location);
        if(response.status === 200){
            setWeather(response.data);
            setLoading(false);
        } else {
            setError(response.statusText);
            setLoading(false);
        }
    }

    useEffect(() => {
        getInfo();
    }, [location])

    return { weather, loading, error };
}