namespace xgame.socket {

    /**简写socket数据包类型 */
    export type ISocketEventData = ISocketEvent<ISocketData, ISocketData>;
    /**
     * 网络数据基类
     */
    export interface ISocketData {
        /**唯一码 */
        optHashCode?: number,
        /**socket ID */
        socketID?: number,
        /**协议号 */
        protoID?: number,
        /**状态结果 */
        result?: EnumResultType;
        /**错误识别码 */
        errorcode?:any,
    }

    /**
     * socket 产生事件的时候携带的数据体
     */
    export interface ISocketEvent<R extends ISocketData, S extends ISocketData> {
        /**socket 唯一ID */
        socketID?: number,
        /**发送附带数据 */
        recvData?: R,
        /**附带数据 */
        sendData?: S,
        /**异常信息 */
        msg?: string,
        /**状态结果 */
        result?: EnumResultType;
    }
    /**
     * socket基类
     */
    export interface ISocket {

        // ========== 回调函数 ================

        onOpen(msg?: any);

        onMessage(data: any);

        onClose(msg?: any);

        onError(msg?: string);

        // ========== 主动调用函数 ================

        /**
         * 销毁socket
         */
        onDestorySocket();

        /**
         * 关闭网络
         * @param args 自定义参数
         */
        close();

        /**
         * 发送数据
         * @param data 自定义参数
         */
        send(data: any);

        /**
         * 连接网络
         * @param host 目标地址
         */
        open(host: string): number;
    }
}