/**
 * @file ReadLaterButton.tsx
 * @description Like button that saves articles in Firebase Firestore.
 * 
 * @component
 * @author Dhruv Soni
 * @date 19/02/2025
 */

import React from "react";
import { IconButton } from "@mui/material";
import useReadLater from "../hooks/useReadLater";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { HeadlineProps } from "../types/headline.types";

const ReadLaterButton: React.FC<HeadlineProps> = ({ headline }) => {

    const { isReadLater, toggleReadLater } = useReadLater(headline);
    return (
        <IconButton
        aria-label="read-later"
            onClick={toggleReadLater}
            className="text-red-500 text-2xl transition-transform duration-200 hover:scale-110 w-min"
        >
            {isReadLater ? <Bookmark color="primary" /> : <BookmarkBorder color="primary" />}
        </IconButton>
    );
};

export default ReadLaterButton;
