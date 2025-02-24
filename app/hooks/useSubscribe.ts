import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../site/firebase.config";

const useSubscribe = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const subscribeUser = async (email: string) => {
        if (!email) {
            setMessage("Please enter a valid email.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "subscribers"), {
                email,
                subscribedAt: Timestamp.now(),
                lastSentAt: null
            });
            setMessage("✅ Subscribed successfully! You’ll receive updates soon.");
        } catch (error) {
            console.error("Subscription error:", error);
            setMessage("❌ Failed to subscribe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { subscribeUser, loading, message };
};

export default useSubscribe;
