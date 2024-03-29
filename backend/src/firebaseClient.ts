import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCIkaKclMTfz90VOVHBSryyHrXdIuOb3Dw",
    authDomain: "volt-codelab.firebaseapp.com",
    projectId: "volt-codelab",
    storageBucket: "volt-codelab.appspot.com",
    messagingSenderId: "396251993224",
    appId: "1:396251993224:web:8df5ac775c58a480cebb3d",
    measurementId: "G-VKFVBHQ1J",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);