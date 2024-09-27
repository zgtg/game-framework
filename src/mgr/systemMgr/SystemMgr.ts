//声明导出静态数据后的静态块
namespace xgame.mgr {

    /**
     * 记录系统信息结构
     */
    interface ISystemInfo {
        /**系统名字 */
        name: string,
        /**系统对象 */
        system: xgame.ISystem,
    }

    export class SystemMgr extends cc.EventTarget implements IMgr {

        isFinish: boolean = false;

        /**系统对象数组*/
        private _systems: { [name: string]: ISystemInfo } = {};

        /**是否更新 */
        isUpdate: boolean = false;

        /**
        * 初始化接口
        */
        async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[SystemMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }

            if (!xgame.getXGame().data.isFinish)
                return false;

            this.registeredSubSystemInfo();
            this.isFinish = true;
            return this.isFinish;
        }

        start() {
            /**启动所有系统 */
            for (const sysName in this._systems) {
                let tmpSystemObj = this._systems[sysName].system;
                tmpSystemObj.start();
            }
            xgame.getXGame().on(xgame.eventKey.xgame_user_init, this.onInitSystem, this);
            xgame.getXGame().on(xgame.eventKey.xgame_game_start, this.onStartUpdate, this);
        }

        private onInitSystem() {
            if (this.isUpdate)
                return;
            /**更新所有系统 */
            for (const name in this._systems) {
                this._systems[name].system.onInitSystem();
            }

            /**首次启动游戏更新所有系统 */
            for (const name in this._systems) {
                if (!xgame.mgr.DataMgr.isHaveLocalDataCurGame)
                    this._systems[name].system.onFirstInitSystem();
            }

        }

        private onStartUpdate() {
            if (this.isUpdate)
                return;
            this.isUpdate = true;
            /**更新所有系统 */
            for (const name in this._systems) {
                this._systems[name].system.onStartUpdate(Date.now());
            }

        }

        /**
         * 注册所有系统到管理器
         */
        private registeredSubSystemInfo() {
            //xSystem 如果为空表示不存在子系统模块
            if (xSystem && xSystem.sys) {
                for (const systemName in xSystem.sys) {
                    let systemObj = new xSystem.sys[systemName];
                    let tmpSystemName: string = systemName.toLowerCase();
                    this._systems[tmpSystemName] = {
                        name: tmpSystemName,
                        system: systemObj
                    };
                }
            }
            else {
                xgame.openLog && console.log(`[SystemMgr] : 子系统模块不存在`);
            }

            //注册系统数据对象构造函数到动态数据管理器
            let enumLen = Object.keys(xSystem.EnumSysDataKey).length / 2;
            let curIndex = 0;
            for (let enumKey in xSystem.EnumSysDataKey) {
                if (curIndex >= enumLen)
                    break;
                curIndex++;
                let enumValueName = xSystem.EnumSysDataKey[enumKey];
                let createFunc = xSysData[`create${xgame.StringTools.UpFirstChat(enumValueName)}Data`];
                if (createFunc && typeof createFunc == 'function') {
                    xgame.getXGame().data.registerCreateFunc(parseInt(enumKey), createFunc);
                    xgame.openLog && console.log(`[SytemMgr.registeredSubSystemInfo] 注册系统数据对象 ${xgame.StringTools.UpFirstChat(enumValueName)}`);
                }

                //升级数据处理
                let levelUpFunc = xSysData[`levelUp${xgame.StringTools.UpFirstChat(enumValueName)}Data`];
                if (levelUpFunc && typeof levelUpFunc == 'function') {
                    xgame.getXGame().data.registerDataLevelUpFunc(parseInt(enumKey), levelUpFunc);
                    xgame.openLog && console.log(`[SytemMgr.registeredSubSystemInfo] 注册系统数据对象升级函数 ${xgame.StringTools.UpFirstChat(enumValueName)}`);
                }

            }

            /**启动所有系统 */
            for (const sysName in this._systems) {
                let tmpSystemObj = this._systems[sysName].system;

                //处理系统消息
                let registeredInfos = tmpSystemObj.onGetSysRegisters();
                for (const registedInfo of registeredInfos) {
                    this.on(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, tmpSystemObj);
                }
            }

        }

        /**
         * 重置接口
         */
        reset(): void {

        }

        onUpdate(dt: XGameUpdateData): void {
            if (!this.isFinish || !this.isUpdate)
                return;
            /**更新所有系统 */
            for (const name in this._systems) {
                this._systems[name].system.onUpdate(dt);
            }
        }

        /**
         * 销毁接口
         */
        dispose(): void {
            xgame.getXGame().off(xgame.eventKey.xgame_user_init, this.onInitSystem, this);
            xgame.getXGame().off(xgame.eventKey.xgame_game_start, this.onStartUpdate, this);
            for (const name in this._systems) {
                this._systems[name].system.onDestroy();
                delete this._systems[name];
            }
        }
    }
}
