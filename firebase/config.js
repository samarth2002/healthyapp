import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "healthyapp-28b80.firebaseapp.com",
  projectId: "healthyapp-28b80",
  storageBucket: "healthyapp-28b80.appspot.com",
  messagingSenderId: "772021985616",
  appId: "1:772021985616:web:2cb6c31f8264c578378c55",
  measurementId: "G-NS33TBY5TK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };