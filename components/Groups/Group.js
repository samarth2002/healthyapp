"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../hooks/useAuth";
import axios from "axios"


function Group({ groupId, firstMember, onDelete }) {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const { user } = useAuth();
  const [createdByUser, setCreatedByUser] = useState('');
  useEffect(() => {
    if (groupId) {
      const fetchGroupData = async () => {
        try {
           const response = await axios.post(
             `https://be-healthyapp-production.up.railway.app/groups/getGroupData`,
             {
               groupId,
             }
           );
          const groupData = response.data;
          console.log(groupData);

          setGroupName(groupData.groupName);
          setMembers(groupData.members);
          setCreatedByUser(groupData.createdByUser);
          refreshGroups(groupData.members);
        } catch (error) {
          console.error(error)
        }
        
      };

      fetchGroupData();
    }
  }, [groupId]);

  const handleAddGroupMember = async () => {
    if (groupId) {
        try {
          const response = await axios.post(
            `https://be-healthyapp-production.up.railway.app/groups/getGroupData`,
            {
              groupId,
            }
          );
          const groupData = response.data;
          const isMemberAlready = groupData.members.some(
            (member) => member.email === email
          );

          if (isMemberAlready) {
            alert("User is already a member of the group.");
          } else {
            try {
              await axios.post(`https://be-healthyapp-production.up.railway.app/groups/sendGroupInvite`, {
                email,
                groupId,
                groupName,
                inviter: {
                  userId: user.uid,
                  username: user.displayName,
                  email: user.email,
                },
              });
              alert("Invite sent");
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      
    } else {
      console.log("Please create a group first");
    }
  };

  const handleDeleteGroup = async () => {
    if (groupId) {
       try {
         await axios.post(`https://be-healthyapp-production.up.railway.app/groups/deleteGroup`, {
           groupId,
         });
        onDelete(groupId);

       } catch (error) {
         console.error(error);
       }
    }
  };

  const refreshGroups = async () => {
      try {
        const response = await axios.post(
          `https://be-healthyapp-production.up.railway.app/groups/getGroupData`,
          {
            groupId,
          }
        );
    const groupData = response.data;
    setMembers(groupData.members);

    const groupMembers = groupData.members;
    for (const member of groupMembers) {
      const q = query(
        collection(db, "users"),
        where("email", "==", member.email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const memberData = doc.data();
          setMembers((prevMembers) => {
            const existingMemberIndex = prevMembers.findIndex(
              (m) => m.email === member.email
            );
            if (existingMemberIndex !== -1) {
              const updatedMembers = [...prevMembers];
              updatedMembers[existingMemberIndex] = {
                ...updatedMembers[existingMemberIndex],
                totalGlassesToday: memberData.totalGlassesToday || 0,
                targetWaterLevel: memberData.targetWaterLevel || 3000,
                waterIntake: (memberData.totalGlassesToday || 0) * 200,
              };
              return updatedMembers;
            }
            return prevMembers;
          });
        });
      }

      } }catch (error) {
        console.error(error);
      }
    
    
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        minHeight: "330px",
        height: "auto",
        backgroundColor: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        border: "1px solid black",
        padding: "15px",
        borderRadius: "12px",
      }}
    >
      <Typography sx={{ fontFamily: "Open Sans, sans-serif" }}>
        {groupName}
      </Typography>
      {createdByUser?.userId === user?.uid && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "10px",
          }}
        >
          <TextField
            label="Search by email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "70%", marginRight: "10px" }}
          />
          <Button
            variant="contained"
            sx={{
              width: "150px",
              height: "40px",
              backgroundColor:
                "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              color: "black",
              fontWeight: "bold",
              fontSize: "12px",

              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              fontFamily: "Open Sans, sans-serif",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor:
                  "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              },
            }}
            onClick={handleAddGroupMember}
          >
            Add Member
          </Button>
          <Button
            variant="contained"
            sx={{
              marginLeft: "5px",
              width: "50px",
              height: "40px",
              fontSize: "10px",
              backgroundColor:
                "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              color: "black",
              fontWeight: "bold",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
              fontFamily: "Open Sans, sans-serif",

              "&:hover": {
                backgroundColor:
                  "linear-gradient(90deg, rgba(255,223,0,1) 0%, rgba(255,171,0,1) 100%)",
              },
            }}
            onClick={() => refreshGroups(members)}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            sx={{
              marginLeft: "10px",
              width: "100px",
              height: "40px",
              fontSize: "12px",
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
              fontFamily: "Open Sans, sans-serif",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={handleDeleteGroup}
          >
            Delete Group
          </Button>
        </Box>
      )}
      <List
        sx={{
          width: "100%",
          maxWidth: "360px",
          bgcolor: "background.paper",
          borderRadius: "12px",
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        {members.map((member, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                member.userId === createdByUser?.userId
                  ? `${member.username} (Admin)`
                  : member.username
              }
              secondary={`Email: ${member.email} | Glasses: ${member.totalGlassesToday} | Target: ${member.targetWaterLevel}ml | Intake: ${member.waterIntake}ml`}
              primaryTypographyProps={{
                style: { fontFamily: "Open Sans, sans-serif" },
              }}
              secondaryTypographyProps={{
                style: { fontFamily: "Open Sans, sans-serif" },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Group;