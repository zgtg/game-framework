///<reference path="./BasePlatform.ts" />
namespace xgame.platform {
    export class DebugPlatform extends BasePlatform {

        public constructor() {
            super();
            xgame.WxAdCtrl.isLoad = true;
        }

        async getSystemInfo() {

        }

        async getNetworkType() {

        }

        async share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }> }): Promise<any> {
            return true;
        }

        showGameClubButton(isShow: boolean) { }
    }
}