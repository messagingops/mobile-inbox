"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig = {
    apiKey: "AIzaSyCIkaKclMTfz90VOVHBSryyHrXdIuOb3Dw",
    authDomain: "volt-codelab.firebaseapp.com",
    projectId: "volt-codelab",
    storageBucket: "volt-codelab.appspot.com",
    messagingSenderId: "396251993224",
    appId: "1:396251993224:web:8df5ac775c58a480cebb3d",
    measurementId: "G-VKFVBHQ1J",
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, lite_1.getFirestore)(exports.app);
