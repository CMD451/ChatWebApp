import { useEffect, useState ,ReactDOM} from "react";
import React from 'react';
import WebSocketInstance from "../../../websocket/websocket"

export function ChatContent(props) {
  
    useEffect(() => {
        WebSocketInstance.connect(props.data.id)
    },[props.data.id])
    return (
       <div>
            Chat content
       </div>
    );
}

export default ChatContent;
