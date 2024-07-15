"use client";

import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";


const SignInButton = () => {

 

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User info:", result.user);
      window.location.reload();
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      onClick={signInWithGoogle}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "5px" : "10px",
        width: isMobile ? "75px" : "151px",
        height: isMobile ? "25px" : "44px",
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
      <Typography
        sx={{
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "bold",
          color: "#FFFFFF",
          fontSize: isMobile ? "8px" : "16px",
        }}
      >
        Sign in
      </Typography>
    </Button>
  );
};

export default SignInButton;
