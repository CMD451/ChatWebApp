import { useEffect, useState, ReactDOM } from "react";
import React from 'react';
import { returnLoading } from "../../util/util";
import { getUserChatRooms } from "../../../lookup/lookup";
import { ChatItem } from "./ChatItem";


export function ChatList(props) {
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setPage] = useState(1);
    const [chats, setChats] = useState([]);
    const [active,setActive] = useState(0)

    function onChangeActive(index){
        const activeChat = chats[index];
        setActive(index);
        props.onChatChange(activeChat);

    }
    function generateList() {
        if (isLoading) {
            return returnLoading()
        }
        let list = chats.map((value, index) => {
            let isActive = false;
            if(index == active){
                isActive= true
            }
            return (
                <ChatItem key={value.id} index={index} name={value.name} isActive={isActive} onChangeActive={onChangeActive}/>
            )
        })
        return list;
    }
    function loadChats() {
        if(currentPage != null){
            getUserChatRooms(currentPage)
            .then((response) => {
                console.log("Zapytanie")
                const status = response.status;
                if (status == 200) {
                    setPage(response.next)
                    setChats(response.body.results)
                }
                setLoading(false)
            })
        }
    }
    useEffect(() => {
        loadChats()
    })
    //todo załaduj więcej chatów
    //gdy klient przescroluje przez wszystkie

    const list = generateList()
    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    );
}

export default ChatList;