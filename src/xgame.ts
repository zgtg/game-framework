namespace xgame {

    /**
     * 框架事件
     */
    export enum EnumFrameworkEventKey {
        none = "none",
        xgame_error = "xgame_error",
    }

    /**
     * 框架事件对象
     */
    export interface EventFrameworkData {
        eventKey: string,
        msg?: string,
        code?: string,

        /** 广告ID */
        adID?: string,
    }

    /**
     * 框架时间相关
     */
    export interface TimeInfo {
        //进入后台
        enterBackground: number,
        //退出后台
        exitBackground: number,
        //开始游戏时间
        startGameTime: number,
        //最后一次更新时间
        lastUpdateTime: number,
        //最后一次前台更新时间
        lastRunUpdateTime: number,
        /** 是否后台 */
        isBackground: boolean,
    }

    export interface XGameUpdateData {
        //帧间隔时间（程序运行时间差，包括在后台前台）
        dt: number,
        //帧间隔时间（前台运行时间差）
        runDt: number,
    }

    /** 
     * 获取xgame对象
     */
    export function getXGame(): XGame {
        return XGame.getInstance();
    }

    /** 游戏平台名称 */
    export let platformName: string = "wx";

    export class XGame extends cc.EventTarget {

        public time: TimeInfo = null;

        /**
         * 单利对象
         */
        private static instance: XGame = undefined;
        /** 逻辑更新fps */
        private static FPS: number = 50;


        /**
         * 管理器组
         */
        private _mgrArr: Array<IMgr>;

        /**
         * 初始化异步等待对象
         */
        private _initPromise: Promise<void>;

        /**
         * 获取游戏框架对象
         */
        public static getInstance(): XGame {
            if (!XGame.instance) {
                XGame.instance = new XGame();

            }
            return XGame.instance;
        }

        /** mgr */
        public data: mgr.DataMgr;

        /** mgr */
        public ui: mgr.UIMgr;

        /** mgr */
        public platform: mgr.PlatformMgr;

        /** mgr */
        public staticdata: mgr.StaticDataMgr;

        /** 系统管理器 */
        public system: mgr.SystemMgr;

        /** 网络管理器 */
        public network: mgr.NetworkMgr;

        /** 音乐管理 */
        public audio: mgr.AudioMgr;

        private constructor() {
            super();
            this._mgrArr = [];
        }

        public async init(): Promise<void> {
            this.time = {
                enterBackground: 0,
                exitBackground: Date.now(),
                startGameTime: Date.now(),
                lastUpdateTime: Date.now(),
                lastRunUpdateTime: Date.now(),
                isBackground: false,
            };
            this._initPromise = this._init();
            await this._initPromise;
            this.startUpdateHandle();
            this._initPromise = null;
        }

        private startUpdateHandle() {
            //启动update
            let intervalDelayTime = 1000 / xgame.XGame.FPS;
            let tmpUpdateCall = () => {
                let lastTime = this.time.lastUpdateTime;
                this.time.lastUpdateTime = Date.now();
                let delayTime = (this.time.lastUpdateTime - lastTime) * 0.001;

                let runDelayTime = 0;
                if (!this.time.isBackground) {
                    let lastRunTime = this.time.lastRunUpdateTime;
                    this.time.lastRunUpdateTime = Date.now();
                    runDelayTime = (this.time.lastRunUpdateTime - lastRunTime) * 0.001;
                }

                this.update({
                    dt: delayTime,
                    runDt: runDelayTime
                });
            }
            setInterval(tmpUpdateCall, intervalDelayTime);
        }

        public async _init(): Promise<void> {
            if (this.data)
                return;

            //初始化管理器
            for (const mgrName in xgame.mgr) {
                let mgrObj = new xgame.mgr[mgrName];
                mgrObj['__classname__'] = mgrName;
                xgame.openLog && console.log(`[xgame._init] 构建管理器 : ${mgrName}`);
                this[mgrName.toLowerCase().replace("mgr", "")] = mgrObj;
                this._mgrArr.push(mgrObj);
            }

            let startIndex = 0;
            while (startIndex < this._mgrArr.length) {
                let srcStartIndex = startIndex;
                for (let index = startIndex; index < this._mgrArr.length; index++) {
                    xgame.openLog && console.log(`[xgame._init] : 尝试初始化 -> ${this._mgrArr[index]['__classname__']}`);
                    if (await this._mgrArr[index].init()) {
                        xgame.openLog && console.log(`[xgame._init] : 始化完成 -> ${this._mgrArr[index]['__classname__']}`);
                        if (index != startIndex) {
                            let tmpMgr = this._mgrArr[startIndex];
                            this._mgrArr[startIndex] = this._mgrArr[index];
                            this._mgrArr[index] = tmpMgr;
                        }
                        startIndex++;
                    }
                    else {
                        xgame.openLog && console.warn(`[xgame._init] : 始化失败 -> ${this._mgrArr[index]['__classname__']}`);
                    }
                }
                if (srcStartIndex == startIndex) {
                    cc.error(`[xgame] - 框架初始化失败:管理器依赖关系构成死循环!`);
                    break;
                }
            }

            //启动所有管理器
            for (let mgr of this._mgrArr) {
                mgr.start();
            }
        }

        public update(dtData: XGameUpdateData) {
            for (let mgr of this._mgrArr) {
                mgr.onUpdate(dtData);
            }
        }

        /**
         * 等待结果
         */
        public async waitInit(): Promise<void> {
            if (this._initPromise)
                await this._initPromise;
            return;
        }
    }
}