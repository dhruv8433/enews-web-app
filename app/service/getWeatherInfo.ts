import { httpAxios } from "@/app/httpAxios"

export const getWeatherInfo = async (location: string) => {
    const response = await httpAxios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_SECRET_KEY}&q=${location}`
    )

    return response;
}