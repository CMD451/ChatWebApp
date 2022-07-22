import { useEffect, useState, ReactDOM } from "react";
import React from 'react';
import { returnLoading } from "../../util/util";
import { ChatItem } from "./ChatItem";


export function ChatList(props) {
    const [active, setActive] = useState(0)

    function onChangeActive(index) {
        props.onChatChange(index);
        setActive(index)
    }
    function handleCreateButton(e){
        props.changeContentOption("create")
    }
    function generateList() {
        let list = props.chats.map((value, index) => {
            let isActive = false;
            if (index == active) {
                isActive = true
            }
            return (
                <ChatItem key={value.id} index={index} name={value.name}
                    isActive={isActive} onChangeActive={onChangeActive} />
            )
        })
        return list;
    }
    //todo załaduj więcej chatów
    //gdy klient przescroluje przez wszystkie

    const list = generateList()
    return (
        <React.Fragment>
            <div className="menuItem">
                <button onClick={handleCreateButton}>Stwórz nowy chat</button>
            </div>
            {list}
        </React.Fragment>
    );
}

export default ChatList;