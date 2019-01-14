///<reference path='../../../utils/Assert.ts' />
///<reference path='IConnectionHandler.ts' />

module ninlgde.net {
    "use strict";

    enum ConnectionState {
        CLOSED,
        CONNECTING,
        CONNECTED
    }

    export class Connection {

        private socket: WebSocket = null

        private connectionState: ConnectionState = ConnectionState.CLOSED

        private timeoutId = 0

        private url: string = ""

        private handler: IConnectionHandler

        constructor(handler: IConnectionHandler) {
            this.handler = handler
        }

        private createSocket(): WebSocket {
            let socket = new WebSocket(this.url)
            socket.binaryType = 'arraybuffer'
            socket.onopen = (event) => {
                if (this.onConnectionCreated) {
                    this.onConnectionCreated(event)
                }
            }
            socket.onmessage = (event) => {
                if (this.onMessage) {
                    this.onMessage(event)
                }
            }
            socket.onerror = (event) => {
                if (this.onConnectionError) {
                    this.onConnectionError(event)
                }
            }
            socket.onclose = (event) => {
                if (this.onConnectionClosed) {
                    this.onConnectionClosed(event)
                }
            }

            return socket
        }

        public connection(url: string): boolean {
            Assert.isFalse(this.socket == null, "websocket should be null")
            Assert.isFalse(this.connectionState == ConnectionState.CLOSED, "connection state should be closed")
            Assert.isTrue(url === "", "url error")

            this.url = url

            this.socket = this.createSocket()
            this.timeoutId = this.setTimeOut()
            
            return true
        }

        public send(message: any): boolean {
            if (Assert.isTrue(this.socket == null, "websocket is null")) {
                return false
            }
            if (Assert.isTrue(this.connectionState != ConnectionState.CONNECTED, "websocket connecting")) {
                return false
            }
            this.socket.send(message)
            return true
        }

        public close() {
            if (this.socket !== null) {
                this.socket.close()
                this.socket = null
            }
            this.clearTimeOut()
            this.connectionState = ConnectionState.CLOSED
        }

        public reconnect() {
            this.close()
            this.socket = this.createSocket()
            this.timeoutId = this.setTimeOut()
        }

        private clearTimeOut() {
            this.timeoutId && clearTimeout(this.timeoutId)
            this.timeoutId = 0
        }

        private setTimeOut(time:number = 3) {
            // 清理timeout
            this.clearTimeOut()
            let timeout = setTimeout(()=>{
                if (this.socket.readyState !== WebSocket.OPEN) {
                    this.close()
                    this.onConnectionClosed(null)
                }
            }, time)

            return timeout
        }

        private onConnectionCreated(event) {
            Assert.isFalse(this.connectionState == ConnectionState.CONNECTING, "connection state not CONNECTING")
            this.connectionState = ConnectionState.CONNECTED
            this.clearTimeOut()
            if (this.handler) {
                this.handler.onConnectionCreated(event)
            }
            // broadcast connection created
            EventCenter.getInstance().fireEvent(Events.CONNECTION_CREATED)
        }

        private onConnectionClosed(event) {
            if (this.connectionState == ConnectionState.CLOSED) {
                return;
            }
            this.close()
            if (this.handler) {
                this.handler.onConnectionClosed(event)
            }
            // broadcast connection closed
            EventCenter.getInstance().fireEvent(Events.CONNECTION_CLOSED)
        }

        private onConnectionError(err) {
            Assert.isFalse(this.connectionState == ConnectionState.CONNECTED, "connection state not CONNECTED")
            if (this.connectionState == ConnectionState.CLOSED) {
                return;
            }
            this.close()
            if (this.handler) {
                this.handler.onConnectionError(event)
            }
            // broadcast connection error
            EventCenter.getInstance().fireEvent(Events.CONNECTION_ERROR)
        }

        private onMessage(data: any) {
            // TODO: decode data, and broadcast by id
            // var dataView = new DataView(data);
		    // var length = dataView.getInt32(0, false);
            // var id = dataView.getInt32(4, false);
            // var command = dataView.getInt16(8, false);
            // // console.info(length, id, command);
            // var buffer =  new Uint8Array(length - 6) 
            // for(var i = 0; i < length - 6; i++) {
            //     buffer[i] = dataView.getInt8(i + 8);
            // }
        }
    }
}