// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDvQQXJ809lLwxXaqgbYPFMWmYeNN2AlKk",
	authDomain: "triptailor-travelplanner.firebaseapp.com",
	projectId: "triptailor-travelplanner",
	storageBucket: "triptailor-travelplanner.firebasestorage.app",
	messagingSenderId: "294540679340",
	appId: "1:294540679340:web:f4a5d8517d1e69e8d82709",
	measurementId: "G-6FP9BR91MF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);