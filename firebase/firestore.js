// firestore.js
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

// Get user data
export const getUserData = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    // User does not exist, create default data
    const initialData = { totalGlassesToday: 0, targetWaterLevel: 3000.0 ,lastUpdated: new Date() };
    await setDoc(userDoc, initialData);
    return initialData;
  }
};

// Update user data
export const updateUserData = async (userId, data) => {
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, data);
};
