import { useEffect, useState } from "react"
import { getSettings } from "../service/settings.service";
import { WebSettings } from "../types/settings.types";

const useSettings = () => {
    const [settings, setSettings] = useState<WebSettings | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string; details?: string } | null>(null);

    async function fetchSettings() {
        try {
            setLoading(true);
            const response = await getSettings();
            console.log("Settings response:", response?.data?.webSettings);
            setSettings(response?.data?.webSettings);
        } catch (err) {
            console.error("Error fetching settings:", err);
            setError({
                message: "Failed to fetch settings",
                details: (err as Error).message,
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        fetchSettings,
    };
}

export default useSettings;