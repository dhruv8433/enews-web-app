"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { auth, db } from "../site/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Headline, HeadlineProps } from "../types/headline.types";

const useFetchFavorites = () => {
    const [user] = useAuthState(auth);
    const [favorites, setFavorites] = useState<HeadlineProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            try {
                const favsRef = collection(db, `users/${user.email}/favorites`);
                const querySnapshot = await getDocs(favsRef);

                const favsList = querySnapshot.docs.map(doc => ({
                    headline: {
                        _id: doc.id,
                        ...doc.data(),
                    } as Headline, 
                })) as HeadlineProps[];

                setFavorites(favsList);


                setFavorites(favsList);
            } catch (err) {
                console.error("Error fetching favorites:", err);
                setError("Failed to fetch favorites.");
                toast.error("Could not load favorites.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

    return { favorites, loading, error };
};

export default useFetchFavorites;
