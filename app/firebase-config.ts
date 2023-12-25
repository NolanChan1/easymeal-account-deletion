import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from "./fb-config";

// Issues with reading environment variables for firebase config variables
/*
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAjHu_97x7kVvmZxZ4vO2qwYbQvszkiL7I",
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
*/

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
