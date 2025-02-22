import toast from "react-hot-toast";
import { loginWithEmail, signUpWithEmail } from "../hooks/useFirebaseAuth";

// Sign up a new user
const handleSignUp = async (name: string, email: string, password: string) => {
    try {
        const user = await signUpWithEmail(name, email, password);
        console.log("User signed up:", user);
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

// Log in an existing user
const handleLogin = async (email: string, password: string) => {
    try {
        const user = await loginWithEmail(email, password);
        console.log("User logged in:", user);
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export { handleLogin, handleSignUp }