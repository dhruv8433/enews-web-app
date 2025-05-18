'use client';

import { useEffect, useState } from 'react';
import { getHomeScreen } from '../service/home.service';
import { HomeScreenData } from '../types/home.types';
import { ErrorType } from '../types/error.types';

const useHomeScreen = () => {
  const [homeData, setHomeData] = useState<HomeScreenData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const response = await getHomeScreen();
      setHomeData(response.data);
    } catch (err) {
      console.error('Error fetching home screen:', err);
      setError({
        message: 'Failed to fetch home screen data',
        details: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    homeData,
    loading,
    error,
    fetchHomeData,
  };
};

export default useHomeScreen;
