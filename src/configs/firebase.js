import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAwK0KSATNGpMxm8GkPVYOo1HaCHdx60AY",
    authDomain: "project-dev-h.firebaseapp.com",
    projectId: "project-dev-h",
    storageBucket: "project-dev-h.appspot.com",
    messagingSenderId: "784200160287",
    appId: "1:784200160287:web:0860b9a855901e79e5f12a",
    measurementId: "G-SJMKP0EY5K"
};

// Initialize Firebase
export const appConfig = initializeApp(firebaseConfig);
export const authConfig = getAuth(appConfig);
export const storageConfig = getStorage(appConfig);
export const analyticsConfig = getAnalytics(appConfig);