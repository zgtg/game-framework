///<reference path="./BasePlatform.ts" />
namespace xgame.platform {

    export class NativePlatform extends BasePlatform {

        public constructor() {
            super();
            xgame.WxAdCtrl.isLoad = true;
        }

        /**
         * 当前显示的 banner 唯一ID
         */
        bannerSerialID: string = null;

        /**
         * 视频缓存
         */
        cacheAdHandleDict: { [key: string]: Array<xgame.RewardedVideoHandle> } = {};

        isCacheing: boolean = false;

        async addADKey(key: string, classPath: string, delayTime: number = 0): Promise<ADHandleLoadResult> {
            if (this.cacheAdHandleDict[key] && this.cacheAdHandleDict[key].length > 0)
                return { result: true };
            if (classPath == null)
                return { result: false };
            if (this.isCacheing)
                return { result: false };
            this.isCacheing = true;
            let result: ADHandleLoadResult = { result: false };
            for (let index = 0; index < 5; index++) {
                console.error(`[IOSPlatform.addADKey] 缓存广告信息 缓存次数:${index}`);
                result = await this.cacheAd(key, classPath, delayTime);
                if (result.result) {
                    break;
                }
            }
            this.isCacheing = false;
            console.error(`[IOSPlatform.addADKey] 结果:${JSON.stringify(result)}`);
            return result;
        }

        async share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }> }): Promise<any> {
            return false;
        }

        async cacheAd(key: string, classPath: string, delayTime: number = 0): Promise<ADHandleLoadResult> {
            console.error(`[IOSPlatform.cacheAd] 缓存广告信息 key:${key} info:${this.cacheAdHandleDict[key] ? this.cacheAdHandleDict[key].length : 0}`);
            if (classPath == null) {
                console.error(`[IOSPlatform.cacheAd] 缓存广告失败 classPath:${classPath} 不存在`);
                return { result: false, eventKey: xgame.AdEventKey.noInit };
            }
            if (delayTime) {
                await xgame.wait(delayTime * 1000);
            }
            this.cacheAdHandleDict[key] = this.cacheAdHandleDict[key] || [];
            if (this.cacheAdHandleDict[key].length > 0)
                return { result: true };
            let adHandle = new xgame.RewardedVideoHandle(key, classPath);
            this.adLoadCall && this.adLoadCall(key);
            let loadResult: ADHandleLoadResult = await adHandle.load();
            this.adLoadCallResult && this.adLoadCallResult(key, loadResult.result, loadResult.code, loadResult.msg);
            if (loadResult.result) {
                if (this.cacheAdHandleDict[key] == null)
                    this.cacheAdHandleDict[key] = [];
                this.cacheAdHandleDict[key].push(adHandle);
            }
            console.error(`[IOSPlatform.cacheAd] 缓存结果:${JSON.stringify(loadResult)}`);
            return loadResult;
        }

        async showAd(key: string, classPath: string, ritSceneDescribe: string = ""): Promise<ADHandleLoadResult> {
            xgame.openLog && console.log(`[IOSPlatform.showAD] 构建广告处理对象... ${key}`);
            let result: ADHandleLoadResult = { result: false, eventKey: xgame.AdEventKey.noInit };
            //等待缓存
            if (this.isCacheing) {
                for (let index = 0; index < 100; index++) {
                    console.error(`[IOSPlatform.showAd] 开始播放，发现在缓存中... ${index}`);
                    await xgame.wait(50);
                    if (!this.isCacheing)
                        break;
                }
            }
            else {
                result = await this.addADKey(key, classPath);
                console.error(`[IOSPlatform.showAd] addADKey 结果:${JSON.stringify(result)}`);
            }

            //缓存视频
            console.error(`[IOSPlatform.showAd] 开始播放，缓存数据量`);
            let loadResult = this.cacheAdHandleDict[key].length > 0;
            console.error(`[IOSPlatform.showAd] 开始播放，缓存数据量 ${this.cacheAdHandleDict[key].length}`);

            //缓存下个
            if (loadResult) {
                let adHandle = this.cacheAdHandleDict[key].pop();
                xgame.openLog && (`[IOSPlatform.showAD] 开始播放...`);
                result = await adHandle.play(ritSceneDescribe);
                this.addADKey(key, classPath, 1);
                xgame.openLog && console.log(`[IOSPlatform.showAD] 播放完成... ${JSON.stringify(result)}`);
            }
            return result;
        }
    }
}