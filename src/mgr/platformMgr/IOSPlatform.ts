///<reference path="./BasePlatform.ts" />
///<reference path="./NativePlatform.ts" />
namespace xgame.platform {

    export class IOSPlatform extends NativePlatform {
        public constructor() {
            super();
        }

        /** 支付接口 */
        async pay(id: string): Promise<xgame.IResultData> {
            console.log(`[IOSPlatform.pay] 发起支付 id:${id}`);
            return new Promise<xgame.IResultData>((resolve: (data: xgame.IResultData) => void, reject: () => void) => {
                let serialID = xgame.MathTools.getHashCode();
                let eventKey = `${xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyPay]}${serialID}`;
                let loadResultFunc = (data: xgame.IRecvNativeInfo) => {
                    console.log(`[IOSPlatform.pay] 收到 native 接口 回调 data:${JSON.stringify(data)}`);
                    xgame.getXGame().platform.off(eventKey, loadResultFunc, this);
                    if (data.state == xgame.CSJADState.paySuccess) {
                        resolve({ code: 0 });
                    }
                    else {
                        resolve({ code: data.state, errMsg: data.errorMsg });
                    }
                };
                xgame.getXGame().platform.on(eventKey, loadResultFunc, this);
                console.log(`[IOSPlatform.pay] 调用native支付接口...`);
                jsb.reflection.callStaticMethod("PayStoreObserver", "appStorePay:product:", serialID.toString(), id);
            });
        }
    }


}