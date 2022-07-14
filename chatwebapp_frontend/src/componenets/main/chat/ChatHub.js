import { useEffect, useState ,ReactDOM} from "react";
import React from 'react';
import {ChatList} from "./ChatList"

export function ChatHub() {
    // const [active, setActive] = useState("chat")
    // const options = { "profile": <Profile/>,"chat":<ChatHub/>}
    // let activeOption = options[active]
    const [activeChat,setActiveChat] = useState(null)
    function changeChild(newChat)
    {
        console.log(newChat);
        setActiveChat(newChat)
    }
    return (
        <React.Fragment>
            <div class="leftMenu">
               <ChatList onChatChange={changeChild} />
            </div>
            <div class="chat"></div>
        </React.Fragment>
    );
}

export default ChatHub;
