"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styles from "./Glass.module.css";
import useAuth from "../hooks/useAuth";
import { getUserData, updateUserData } from "../firebase/firestore";

const Glass = () => {
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

  const handleChange = async (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setTargetWaterLevel(value * 1000);

      if (user) {
      await updateUserData(user.uid, {
        targetWaterLevel: value*1000,
        lastUpdated: new Date(),
      });
    }
    }
  };

  const addGlassOfWater = async () => {
    const newTotalGlasses = totalGlassesToday + 1;
    const newCurrentWaterLevel = currentWaterLevel + glassOfWater;

    setCurrentWaterLevel(newCurrentWaterLevel);
    setTotalGlassesToday(newTotalGlasses);

    if (user) {
      await updateUserData(user.uid, {
        totalGlassesToday: newTotalGlasses,
        lastUpdated: new Date(),
      });
    }
  };

  const resetAll = async () => {
    setCurrentWaterLevel(0.0);
    setTotalGlassesToday(0);
    setTargetWaterLevel(3000.0);

    if (user) {
      await updateUserData(user.uid, {
        totalGlassesToday: 0,
        targetWaterLevel: 3000.0,
        lastUpdated: new Date(),
      });
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "green" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <label htmlFor="target-input" className={styles.label}>
            Choose your target (L)
          </label>
          <input
            id="target-input"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={targetWaterLevel / 1000}
            onChange={handleChange}
            className={styles.input}
          />
        </Grid>
        <Grid item display="flex" alignItems="center">
          <Box
            sx={{
              bgcolor: "lightblue",
              width: "200px",
              height: "400px",
              border: "5px solid black",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                bgcolor: "blue",
                position: "absolute",
                bottom: 0,
                height: `${(currentWaterLevel / targetWaterLevel) * 100}%`,
              }}
            />
          </Box>
        </Grid>
        <Grid item display="flex" alignItems="center">
          <Box>
            <p>
              1 Glass of water contains on an Avg 200ml, Today you had :{" "}
              {totalGlassesToday}
            </p>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={addGlassOfWater}
            >
              I drank a glass of water!
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item display="flex" alignItems="center">
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={resetAll}
            >
              RESET
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Glass;
