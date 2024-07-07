"use client";

import { Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>No user signed in.</p>;
  }

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          width={59}
          height={59}
          src={user.photoURL}
          alt="User Avatar"
          style={{
            borderRadius: "5px",
            border: "1px solid black",
          }}
        />
      </Box>
    </div>
  );
};

export default UserInfo;
