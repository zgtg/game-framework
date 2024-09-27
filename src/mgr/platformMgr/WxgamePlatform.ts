namespace xgame.platform {

    export class WxgamePlatform extends BasePlatform {

        /**平台类型 */
        type: EnumPlatformType = EnumPlatformType.wxgame;

        appID: string = "wx4a6b3fff438dbec4";

        /**广告播放控制器 */
        private wxAdCtrl: xgame.WxAdCtrl;
        /**Banner广告播放控制器 */
        private wxBannerCtrl: xgame.WxBannerCtrl;
        /**插屏广告播放控制器 */
        private wxInterstitialCtrl: xgame.WxInterstitialCtrl;


        /**显示朋友圈按钮 */
        public GameClubButton: any;

        /**震动阀值 */
        vibrateWaitTime: number = 50;
        curVibrateTime: number = 0;

        constructor() {
            super();
            this.wxAdCtrl = new xgame.WxAdCtrl();
            this.wxBannerCtrl = new xgame.WxBannerCtrl();
            this.wxInterstitialCtrl = new xgame.WxInterstitialCtrl();
            let system = wx.getSystemInfoSync();

            this.GameClubButton = wx.createGameClubButton({
                icon: "dark",
                style: {
                    left: system.windowWidth * 0.03,
                    top: system.windowHeight * 0.88,
                    width: 40,
                    height: 40,
                    //fontSize: 6,
                    //textAlign:"center",
                },
                type: "image",
                text: null,
                image: null,
            });
            this.GameClubButton.hide();
        }

        addADKey(key: string) {
            this.wxAdCtrl.initAd(key);
        }


        showGameClubButton(isShow: boolean) {
            if (isShow)
                this.GameClubButton.show();
            else
                this.GameClubButton.hide();
        }

        private onSharedFinish() {

        }

        /**
         * 设置小程序自带分享功能
         * @param configObj 小程序自带分享功能参数设置
         */
        public setShareAppMessage(configObj: { titleName: string, imageUrl: string, query?: Array<{ key: string, value: string }> }) {
            //更新群转发为 withShareTicket 模式
            wx.updateShareMenu({
                withShareTicket: true
            });
            //设定预设按钮回调处理
            let self = this;
            wx.onShareAppMessage(function () {
                let titleName: string = configObj.titleName;
                let imageUrl: string = configObj.imageUrl;
                //修正为远程路径
                self.onSharedFinish();

                let queryStr = undefined;
                if (configObj.query)
                    for (const queryCfg of configObj.query) {
                        let tmpQuery = `${queryCfg.key}=${queryCfg.value}`;
                        if (queryStr == undefined) {
                            queryStr = tmpQuery;
                        }
                        else {
                            queryStr = queryStr + '&' + tmpQuery;
                        }
                    }

                return {
                    title: titleName,
                    imageUrl: imageUrl,
                    // query: `fromUserID=${"test"}`,
                    query: queryStr
                }
            })
            wx.showShareMenu(({
                withShareTicket: true, success: (res) => {
                    xgame.openLog && console.log("按钮显示成功:" + JSON.stringify(res))
                    //TODO: 补充写上右上角转发内容
                }, fail: (res) => {
                    xgame.openLog && console.log("按钮显示失败:" + JSON.stringify(res))
                    //TODO: 补充写上右上角转发内容
                }, complete: (res) => {

                }
            }));
        }

        async login(): Promise<ILoginResultData> {
            return new Promise((resolve, reject) => {
                wx.login({
                    success: (res) => {
                        xgame.isDebug && console.log(`[login success] - ${JSON.stringify(res)}`);
                        resolve(res);
                    },
                    fail: (res) => {
                        xgame.isDebug && console.log(`[login fail] - ${JSON.stringify(res)}`);
                        resolve(res);
                    },
                    complete: (res) => {
                        xgame.isDebug && console.log(`[login complete] - ${JSON.stringify(res)}`);
                    }
                })
            })
        }

        async postURL(targetUrl, sendData, headers?): Promise<any> {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: targetUrl,
                    data: sendData,
                    method: 'POST',
                    dataType: 'json',
                    header: {
                        "Content-type": "application/x-www-form-urlencoded",
                        ...headers
                    },
                    success: (res, status) => {
                        resolve(res.data)
                    },
                    fail: (res) => {
                        xgame.openLog && console.error("error res:" + JSON.stringify(res))
                        reject(res)
                    },
                    complete: (res) => { }
                })
            })
        }

        async getURL(targetUrl, keyValue: Object): Promise<any> {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: targetUrl + '?' + xgame.transRequestParamWithEncode(keyValue),
                    method: 'GET',
                    dataType: 'json',
                    header: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    success: (res, status) => {
                        resolve(res.data)
                    },
                    fail: (res) => {
                        xgame.openLog && console.error("error res:" + JSON.stringify(res))
                        reject(res)
                    },
                    complete: (res) => { }
                })
            })
        }

        auth(code) {
            return new Promise((resolve, reject) => {
                wx.request
            })
        }
        //分享处理
        async share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }>, desc?: string }) {
            return new Promise<any>((resolve, reject) => {
                let tmpDate: number = Date.now();
                let callBack = () => {
                    this.removeOnShow(callBack);
                    xgame.openLog && console.error(`[分享时机] - 已经从后台回来 ${Date.now() - tmpDate}`);
                    resolve(true);
                }
                xgame.openLog && console.error(`[分享时机] - 添加等待后台回来的回调`);
                this.addOnShow(callBack);

                let queryStr = undefined;
                if (targetObj.query)
                    for (let index = 0; index < targetObj.query.length; index++) {
                        let queryCfg = targetObj.query[index];
                        let tmpQuery = `${queryCfg.key}=${queryCfg.value}`;
                        if (index == 0) {
                            queryStr = tmpQuery;
                        }
                        else {
                            queryStr = queryStr + '&' + tmpQuery;
                        }
                    }
                xgame.openLog && console.log(`[WxgamePlatform.share] 分享参数信息:${queryStr}`);
                wx.shareAppMessage({
                    query: queryStr, title: targetObj.title, imageUrl: targetObj.imageUrl
                });
                xgame.openLog && console.log(`[share] - 调用完成`);
            })
        }

        //显示视频广告
        async showAd(key: string, className: string): Promise<ADHandleLoadResult> {
            let audioHashCode = xgame.getXGame().audio.pause();
            let result = await this.wxAdCtrl.show(key);
            xgame.getXGame().audio.resume(audioHashCode);
            return { result: result == xgame.AdEventKey.begin, eventKey: result };
        }

        //显示视频广告
        async showBanner(key: string, style: BannerAdStyle, adIntervals: number): Promise<xgame.AdEventKey> {
            let result = await this.wxBannerCtrl.showBannerAd(key, style, adIntervals);
            return result;
        }

        hideBanner() {
            this.wxBannerCtrl.hideBannerAd();
        }

        // 显示插屏广告
        async showInterstitial(key: string): Promise<xgame.AdEventKey> {
            let result = await this.wxInterstitialCtrl.showInterstitialAd(key);
            return result;
        }

        exit() {
            wx.exitMiniProgram({
                success: (res: any) => {
                    xgame.openLog && console.log(`[exitMiniProgram] - 退出游戏成功 ${JSON.stringify(res)}`);
                }
                , fail: (res: any) => {
                    xgame.openLog && console.log(`[exitMiniProgram] - 退出游戏失败 ${JSON.stringify(res)}`);
                }, complete: (res: any) => {
                    xgame.openLog && console.log(`[exitMiniProgram] - 退出游戏完成 ${JSON.stringify(res)}`);
                }
            });
        }



        showGetUserInfoBtn(x?: number, y?: number, w?: number, h?: number, call?: (userInfo: any) => void, testRoundColor: boolean = true): UserInfoButton {
            xgame.openLog && console.log(`[登陆] - 开始获取用户数据`);

            /**转换微信坐标1 */
            let frameSize = cc.view.getFrameSize();
            let winSize = cc.winSize;
            let left = (x - w / 2) / winSize.width * frameSize.width;
            let top = (cc.winSize.height - y - h / 2) / winSize.height * frameSize.height;

            let system = wx.getSystemInfoSync();
            xgame.openLog && console.log(`[登陆 - 系统信息] - ${system}`);

            let wxButton: UserInfoButton = wx.createUserInfoButton({
                type: 'text',
                text: '',
                withCredentials: true,
                lang: "zh_CN",
                style: {
                    left: left || 0,
                    top: top || 0,
                    width: w / 2 || system.windowWidth - 10,
                    height: h / 2 || system.windowHeight - 10,
                    backgroundColor: testRoundColor ? '#000000' : 'transparent',
                }
            });
            wxButton.show();
            wxButton.onTap((res) => {
                xgame.openLog && console.log("[点击获取用户信息按钮] - " + JSON.stringify(res));
                let userInfo = res.userInfo;
                // let nickName = userInfo.nickName
                // let avatarUrl = userInfo.avatarUrl
                // let gender = userInfo.gender //性别 0：未知、1：男、2：女
                // let province = userInfo.province
                // let city = userInfo.city
                // let country = userInfo.country
                xgame.openLog && console.log("loginInfo:" + JSON.stringify(userInfo));
                call && call(userInfo);
            });
            return wxButton;
        }

        hideGetUserInfoBtn() {

        }

        async getSystemInfo(): Promise<any> {
            return new Promise((resolve, reject) => {
                wx.getSystemInfo({
                    success: res => {
                        let sysInfo = res;
                        resolve(sysInfo);
                    },
                    fail: res => {
                        resolve(res);
                    },
                    complete: res => {
                        resolve(res);
                    }
                })
            })
        }
        async getNetworkType(): Promise<any> {
            return new Promise((resolve, reject) => {
                wx.getNetworkType({
                    success: res => {
                        resolve(res.networkType);
                    },
                    fail: res => {
                        resolve(res);
                    },
                    complete: res => {
                        resolve(res);
                    }
                })
            })
        }
        addOnHide(callback) {
            wx.onHide(callback);
        }

        addOnShow(callback) {
            wx.onShow(callback);
        }

        removeOnHide(callback) {
            wx.offHide(callback);
        }

        removeOnShow(callback) {
            wx.offShow(callback);
        }

        onAudioInterruptionEnd(callback) {
            wx.onAudioInterruptionEnd(callback);
        }

        onAudioInterruptionBegin(callback) {
            wx.onAudioInterruptionBegin(callback);
        }

        removeUserDir() {

        }

        postMessage(data) {
            const openDataContext = wx.getOpenDataContext();
            openDataContext.postMessage(data);
        }

        /**
         * 显示确认取消弹出窗口
         * 回调内容 {"errMsg":"showModal:ok","cancel":false,"confirm":true}
         */
        async showModel(title: string, content: string, cancelText?: string, confirmText?: string): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                wx.showModal({
                    title: title,
                    content: content,
                    cancelText: cancelText,
                    confirmText: confirmText,
                    complete: (res) => {
                        resolve(res.errMsg == "showModal:ok" && res.confirm);
                    },
                })
            });
        };

        // 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
        vibrateShort(): Promise<boolean> {
            let nowTime = Date.now();
            if (nowTime - this.curVibrateTime < this.vibrateWaitTime) {
                return;
            }
            this.curVibrateTime = nowTime;
            return new Promise<boolean>((resolve, reject) => {
                wx.vibrateShort({
                    fail: res => {
                        resolve(false);
                    },
                    complete: res => {
                        resolve(true);
                    }
                })
            });
        }


        // 使手机发生较长时间的振动（400 ms)
        vibrateLong(): Promise<boolean> {
            let nowTime = Date.now();
            if (nowTime - this.curVibrateTime < this.vibrateWaitTime) {
                return;
            }
            this.curVibrateTime = nowTime;
            return new Promise<boolean>((resolve, reject) => {
                wx.vibrateLong({
                    fail: res => {
                        resolve(false);
                    },
                    complete: res => {
                        resolve(true);
                    }
                })
            });
        }






    }
}