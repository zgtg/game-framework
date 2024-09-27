namespace xgame {
    export enum DataType {
        cache,      //缓冲数据
        dynamic,    //动态数据
        local,      //本地存储数据
        xgame,      //框架数据
    }
}

namespace xgame.mgr {

    /**
     * 数据管理器
     */
    export class DataMgr implements IMgr {

        //是否存档
        static isSaveLocal: boolean = true;

        /**是否完成 */
        isFinish: boolean;

        /** 本地是否有数据 */
        static isHaveLocalDataCurGame: boolean = false;

        /**数据在本地的key */
        static dataLocalKey: string = null;

        /**旧数据版本号 */
        static oldDataVersion: number = 0;

        /**当前数据版本号 */
        static curDataVersion: number = 0;

        /**类型数据缓冲信息 */
        private _dataArrayInfo: { [type: string]: SaveData } = {};

        /**对象构造器 */
        private _dataCreator: DataCreator = null;

        /**是否存储到本地 */
        private _isSaveing: boolean = false;

        /**延迟存储间隔时间(毫秒) */
        public static saveDelayTime: number = 2_000; //默认2秒

        /**
         * 上次存储的时间
         */
        private lastSaveTime: number = 0;

        private needWriteLocal: boolean = false;

        /**注册一个构造函数 */
        public registerCreateFunc(key: number, func: createFunc) {
            this._dataCreator.setRegister(key, func);
        }

        /**注册一个数据升级函数 */
        public registerDataLevelUpFunc(key: number, func: levelUpFunc) {
            this._dataCreator.setLevelUpFunc(key, func);
        }

        /**
         * 获取一个数据包对象
         * @param key 数据类型枚举
         * @param dataType 要获取的数据类型
         */
        public getData<T extends IBaseData>(key: number, dataType: DataType): T {
            //没有指定类型直接构建
            if (dataType == undefined) {
                return this._dataCreator.getData(key) as T;
            }
            let keyName = this.getObjKeyName(key);
            //制定了类型，从缓冲池判定
            let tmpDataObj = this._dataArrayInfo[dataType].data;
            if (!tmpDataObj.hasOwnProperty(keyName))
                tmpDataObj[keyName] = this._dataCreator.getData(key);
            return tmpDataObj[keyName] as T;
        }

        /**
         * 获取指定类型的数据
         * @param dataType 要获取的数据类型
         */
        public getTypeData(dataType: DataType): SaveData {
            //制定了类型，从缓冲池判定
            let tmpDataObj = this._dataArrayInfo[dataType];
            return tmpDataObj;
        }

        /**
         * 设置一个类型的数据
         * @param dataType 要获取的数据类型
         */
        public setTypeData(dataType: DataType, data: SaveData) {
            this._dataArrayInfo[dataType] = data;
        }

        /**
         * 获取一个数据包对象
         * @param key 数据类型枚举
         * @param dataType 要获取的数据类型
         * @param data 数据体
         */
        public setData(key: number, dataType: DataType, data: IBaseData) {
            let tmpDataDict = this._dataArrayInfo[dataType].data;
            let keyName = this.getObjKeyName(key);
            tmpDataDict[keyName] = data;
        }

        /**
         * 清除一个对象的数据
         * @param key 数据类型枚举
         * @param dataType 要获取的数据类型
         */
        public clearData(key: number, dataType: DataType) {
            let tmpDataDict = this._dataArrayInfo[dataType].data;
            let keyName = this.getObjKeyName(key);
            tmpDataDict[keyName] = this._dataCreator.getData(key);
        }

        public async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[DataMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            if (!xgame.getXGame().platform.isFinish) {
                return false;
            }

            this._dataCreator = new DataCreator();
            this.reset();
            //接收onHide事件，保存一次数据
            xgame.getXGame().platform.platformObj.addOnHide(() => {
                xgame.openLog && console.log(`[DataMgr] onHide, call writeLocalData`);
                this.writeLocalData();
            });
            return this.isFinish = true;
        }

        start() {

        }

        public reset() {
            this._dataArrayInfo = {};
            this._dataArrayInfo[DataType.cache] = { saveVersionCode: 0, data: {} };
            this._dataArrayInfo[DataType.dynamic] = { saveVersionCode: 0, data: {} };
            this._dataArrayInfo[DataType.local] = { saveVersionCode: 0, data: {} };
            this._dataArrayInfo[DataType.xgame] = { saveVersionCode: 0, data: {} };
            this._dataCreator.clear();
        }

