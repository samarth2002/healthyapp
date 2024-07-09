"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styles from "./Glass.module.css";
import useAuth from "../../hooks/useAuth";
import { getUserData, updateUserData } from "../../firebase/firestore";
import Bottle from "./Bottle";

const Glass = ({
  targetWaterLevel,
  currentWaterLevel,
  totalGlassesToday,
  setCurrentWaterLevel,
  setTotalGlassesToday,
  setTargetWaterLevel,
}) => {
  const { user } = useAuth();
  const glassOfWater = 200.0;

  const handleChange = async (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setTargetWaterLevel(value * 1000);

      if (user) {
        await updateUserData(user.uid, {
          targetWaterLevel: value * 1000,
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
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#F7F5F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <label htmlFor="target-input" className={styles.label}>
            Choose your target (L)
          </label>
          <input
            id="target-input"
            type="number"
            defaultValue={targetWaterLevel / 1000}
            onChange={handleChange}
            className={styles.input}
          />
        </Grid>
        <Grid item display="flex" alignItems="center">
          <Bottle waterLevel={(currentWaterLevel / targetWaterLevel) * 100} />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center" mb={2}>
            <p>
              1 Glass of water contains on an average 200ml, Today you have had:
            </p>
            <p>{totalGlassesToday} glasses</p>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              color: "black",
              fontWeight: "bold",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
              mb: 2,
              "&:hover": {
                backgroundColor:
                  "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              },
            }}
            onClick={addGlassOfWater}
          >
            I Drank a Glass of Water
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={resetAll}
          >
            RESET
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Glass;
