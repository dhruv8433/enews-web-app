import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWIZbFJI_HXiP0bXx6nGlI8ipwA5cDB_0",
  authDomain: "news-app-e1567.firebaseapp.com",
  projectId: "news-app-e1567",
  storageBucket: "news-app-e1567.firebasestorage.app",
  messagingSenderId: "348954268899",
  appId: "1:348954268899:web:d887b9d74a1dbbac5021d6",
  measurementId: "G-V731YPM4Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
// enableIndexedDbPersistence(db)
//   .then(() => {
//     // Offline persistence enabled successfully
//     console.log("Offline support enabled");
//   })
//   .catch((error) => {
//     // Error handling if offline persistence fails
//     console.error("Error enabling offline support:", error);
//   });

export { app, db };

export default app;