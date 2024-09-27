namespace xgame.platform {

    // 平台类型
    export enum EnumPlatformType {
        Debug = -1,
        None = 0,
        TT = 1,		//头条
        wxgame = 2,	//微信
        Dy = 3,		//抖音
    }

    // 平台子类型
    export enum EnumPlatformSubType {
        None = 0,
        Base = 1,	//开发
        Ly = 2,		//乐游
    }

    //{"code":null,"isLogin":false,"errMsg":"login:ok"}
    export interface ILoginResultData {
        code?: string,
        errMsg?: string
    }

    /**
     * 用户信息
     */
    export interface UserInfo {
        nickName: string,
        avatarUrl: string,
        gender?: number,//性别 0未知 1男 2女
        uid?: number,
    }

    /**
     * 平台对象接口
     */
    export interface IPlatform {

        /**平台类型 */
        type: EnumPlatformType;

        /**平台子类型 */
        subType: EnumPlatformSubType;

        //游戏ID
        appID: string;

        /** 广告加载回调 */
        adLoadCall: (adID: string) => void;

        /** 广告加载结果回调 */
        adLoadCallResult: (adID: string, result: boolean, code?: string, message?: string) => void;

        //获取用户信息
        showGetUserInfoBtn(left?: number, top?: number, w?: number, h?: number, call?: (userInfo: any) => void, testRoundColor?: boolean): { destroy: () => void };

        //获取系统信息
        getSystemInfo(): Promise<any>;

        //获取网络类型
        getNetworkType(): Promise<any>;

        //发送url
        getURL(targetUrl: string, keyValue: Object): Promise<string>;

        //发送url
        postURL(targetUrl: string, sendData: any, headers?: Object): Promise<string>;

        //登录
        login(): Promise<ILoginResultData>;

        //设置广告key
        addADKey(key: string, classPath: string);

        //添加游戏进入后台回调
        addOnHide(callback: () => void);

        //添加后台回到前台回调
        addOnShow(callback: (res?) => void);

        removeOnHide(callback: () => void);

        removeOnShow(callback: () => void);

        //设置音乐关闭回调
        onAudioInterruptionEnd(callback: () => void);

        //设置可以播放音乐回调
        onAudioInterruptionBegin(callback: () => void);

        //分享
        share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }>, desc?: string }): Promise<any>

        //显示广告
        showAd(key: string, classPath: string, ritSceneDescribe: string): Promise<ADHandleLoadResult>

        //显示banner
        showBanner(key: string, style: BannerAdStyle, adIntervals?: number): Promise<xgame.AdEventKey>
        // 显示插屏广告
        showInterstitial(key: string): Promise<xgame.AdEventKey>

        //隐藏banner
        hideBanner();

        //显示朋友圈
        showGameClubButton(isShow: boolean);

        //退出游戏
        exit();

        //发送数据到开放域
        postMessage(data);

        /**分享视频接口 */
        shareVideo(targetObj: { videoPath: string, query?: string, title?: string, extra?: any, sucess?: () => void, fail?: () => void });

        setShareAppMessage(configObj: { titleName: string, imageUrl: string, query?: Array<{ key: string, value: string }> });

        /**显示确认取消弹出窗口 */
        showModel(title: string, content: string, cancelText?: string, confirmText?: string): Promise<boolean>;
        // 短震动
        vibrateShort(): Promise<boolean>;
        // 长震动
        vibrateLong(): Promise<boolean>;

        /** 支付接口 */
        pay(id: string): Promise<xgame.IResultData>;
    }

    /**
     * 基础类
     */
    export class BasePlatform implements IPlatform {

        static isDebug = false;

        /**平台类型 */
        type: EnumPlatformType = EnumPlatformType.Debug;

        /**平台子类型 */
        subType: EnumPlatformSubType = EnumPlatformSubType.Base;

        /** 广告加载回调 */
        adLoadCall: (adID: string) => void;

        /** 广告加载结果回调 */
        adLoadCallResult: (adID: string, result: boolean, code?: string, message?: string) => void;

        appID: string;
        showGetUserInfoBtn(left?: number, top?: number, w?: number, h?: number, call?: (userInfo: any) => void): any {
            let timer = new Date().getTime()
            let userInfo = { nickName: "username" + timer, uid: timer, avatarUrl: 'ui_game_nainainotice_png' }
            call && call(userInfo);
            return { destroy: () => { } };
        }
        async getSystemInfo() { }

        async getNetworkType() { }

        async login(): Promise<ILoginResultData> { return {}; }

        addADKey(key: string, classPath: string) { }

        postMessage(data) { }

        async showAd(key: string, classPath: string, ritSceneDescribe: string = ""): Promise<ADHandleLoadResult> {
            await xgame.wait(300);
            return { result: true, eventKey: xgame.AdEventKey.playOver };
        }

        //显示banner
        async showBanner(key: string, style: BannerAdStyle, adIntervals?: number): Promise<xgame.AdEventKey> {
            return xgame.AdEventKey.playOver;
        }

        async showInterstitial(key: string): Promise<AdEventKey> {
            return xgame.AdEventKey.playOver;
        }

        hideBanner() { }

        async share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }> }): Promise<any> {
            await xgame.wait(2000);
            return true;
        }

        addOnHide(callback) {
            cc.game.on(cc.game.EVENT_HIDE, callback);
        }

        addOnShow(callback) {
            cc.game.on(cc.game.EVENT_SHOW, callback);
        }

        removeOnHide(callback) {
            cc.game.off(cc.game.EVENT_HIDE, callback);
        }

        removeOnShow(callback) {
            cc.game.off(cc.game.EVENT_SHOW, callback);
        }

        onAudioInterruptionEnd(callback) { }

        onAudioInterruptionBegin(callback) { }

        showGameClubButton(isShow: boolean) { }

        setShareAppMessage(configObj: { titleName: string, imageUrl: string, query?: Array<{ key: string, value: string }> }) { }

        exit() { }

        /**分享视频接口 */
        shareVideo(targetObj: { videoPath: string, query?: string, title?: string, extra?: any, sucess?: () => void, fail?: () => void }) { }

        /**显示确认取消弹出窗口 */
        async showModel(title: string, content: string): Promise<boolean> {
            return true;
        };


        async vibrateShort(): Promise<boolean> {
            return true;
        }
        async vibrateLong(): Promise<boolean> {
            return true;
        }

        //发送https get 请求
        async getURL(targetUrl: string, keyValue: Object): Promise<string> {
            // console.log(`[BasePlatform.getURL] getUrl url:${targetUrl} ${JSON.stringify(keyValue)}`);
            return new Promise<any>((resolve, reject) => {
                let tmpHttpRequest: XMLHttpRequest = cc.loader.getXMLHttpRequest();
                tmpHttpRequest.onerror = (ev: ProgressEvent) => {
                    console.error(`[BasePlatform.getURL] onerror url:${targetUrl} ${JSON.stringify(ev)} readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response} ${JSON.stringify(keyValue)}`);
                    resolve(null);
                }
                tmpHttpRequest.ontimeout = (ev: ProgressEvent) => {
                    console.error(`[BasePlatform.getURL] ontimeout url:${targetUrl} readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response} ${JSON.stringify(keyValue)}`);
                    resolve(null);
                }

                if (keyValue != null) {
                    let connector = targetUrl.indexOf('?') > 0 ? '&' : '?';
                    let encodeUrl = `${targetUrl}${connector}${xgame.transRequestParamWithEncode(keyValue)}`;
                    tmpHttpRequest.open('GET', encodeUrl);
                } else {
                    tmpHttpRequest.open('GET', targetUrl);
                }

                // tmpHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
                tmpHttpRequest.onreadystatechange = () => {
                    //readyState  // 0：尚未初始化 1：正在加载 2：加载完毕 3：正在处理 4：处理完毕
                    //status // 200 请求成功 202 请求被接受但处理未完成 400 错误请求 404 请求资源未找到 500 内部服务器错误
                    // console.log(`[BasePlatform.getURL] readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response}`);
                    if (tmpHttpRequest.readyState === 4) {
                        if (tmpHttpRequest.status >= 200 && tmpHttpRequest.status < 300) {
                            var respone = tmpHttpRequest.response;
                            try {
                                resolve(JSON.parse(respone));
                            } catch (error) {

                            } finally {
                                resolve(respone);
                            }
                        }
                        else {
                            resolve(null);
                        }
                    }
                };
                tmpHttpRequest.send();
            });
        }

        //发送https post请求
        async postURL(targetUrl: string, sendData: any, headers?: Object): Promise<string> {
            return new Promise<any>((resolve, reject) => {
                let tmpHttpRequest: XMLHttpRequest = cc.loader.getXMLHttpRequest();
                tmpHttpRequest.responseType = 'text';
                tmpHttpRequest.open('POST', targetUrl);
                tmpHttpRequest.setRequestHeader("Content-Type", "text/json");

                if(headers){
                    for(let key in headers){
                        tmpHttpRequest.setRequestHeader(key, headers[key]);
                    }
                }

                tmpHttpRequest.onerror = (ev: ProgressEvent) => {
                    console.error(`[BasePlatform.postURL] onerror url:${targetUrl} ${JSON.stringify(ev)} readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response}`);
                    resolve(null);
                }
                tmpHttpRequest.ontimeout = (ev: ProgressEvent) => {
                    console.error(`[BasePlatform.postURL] ontimeout url:${targetUrl} readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status} response:${tmpHttpRequest.response}`);
                    resolve(null);
                }

                tmpHttpRequest.onreadystatechange = () => {
                    //readyState // 0：尚未初始化 // 1：正在加载 // 2：加载完毕 // 3：正在处理 // 4：处理完毕
                    //status // 200 请求成功 // 202 请求被接受但处理未完成 // 400 错误请求 // 404 请求资源未找到 // 500 内部服务器错误
                    // console.log(`[BasePlatform.postURL] readyState:${tmpHttpRequest.readyState} status:${tmpHttpRequest.status}`);
                    if (tmpHttpRequest.readyState === 4) {
                        if (tmpHttpRequest.status >= 200 && tmpHttpRequest.status < 300) {
                            var respone = tmpHttpRequest.response;
                            try {
                                resolve(JSON.parse(respone));
                            } catch (error) {

                            } finally {
                                resolve(respone);
                            }
                        }
                        else {
                            resolve(null);
                        }
                    }
                };

                let bodyStr: string = (typeof sendData === 'string')? sendData : JSON.stringify(sendData);
                // console.log(`[BasePlatform.sendPostURL] 发送 -> ${bodyStr}`);
                tmpHttpRequest.send(bodyStr);
            });
        }

        /** 支付接口 */
        async pay(id: string): Promise<xgame.IResultData> {
            return {code:0};
        }
    }
}