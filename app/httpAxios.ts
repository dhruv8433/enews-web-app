import axios, { AxiosInstance } from "axios";

export const httpAxios: AxiosInstance = axios.create({
    baseURL: "https://api.nytimes.com/svc",
});