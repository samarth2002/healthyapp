'use client'

import React from "react";
import UserInfo from "./UserInfo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SignInButton from "./SignInButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #FFD700, #FF8C00, #FF6347)",
        padding: isMobile ? "10px" : "10px 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx = {{flex: '0.1'}}>
          <Typography
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "#FFFFFF",
              fontSize: isMobile ? "10px" : "16px",
            }}
          >
            (nope we still have to make a logo)
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "center",
            width: "auto",
            textAlign: "left",
            flexDirection: isMobile ? "column" : "row",
            flex: '0.8'
          }}
        >
          <Typography
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "#FFFFFF",
              fontSize: isMobile ? "24px" : "36px",
            }}
          >
            The Health App{" "}
          </Typography>
          <span
            style={{
              fontSize: isMobile ? "11px" : "14px",
              fontWeight: "normal",
            }}
          >
            (we are working on the name)
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width:  "auto",
            marginTop: isMobile ? "10px" : "0",
            gap: "10px",
            flexDirection: isMobile ? "column" : "row",
            flex: '0.1'
          }}
        >
          <SignInButton />
          <UserInfo />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
