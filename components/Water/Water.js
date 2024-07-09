"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styles from "./Glass.module.css";
import useAuth from "../../hooks/useAuth";
import { getUserData, updateUserData } from "../../firebase/firestore";
import Glass from "./Glass";
import Stats from "./Stats";



function Water() {
      const { user } = useAuth();
      const [targetWaterLevel, setTargetWaterLevel] = useState(3000.0);
      const [currentWaterLevel, setCurrentWaterLevel] = useState(0.0);
      const [totalGlassesToday, setTotalGlassesToday] = useState(0);
  const glassOfWater = 200.0;

      
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await getUserData(user.uid);
        setTotalGlassesToday(userData.totalGlassesToday);
        setCurrentWaterLevel(userData.totalGlassesToday * glassOfWater);
        setTargetWaterLevel(userData.targetWaterLevel);
      };

      fetchUserData();
    }
  }, [user]);
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "white",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Glass
        targetWaterLevel={targetWaterLevel}
        currentWaterLevel={currentWaterLevel}
        totalGlassesToday={totalGlassesToday}
        setTargetWaterLevel={setTargetWaterLevel}
        setCurrentWaterLevel={setCurrentWaterLevel}
        setTotalGlassesToday={setTotalGlassesToday}
      />
      <Stats
        targetWaterLevel={targetWaterLevel}
        currentWaterLevel={currentWaterLevel}
        totalGlassesToday={totalGlassesToday}
      />
    </Box>
  );
}

export default Water;
