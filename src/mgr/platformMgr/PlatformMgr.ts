namespace xgame.mgr {

    /**
     * 分享配置
     */
    interface IShareInfo {
        title: string,
        imgUrl: string,
    }

    export interface IOpenContentData {
        isGameDefined: boolean,      //自定义事件标记
        showType: number,           //显示类型
        expData: any,               //附加数据
    }

    export interface NativeUser {
        autoLoginToken?: string,//"g|KCrjGa9CBCwPfJfpJCLeXLpZrhYfPF"
        avator?: string,// ""
        isAdult?: boolean,// false
        isRealNameVerified?: boolean,// false
        lastOpenID?: boolean,// ""
        loginType?: number,//1
        mobile?: string,//""
        nickName?: string,//"JCrjGa9CBCh4jJKC"
        openID: string,//"JCrjGa9CBCh4jJKC"
    }

    /**
     * 数据管理器
     */
    export class PlatformMgr extends cc.EventTarget implements IMgr {

        isFinish: boolean;

        /**分享信息 */
        private _shareInfo: { [key: string]: IShareInfo } = {};

        /**广告key */
        private _adVideoKey: string = null;
        public set videoKey(key: string) {
            this._adVideoKey = key;
        }

        private _platform: xgame.platform.IPlatform = null;
        public get platformObj(): xgame.platform.IPlatform {
            return this._platform;
        }

        /**设置一个分享配置 */
        public setShareInfo(key: number, title: string, imgUrl: string) {
            this._shareInfo[key] = { title: title, imgUrl: imgUrl };
        }

        public async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[PlatformMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                this._platform = new platform.WxgamePlatform();
                xgame.openLog && console.log(`[PlatformMgr init] : platform:${'微信小游戏'}`);
            }
            else if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isNative) {
                this._platform = new platform.IOSPlatform();
                xgame.openLog && console.log(`[PlatformMgr init] : platform:${'IPHONE'}`);
            }
            else if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative) {
                this._platform = new platform.AndroidPlatform();
                xgame.openLog && console.log(`[PlatformMgr init] : platform:${'Android'}`);
            }
            else {
                this._platform = new platform.DebugPlatform();
                xgame.openLog && console.log(`[PlatformMgr init] : platform:${'开发平台'}`);
            }
            this.reset();
            return this.isFinish = true;
        }

        start() {

        }

        // ====================== 功能区 =======================

        /**
         * 设置广告key
         * @param key 广告key
         */
        public async setADKey(key: string, classPath: string) {
            return this._platform.addADKey(key, classPath);
        }

        /**
         * 获取用户信息（微信平台坐标需要按照微信平台的坐标系设置，需转坐标系后传入值）
         * @param x 世界坐标系X点
         * @param y 世界坐标系Y点
         * @param w 宽
         * @param h 高
         */
        public showGetUserInfoBtn(x?: number, y?: number, w?: number, h?: number, call?: (userInfo: xgame.platform.UserInfo) => void, testRoundColor?: boolean): { destroy: () => void } {
            return this._platform.showGetUserInfoBtn(x, y, w, h, call, testRoundColor);
        }


        //分享
        public async share(targetObj: { title: string, imageUrl: string, query?: Array<{ key: string, value: string }>, desc?: string }): Promise<any> {
            let preTime = Date.now();
            let result = await this._platform.share(targetObj);
            let endTime = Date.now();
            xgame.openLog && console.error(`[PlatformMgr.share] : preTime：${preTime} endTime:${endTime} - ${endTime - preTime}ms`);
            if (cc.sys.platform == cc.sys.WECHAT_GAME && endTime - preTime >= 2000)
                return true;
            return result;
        }

        //分享设置
        public setShareAppMessage(configObj: { titleName: string, imageUrl: string, query?: Array<{ key: string, value: string }> }) {
            this._platform.setShareAppMessage(configObj);
        }

        //显示广告
        public async showAd(key: string, classPath: string, ritSceneDescribe: string = ""): Promise<xgame.ADHandleLoadResult> {
            return this._platform.showAd(key, classPath, ritSceneDescribe);
        }

        //显示Banner广告
        public showBanner(key: string, style: BannerAdStyle, adIntervals?: number): Promise<xgame.AdEventKey> {
            return this._platform.showBanner(key, style, adIntervals);
        }

        // 显示插屏广告
        public showInterstitial(key: string): Promise<xgame.AdEventKey> {
            return this._platform.showInterstitial(key);
        }

        //显示广告
        public hideBanner() {
            return this._platform.hideBanner();
        }
        // 短震动
        async vibrateShort(): Promise<boolean> {
            return await this._platform.vibrateShort();
        }
        // 长震动
        async vibrateLong(): Promise<boolean> {
            return await this._platform.vibrateLong();
        }

        /** 计费相关 */
        //显示广告
        public async pay(id: string): Promise<xgame.IResultData> {
            return this._platform.pay(id);
        }

        /**
         * 发送GET URL请求
         * @param targetUrl 目标地址
         * @param sendData 发送数据
         */
        public async getURL(targetUrl: string, sendData: any): Promise<any> {
            return this._platform.getURL(targetUrl, sendData);
        }

        /**
         * 发送POST URL请求
         * @param targetUrl 目标地址
         * @param sendData 发送数据
         */
        public async postURL(targetUrl: string, sendData: any, headers?: Object): Promise<any> {
            return this._platform.postURL(targetUrl, sendData, headers);
        }

        /**
         * 发送事件到开放域
         * @param showType 事件类型
         * @param data 携带数据
         */
        public postOpenContentMsg(showType: number, data: any) {
            let openData: IOpenContentData = { isGameDefined: true, showType: showType, expData: data };
            this._platform.postMessage(openData);
        }

        /**
         * 显示模块信息
         * @param title 显示标题
         * @param content 显示上下文
         */
        public async showModel(title: string, content: string, cancelText?: string, confirmText?: string): Promise<boolean> {
            return await this._platform.showModel(title, content, cancelText, confirmText);
        }

        public reset() {
            this._shareInfo = {};
        }

        /**
         * 接受本地发来的消息（）
         * @param key 
         * @param data 
         */
        public onRecvNativeMsg(key: EnumJSEventKey, data: xgame.IEventData) {
            console.log("onRecvNativeMsg");
            console.log(`收到native端消息 KEY:${EnumJSEventKey[key]} data:${JSON.stringify(data)}`);
            console.log(`发送事件KEY: KEY:${EnumJSEventKey[key]}${data.serialID}`);
            this.emit(`${EnumJSEventKey[key]}${data.serialID}`, data);
        }

        onUpdate(dt: XGameUpdateData): void {

        }

        public dispose() {
            this.reset();
        }


        /**
         *  获取版本号
         */
        public static getNativeVersion(): string {
            let version: string = xgame.config.NATIVE_VERSION;
            if (cc.sys.isNative) {
                xgame.openLog && console.log(`[registeredEvent] 获取版本号... native:${cc.sys.isNative} os:${cc.sys.os}`);
                if (cc.sys.os == cc.sys.OS_IOS) {
                    version = jsb.reflection.callStaticMethod("BISDK", "getVersion");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    version = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getVersion", "()Ljava/lang/String;");
                }
            }
            xgame.openLog && console.log(`获取版本号:${version}`);
            return version;
        }

        /**
        *  获取包名
        */
        public static getNativePackageName(): string {
            let packageName: string = xgame.config.NATIVE_VERSION;
            if (cc.sys.isNative) {
                xgame.openLog && console.log(`[registeredEvent] 获取包名... native:${cc.sys.isNative} os:${cc.sys.os}`);
                if (cc.sys.os == cc.sys.OS_IOS) {
                    packageName = jsb.reflection.callStaticMethod("BISDK", "getPackageName");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    packageName = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getPackageName", "()Ljava/lang/String;");
                }
            }
            xgame.openLog && console.log(`获取包名:${packageName}`);
            return packageName;
        }

        /**
         *  获取版本号
         */
        public static getDeviceSerialID(): string {
            let deviceSerialID: string = xgame.MathTools.getUuid();
            try {
                if (cc.sys.isNative) {
                    xgame.openLog && console.log(`[registeredEvent] 登录游戏开始...`);
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        deviceSerialID = jsb.reflection.callStaticMethod("BISDK", "getDeviceSerialID");
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        deviceSerialID = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getDeviceSerialID", "()Ljava/lang/String;");
                    }
                }
            } catch (error) {

            }
            xgame.openLog && console.log(`获取设备唯一ID:${deviceSerialID}`);
            return deviceSerialID;
        }

        /**
         *  比较版本号
         *  如果传入版本号大于(>)当前版本号 返回 1
         * 如果传入版本号小于(<)当前版本号 返回 -1
         * 如果传入版本号等于(=)当前版本号 返回 0
         */
        public static getCompareNativeVersion(targetVersion: string): number {
            let curVersion: string = this.getNativeVersion();
            xgame.openLog && console.log(`[PlatformMgr.getCompareVersion] 版本比较 版本 A : ${targetVersion} 版本 B : ${curVersion}`);
            let vA = targetVersion.split('.');
            let vB = curVersion.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]) || 0;
                let b = parseInt(vB[i]) || 0;

                if (a !== b) {
                    return a - b;
                }
            }
            return (vB.length > vA.length) ? -1 : 0;
        }

        /**
         * 获取客户端用户信息，格式如下：
         * {
            autoLoginToken: "g|KCrjGa9CBCwPfJfpJCLeXLpZrhYfPF"
            avator: ""
            isAdult: false
            isRealNameVerified: false
            lastOpenID: ""
            loginType: 1
            mobile: ""
            nickName: "JCrjGa9CBCh4jJKC"
            openID: "JCrjGa9CBCh4jJKC"
         * }
         */
        public getNativeUser(): NativeUser {
            let userInfoStr = "";
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    userInfoStr = jsb.reflection.callStaticMethod("LoginHandle", "currentUser");
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    userInfoStr = jsb.reflection.callStaticMethod('org/cocos2dx/javascript/sdk/login/LoginHandle', "currentUser", "()Ljava/lang/String;");
                }
            }

            return userInfoStr ? JSON.parse(userInfoStr) : null;
        }

        /**
         * 客户端登录，支持游客静默登录或者用户信息登录
         * {autoLoginToken: "d|JCrTEcrV8CJhncf7XvTat8er7Pm9T7", loginType: 3, openID: "JLJEncAe6CtY76Py", nickName: "天龙第一部", lastOpenID: ""}
         * @param type userLogin / guestLogin
         */
        private nativeLogin(type: string): Promise<any> {
            let This = this;
            return new Promise((resolve) => {
                let evtKey = `${xgame.EnumJSEventKey[xgame.EnumJSEventKey.EnumJSEventKeyLogin]}${type}`;
                let callback = function (result) {
                    This.off(evtKey, callback);
                    resolve(result);
                };
                This.on(evtKey, callback);
                if (cc.sys.isNative) {

                    if (cc.sys.os == cc.sys.OS_IOS) {
                        jsb.reflection.callStaticMethod("LoginHandle", type);
                    } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/sdk/login/LoginHandle', type, "()V");
                    }
                } else {
                    callback({ state: 1 });
                }
            });
        }

        /**
         * 客户端静默登录（游客登录）
         */
        public guestLogin(): Promise<any> {
            return this.nativeLogin('guestLogin');
        }

        /**
         * 登录
         */
        public userLogin(): Promise<any> {
            return this.nativeLogin('userLogin');
        }

        /**
         * 客户端用户登录（其实是游客信息绑定）
         */
        public bindUser(): Promise<any> {
            return this.nativeLogin('bindUser');
        }

        /**
         * 客户端切换账号
         */
        public switchUser(): Promise<any> {
            return this.nativeLogin('switchUser');
        }

        /**
         * 客户端用户登出
         */
        public logOutAccount(): Promise<any> {
            return this.nativeLogin('logOutAccount');
        }

        /**
         * 调用客户端实名认证
         */
        public realNameVerify(): Promise<any> {
            return this.nativeLogin('realNameVerify');
        }

        /**
         * 调用客户端评分弹窗，仅支持ios
         */
        public requestReview(): void {
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod("BISDK", "requestReview");
                }
            }
        }

        /**
         * 复制内容到剪贴板
         */
        public copyToClipboard(str: string): void {
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod("JSAdapter", "copyToClipboard:", str);
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/JSAdapter", "copyToClipboard", "(Ljava/lang/String;)V", str);
                }
            } else if(cc.sys.platform == cc.sys.WECHAT_GAME) {
                wx.setClipboardData({data: str, success: ()=>{wx.hideToast({success:()=>{}, fail: ()=>{}, complete:()=>{}})}, fail: () => {}, complete: () =>{}});
            }
        }

        /**
         * 获取设备did
         */
        public getUniqueDid(str?: string): string {
            let did = "";
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    did = jsb.reflection.callStaticMethod("BISDK", "getUniqueDid");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    did = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "getUniqueDid", "()Ljava/lang/String;");
                }
            }

            return did;
        }

        /**
         * 计算md5
         */
        public md5sum(str: string): string {
            let sum = "";
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    sum = jsb.reflection.callStaticMethod("JSAdapter", "md5Sum:", str);
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    sum = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/JSAdapter", "md5Sum", "(Ljava/lang/String;)Ljava/lang/String;", str);
                }
            }

            return sum;
        }

        /**
         * 计算md5
         */
        public genReqHeader(uuid: string, bodySum: string): string {
            let sum = "";
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    sum = jsb.reflection.callStaticMethod("BISDK", "genReqHeader:sig:", uuid, bodySum);
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    sum = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "genReqHeader", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", uuid, bodySum);
                }
            }

            return sum;
        }

        /**
         * 发送aliyun日志
         */
        public sendAliEvent(str: string): void {
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod("BISDK", "sendAliEvent:", str);
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/BISDK", "sendAliEvent", "(Ljava/lang/String;)V", str);
                }
            }
        }


        /**
         * 获取设备名
         */
        public getDeivceName(): string {
            let deviceName = "unknow";
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    // jsb.reflection.callStaticMethod("BISDK", "sendAliEvent:", str);
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    deviceName = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/sdk/DeviceInfoUtils", "getDeviceName", "()Ljava/lang/String;");
                }
            }
            return deviceName;
        }
    }
}