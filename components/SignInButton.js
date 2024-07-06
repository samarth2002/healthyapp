"use client";

import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User info:", result.user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignInButton;
