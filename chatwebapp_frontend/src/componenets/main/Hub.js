import './main.css'
import { ChatHub } from './chat/ChatHub'
import { Profile } from './profile/Profile'
import { useEffect, useState } from "react";


export function Hub() {

    const [active, setActive] = useState("chat")
    const options = { "profile": <Profile/>,"chat":<ChatHub/>}
    let activeOption = options[active]
    function singOut() {

    }
    return (
        <div class="content">
            <div class="navbar">
                <div class="navbar-item" onClick={singOut}>
                    <span>Sign Out</span>
                </div>
                <div onClick={(e)=>{setActive("profile")}} class="navbar-item">
                    <span >Profile</span>
                </div>
                <div onClick={(e)=>{setActive("chat")}}class="navbar-item">
                    <span>Chat</span>
                </div>
            </div>
            <div class="main">
                {activeOption}
            </div>
        </div>
    );
}

export default Hub;
