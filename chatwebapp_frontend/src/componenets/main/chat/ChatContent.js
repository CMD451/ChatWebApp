import { useEffect, useState, ReactDOM, useCallback } from "react";
import React from 'react';
import WebSocketInstance from "../../../websocket/websocket"
import { getChatRoomMessages } from "../../../lookup/lookup"

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
    }

    const loadMessagesFromApi = useCallback((chat_id, _page) => {
        if (_page === null) {
            return
        }
        getChatRoomMessages(chat_id, _page)
            .then((response => {
                const status = response.status
                if (status === 200) {
                    setMessages(messages => [...messages, ...response.body.results])
                }
                setPage(response.body.next)
            }))
    }, [])

    useEffect(() => {
        setCallbacks()
    })

    useEffect(() => {
        WebSocketInstance.connect(props.data.id)
        setMessages([])
        setChatId(props.data.id)
        setPage(1)
        loadMessagesFromApi(props.data.id, 1)
    }, [props.data.id, loadMessagesFromApi])

    const handleSendMessage = (e) => {
        let content = input
        WebSocketInstance.newMessage(content, chatId)
        setInput("")
    }
    const handleMessageInput = (e) => {
        setInput(e.target.value)
    }

    const messages_content = messages.map((e) => {
        console.log(e)
        return (<p>{e.content} ~~ {e.author.username}</p>)
    })
    return (
        <div>
            {messages_content}
            <input type="text" value={input} onChange={handleMessageInput} />
            <button onClick={handleSendMessage} >Send Message</button>

        </div>
    );
}

export default ChatContent;
