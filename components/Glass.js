"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styles from "./Glass.module.css";

const Glass = () => {
  const [targetWaterLevel, setTargetWaterLevel] = useState(3000.0); // Default water level at 50%
  const [currentWaterLevel, setCurrentWaterLevel] = useState(0.0); // Default water level at 50%
  const [totalGlassesToday, setTotalGlassesToday] = useState(0);
  const glassOfWater = 200.0;

  const handleChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setTargetWaterLevel(value*1000 );
    }
  };

  const addGlassOfWater = () => {
    setCurrentWaterLevel(currentWaterLevel + glassOfWater)
    setTotalGlassesToday(totalGlassesToday + 1)

  }

  const resetAll = () => {
    setCurrentWaterLevel(0.0)
    setTotalGlassesToday(0)
    setTargetWaterLevel(3000.0)
  }

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
          <Box sx = {{ p: 2}}>
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
