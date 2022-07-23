import { useEffect, useState, ReactDOM } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { useErrorManager } from '../utils/hooks/useErrorManager'
import { createChatRoom } from "../../../lookup/lookup";
import { returnWaitIfLoading } from "../../util/util";
import { UsersSelect } from '../utils/UsersSelect';
import React from 'react';
import { UserContext } from "../Hub"

export function ChatForm(props) {
    const user = React.useContext(UserContext);
    const [errors, addError, clear, setErrors] = useErrorManager()
    const [isLoading, setIsLoading] = useState(false)
    const [data, addData] = useFormData()
    function validateData() {
        return true
    }
    function setResponseErrors(responseBody) {
        let errorList = {}
        Object.keys(responseBody).forEach((key) => {
            errorList[key] = responseBody[key]
        })
        setErrors(errorList)
    }
    function createRoom(request_data) {
        createChatRoom(request_data)
            .then((response => {
                console.log(response)
                const status = response.status
                let body = response.body

                if (status == 201) {
                    props.onCreate(body)
                    return
                }
                setResponseErrors(body)
                setIsLoading(false)

            }))
    }
    function updateRoom(){

    }
    const handleButton = (e) => {
        
        e.preventDefault()
        setIsLoading(true)
        if(!validateData){
            setIsLoading(false)
            return
        }
        data.creator = user.id
        if(props.data){
            updateRoom(data)
            return
        }
        createRoom(data)
    }
    const handleUsersChange = (users) => {
        addData("members", users)
    }
    const button = returnWaitIfLoading(isLoading, (
        <button onClick={handleButton}>Super!</button>
    ))

    return (
        <div>
            <form>
                <label htmlFor="name">Name of ChatRoom:</label>
                <input onChange={(e) => addData("name", e.target.value)} type="text" id="name" name="name" /><br />
                <UsersSelect onUsersChange={handleUsersChange} />
                {button}
            </form>
        </div>
    );
}

export default ChatForm;
