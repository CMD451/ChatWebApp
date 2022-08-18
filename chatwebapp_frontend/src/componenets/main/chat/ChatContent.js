import { useEffect, useState, ReactDOM, useCallback } from "react";
import React from 'react';
import WebSocketInstance from "../../../websocket/websocket"
import { getChatRoomMessages } from "../../../lookup/lookup"
import { returnWaitIfLoading } from "../../util/util"

export function ChatContent(props) {
    const [chatId, setChatId] = useState("")
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [apiLoading, setApiLoading] = useState(true)
    const [webSocketLoading, setWebSocketLoading] = useState(true)

    function setCallbacks() {
        WebSocketInstance.setOnMessageCallback((data) => {
            setMessages(messages => [...messages, data['message']])
        })
        WebSocketInstance.setOnOpenCallback(() => {
            setWebSocketLoading(false)
        })
    }
    function loadMessagesFromApi(chat_id, _page) {
        if (_page === null) {
            return
        }
        setApiLoading(true)
        getChatRoomMessages(chat_id, _page)
            .then((response => {
                const status = response.status
                if (status === 200) {
                    setMessages(messages => [...messages, ...response.body.results])
                    setPage(response.body.next)
                }
                setApiLoading(false)
            }))

    }
    const loadInitalMessages = useCallback((chat_id, _page) => {
        loadMessagesFromApi(chat_id, _page)
    }, [])
    const loadNextMessagePage = () => {
        loadMessagesFromApi(chatId, page)
    }

    useEffect(() => {
        setCallbacks()
    })

    useEffect(() => {
        WebSocketInstance.connect(props.data.id)
        setMessages([])
        setChatId(props.data.id)
        setPage(1)
        loadInitalMessages(props.data.id, 1)
    }, [props.data.id, loadInitalMessages])

    function switchToEditMode(){
        props.changeContentOption("edit")
    }
    const handleSendMessage = (e) => {
        e.preventDefault()
        let content = input
        WebSocketInstance.newMessage(content, chatId)
        setInput("")
    }
    const handleMessageInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const messages_content = messages.map((e) => {
        return (<p>{e.content} ~~ {e.author.username}</p>)
    })
    const apiLoadingTag = returnWaitIfLoading(apiLoading, null)
    const button = returnWaitIfLoading(webSocketLoading,
        (<button onClick={handleSendMessage} >Send Message</button>))
    return (
        <div>
            {apiLoadingTag}
            {messages_content}
            <form>
                <input type="text" value={input} onChange={handleMessageInput} />
                {button}
            </form>
            <button onClick={switchToEditMode}>Edit chat</button>
        </div>
    );
}

export default ChatContent;
