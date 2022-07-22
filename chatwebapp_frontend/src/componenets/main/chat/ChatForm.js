import { useEffect, useState, ReactDOM } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { createChatRoom } from "../../../lookup/lookup";
import {UsersSelect} from '../utils/UsersSelect';
import React from 'react';
import { UserContext } from "../Hub"

export function ChatForm(props) {
    const user = React.useContext(UserContext);  
    const [data,addData] = useFormData()
    const button = (e)=>{
        e.preventDefault()
        data.creator = user.id
        console.log(data)
        createChatRoom(data)
        .then((response)=>{
            console.log(response)
        })
    }
    const handleUsersChange = (users)=>{
        addData("members",users)
    }
    
    return (
        <div>
            <form>
                <label htmlFor="name">Name of ChatRoom:</label>
                <input onChange={(e)=>addData("name",e.target.value)}type="text" id="name" name="name" /><br />
                <UsersSelect onUsersChange={handleUsersChange}/>
                <button onClick={button}>Super!</button>
            </form>
        </div>
    );
}

export default ChatForm;
