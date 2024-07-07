import React from "react";
import UserInfo from "./UserInfo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SignInButton from "./SignInButton";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #FFD700, #FF8C00, #FF6347)",
        padding: "10px 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" , justifyContent: 'center' ,flex: '0.8'}}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "#FFFFFF",
              fontSize: "36px",
            }}
          >
            The Health App{" "}
            <span style={{ fontSize: "14px", fontWeight: "normal" }}>
              (we are working on the name)
            </span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flex: '0.2', justifyContent: 'space-evenly' }}>
          <SignInButton />
          <UserInfo />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
