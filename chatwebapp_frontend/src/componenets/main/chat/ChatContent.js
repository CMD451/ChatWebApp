import { useEffect, useState ,ReactDOM} from "react";
import React from 'react';
import WebSocketInstance from "../../../websocket/websocket"

export function ChatContent(props) {
    const [chatId,setChatId] = useState("")
    const [message,setMessage] = useState("")
    useEffect(() => {
        WebSocketInstance.connect(props.data.id)
        setChatId(props.data.id)
    },[props.data.id])
    const handleEvent = (e)=>{
        let content = message
        console.log(chatId)
        WebSocketInstance.newMessage(content,chatId)
    }
    return (
       <div>
            Chat content
            <input type="text" onChange={(e)=>{setMessage(e.target.value)}} />
            <button onClick={handleEvent} >Send Message</button>
       </div>
    );
}

export default ChatContent;
