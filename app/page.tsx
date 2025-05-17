'use client';

import useHomeScreen from "./hooks/useHomeScreen";

export default function Home() {
  const { error, loading, homeData } = useHomeScreen();

  // ✅ Debugging log (optional)
  console.log("Home screen data:", homeData);

  return (
    <>Hi</>
  );
}
