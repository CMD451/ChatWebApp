import { useEffect, useState ,ReactDOM} from "react";
import React from 'react';
import {ChatList} from "./ChatList"
import {ChatContent} from "./ChatContent";
import {ChatForm} from "./ChatForm";
import { returnWaitIfLoading,returnLoading } from "../../util/util";
import { getUserChatRooms } from "../../../lookup/lookup";
import {UsersSelect} from "../utils/UsersSelect";


export function ChatHub() {
    // const [active, setActive] = useState("chat")
    
    // let activeOption = options[active]
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setPage] = useState(1);
    const [chats, setChats] = useState([]);
    const [active,setActive] = useState(0)
    const activeChat = chats[active]
    const [selectedOption,selectOption] = useState("chat");
    const options = {
        "edit": <ChatForm onUpdate={handleChatRoomUpdate} data={activeChat} edit={true} />,
        "create":<ChatForm onCreate={handleChatRoomCreate} />,
        "chat":<ChatContent changeContentOption={changeContentOption} data={activeChat}/>
    }
   
    function handleChatRoomCreate(new_chat){
        let newChats = chats
        newChats.unshift(new_chat)
        setChats(newChats)
        setActive(0)
        selectOption("chat")
    }
    function handleChatRoomUpdate(updated_chat){
        let new_chats = chats
        new_chats[active] = updated_chat
        setChats(new_chats)
        selectOption("chat")

    }
    function handleChatClick(index)
    {
        setActive(index)
        selectOption("chat")
        
    }
    function changeContentOption(key){
        selectOption(key)
    }
    function loadChats() {
        if(currentPage != null){
            getUserChatRooms(currentPage)
            .then((response) => {
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
    },[])
    function generateMainContent(){
        if(isLoading){
            return returnLoading()
        }
        //do zmiany
        if((selectedOption == "chat")&&(chats.length == 0)){
            return (<p>Hey, create a chat!</p>)
        }
        return options[selectedOption]
    }
    const chatList = returnWaitIfLoading(isLoading,(
        <ChatList onChatChange={handleChatClick} changeContentOption={changeContentOption} chats={chats} />
    ))
    const mainContent = generateMainContent()
    
    return (
        <React.Fragment>
            <div className="leftMenu">
               {chatList}
            </div>
            <div className="chat">
                {mainContent}
            </div>
        </React.Fragment>
    );
}

export default ChatHub;
