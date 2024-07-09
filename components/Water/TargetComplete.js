"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { getUserData, updateUserData } from "../../firebase/firestore";
import Image from "next/image";


function TargetComplete() {
  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <Typography
        sx={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "black",
          fontSize: "25px",
        }}
      >
        You achieved your target water intake!!
      </Typography>
      <Image
        src='/jatt.png'
        height={300}
        width={400}
      />
    </Box>
  );
}

export default TargetComplete;
