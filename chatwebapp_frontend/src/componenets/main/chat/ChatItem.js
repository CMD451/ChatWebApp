import { useEffect, useState ,ReactDOM} from "react";
import React from 'react';

export function ChatItem(props) {
  
    function handleChatClick(e){
        props.onChangeActive(props.index)
    }
    let className = "menuItem";
    if(props.isActive == true){
        className += " activeMenuItem"
    }
    return (
       <div className={className} key={props.key} onClick={handleChatClick}>
            <span>{props.name}</span>
       </div>
    );
}

export default ChatItem;
