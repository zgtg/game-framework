namespace xgame {


    export enum CSJADState {
        /** 加载成功 */
        loadSucess,
        /** 加载失败 */
        loadFail,
        /** 广告播放完成 */
        playOver,
        /** 播放失败 */
        playFail,
        /** 错误 */
        adError,
        /**
        * 关闭广告
        */
        adClose,
        /**
         * 启动广告
         */
        adStart,
        /**
         * 广告结束
         */
        adEnd,
        /**
         * 查询成功
         */
        querySuccess,
        /**
         * 查询失败
         */
        queryFail,
        /**
         * 支付成功
         */
        paySuccess,
        /**
         * 支付失败
         */
        payFail,
        /**
         * 支付请求失败(没有网络或者网络异常)
         */
        payRequestFail,

        /**
         * 消耗成功
         */
        consumeSuccess,
        /**
         * 消耗失败
         */
        consumeFail,

        /**
         * 查询全部订单信息成功
         */
        queryPurchaseHistorySuccess,
        /**
         * 查询全部订单信息失败
         */
        queryPurchaseHistoryFail,

        /**
         * 查询交易中订单成功
         */
        queryPurchaseSuccess,
        /**
         * 查询交易中订单失败
         */
        queryPurchaseFail,
        /**
         * 恢复购买完成 - 19
         */
        restoreBuyFinish,

        
    }

    /**
     * 本地通信接受到的消息
     */
    export interface IRecvNativeInfo extends xgame.IBaseData {
        //返回状态
        state: CSJADState,
        /** 错误信息 */
        errorCode?: string,
        /** 错误信息 */
        errorMsg?: string,
        /** 被播放id */
        ritID?:string,
    }

}