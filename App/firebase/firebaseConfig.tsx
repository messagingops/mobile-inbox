import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
export { getFirestore };

const firebaseConfig = {
  apiKey: "AIzaSyCIkaKclMTfz90VOVHBSryyHrXdIuOb3Dw",
  authDomain: "volt-codelab.firebaseapp.com",
  projectId: "volt-codelab",
  storageBucket: "volt-codelab.appspot.com",
  messagingSenderId: "396251993224",
  appId: "1:396251993224:web:8df5ac775c58a480cebb3d",
  measurementId: "G-VKFVBHQ1J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

