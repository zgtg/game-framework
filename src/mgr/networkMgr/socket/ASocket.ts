namespace xgame.socket {

    /**socket通用事件类型 */
    export let xgame_net_error: string = 'xgame_net_error';
    export let xgame_net_close: string = 'xgame_net_close';
    export let xgame_net_open: string = 'xgame_net_open';
    export let xgame_net_recvdata: string = 'xgame_net_recvdata';

    /**
     * socket基类
     */
    export abstract class ASocket extends cc.EventTarget implements ISocket, IHashObject {

        /**socket对象 */
        socket: any;

        /**socket状态 */
        get state(): number {
            return WebSocket.CLOSED;
        };

        /**唯一 */
        protected _hashCode: number;
        public get hashCode(): number {
            return this._hashCode;
        }

        public constructor() {
            super();
            this._hashCode = xgame.MathTools.getHashCode();
        }

        // ========== 回调函数 ================

        onOpen(msg?: any) {
            let evtData: ISocketEventData = { socketID: this.hashCode, msg: msg }
            xgame.openLog && console.log(`[AGameNet] onOpen socket 链接成功:${JSON.stringify(msg)}`);
            this.emit(xgame_net_open, evtData);
        }

        onMessage(data: any) {
            let tmpData: xgame.socket.ISocketData = this.decodeData(data.data);
            tmpData.socketID = this.hashCode;
            xgame.openLog && console.log(`[AGameNet] onMessage data:${JSON.stringify(tmpData)}`);
            this.emit(xgame_net_recvdata, tmpData);
        }

        onClose(msg?: any) {
            let evtData: ISocketEventData = { socketID: this.hashCode, msg: msg }
            xgame.openLog && console.log(`[AGameNet] onClose socket 断开链接:${JSON.stringify(msg)}`);
            this.emit(xgame_net_close, evtData);
            this.onDestorySocket();
        }

        onError(msg?: string) {
            let evtData: ISocketEventData = { socketID: this.hashCode, msg: msg }
            xgame.openLog && console.log(`[AGameNet] onError socket 异常链接:${JSON.stringify(msg)}`);
            this.emit(xgame_net_error, evtData);
            this.onDestorySocket();
        }

        /**
         * 获取Base64后的数据
         * @param data 要编码的数据
         */
        protected decodeData(data: ArrayBuffer): xgame.socket.ISocketData {
            let byte: xgame.ByteArray = new xgame.ByteArray(data);
            let base64Str: string = byte.readUTFBytes(byte.length);
            let tmpBytes: xgame.ByteArray = new xgame.ByteArray(xgame.Base64Util.decode(base64Str))
            return JSON.parse(tmpBytes.readUTFBytes(tmpBytes.length));
        }

        /**
         * 获取Base64后的数据
         * @param data 要编码的数据
         */
        protected encodeData(data: xgame.socket.ISocketData): ArrayBuffer {
            let tmpMainByteArr: xgame.ByteArray = new xgame.ByteArray();
            tmpMainByteArr.writeUTFBytes(JSON.stringify(data));
            let base64Str = xgame.Base64Util.encode(tmpMainByteArr.buffer);
            tmpMainByteArr.clear();
            tmpMainByteArr.writeUTFBytes(base64Str);
            tmpMainByteArr.position = 0;
            return tmpMainByteArr.buffer;
        }

        // ========== 主动调用函数 ================

        /**
         * 销毁socket
         */
        abstract onDestorySocket();

        /**
         * 关闭网络
         * @param args 自定义参数
         */
        abstract close();

        /**
         * 发送数据
         * @param data 自定义参数
         */
        abstract send(data: xgame.socket.ISocketData);

        /**
         * 连接网络
         * @param host 目标地址
         */
        abstract open(host: string): number;
    }
}