        onUpdate(dt: XGameUpdateData): void {
            // 调用this.writeLocalData会立即更新lastSaveTime，所以不会多次调用
            if (this.needWriteLocal && (Date.now() - this.lastSaveTime) > DataMgr.saveDelayTime) {
                this.writeLocalData();
            }
        }

        /**
         * 存储本地数据
         * 延迟写入数据，如果通帧有大量的数据需要写入，则在延迟期间不会发生真正写入操作
         */
        public async delayWriteLocalData() {
            this.needWriteLocal = true;
        }

        /**
         * 设置本地数据Key
         * @param dataLocalKey key值
         */
        public setLocalDataKey(dataLocalKey: string, version: number) {
            DataMgr.dataLocalKey = dataLocalKey;
            DataMgr.curDataVersion = version;
        }

        /**
         * 写入本地数据
         */
        public writeLocalData() {
            // return;
            if (this._isSaveing) { //说明当前正在写，防止未写完再次调用
                xgame.openLog && console.log(`[DataMgr.writeLocalData] 上次写入未完成，等待上次完成`);
                return;
            }
            this._isSaveing = true;

            //记录性能数据，及上次保存时间
            let now = Date.now();
            let st = now; //开始写入的时间
            let interval = this.lastSaveTime > 0 ? now - this.lastSaveTime : 0; //距离上次保存的延迟
            this.lastSaveTime = now;

            if (DataMgr.dataLocalKey && DataMgr.isSaveLocal) {
                let str = JSON.stringify(this._dataArrayInfo[DataType.local]);
                // xgame.openLog && console.log(`[写入本地数据] - ${str}`);
                let dataKey = `xgame_${DataMgr.dataLocalKey}_data`;
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    let that = this;
                    wx.setStorage({
                        key: dataKey,
                        data: str,
                        success: (res: any) => {
                            that._isSaveing = false;
                        },
                        fail: (res: any) => {
                            that._isSaveing = false;
                            xgame.openLog && console.error(`[DataMgr.writeLocalData] 写入存档失败`);
                        }
                    });
                    wx.setStorage({
                        key: `xgame_${DataMgr.dataLocalKey}_data_version`,
                        data: DataMgr.curDataVersion,
                        success: (res: any) => {
                            that._isSaveing = false;
                        },
                        fail: (res: any) => {
                            that._isSaveing = false;
                            xgame.openLog && console.error(`[DataMgr.writeLocalData] 写入存档失败`);
                        }
                    });
                }
                else {
                    try {
                        cc.sys.localStorage.setItem(dataKey, str);
                    }
                    catch (e) {
                        xgame.openLog && console.error(`[DataMgr.writeLocalData] 写入存档失败`);
                    }
                    finally {
                        this._isSaveing = false;
                    }
                }
            }
            else {
                xgame.openLog && console.error(`[DataMgr.writeLocalData] 数据存储失败，未设置本地存储Key`);
                this._isSaveing = false;
            }

            // 打印性能数据
            xgame.openLog && console.log(`[DataMgr.writeLocalData] 消耗: ${Date.now() - st} ms, 间隔：${interval} ms`);
        }

        /**
         * 读取本地数据
         * @wangjl 修订
         * @des 此方法只能在初始化地方调用一次
         */
        public readLocalData() {
            if (DataMgr.dataLocalKey) {
                //开始读档
                let str = cc.sys.localStorage.getItem(`xgame_${DataMgr.dataLocalKey}_data`);
                xgame.isDebug && console.log(`[读取本地数据] : < ${str} >`);
                if (str) {
                    let saveData: any = JSON.parse(str);
                    /** 框架数据升级 - 兼容线上数据 */
                    if (saveData.saveVersionCode === undefined) {
                        let saveVersionCode = this.fixVersionInfo();
                        this._dataArrayInfo[DataType.local] = {
                            saveVersionCode: saveVersionCode,
                            data: saveData
                        };
                    }
                    else {
                        this._dataArrayInfo[DataType.local] = saveData;
                    }
                    DataMgr.isSaveLocal = false;    //修正数据前修改存储标记为false，如果修正数据中异常，则异常后的数据不会存储到本地
                    this.repairData(DataType.local);
                    DataMgr.isSaveLocal = true;
                    DataMgr.isHaveLocalDataCurGame = true;
                }
                else {
                    this._dataArrayInfo[DataType.local] = {
                        saveVersionCode: DataMgr.curDataVersion,
                        data: {}
                    };
                    DataMgr.isHaveLocalDataCurGame = false;
                }
            } else {
                xgame.openLog && console.error(`[DataMgr.readLocalData] 读取存储数据失败，为设置本地存储Key`);
            }
        }

