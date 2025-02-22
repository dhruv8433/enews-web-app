import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { auth } from "../site/firebase.config";
import Cookies from "js-cookie"; // Secure cookie storage

const db = getFirestore();

/**
 * Sign up a new user with email & password and store in Firestore
 */
import toast from "react-hot-toast";

export const signUpWithEmail = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user) throw new Error("User sign-up failed");
        await updateProfile(user, { displayName: name });
        
        const userRef = doc(db, `users/${user.email}/last_login/${user.uid}`);


        // Store user in Firestore
        await setDoc(userRef, {
            uid: user.uid,
            displayName: name,
            email: user.email,
            photoURL: "https://th.bing.com/th/id/OIP.n2Ma8HzIoTwSvkuchYKdXAHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
        });

        console.log("User signed up:", user);

        // Securely store access token
        const accessToken = await user.getIdToken();
        Cookies.set("access_token", accessToken, { expires: 1, secure: true, sameSite: "Strict" });

        toast.success("Account created successfully");
        // after create account, user will be signed out
        await signOut(auth)
        return user;
    } catch (error: any) {
        console.error("Sign-Up Error:", error);

        // Check for specific error codes
        if (error.code === "auth/email-already-in-use") {
            toast.error("Email is already in use. Please use a different email.");
        } else {
            toast.error("An error occurred during sign-up. Please try again.");
        }

        throw error; // Optionally rethrow for further handling
    }
};


/**
 * Log in an existing user with email & password, update last login timestamp
 */
export const loginWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user) throw new Error("User login failed");

        const userRef = doc(db, `users/${user.email}/last_login/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // User exists -> Update last login timestamp
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
            });
        } else {
            throw new Error("User not found in Firestore");
        }

        console.log("User logged in:", user);

        // Securely store access token
        const accessToken = await user.getIdToken();
        Cookies.set("access_token", accessToken, { expires: 1, secure: true, sameSite: "Strict" });

        return user;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};
