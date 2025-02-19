import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { auth } from "../site/firebase.config";
import Cookies from "js-cookie"; // Correct package

// Initialize Firestore
const db = getFirestore();

// Function to sign in with Google and store user in Firestore
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (!user) throw new Error("Google authentication failed");

        const userRef = doc(db, `users/${user.email}/last_login/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // User already exists -> Update last login timestamp
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
            });
        } else {
            // New user -> Store in Firestore
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
            });
        }

        console.log("User logged in:", user);

        // Get access and refresh tokens securely
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken; // Firebase provides this

        // **Secure way to store tokens**
        Cookies.set("access_token", accessToken, { expires: 1, secure: true, sameSite: "Strict" });
        Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true, sameSite: "Strict" });

        return user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};
