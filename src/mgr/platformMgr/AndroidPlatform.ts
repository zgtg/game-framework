///<reference path="./BasePlatform.ts" />
///<reference path="./NativePlatform.ts" />
namespace xgame.platform {

    export class AndroidPlatform extends NativePlatform {

        public constructor() {
            super();
        }

        /** 支付接口 */
        async pay(id: string): Promise<xgame.IResultData> {
            console.log(`[AndroidPlatform.pay] 发起支付 id:${id}`);
            return new Promise<xgame.IResultData>((resolve: (data: xgame.IResultData) => void, reject: () => void) => {
                let serialID = xgame.MathTools.getHashCode();
                let eventKey = `${xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyPay]}${serialID}`;
                let loadResultFunc = (data: xgame.IRecvNativeInfo) => {
                    console.log(`[AndroidPlatform.pay] 收到 native 接口 回调 data:${JSON.stringify(data)}`);
                    xgame.getXGame().platform.off(eventKey, loadResultFunc, this);
                    resolve({ code: parseInt(data.errorCode), errMsg: data.errorMsg });
                };
                xgame.getXGame().platform.on(eventKey, loadResultFunc, this);
                console.log(`[AndroidPlatform.pay] 调用native支付接口...`);
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/GooglePlaySDK", "startGooglePlayPay", "(Ljava/lang/String;Ljava/lang/String;)V", serialID.toString(), id);
            });
        }
    }
}