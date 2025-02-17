import { httpAxios } from "@/app/httpAxios";

// specific news based on query string -> q
export const getSpecificQueryNews = async (q: string) => {
  const response = await httpAxios.get(
    `/search/v2/articlesearch.json?q=${q}&api-key=${process.env.NEXT_PUBLIC_NEWS_SECRET_KEY}`
  );
  return response.data.response;
};
