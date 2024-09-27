namespace xgame.mgr {
    /**
     * 数据管理器
     */
    export class NetworkMgr extends cc.EventTarget implements IMgr, socket.ISocket {

        /**框架是否初始化完成 */
        public isFinish: boolean;

        /**等待发送的数据 */
        private _waitSendEvents: { [optHashCode: number]: xgame.socket.ISocketEventData } = {};

        //当前在连接中的socket对象
        private socket: socket.ASocket = null;
        public get gameSocket(): socket.ASocket {
            return this.socket;
        }

        public async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[NetworkMgrs - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            this.reset();
            return this.isFinish = true;
        }

        start() {

        }

        // ================ 网络状态处理 ==================

        public onOpen(msg?: any) {
            xgame.openLog && console.log(`[NetworkMgr] onOpen ${JSON.stringify(msg)}`);
            xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkOpen);
        }

        public onMessage(data: xgame.socket.ISocketData) {
            let tmpSocketEventData: xgame.socket.ISocketEventData = null;
            if (this._waitSendEvents.hasOwnProperty(data.optHashCode)) {
                let tmpWaitData = this._waitSendEvents[data.optHashCode];
                tmpSocketEventData = tmpWaitData;
                delete this._waitSendEvents[data.optHashCode];
            }
            else {
                tmpSocketEventData = {};
            }
            tmpSocketEventData.result = data.result;
            tmpSocketEventData.msg = data.errorcode;
            tmpSocketEventData.recvData = data;
            xgame.openLog && console.log(`[NetworkMgr] onMessage ${JSON.stringify(data)}`);
            this.emit(xSystem.EnumNetEventkey[data.protoID], tmpSocketEventData);
        }

        public onClose(msg?: any) {
            xgame.openLog && console.log(`[NetworkMgr] onClose`);
            xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkClose);
            this.onDestorySocket();
        }

        public onError(msg?: any) {
            xgame.openLog && console.log(`[NetworkMgr] onError ${JSON.stringify(msg)}`);
            xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkError);
            this.onDestorySocket();
        }

        public onDestorySocket() {
            if (this.socket) {
                this.socket.close();
                this.disposeSocketObject(this.socket);
                xgame.openLog && console.warn(`[NetoworkMgr] : onDestorySocket 成功销毁socket ${this.socket.hashCode}`);
                delete this.socket;
            } else {
                xgame.openLog && console.warn(`[NetoworkMgr] : onDestorySocket socket对象不存在,无法销毁`);
            }

        }

        public close() {
            if (this.socket) {
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.networkClose);
                this.onDestorySocket();
            }
            else {
                xgame.openLog && console.warn(`[NetoworkMgr.close] socket对象不存在,无法销毁`);
            }

        }

        /**
         * 发送数据到服务器
         * @param data 发送的数据结构
         */
        public send(data: xgame.socket.ISocketData, isWaitCallBack: boolean = true) {
            if (!data) {
                xgame.openLog && console.error(`[NetworkMgr.send] 发送网络数据的时候，数据体不能为空`);
                return;
            }
            let sendEventData: xgame.socket.ISocketEventData = {};
            sendEventData.sendData = data;
            if (isWaitCallBack) {
                this._waitSendEvents[data.optHashCode] = sendEventData;
            }
            if (this.socket) {
                this.socket.send(sendEventData.sendData);
            }
            else {
                xgame.openLog && console.log(`[NetworkMgr] 发送数据失败，socket不存在`);
            }
        }

        /**
         * 链接一个网络
         * @param host 链接地址
         */
        public open(host: string): number {
            if (this.socket) {
                console.warn(`[NetoworkMgr] : 链接失败 socket 已连接`);
                return;
            }
            this.socket = this.createSocketObject();
            this.socket.open(host);
            return this.socket.hashCode;
        }

        public reset() {
            this.close();
        }

        onUpdate(dt: XGameUpdateData): void {

        }

        public dispose() {
            this.reset();
        }



        // ============= 私有函数 ================
        /**
         * 构建一个socket对象
         * @param socket.AGameNet socket对象
         */
        private createSocketObject(): socket.ASocket {
            let newSocket: socket.ASocket = null;
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                newSocket = new socket.WxWebSocket();
            }
            else {
                newSocket = new socket.H5WebSocket();
            }
            //添加监听事件
            newSocket.on(xgame.socket.xgame_net_open, this.onOpen, this);
            newSocket.on(xgame.socket.xgame_net_close, this.onClose, this);
            newSocket.on(xgame.socket.xgame_net_recvdata, this.onMessage, this);
            newSocket.on(xgame.socket.xgame_net_error, this.onError, this);

            return newSocket;
        }

        /**
         * 销毁一个socket对象
         * @param socket.AGameNet socket对象
         */
        private disposeSocketObject(socket: socket.ASocket) {
            //添加监听事件
            socket.off(xgame.socket.xgame_net_open, this.onOpen, this);
            socket.off(xgame.socket.xgame_net_close, this.onClose, this);
            socket.off(xgame.socket.xgame_net_recvdata, this.onMessage, this);
            socket.off(xgame.socket.xgame_net_error, this.onError, this);
        }

        /**显示等待消息队列 */
        public showWaitingListInfo() {
            let waitProtoIDs = [];
            for (const waitHashCode in this._waitSendEvents) {
                waitProtoIDs.push(xSystem.EnumNetEventkey[this._waitSendEvents[waitHashCode].sendData.protoID]);
            }
            xgame.openLog && console.log(`[NetworkMgr.showWaitingListInfo] ${waitProtoIDs}`);
        }
    }
}