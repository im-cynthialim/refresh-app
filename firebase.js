// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyD7RS8I0FkZyIn6_5Ftks2fLumRrBna-jw",
    authDomain: "refreshapp-457f3.firebaseapp.com",
    projectId: "refreshapp-457f3",
    storageBucket: "refreshapp-457f3.appspot.com",
    messagingSenderId: "450187571647",
    appId: "1:450187571647:web:9a899d1d1e0fb9ef07310a",
    measurementId: "G-69MQLZF5P2",
    databaseURL: "https://refreshapp-457f3-default-rtdb.firebaseio.com",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
// const database = getDatabase(app);
// const analytics = getAnalytics(app);



