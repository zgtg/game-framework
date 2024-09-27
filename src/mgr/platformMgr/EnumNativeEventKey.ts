namespace xgame {
    /**
    需要与JS, IOS，Android端同步
    */
    export enum EnumJSEventKey {
        /**
         广告事件
         */
        EnumJSEventKeyAd,
        /**
         * 用户登录事件: {"serialID": "guestLogin", "state": 1}
         */
        EnumJSEventKeyLogin,

        /**
         * 推送授权事件: {"serialID": "push", "state": true}
         */
        EnumJSEventKeyPush,
        /**
         * 新加查询商品事件
         */
        EnumJSEventKeyQuery,
        /**
         * 新加支付事件
         */
        EnumJSEventKeyPay,
        /**
         * 订单查询
         */
        EnumJSEventKeyQueryPurchases,
        /**
         * 订单完成
         */
        EnumJSEventKeyConsumePurchases,
        /**
         * 恢复购买
         */
        EnumJSEventKeyRestore,
        /**
         * taptap广告
         */
         EnumJSEventKeyTapTap,

         /**
          * 实名认证
          */
         EnumJSEventKeyRealName,
    }
}