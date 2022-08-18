import { useEffect, useState, ReactDOM, useCallback } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { useErrorManager } from '../utils/hooks/useErrorManager'
import { createChatRoom,updateChatRoom } from "../../../lookup/lookup";
import { returnWaitIfLoading } from "../../util/util";
import { UsersSelect } from '../utils/UsersSelect';
import React from 'react';
import { UserContext } from "../Hub"

export function ChatForm(props) {
    const { user, setUser } = React.useContext(UserContext);
    const [errors, addError, clear, setErrors] = useErrorManager()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])

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
                const status = response.status
                let body = response.body
                console.log(response)
                if (status == 201) {
                    body.members = members
                    props.onCreate(body)

                    return
                }
                setResponseErrors(body)
                setIsLoading(false)

            }))
    }
    function updateRoom(chatId,request_data) {
        updateChatRoom(chatId,request_data)
        .then((response => {
            const status = response.status
            let body = response.body
            console.log(body)
            if (status == 200) {
                body.members = members
                props.onUpdate(body)

                return
            }
            setResponseErrors(body)
            setIsLoading(false)

        }))
    }
    useEffect((() => {
        if (props.edit) {
            console.log(props.data)
            setName(props.data.name)
            setMembers(props.data.members)
        }
    }), [props])
    const handleButton = (e) => {

        e.preventDefault()
        setIsLoading(true)
        if (!validateData) {
            setIsLoading(false)
            return
        }
        let _members = members.map((value)=>{
            return value.id
        })
        let data = {
            name: name,
            members: _members,
            creator: user.id
        }
        if (props.data) {
            updateRoom(props.data.id,data)
            return
        }
        createRoom(data)
    }
    const handleUsersChange = (users) => {
        setMembers(users)
    }
    const handleDataChange = (e) => {
        const value = e.target.value
        setName(value)
    }
    const button = returnWaitIfLoading(isLoading, (
        <button onClick={handleButton}>Super!</button>
    ))
    const buildSelectTag = useCallback(() => {
        console.log("again")
        if (props.edit) {
            return (
                <UsersSelect onUsersChange={handleUsersChange} initial={props.data.members} />
               
            )
        }
        return (
            <UsersSelect onUsersChange={handleUsersChange} />
        )
    }, [props])
    const selectTag = buildSelectTag()
    return (
        <div>
            <form>
                <label htmlFor="name">Name of ChatRoom:</label>
                <input value={name} onChange={handleDataChange} type="text" id="name" name="name" /><br />
                {selectTag}
                {button}
            </form>
        </div>
    );
}

export default ChatForm;
