namespace xgame.socket {
    /**
     * socket基类
     */
    export class H5WebSocket extends ASocket {

        socket: WebSocket;

        public get state(): number {
            if (this.socket)
                return this.socket.readyState;
            return WebSocket.CLOSED;
        }

        public constructor() {
            super();
        }

        public onDestorySocket() {
            if (this.socket) {
                this.socket.onopen = null;
                this.socket.onmessage = null;
                this.socket.onclose = null;
                this.socket.onerror = null;
                delete this.socket;
            }
        }

        close() {
            if (this.socket) {
                this.socket.close(1000, "正常关闭");
            }
            else {
                xgame.openLog && console.log(`[H5WebSocket] close socket不存在，无法关闭`);
            }
            xgame.openLog && console.log(`[H5WebSocket] close`);
        }

        send(data: xgame.socket.ISocketData) {
            if (!this.socket || this.socket.readyState != WebSocket.OPEN) {
                xgame.openLog && console.log(`[H5WebSocket] 无法发送数据状态不对:${this.socket && this.socket.readyState}`);
                return;
            }
            xgame.openLog && console.log(`[H5WebSocket] send : ${JSON.stringify(data)}`);
            data.socketID = this.hashCode;
            this.socket.send(this.encodeData(data));
        }

        public open(host: string): number {
            if (this.socket) {
                xgame.openLog && console.log(`[H5WebSocket] open socket已存在，无法链接 state:${this.socket.readyState}`);
                return null;
            }
            this.socket = new WebSocket(host);
            this.socket.binaryType = 'arraybuffer';
            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onclose = this.onClose.bind(this);
            this.socket.onerror = this.onError.bind(this);
            xgame.openLog && console.log(`[H5WebSocket] open : ${JSON.stringify(host)}`);
            return this.hashCode;
        }
    }
}