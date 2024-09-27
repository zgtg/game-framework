namespace xgame.socket {

    //服务器回调枚举
    export enum EnumResultType {
        //默认成功
        OK = 0,
        //,★1~500为严重错误 (保留使用)
        //501~999为通用错误
        Error = 501,
    }
}