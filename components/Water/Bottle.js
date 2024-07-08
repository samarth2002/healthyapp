"use client";

import React from "react";
import { Box } from "@mui/material";

const Bottle = ({ waterLevel }) => {
  const bottleWidth = 60;
  const bottleHeight = 180;
  const capHeight = 20;
  const bottleColor = "#A9A9A9"; // Light grey
  const waterColor = "#ADD8E6"; // Light blue

  return (
    <Box>
      <svg width="100" height="220" viewBox="0 0 100 220">
        {/* Define clip path */}
        <defs>
          <clipPath id="bottleClip">
            <rect
              x="20"
              y="20"
              width={bottleWidth}
              height={bottleHeight}
              rx="10"
              ry="10"
            />
          </clipPath>
        </defs>

        {/* Draw the bottle */}
        <rect
          x="20"
          y="20"
          width={bottleWidth}
          height={bottleHeight}
          rx="10"
          ry="10"
          fill="none"
          stroke={bottleColor}
          strokeWidth="2"
        />

        {/* Draw the water, clipped by the bottle */}
        <rect
          x="20"
          y={20 + bottleHeight - waterLevel}
          width={bottleWidth}
          height={waterLevel}
          fill={waterColor}
          clipPath="url(#bottleClip)"
        />

        {/* Draw the cap */}
        <rect
          x="20"
          y={20 - capHeight}
          width={bottleWidth}
          height={capHeight}
          rx="5"
          ry="5"
          fill={bottleColor}
        />
      </svg>
    </Box>
  );
};

export default Bottle;
