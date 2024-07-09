import React, { useEffect, useState } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getWeeklyData } from "../../firebase/firestore"; // Make sure this path is correct
import useAuth from "../../hooks/useAuth";

// Register the components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeeklyGraph = () => {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState({
    Monday: { waterIntake: 0 },
    Tuesday: { waterIntake: 0 },
    Wednesday: { waterIntake: 0 },
    Thursday: { waterIntake: 0 },
    Friday: { waterIntake: 0 },
    Saturday: { waterIntake: 0 },
    Sunday: { waterIntake: 0 },
  });

  useEffect(() => {
    if (user) {
      const fetchWeeklyData = async () => {
        const data = await getWeeklyData(user.uid);
        setWeeklyData(data.data);
      };
      fetchWeeklyData();
    }
  }, [user]);

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Water Intake (ml)",
        data: [
          weeklyData.Monday.waterIntake,
          weeklyData.Tuesday.waterIntake,
          weeklyData.Wednesday.waterIntake,
          weeklyData.Thursday.waterIntake,
          weeklyData.Friday.waterIntake,
          weeklyData.Saturday.waterIntake,
          weeklyData.Sunday.waterIntake,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Weekly Water Intake</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyGraph;
