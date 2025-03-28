import './main.css'
import { ChatHub } from './chat/ChatHub'
import { Profile } from './profile/Profile'
import { returnLoading,setTheme } from '../util/util';
import { useEffect, useState } from "react";
import { getCurrentUser } from '../../lookup/lookup';
import React from 'react';
import { useNavigate } from "react-router";

export const UserContext = React.createContext({
    user:null,
    setUser:() => {}

});
export function Hub() {


    const [user, setUser] = useState({});
    const [active, setActive] = useState("chat")
    const [isLoading, setIsLoading] = useState(true)
    const options = { "profile": <Profile />, "chat": <ChatHub /> }
    const optionsCaptions = [{'option':'profile','caption':"Profile"},{'option':'chat','caption':"Chat"}]
    let activeOption = (isLoading ? returnLoading() : options[active])
    let navigate = useNavigate();
    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.body)
                    const profile = response.body.profile
                    setTheme(profile.backgroundColor,profile.secondaryColor)
                    setIsLoading(false)
                }
            })
    }, [])
    function singOut() {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refresh")
        navigate("/")

    }
    function generateOptions(){
        return optionsCaptions.map((value)=>{
            let className = "navbar-item "
            if(value.option == active){
                className+= "selected-navbar-item"
            }
            return(
                <div onClick={(e)=>{setActive(value.option)}} className={className}>
                     <span>{value.caption}</span>
                </div>
            )
        })
    }
    return (
        <div className="content">
            <div className="navbar">
                <div className="navbar-item" onClick={singOut}>
                    <span>Sign Out</span>
                </div>
                {generateOptions()}
            </div>
            <div className="main">
                <UserContext.Provider value={{user,setUser}}>
                    {activeOption}
                </UserContext.Provider>
            </div>
        </div>
    );
}

export default Hub;
