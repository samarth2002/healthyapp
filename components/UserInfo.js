"use client";

import useAuth from "../hooks/useAuth";

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>No user signed in.</p>;
  }

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="User Avatar" />
    </div>
  );
};

export default UserInfo;
