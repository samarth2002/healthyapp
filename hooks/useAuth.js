"use client";

import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('11')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
    console.log("12");

        setUser(user);
      } else {
    console.log("13");

        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
};

export default useAuth;
