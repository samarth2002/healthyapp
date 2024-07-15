"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import Typography from "@mui/material/Typography";
import Group from "./Group";
import TextField from "@mui/material/TextField";
import { arrayUnion } from "firebase/firestore";


import { updateUserData, getUserData } from "../../firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  addGroupMember,
  createGroup,
  getGroupData,
} from "../../firebase/firestoreGroups";

function Groups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await getUserData(user.uid);
        setGroups(userData.groupIds);
      };

      fetchUserData();
    }
  }, [user]);

  const handleCreateGroup = async () => {
    const newGroupId = await createGroup(
      newGroupName,
      {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
      },
      []
    );

    addGroupMember(newGroupId, {
      userId: user.uid,
      username: user.displayName,
      email: user.email,
    });
    setGroups([...groups, newGroupId]);
    updateUserData(user.uid, {
      groupIds: arrayUnion(newGroupId),
    });

    alert("Group created");
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group !== groupId));
    alert("Group deleted");

  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
        boxSizing: "border-box",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Open Sans, sans-serif",

          fontWeight: "bold",
          color: "#FFFFFF",
          fontSize: "32px",
          marginBottom: "16px",
        }}
      >
        Groups
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "12px",
            marginRight: "8px",
            fontFamily: "Open Sans, sans-serif",

            "&:hover": {
              backgroundColor:
                "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
            },
          }}
          onClick={handleCreateGroup}
        >
          Add a group
        </Button>
        <TextField
          label="Group Name"
          variant="outlined"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          sx={{
            width: "300px",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <Box key={index} sx={{ margin: "8px" }}>
              <Group
                groupId={group}
                firstMember={{
                  email: user.email,
                  userId: user.uid,
                  username: user.displayName,
                }}
                onDelete={handleDeleteGroup}
              />
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "white" , fontFamily: "Open Sans, sans-serif"}}>No groups found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Groups;