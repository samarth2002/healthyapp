import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBnyN6sWv6Rdfxo-PlYGbpk26KUvwamZS4",
  authDomain: "healthyapp-28b80.firebaseapp.com",
  projectId: "healthyapp-28b80",
  storageBucket: "healthyapp-28b80.appspot.com",
  messagingSenderId: "772021985616",
  appId: "1:772021985616:web:43cef4fd7a106dd3378c55",
  measurementId: "G-XLG0Z2F9QP",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };