import React from "react";
import { useWeather } from "@/app/hooks/useWeather";
import { motion } from "framer-motion";

interface WeatherCardProps {
    city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const { weather, loading, error } = useWeather(city);

    if (loading) {
        return (
            <div className="h-60 w-80 flex items-center justify-center bg-blue-200 rounded-lg shadow-md animate-pulse">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-60 w-80 flex items-center justify-center bg-red-300 text-white rounded-lg shadow-md">
                {error}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-60 w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl p-4 flex flex-col justify-between relative overflow-hidden"
        >
            {/* Animated Weather Icon */}
            <motion.img
                src={weather?.current?.condition?.icon}
                alt="Weather Icon"
                className="absolute top-4 right-4 w-14 h-14"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, yoyo: Infinity }}
            />

            {/* Weather Info */}
            <div>
                <h2 className="text-2xl font-bold">{weather?.location?.name}</h2>
                <p className="text-lg">{weather?.location?.country}</p>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-4xl font-bold">{weather?.current?.temp_c}°C</h3>
                    <p className="text-sm">{weather?.current?.condition?.text}</p>
                </div>

                {/* Humidity & Wind */}
                <div className="text-right">
                    <p className="text-sm">Humidity: {weather?.current?.humidity}%</p>
                    <p className="text-sm">Wind: {weather?.current?.wind_kph} km/h</p>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherCard;
