"use client";

import React from "react";
import LargeContainer from "@/app/common/LargeContainer";
import { Grid } from "@mui/material";
import DetailedNews from "@/app/common/DetailedNews";
import RelatedNews from "@/app/common/RelatedNews";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { slug } = useParams();

  // Ensure `slug` is always a string
  const slugString = Array.isArray(slug) ? slug[0] : slug || "";

  console.log("slug", slugString);

  return (
    <LargeContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <DetailedNews slug={slugString} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RelatedNews slug={slugString} />
        </Grid>
      </Grid>
    </LargeContainer>
  );
};

export default Page;
