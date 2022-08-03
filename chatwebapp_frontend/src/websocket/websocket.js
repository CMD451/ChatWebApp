import ReconnectingWebSocket from 'reconnecting-websocket';
import { renewTokenIfexpired } from "../lookup/backend_lookup"

class WebSocketService {
    static instance = null
    socket_ref = null
    callbacks = {}

    static getInstance() {
        if (this.instance === null) {
            this.instance = new WebSocketService();
        }
        return this.instance
    }
    async connect(chatId) {
        await renewTokenIfexpired()
        console.log("connect in progress")
        console.log(`socket_ref = ${this.socket_ref}`)
        if (this.socket_ref !== null) {
            this.disconnect()
        }
        let token = window.localStorage.getItem("token")
        let url = `ws://127.0.0.1:8000/ws/chatroom/${chatId}/?token=${token}`
        console.log(url)
        this.socket_ref = new ReconnectingWebSocket(url)
        console.log(this.socket_ref)

        this.socket_ref.onopen = () => {
            this.handleOnOpen();
        };
        this.socket_ref.onmessage = e => {
            this.handleOnMessage(JSON.parse(e.data));
        };
        this.socket_ref.onerror = e => {
            console.log(e.message);
        };
        this.socket_ref.onclose = () => {
            // console.log("WebSocket closed let's reopen");
            // this.connect(chatId);
        };
    }
    disconnect() {
        this.socket_ref.close();
        this.socket_ref = null;
    }
    handleOnMessage(text_data) {
        if (this.callbacks.hasOwnProperty('onMessage')) {
            this.callbacks['onMessage'](text_data)
        }
    }
    handleOnOpen() {
        if (this.callbacks.hasOwnProperty('onOpen')) {
            this.callbacks['onOpen']()
        }
    }
    newMessage(content, roomId) {
        let message = {
            'content': content,
            'room': roomId
        }
        let data = {
            'message': message
        }
        this.sendMessage(data)
    }
    sendMessage(data) {
        let json_data = JSON.stringify({ ...data })
        try {
            this.socket_ref.send(json_data)
        }
        catch (error) {
            console.log(error)
        }

    }
    setOnOpenCallback(callback) {
        this.callbacks['onOpen'] = callback
    }
    setOnMessageCallback(callback) {
        this.callbacks['onMessage'] = callback
    }
}
const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;