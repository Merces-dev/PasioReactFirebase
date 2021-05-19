import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyDGBk_yKgfJoMyvCM-yeCGbYJMlIQLhgiE",
  authDomain: "pasio00000-eba91.firebaseapp.com",
  projectId: "pasio00000-eba91",
  storageBucket: "pasio00000-eba91.appspot.com",
  messagingSenderId: "1041663301444",
  appId: "1:1041663301444:web:d5a93b7fce5cf94678a911",
  measurementId: "G-PMEBFWBTL5"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Exporto o firestore para ser utilizado nos components
export const db = app.firestore();

export const storage = app.storage();
export default firebaseConfig;