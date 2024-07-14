"use client";

import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InviteDropDown from "./InviteDropDown";

const Invites = () => {
  const [isInvitesOpen, setIsInvitesOpen] = useState(false);
  const [newInvites, setNewInvites] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dropdownRef = useRef(null);

  const handleInviteClick = () => {
    setIsInvitesOpen(!isInvitesOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsInvitesOpen(false);
    }
  };

  useEffect(() => {
    if (isInvitesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInvitesOpen]);

  return (
    <Box sx={{ position: "relative" }} ref={dropdownRef}>
      <Button
        onClick={handleInviteClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "5px" : "10px",
          width: isMobile ? "75px" : "151px",
          height: isMobile ? "25px" : "44px",
          background: newInvites ? "red" : "#1D1D1D",
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
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#FFFFFF",
            fontSize: isMobile ? "8px" : "16px",
          }}
        >
          Invites
        </Typography>
      </Button>
      {isInvitesOpen && <InviteDropDown />}
    </Box>
  );
};

export default Invites;
