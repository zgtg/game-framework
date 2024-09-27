namespace xgame.socket {

    /**
     * socket基类
     */
    export class WxWebSocket extends ASocket {

        /**微信的socket对象 */
        socket: SocketTask;

        //WebSocket.CONNECTING	0
        // WebSocket.OPEN	1
        // WebSocket.CLOSING	2
        // WebSocket.CLOSED	3
        private _state: number = WebSocket.CLOSED;
        public get state(): number {
            return this._state;
        }

        public constructor() {
            super();
        }

        onOpen(msg?: any) {
            super.onOpen(msg);
            this._state = WebSocket.OPEN;
        }

        onClose(msg?: any) {
            super.onClose(msg);
            this._state = WebSocket.CLOSED;
        }

        onError(msg?: string) {
            super.onError(msg);
            this._state = WebSocket.CLOSED;
        }

        public onDestorySocket() {
            if (this.socket) {
                this.socket.onError(null);
                this.socket.onMessage(null);
                this.socket.onClose(null);
                this.socket.onError(null);
                delete this.socket;
                xgame.openLog && console.log(`[WxWebSocket] : 销毁WxWebSocket`);
            }
        }

        close() {
            xgame.openLog && console.log(`[WxWebSocket] close`);
            this._state = WebSocket.CLOSING;
            if (this.socket) {
                this.socket.close({ code: 1000, reason: "正常关闭" });
            }
            else {
                xgame.openLog && console.error(`[WxWebSocket] 关闭失败 socket 链接不存在`);
            }
        }

        send(data: xgame.socket.ISocketData) {
            if (!this.socket || this._state != WebSocket.OPEN) {
                xgame.openLog && console.log(`[WxWebSocket] 无法发送数据状态不对:${this._state}`);
                return;
            }
            xgame.openLog && console.log(`[WxWebSocket] send : ${JSON.stringify(data)}`);
            data.socketID = this.hashCode;
            this.socket.send({
                data: this.encodeData(data)
            });
        }

        public open(host: string): number {
            if (this.socket) {
                xgame.openLog && console.warn(`[WxWebSocket] 当前 socket 存在，无法继续创建`);
                return null;
            }
            this._state = WebSocket.CONNECTING;
            this.socket = wx.connectSocket({
                url: host,
                header: {},
                method: "post",
                protocols: [],
            });
            if (this.socket) {
                this.socket.onOpen(this.onOpen.bind(this));
                this.socket.onMessage(this.onMessage.bind(this));
                this.socket.onClose(this.onClose.bind(this));
                this.socket.onError(this.onError.bind(this));
                xgame.openLog && console.log(`[WxWebSocket] open : ${JSON.stringify(host)}`);
            }
            else {
                xgame.openLog && console.error(`[WxWebSocket] open : 链接错误`);
            }

            return this.hashCode;
        }
    }
}