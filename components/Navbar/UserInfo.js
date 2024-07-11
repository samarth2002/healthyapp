"use client";

import { Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { updateUserData } from "../../firebase/firestore";

const UserInfo = () => {
  const { user } = useAuth();
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (!user) {
    return (
      <Typography
        sx={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "#FFFFFF",
          fontSize: isMobile ? "8px" : "16px",
        }}
      >
        No user sign in
      </Typography>
    );
  }else{
    updateUserData(user.uid, {
      username: user.displayName,
    } )
  }
 
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          width={isMobile ? 30 : 59}
          height={isMobile ? 30 : 59}
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
