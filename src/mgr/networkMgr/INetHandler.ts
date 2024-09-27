declare namespace xSystem {
    /**
     * 枚举网络事件Key
     */
    export enum EnumNetEventkey {

    }
}

namespace xgame {

    /**
     * 注册网络监听
     */
    export interface IRegisteredNetInfo {
        /**事件枚举Key */
        enumKey: xSystem.EnumNetEventkey,
        /**事件回调函数 */
        call: (evt: xgame.socket.ISocketEvent<xgame.socket.ISocketData, xgame.socket.ISocketData>) => void;
    }

    /**
     * 系统子类接口
     */
    export interface INetHandler {
        /**注册系统事件回调 */
        onGetNetRegisters(): Array<IRegisteredNetInfo>;
    }
}