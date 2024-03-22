import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpa_GKVtZLFC-Q-BuJwkEgUoaw2Oy--1Q",
  authDomain: "smart-medical-cabinet-b6ee5.firebaseapp.com",
  projectId: "smart-medical-cabinet-b6ee5",
  storageBucket: "smart-medical-cabinet-b6ee5.appspot.com",
  messagingSenderId: "841714323692",
  appId: "1:841714323692:web:5a320770998b10307cd5c9",
};

export const appFirebase = initializeApp(firebaseConfig);
