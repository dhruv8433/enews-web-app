import React, { useEffect, useState } from "react";
import { useWeather } from "@/app/hooks/useWeather";
import { motion } from "framer-motion";
import ErrorComponent from "./ErrorComponent";

const fallbackWeather = {
  location: {
    name: "Mumbai",
    country: "India",
  },
  current: {
    temp_c: 30,
    condition: {
      text: "Sunny",
      icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
    },
    humidity: 60,
    wind_kph: 10,
  },
};

const WeatherCard: React.FC = () => {
  const [city, setCity] = useState<string>();
  const { weather, loading, error } = useWeather(city || "mumbai");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            if (data.city) setCity(data.city);
          } catch {
            console.log("Failed to fetch city");
          }
        },
        () => console.log("Location access denied")
      );
    }
  }, [city]);

  if (loading) {
    return (
      <div className="h-60 w-80 flex items-center justify-center bg-blue-200 rounded-lg shadow-md animate-pulse">
        Loading...
      </div>
    );
  }

  const displayWeather = weather || fallbackWeather;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-60 w-auto p-4 flex flex-col justify-between relative overflow-hidden card`}
    >
      <motion.img
        src={displayWeather.current.condition.icon}
        alt="Weather Icon"
        className="absolute top-4 right-4 w-14 h-14"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, yoyo: Infinity }}
      />

      <div>
        <h2 className="text-2xl font-bold">{displayWeather.location.name}</h2>
        <p className="text-lg">{displayWeather.location.country}</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-4xl font-bold">{displayWeather.current.temp_c}°C</h3>
          <p className="text-sm">{displayWeather.current.condition.text}</p>
        </div>

        <div className="text-right">
          <p className="text-sm">Humidity: {displayWeather.current.humidity}%</p>
          <p className="text-sm">Wind: {displayWeather.current.wind_kph} km/h</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
