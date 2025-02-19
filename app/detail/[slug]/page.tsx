"use client";

import React from "react";
import LargeContainer from "@/app/common/LargeContainer";
import { Grid } from "@mui/material";
import DetailedNews from "@/app/common/DetailedNews";
import RelatedNews from "@/app/common/RelatedNews";

const Page: React.FC = () => {

  return (
    <LargeContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <DetailedNews />
        </Grid>
        <Grid item xs={12} md={4}>
          <RelatedNews />
        </Grid>
      </Grid>
    </LargeContainer>
  );
};

export default Page;
