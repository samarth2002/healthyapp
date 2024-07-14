"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import {
  getUserData,
  getWeeklyData,
  updateUserData,
  updateWeeklyData,
} from "../../firebase/firestore";
import Glass from "./Glass";
import Stats from "./Stats";
import TargetComplete from "./TargetComplete";
import WeeklyGraph from "./WeeklyGraph";

function Water() {
  const { user } = useAuth();
  const [targetWaterLevel, setTargetWaterLevel] = useState(3000.0);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(0.0);
  const [totalGlassesToday, setTotalGlassesToday] = useState(0);
  const glassOfWater = 200.0;

  useEffect(() => {
    if (user) {
      console.log('8')
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

      const fetchUserData = async () => {
      console.log("9");
     
        const userData = await getUserData(user.uid);
        const weeklyData = await getWeeklyData(user.uid);

        setTotalGlassesToday(userData.totalGlassesToday);
        setCurrentWaterLevel(userData.totalGlassesToday * glassOfWater);
        setTargetWaterLevel(userData.targetWaterLevel);

      console.log("10");

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
      {totalGlassesToday * glassOfWater >= targetWaterLevel && (
        <TargetComplete />
      )}

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
      <WeeklyGraph />
    </Box>
  );
}

export default Water;
