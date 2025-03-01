// src/constants/notifications.ts

const notifications = {
    success: {
        newsFetched: {
            message: "News fetched successfully!",
            description: "Latest news articles are now available.",
        },
        userSubscribed: {
            message: "Subscription successful!",
            description: "You have been subscribed to our newsletter.",
        },
        commentPosted: {
            message: "Comment posted!",
            description: "Your comment has been added successfully.",
        },
        signupSuccess: {
            message: "Sign-up successful!",
            description: "Welcome aboard! You can now access your account.",
        },
        loginSuccess: {
            message: "Login successful!",
            description: "You are now logged in.",
        },
        addBookmarkSuccess: {
            message: "Bookmark added!",
            description: "You have successfully bookmarked this article.",
        },
        removeBookmarkSuccess: {
            message: "Bookmark removed!",
            description: "This article has been removed from your bookmarks.",
        },
        addFavoriteSuccess: {
            message: "Added to favorites!",
            description: "This article has been added to your favorites.",
        },
        removeFavoriteSuccess: {
            message: "Removed from favorites!",
            description: "This article has been removed from your favorites.",
        },
        likedNewsFetched: {
            message: "Liked news loaded!",
            description: "All your liked news articles have been fetched successfully.",
        },
        bookmarkedNewsFetched: {
            message: "Bookmarked news loaded!",
            description: "Your saved news articles have been retrieved successfully.",
        },
    },
    error: {
        newsFetchFailed: {
            message: "Failed to fetch news!",
            description: "Unable to retrieve the latest articles. Please try again later.",
        },
        subscriptionFailed: {
            message: "Subscription failed!",
            description: "We couldn't process your request. Please try again.",
        },
        commentFailed: {
            message: "Comment submission failed!",
            description: "There was an issue posting your comment. Please try again later.",
        },
        networkError: {
            message: "Network error!",
            description: "Check your internet connection and try again.",
        },
        unauthorized: {
            message: "Unauthorized access!",
            description: "You need to log in to perform this action.",
        },
        signupFailed: {
            message: "Sign-up failed!",
            description: "There was an issue creating your account. Please try again.",
        },
        loginFailed: {
            message: "Login failed!",
            description: "Invalid credentials. Please check your email and password.",
        },
        addBookmarkFailed: {
            message: "Failed to add bookmark!",
            description: "There was an issue saving your bookmark.",
        },
        removeBookmarkFailed: {
            message: "Failed to remove bookmark!",
            description: "There was an issue removing this article from bookmarks.",
        },
        addFavoriteFailed: {
            message: "Failed to add to favorites!",
            description: "There was an issue adding this article to your favorites.",
        },
        removeFavoriteFailed: {
            message: "Failed to remove from favorites!",
            description: "There was an issue removing this article from your favorites.",
        },
        likedNewsFetchFailed: {
            message: "Failed to fetch liked news!",
            description: "We couldn't load your liked articles. Please try again later.",
        },
        bookmarkedNewsFetchFailed: {
            message: "Failed to fetch bookmarked news!",
            description: "We couldn't load your saved articles. Please try again later.",
        },
        commentFetchFailed: {
            message: "Failed to fetch comments!",
            description: "There was an issue loading comments. Please try again later.",
        },
        userNotFound: {
            message: "User not found!",
            description: "We couldn't find your account. Please sign up to continue.",
        },
        emailAlreadyExists: {
            message: "Email already in use!",
            description: "This email is already registered. Please use a different email.",
        },
        loginToSaveFavorite: {
            message: "Login to save favorites!",
            description: "Please log in to save your favorite articles.",
        },
        loginToSaveBookmark: {
            message: "Login to save bookmarks!",
            description: "Please log in to save your bookmarked articles.",
        },
        articleIdMissing: {
            message: "Article ID missing!",
            description: "The article ID is missing. Please try again. Check console for more information.",
        },
        loginForComment: {
            message: "Login to comment!",
            description: "You must logged in to comment.",
        },
        weatherInfoFailed: {
            message: "Failed to fetch weather info!",
            description: "We couldn't find the weather information for this location.",
        },
        passwordLength: {
            message: "Password too short!",
            description: "Password must be at least 6 characters long.",
        },
        commentNotEmpty:{
            message: "Comment can't be empty!",
            description: "Please write a comment before submitting.",
        }
    },
};

export default notifications;
