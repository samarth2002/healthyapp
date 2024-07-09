import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { getWeekId } from "../utils/getWeekId";

export const getUserData = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    const initialData = {
      totalGlassesToday: 0,
      targetWaterLevel: 3000.0,
      lastUpdated: new Date(),
    };
    await setDoc(userDoc, initialData);
    return initialData;
  }
};

export const updateUserData = async (userId, data) => {
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, data);
};

export const getWeeklyData = async (userId) => {
  const weekId = getWeekId();
  const weeklyDoc = doc(db, "users", userId, "weeklyData", weekId);
  const weeklySnapshot = await getDoc(weeklyDoc);

  if (weeklySnapshot.exists()) {
    return weeklySnapshot.data();
  } else {
    const initialData = {
      data: {
        Monday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
        Tuesday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
        Wednesday: {
          glassesDrunk: 0,
          waterIntake: 0,
          targetWaterLevel: 3000.0,
        },
        Thursday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
        Friday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
        Saturday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
        Sunday: { glassesDrunk: 0, waterIntake: 0, targetWaterLevel: 3000.0 },
      },
      lastUpdated: new Date(),
    };
    await setDoc(weeklyDoc, initialData);
    return initialData;
  }
};

export const updateWeeklyData = async (userId, date, day, data) => {
  const weekId = getWeekId(date);
  const weeklyDoc = doc(db, "users", userId, "weeklyData", weekId);
  await updateDoc(weeklyDoc, {
    [`data.${day}`]: data,
    lastUpdated: new Date(),
  });
};
