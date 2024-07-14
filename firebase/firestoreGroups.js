import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./config";
import { Timestamp } from "firebase/firestore";
import { updateUserData } from "./firestore";

// Function to create a new group
export const createGroup = async (groupName, createdByUser, members) => {
  const groupId = doc(collection(db, "groups")).id; // Generate unique group ID
  const groupDoc = doc(db, "groups", groupId);

  const initialData = {
    groupId: groupId,
    groupName: groupName,
    members: members,
    createdByUser: createdByUser,
    createdOn: Timestamp.now(),
  };

  await setDoc(groupDoc, initialData);
  return groupId;
};

// Function to add a member to an existing group
export const addGroupMember = async (groupId, member) => {
  // Validate member object


  const groupDoc = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(groupDoc);

  if (groupSnapshot.exists()) {
    const groupData = groupSnapshot.data();
    const isMemberAlready = groupData.members.some(
      (m) => m.email === member.email
    );
    if (isMemberAlready) {
      console.log("Member already exists in the group");
      return;
    }
    const updatedMembers = [...groupData.members, member];

    console.log("Updated Members:", updatedMembers);

    await updateDoc(groupDoc, { members: updatedMembers });
  } else {
    console.error("Group not found");
  }
};

// Function to get group data
export const getGroupData = async (groupId) => {
  const groupDoc = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(groupDoc);

  if (groupSnapshot.exists()) {
    return groupSnapshot.data();
  } else {
    console.error("Group not found");
    return null;
  }
};

// Function to send an invite
export const sendInvite = async (inviteeEmail, groupId, groupName, inviter) => {
  const q = query(collection(db, "users"), where("email", "==", inviteeEmail));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (docSnapshot) => {
      const userData = docSnapshot.data();
      const inviteId = doc(
        collection(db, "users", userData.userId, "invites")
      ).id;
      const inviteDoc = doc(db, "users", userData.userId, "invites", inviteId);

      const inviteData = {
        inviteId: inviteId,
        groupId: groupId,
        groupName: groupName,
        inviter: inviter,
        status: "pending",
        sentOn: Timestamp.now(),
      };

      await setDoc(inviteDoc, inviteData);
    });
  } else {
    console.log("No user found with this email");
  }
};

// Function to accept an invite
export const acceptInvite = async (
  userId,
  userEmail,
  userName,
  inviteId,
  groupId
) => {
  const inviteDoc = doc(db, "users", userId, "invites", inviteId);
  const inviteSnapshot = await getDoc(inviteDoc);

  if (inviteSnapshot.exists()) {
    const inviteData = inviteSnapshot.data();
    const groupDoc = doc(db, "groups", groupId);
    const groupSnapshot = await getDoc(groupDoc);

    if (groupSnapshot.exists()) {
      const groupData = groupSnapshot.data();
      const updatedMembers = [
        ...groupData.members,
        {
          userId,
          username: userName,
          email: userEmail,
        },
      ];

      await updateDoc(groupDoc, { members: updatedMembers });
      await updateUserData(userId, { groupIds: arrayUnion(groupId) });
      await deleteDoc(inviteDoc);
    } else {
      console.log("Group not found");
    }
  } else {
    console.log("Invite not found");
  }
};

// Function to reject an invite
export const rejectInvite = async (userId, inviteId) => {
  const inviteDoc = doc(db, "users", userId, "invites", inviteId);
  await deleteDoc(inviteDoc);
};

// Function to delete a group


// Function to delete a group
export const deleteGroup = async (groupId) => {
  const groupDoc = doc(db, "groups", groupId);
  const groupSnapshot = await getDoc(groupDoc);

  if (groupSnapshot.exists()) {
    const groupData = groupSnapshot.data();

    // Remove groupId from each user's groupIds
    for (const member of groupData.members) {
      const userDoc = doc(db, "users", member.userId);
      await updateDoc(userDoc, {
        groupIds: arrayRemove(groupId),
      });
    }

    // Delete the group document
    await deleteDoc(groupDoc);
    console.log("Group deleted successfully");
  } else {
    console.error("Group not found");
  }
};
