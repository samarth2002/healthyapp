"use client";

import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User info:", result.user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <Button
      onClick={signInWithGoogle}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        width: "151px",
        height: "44px",
        background: "#1D1D1D",
        border: "1px solid #000000",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        color: "#FFFFFF",
        textTransform: "none",
        "&:hover": {
          background: "#333333",
        },
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