        /**
         * 设置数据
         * @wangjl 修订
         * @des 此方法只能在初始化地方调用一次
         */
        public setLocalData(dataStr: string) {
        }

        /**
         * 数据对象发生变化的时候，本地存档或云存档获取到的数据会发生错误，此处修正数据
         */
        public repairData(dataType: DataType) {
            const curDataVersion = DataMgr.curDataVersion;
            let saveData = this._dataArrayInfo[dataType];
            let data = this._dataArrayInfo[dataType].data;
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    let srcData = data[key];
                    let tmpNumKey = this.getObjKeyNum(key);
                    let defaultData = this._dataCreator.getData(tmpNumKey);
                    let deepNum = 1;
                    //没有初始化过的本地数据读取出来的时候会是null而不是undefined
                    if (srcData === undefined) {
                        data[key] = defaultData;
                    }
                    else {
                        //修正不存在的对象
                        xgame.fixData(srcData, defaultData, deepNum);
                    }
                }
            }
            //修正升级数据
            let curLevelUpVersion = saveData.saveVersionCode;
            while (curLevelUpVersion < curDataVersion) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        let srcData = data[key];
                        let tmpNumKey = this.getObjKeyNum(key);
                        let newData = this._dataCreator.levelUpData(tmpNumKey, curLevelUpVersion, curLevelUpVersion + 1, srcData);
                        if (newData != null) {
                            data[key] = newData;
                        }
                    }
                }
                xgame.openLog && console.log(`[DataMgr.repairData] 数据升级版本号 : from:${curLevelUpVersion} to:${curLevelUpVersion + 1}`);
                curLevelUpVersion++;
            }


            xgame.openLog && console.log(`[DataMgr.repairData] 数据升级完成本地数据版本号 :${data.saveVersionCode}`);
            if (saveData.saveVersionCode < curDataVersion)
                saveData.saveVersionCode = curDataVersion;
        }

        /**
         * 获取key的字典名字
         * @param key 指定key
         */
        public getObjKeyName(key: number): string {
            return `key_${key}`;
        }

        /**
         * 获取key的字典名字
         * @param key 指定key
         */
        public getObjKeyNum(key: string): number {
            return parseInt(key.replace(`key_`, ''));
        }

        public dispose() {
            this.reset();
            delete this._dataCreator;
        }

        private fixVersionInfo() {
            let tmpVersion = cc.sys.localStorage.getItem(`xgame_${DataMgr.dataLocalKey}_data_version`);
            xgame.openLog && console.log(`[DataMgr.readLocalData] 本地数据版本号:${tmpVersion}`);
            let oldDataVersion = 0;
            if (tmpVersion != null) {
                oldDataVersion = typeof (tmpVersion) == 'number' ? tmpVersion : parseInt(tmpVersion);
                if (isNaN(oldDataVersion))
                    oldDataVersion = 0;
            }
            return oldDataVersion;
        }

        public restoreLocalData(data: any) {
            this.setTypeData(DataType.local, data);
            this.needWriteLocal = false;
            this._isSaveing = false; //强制设置正在写的标志，一定要写入
            this.writeLocalData();
            DataMgr.isSaveLocal = false;
            cc.audioEngine.stopAll();
            cc.game.pause();
            cc.sys.restartVM();
        }

        /**
         * 删档
         */
        public static clearLocalData() {
            let dataKey = `xgame_${DataMgr.dataLocalKey}_data`;
            let dataVersionKey = `xgame_${DataMgr.dataLocalKey}_data_version`;
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                wx.removeStorage({ key: dataKey });
                wx.removeStorage({ key: dataVersionKey });
            }
            else {
                cc.sys.localStorage.removeItem(dataKey);
                cc.sys.localStorage.removeItem(dataVersionKey);
            }

        }
    }
}