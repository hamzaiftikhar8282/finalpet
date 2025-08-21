// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_T6O4dMavCT_aK-n3qdy2QoP9wukoEPU",
  authDomain: "pets-b171b.firebaseapp.com",
  projectId: "pets-b171b",
  storageBucket: "pets-b171b.firebasestorage.app",
  messagingSenderId: "1053375596838",
  appId: "1:1053375596838:web:0f3c6485b788051d6019e7",
  measurementId: "G-1X448Y4WDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export needed instances
export { auth, db, analytics };
