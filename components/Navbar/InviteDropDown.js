"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { acceptInvite, rejectInvite } from "../../firebase/firestoreGroups";
import useAuth from "../../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const InviteDropDown = () => {
  const { user } = useAuth();
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      if (user) {
        const invitesSnapshot = await getDocs(
          collection(db, "users", user.uid, "invites")
        );
        const invitesData = invitesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvites(invitesData);
        if(invites.length===0){
          console.log('zero')
        }
      }
    };

    fetchInvites();
  }, [user]);

  const handleAccept = async (invite) => {
    await acceptInvite(
      user.uid,
      user.email,
      user.displayName,
      invite.id,
      invite.groupId
    );
    setInvites(invites.filter((i) => i.id !== invite.id));
  };

  const handleReject = async (invite) => {
    await rejectInvite(user.uid, invite.id);
    setInvites(invites.filter((i) => i.id !== invite.id));
  };
 
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50px",
        right: "0",
        width: "300px",
        bgcolor: "background.paper",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "16px",
        zIndex: "10",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px", color: 'black' }}>
        Invites
      </Typography>
      {invites.length === 0 ? (
        <Typography variant="body2" sx={{ textAlign: "center", color: 'black', alignItems: 'center', justifyContent: 'center' }}>
          No invites yet
        </Typography>
      ) : (
        <List>
          {invites.map((invite, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="accept"
                    sx={{ color: "green" }}
                    onClick={() => handleAccept(invite)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="reject"
                    sx={{ color: "red", marginLeft: "8px" }}
                    onClick={() => handleReject(invite)}
                  >
                    <CancelIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`Invite to join ${invite.groupName} by ${invite.inviter.username}`}
                primaryTypographyProps={{
                  style: { color: "black", fontSize: "12px" },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default InviteDropDown;
