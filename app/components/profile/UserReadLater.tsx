import React, { useMemo, useState } from "react";
import useFetchReadLater from "@/app/hooks/useFetchReadLater";
import HorizontalCard from "@/app/common/HorizontalCard";
import MyHeading from "@/app/common/MyHeading";
import ErrorComponent from "@/app/common/ErrorComponent";
import { HorizontalCardSkeleton } from "@/app/common/Skeleton.Site";
import { Grid, Pagination } from "@mui/material";
import Lottie from "lottie-react";
import bookmarkAnimation from '@/app/Animation/bookmarkAnimation.json'
import MyDiv from "@/app/common/MyDiv";

const UserReadLater = () => {
  const { readLater, error, loading, removeReadLater } = useFetchReadLater();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;


  // Get paginated articles without `useMemo`
  const displayedBookmarked = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return readLater.slice(startIndex, startIndex + itemsPerPage);
  }, [readLater, currentPage]);

  if (error) return <ErrorComponent error={error} />;

  const skeletonContainer = Array.from({ length: 2 }).map((_, index) => (
    <div className="my-2" key={index}>
      <HorizontalCardSkeleton isProfilePage={true} />
    </div>
  ));

  // Loading Skeletons
  if (loading)
    return (
      <div className="p-5 bg-white rounded-lg min-h-full">
        <MyHeading title="Read Later" />
        {skeletonContainer}
      </div>
    );

  return (
    <MyDiv isPrimary className=" rounded-xl p-2 min-h-full">
      <div className="px-2">
        <MyHeading title="Read Later" />
      </div>

      {readLater.length === 0 ? (
        <div className="mflex-1 flex flex-col justify-center items-center">
          <Lottie animationData={bookmarkAnimation} className="h-64 w-64" />
          <p className="text-lg text-gray-500">You have no read later yet.</p>
        </div>
      ) : (
        <div>
          <Grid container spacing={2}>
            {displayedBookmarked.map((article: any, index) => (
              <Grid item xs={12} md={6} key={index}>
                <HorizontalCard
                  key={index}
                  headline={article.headline}
                  isProfilePage={true}
                  onRemove={() => removeReadLater(article.headline._id)} // Remove from state
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {readLater.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={Math.ceil(readLater.length / itemsPerPage)}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      )}
    </MyDiv>
  );
};

export default UserReadLater;
