
import { UserContext } from "../Hub";
import { useEffect, useState, ReactDOM } from "react";
import React from 'react';
import { ProfileForm } from "./ProfileForm";
export function Profile() {
  const user = React.useContext(UserContext);
  console.log(user)
  return (
    <div className="content">
        Profile
        <img src = {user.profile.image} alt={user.username}/>
        <p>
          {user.profile.description}
        </p>
        <ProfileForm userData = {user}/>
    </div>
  );
}

export default Profile;
