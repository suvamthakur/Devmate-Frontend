import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((store) => store.user);

  console.log("/profile");
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
}

export default Profile;
