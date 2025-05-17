"use client";

import React from "react";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { slug } = useParams();

  // Ensure `slug` is always a string
  const slugString = Array.isArray(slug) ? slug[0] : slug || "";

  console.log("slug", slugString);

  return (
    <> Detailed Page addedd soon</>
  );
};

export default Page;
