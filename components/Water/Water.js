"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import Glass from "./Glass";
import Stats from "./Stats";
import TargetComplete from "./TargetComplete";
import WeeklyGraph from "./WeeklyGraph";
import axios from "axios";

function Water() {
  const { user } = useAuth();
  const [targetWaterLevel, setTargetWaterLevel] = useState(3000.0);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(0.0);
  const [totalGlassesToday, setTotalGlassesToday] = useState(0);
  const glassOfWater = 200.0;

  useEffect(() => {
    if (user) {

      const fetchUserData = async () => {
      
        try{
          const userId = user.uid
    const response = await axios.post(
            `https://be-healthyapp-production.up.railway.app/water/getUserData`,
            {
              userId,
            }
          );
          const userData = response.data
          setTotalGlassesToday(userData.totalGlassesToday);
          setCurrentWaterLevel(userData.totalGlassesToday * glassOfWater);
          setTargetWaterLevel(userData.targetWaterLevel);
        }catch(err){
          console.error(err)
        }
     


      };

      fetchUserData();
    }
  }, [user]);

 

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: '100%'
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
