import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA8-CdmUCiAgSwwz_PIrACcbBE4dfUCyso",
    authDomain: "health-blog-9cfa6.firebaseapp.com",
    databaseURL: "https://health-blog-9cfa6.firebaseio.com",
    projectId: "health-blog-9cfa6",
    storageBucket: "health-blog-9cfa6.appspot.com",
    messagingSenderId: "568055355470",
    appId: "1:568055355470:web:f70c595b172b55a3310b1f",
    measurementId: "G-XVNQJF0Z68"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
const firebaseAnalytics = firebase.analytics();

export const db = app.firestore();

