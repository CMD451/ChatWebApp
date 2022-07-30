import ReconnectingWebSocket from 'reconnecting-websocket';

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
    connect(chatId) {
        let url = `ws://127.0.0.1:8000/ws/chatroom/${chatId}/`
        this.socket_ref = new ReconnectingWebSocket(url)

        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };
        this.socketRef.onmessage = e => {
            this.handleOnMessage(e.data);
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect();
        };


    }
    disconnect() {
        this.socketRef.close();
      }
    handleOnMessage(text_data){
        console.log(text_data)
    }
}
const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;