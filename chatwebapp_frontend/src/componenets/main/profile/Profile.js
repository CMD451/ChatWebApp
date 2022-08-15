
import { UserContext } from "../Hub";
import { useEffect, useState, ReactDOM } from "react";
import React from 'react';
import { ProfileForm } from "./ProfileForm";
import {ProfileImageForm} from "./ProfileImageForm";
export function Profile() {
  const {user,setUser} = React.useContext(UserContext);
  console.log(user)
  return (
    <div className="content">
        Profile
        <ProfileImageForm userData = {user} setUser={setUser} />
        <ProfileForm userData = {user}/>
    </div>
  );
}

export default Profile;
