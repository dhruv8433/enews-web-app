import React from "react";

interface WeatherCardProps {
    location: string;
    temperature: number; // in Celsius
    condition: string;
    iconUrl: string; // weather icon URL
    humidity: number; // in percentage
    windSpeed: number; // in km/h
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    location,
    temperature,
    condition,
    iconUrl,
    humidity,
    windSpeed,
}) => {
    return (
        <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl p-6 shadow-lg text-white flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xl font-semibold mb-1">{location}</h3>
                <div className="flex items-center space-x-4">
                    <img src={iconUrl} alt={condition} className="w-16 h-16" />
                    <div>
                        <p className="text-4xl font-bold">{temperature}°C</p>
                        <p className="capitalize">{condition}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between text-sm opacity-80">
                <div>
                    <p>Humidity</p>
                    <p>{humidity}%</p>
                </div>
                <div>
                    <p>Wind</p>
                    <p>{windSpeed} km/h</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
