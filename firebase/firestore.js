// firestore.js
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";

// Get user data


export const getUserData = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  const today = new Date();
  const initialData = {
    totalGlassesToday: 0,
    targetWaterLevel: 3000.0,
    lastUpdated: Timestamp.fromDate(today),
  };

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const lastUpdated = userData.lastUpdated.toDate();

    // Check if the current date is different than lastUpdated
    if (
      today.getDate() !== lastUpdated.getDate() ||
      today.getMonth() !== lastUpdated.getMonth() ||
      today.getFullYear() !== lastUpdated.getFullYear()
    ) {
      // Update the user data for a new day
      await setDoc(userDoc, {
        ...userData,
        totalGlassesToday: 0,
        lastUpdated: Timestamp.fromDate(today),
      });
      return {
        ...userData,
        totalGlassesToday: 0,
        lastUpdated: Timestamp.fromDate(today),
      };
    }

    return userData;
  } else {
    // User does not exist, create default data
    await setDoc(userDoc, initialData);
    return initialData;
  }
};



// Update user data
export const updateUserData = async (userId, data) => {
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, data);
};
