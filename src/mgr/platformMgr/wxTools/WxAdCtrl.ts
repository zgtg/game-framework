namespace xgame {

    export enum AdEventKey {
        open,//0.主动触发打开视频窗口
        close,//1.看到视频窗口后主动关闭 ----
        begin,//2.点击播放视频
        midwayClose,//3.视频中途关闭视频
        playOver,//4.观看结束
        getAward,//5.获得奖励(native端未启用)
        noAd,//6.没有可观看的广告
        noInit,//没有初始化广告key
        shareFail,//分享不够时间失败

    }

    export class WxAdCtrl {

        private static isIniting: boolean = false;
        public static isLoad: boolean = false;

        private _rewardedVideoAd: RewardedVideoAd = undefined;

        _curKey: string = null;
        /**
         * 初始化广告
         */
        public async initAd(key: string) {
            if (WxAdCtrl.isIniting) {
                xgame.openLog && console.error(`[WxAdCtrl.initAd] 在初始化中无法再次初始化`);
                return;
            }
            WxAdCtrl.isIniting = true;
            await this.initAD(key);
            WxAdCtrl.isIniting = false;
        }

        public async initAD(key: string): Promise<boolean> {
            xgame.openLog && console.log(`[WxAdCtrl.initAD] 开始初始化 ${key}`);
            if (key != null) {
                return new Promise<boolean>(async (resolve, reject) => {
                    if (this._curKey != key) {
                        if (this._rewardedVideoAd) {
                            this._rewardedVideoAd.offLoad(this.onLoad);
                            this._rewardedVideoAd.offError(this.onError);
                            this._rewardedVideoAd.destroy && this._rewardedVideoAd.destroy();
                        }
                        let startTime = Date.now();
                        let isSucess = false;
                        while (Date.now() - startTime < 500) {
                            try {
                                this._rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: key, multiton: true });
                                this._rewardedVideoAd.onLoad(this.onLoad);
                                this._rewardedVideoAd.onError(this.onError);
                                this._rewardedVideoAd.load().then(
                                    () => {
                                        resolve(true);
                                    }
                                ).catch(
                                    () => {
                                        resolve(false);
                                    }
                                );
                                isSucess = true;
                                break;
                            }
                            catch (e) {
                                console.error(`[构架视频组件失败]`);
                                if (Date.now() - startTime > 500) {
                                    resolve(false);
                                }
                            }
                        }
                        if (!isSucess)
                            resolve(false);

                        // resolve(WxAdCtrl.isLoad);
                        this._curKey = key;
                    }
                    else {
                        resolve(WxAdCtrl.isLoad);
                    }
                });
            }
            return WxAdCtrl.isLoad;
        }

        /**
         * 显示广告
         * @param key 指定的广告key
         */
        public async show(key: string): Promise<AdEventKey> {
            if (!await this.initAD(key)) {
                return AdEventKey.noInit;
            }
            return new Promise<any>((resolve, reject) => {
                //处理关闭逻辑
                let onClose = (res: { isEnded: boolean }) => {
                    if (res && res.isEnded || res === undefined) {
                        xgame.openLog && console.log(`[WxAdCtrl.show] - 播放完成 ${JSON.stringify(res)}`);
                        resolve(AdEventKey.playOver);
                        this.handleBIAdLog(xgame.AdEventKey.playOver);
                        // 正常播放结束，可以下发游戏奖励
                    }
                    else {
                        xgame.openLog && console.log(`[WxAdCtrl.show] - 播放完成 ${JSON.stringify(res)}`);
                        resolve(AdEventKey.midwayClose);
                        this.handleBIAdLog(xgame.AdEventKey.midwayClose);
                        // 播放中途退出，不下发游戏奖励
                    }
                    this._rewardedVideoAd.offClose(onClose);
                }

                xgame.openLog && console.log(`[WxAdCtrl.show] - 显示广告 key:${this._curKey}`);
                //启动显示内容
                this._rewardedVideoAd.show()
                    .catch(err => {
                        xgame.openLog && console.log(`[WxAdCtrl.show] - 广告异常 key:${this._curKey}`);
                        WxAdCtrl.isLoad = false;
                        // resolve(AdEventKey.noAd);
                        // 失败重试
                        this._rewardedVideoAd.load()
                            .then(() => () => {
                                WxAdCtrl.isLoad = true;
                                this._rewardedVideoAd.show();
                                this._rewardedVideoAd.onClose(onClose);
                                this.handleBIAdLog(xgame.AdEventKey.begin);
                            })
                            .catch(err => {
                                WxAdCtrl.isLoad = true;
                                resolve(AdEventKey.noAd);
                            })
                    }).then(() => {
                        xgame.openLog && console.error(`[WxAdCtrl.show] - 广告显示 key:${this._curKey}`);
                        WxAdCtrl.isLoad = true;
                        this.handleBIAdLog(xgame.AdEventKey.begin);
                        this._rewardedVideoAd.onClose(onClose);
                    });
            })
        }

        public onLoad() {
            WxAdCtrl.isLoad = true;
            xgame.openLog && console.log(`[WxAdCtrl.onLoad] 广告加载完毕！`);
        }

        /* errCode
        // 1000	后端接口调用失败	
        // 1001	参数错误	
        // 1002	广告单元无效	
        // 1003	内部错误	
        // 1004	无合适的广告	
        // 1005	广告组件审核中	
        // 1006	广告组件被驳回	
        // 1007	广告组件被封禁	
        / 1008	广告单元已关闭
        */
        public onError(res: { errMsg: string, errCode: number }) {
            WxAdCtrl.isLoad = false;
            xgame.openLog && console.log(`[WxAdCtrl.onError] 广告出现错误！ ${JSON.stringify(res)}`);
        }

        private handleBIAdLog(type: xgame.AdEventKey) {

        }
    }
}