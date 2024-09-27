namespace xgame {

    declare enum AdEventKey {
        open,//0.主动触发打开视频窗口
        close,//1.看到视频窗口后主动关闭 ----
        begin,//2.点击播放视频
        midwayClose,//3.视频中途关闭视频
        playOver,//4.观看结束
        getAward,//5.获得奖励
        noAd,//6.没有可观看的广告
        noInit,//没有初始化广告key
        shareFail,//分享不够时间失败

    }

    /**
     * 数据状态
     */
    export enum CSJCacheState {
        none,
        loading,
        ready,
        playing,
        finish,
    }

    /**
     * 渠道数据配置
     */
    export interface ADHandleData {
        /**广告渠道 */
        adChannel: string,
        /**本地调用接口 */
        classPath: string,

    }

    /**
     * 广告加载结果
     */
    export interface ADHandleLoadResult {
        result: boolean,
        code?: string,
        msg?: string,
        eventKey?: xgame.AdEventKey,
        ritID?:string,
    }

    /**
     * 广告处理对象
     */
    export class RewardedVideoHandle {

        /**唯一码 */
        public serialID: string = xgame.MathTools.getHashCode().toString();

        /** 对象状态 */
        public state: CSJCacheState = CSJCacheState.loading;

        /** 广告ID */
        private _sortID: string;

        private _classPath: string = "";

        public constructor(sortID: string, classPath: string) {
            this._sortID = sortID;
            this.state = CSJCacheState.none;
            this._classPath = classPath;
            xgame.openLog && (`[RewardedVideoHandle] 生成广告处理对象: ${this._sortID} ${this._classPath}`);
        }

        /**
         * 加载广告
         */
        public async load(): Promise<ADHandleLoadResult> {
            let loadResult: ADHandleLoadResult = { result: false };
            if (this.state != CSJCacheState.none) {
                xgame.openLog && console.log(`[RewardedVideoHandle.load] 视频已缓存，无需再次缓存 ${this.serialID}`);
                return loadResult;
            }
            let self = this;
            this.state = CSJCacheState.loading;
            return new Promise<ADHandleLoadResult>((resolve, reject) => {

                /** 结果回调 */
                let over = (result: ADHandleLoadResult) => {
                    xgame.getXGame().platform.off(this.getEventKey(), loadResultFunc, this);
                    this.state = CSJCacheState.ready;
                    loadResult = result;
                    resolve(loadResult);
                };

                /** 加载回调 */
                let loadResultFunc = (data: xgame.IRecvNativeInfo) => {
                    //处理加载结果
                    xgame.openLog && console.log(`[CSJCacheInfo.load] 处理收到事件 serialID:${data.serialID} data:${JSON.stringify(data)}`);
                    if (data.state == xgame.CSJADState.loadSucess) {
                        over({ result: true, code: data.errorCode, msg: data.errorMsg });
                    }
                    else if (data.state == xgame.CSJADState.loadFail || data.state == xgame.CSJADState.adError) {
                        if (data.state == xgame.CSJADState.adError) {
                            let evt: xgame.EventFrameworkData = { eventKey: "ad", adID: self._sortID, code: data.errorCode, msg: data.errorMsg };
                            xgame.getXGame().emit(xgame.EnumFrameworkEventKey.xgame_error, evt);
                            loadResult.code = data.errorCode;
                            loadResult.msg = data.errorMsg;
                        }
                        over({ result: false, code: data.errorCode, msg: data.errorMsg });
                    }
                }
                xgame.openLog && console.log(`[RewardedVideoHandle.load] 接受事件KEY:${this.getEventKey()}`);
                xgame.getXGame().platform.on(this.getEventKey(), loadResultFunc, this);

                console.log(`[IOSPlatform.addADKey] 缓存广告信息 classPath:${this._classPath}`);
                //开始加载
                if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                    jsb.reflection.callStaticMethod(this._classPath, "createAndLoadAD:userID:sortID:", this.serialID, "noUserID", this._sortID.toString());
                else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME) {
                    jsb.reflection.callStaticMethod(this._classPath, "loadRewardVideo", "(Ljava/lang/String;Ljava/lang/String;)V", this.serialID, this._sortID.toString());
                }
            });
        }

        public async play(ritSceneDescribe: string = ""): Promise<ADHandleLoadResult> {
            if (this.state != CSJCacheState.ready) {
                xgame.openLog && console.log(`[RewardedVideoHandle.play] 视频在播放中，无需继续播放 ${this.serialID}`);
                return { result: false, eventKey: xgame.AdEventKey.open };
            }
            let self = this;
            let closeMusic = xgame.getXGame().audio.musicOpen;
            if (closeMusic)
                xgame.getXGame().audio.musicOpen = false;
            let closeEffect = xgame.getXGame().audio.musicEffecOpen;
            if (closeEffect)
                xgame.getXGame().audio.musicEffecOpen = false;
            this.state = CSJCacheState.playing;
            return new Promise<ADHandleLoadResult>((resolve, reject) => {
                /** 结果回调 */
                let over = (result: ADHandleLoadResult) => {
                    xgame.getXGame().platform.off(this.getEventKey(), loadResultFunc, this);
                    this.state = CSJCacheState.finish;
                    if (closeMusic)
                        xgame.getXGame().audio.musicOpen = true;
                    if (closeEffect)
                        xgame.getXGame().audio.musicEffecOpen = true;
                    if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                        jsb.reflection.callStaticMethod(this._classPath, "destoryAD:", this.serialID);
                    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME)
                        jsb.reflection.callStaticMethod(this._classPath, "destoryRewardVideo", "(Ljava/lang/String;)V", this.serialID);
                    resolve(result);
                };

                /** 加载回调 */
                let loadResultFunc = (data: xgame.IRecvNativeInfo) => {
                    //处理加载结果
                    xgame.openLog && (`[CSJCacheInfo.play] 处理收到事件 serialID:${data.serialID} data:${JSON.stringify(data)}`);
                    if (data.state == xgame.CSJADState.adError) {
                        let evt: xgame.EventFrameworkData = { eventKey: "ad", adID: self._sortID, code: data.errorCode, msg: data.errorMsg };
                        xgame.getXGame().emit(xgame.EnumFrameworkEventKey.xgame_error, evt);
                    }
                    else if (data.state == xgame.CSJADState.playFail) {
                        over({ result: false, eventKey: xgame.AdEventKey.midwayClose, code: data.errorCode, msg: data.errorMsg });
                    }
                    else if (data.state == xgame.CSJADState.playOver) {
                        over({ result: true, eventKey: xgame.AdEventKey.playOver, code: data.errorCode, msg: data.errorMsg });
                    }
                }
                xgame.getXGame().platform.on(this.getEventKey(), loadResultFunc, this);

                //开始加载
                if (cc.sys.os == cc.sys.OS_IOS && cc.sys.platform != cc.sys.WECHAT_GAME)
                    jsb.reflection.callStaticMethod(this._classPath, "playAD:ritSceneDescribe:", this.serialID, ritSceneDescribe);
                else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform != cc.sys.WECHAT_GAME) {
                    jsb.reflection.callStaticMethod(this._classPath, "playRewardVideo", "(Ljava/lang/String;)V", this.serialID);
                }
            });
        }

        /**
         * 获取事件KEY
         */
        private getEventKey(): string {
            return `${xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyAd]}${this.serialID}`;
        }
    }

}