// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import "firebase/messaging";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwgKRQ5fr9iJ33fbH1oWo9NPsUkcq76IY",
  authDomain: "social-media-434c6.firebaseapp.com",
  projectId: "social-media-434c6",
  storageBucket: "social-media-434c6.appspot.com",
  messagingSenderId: "573496330806",
  appId: "1:573496330806:web:2afbfeb7da278bff6c2697"
};
const app=!getApps().length?initializeApp(firebaseConfig):getApp();
const db=getFirestore();
const storage=getStorage();

// Initialize Firebase

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

 const VAPID_KEY = "BNj1HbV9WT_28hVaK8rwoaZT4ULeIANMe-NrjvYvNcXH85mxdC74moOvcb2PhjtCDYxMqlSvYJ2GhEJW-hTLF8E"
// export { firebaseCloudMessaging };
export {app,db,storage,messaging,VAPID_KEY} ;