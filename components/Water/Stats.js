"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { getUserData, updateUserData } from "../../firebase/firestore";

function Stats({ targetWaterLevel, currentWaterLevel, totalGlassesToday }) {

  const glassOfWater = 200.0;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F7F5F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "120px",
        boxSizing: "border-box",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Open Sans, sans-serif",

          fontWeight: "bold",
          color: "black",
          fontSize: "40px",
        }}
      >
        Stats
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            Total water drank (ml):
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            {totalGlassesToday * glassOfWater}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            Glasses left to drink:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            {totalGlassesToday * 200 <= targetWaterLevel
              ? targetWaterLevel / 200 - totalGlassesToday
              : 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            ml left to drink:
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open Sans, sans-serif",

              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            {totalGlassesToday * 200 <= targetWaterLevel
              ? targetWaterLevel - totalGlassesToday * 200
              : 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Stats;
