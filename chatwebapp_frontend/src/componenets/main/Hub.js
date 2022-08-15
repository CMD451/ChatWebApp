import './main.css'
import { ChatHub } from './chat/ChatHub'
import { Profile } from './profile/Profile'
import { returnLoading,setTheme } from '../util/util';
import { useEffect, useState } from "react";
import { getCurrentUser } from '../../lookup/lookup';
import React from 'react';

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
    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.body)
                    const profile = response.body.profile
                    console.log("setting theme")
                    setTheme(profile.backgroundColor,profile.secondaryColor)
                    console.log(document.documentElement)
                    setIsLoading(false)
                }
            })
    }, [])
    function singOut() {

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
