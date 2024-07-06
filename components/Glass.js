"use client";

import { useState } from "react";
import styles from "./Glass.module.css";

const Glass = () => {
  const [waterLevel, setWaterLevel] = useState(50); // Default water level at 50%

  const handleChange = (event) => {
    setWaterLevel(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.glass}>
        <div
          className={styles.water}
          style={{ height: `${waterLevel}%` }}
        ></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={waterLevel}
        onChange={handleChange}
        className={styles.slider}
      />
    </div>
  );
};

export default Glass;
