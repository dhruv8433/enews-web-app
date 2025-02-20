"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { auth, db } from "../site/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Headline, HeadlineProps } from "../types/headline.types";

const useFetchReadLater = () => {
    const [user] = useAuthState(auth);
    const [readLater, setReadLater] = useState<HeadlineProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setReadLater([]);
            setLoading(false);
            return;
        }

        const fetchReadLater = async () => {
            setLoading(true);
            setError(null);
            try {
                const favsRef = collection(db, `users/${user.email}/read_later`);
                const querySnapshot = await getDocs(favsRef);

                const favsList = querySnapshot.docs.map(doc => ({
                    headline: {
                        _id: doc.id,
                        ...doc.data(),
                    } as Headline, 
                })) as HeadlineProps[];

                setReadLater(favsList);

                setReadLater(favsList);
            } catch (err) {
                console.error("Error fetching ReadLater:", err);
                setError("Failed to fetch Read Later.");
                toast.error("Could not load Read Later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReadLater();
    }, [user]);

    return { readLater, loading, error };
};

export default useFetchReadLater;
