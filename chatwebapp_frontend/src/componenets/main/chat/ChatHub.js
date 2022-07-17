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
    const options = { "edit": <ChatForm data={activeChat} edit={true}/>,"create":<ChatForm/>,"chat":<ChatContent/>}
   
    function handleChatClick(index)
    {
        setActive(index)
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
    function generateMainContent(){
        if(isLoading){
            return returnLoading()
        }
        return options[selectedOption]
    }
    const chatList = returnWaitIfLoading(isLoading,(
        <ChatList onChatChange={handleChatClick} chats={chats} />
    ))
    const mainContent = generateMainContent()
    
    return (
        <React.Fragment>
            <div class="leftMenu">
               {chatList}
            </div>
            <div class="chat">
                {/* {mainContent} */}
                <UsersSelect/>
            </div>
        </React.Fragment>
    );
}

export default ChatHub;
