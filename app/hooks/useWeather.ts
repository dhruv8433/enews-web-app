import { useEffect, useState } from "react";
import { getWeatherInfo } from "../service/getWeatherInfo";
import notifications from "../constants/notifications";
import { WeatherData } from "../types/weather.type";

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string; details?: string } | null>(null);

  async function getInfo() {
    try {
      const response = await getWeatherInfo(location);
      if (response.status === 200) {
        setWeather(response.data as WeatherData); // Explicitly cast response data
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
  }, [location]);

  return { weather, loading, error };
};
