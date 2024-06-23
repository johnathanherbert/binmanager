import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAetgfyWX23GT2YzldREIZjzoUzue5U8nQ",
    authDomain: "binmanagerems.firebaseapp.com",
    databaseURL: "https://binmanagerems-default-rtdb.firebaseio.com",
    projectId: "binmanagerems",
    storageBucket: "binmanagerems.appspot.com",
    messagingSenderId: "642182303907",
    appId: "1:642182303907:web:c20e2e688f3cf8151e2f16",
    measurementId: "G-KLM96HYK59"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
