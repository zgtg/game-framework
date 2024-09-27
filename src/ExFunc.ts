namespace xgame {

    /**
     * 异步等待时间结果code
     */
    export enum EnumAsyncEventResultKey {
        Error = 0,
        OK = 1,
    }

    // 登录解锁物品信息
    export interface LogInUnLockGunData {
        id: number,
        releaseDay: number,
    }

    /**
     * 异步等待事件结果
     */
    export interface asyncEventResult<T extends IEventData> {
        result?: T,
        code: EnumAsyncEventResultKey,
        msg?: string,
    }
    /**
     * 缓冲数据获取函数 
     */
    export function cacheData<T extends IBaseData>(key: number): T {
        return getXGame().data.getData<T>(key, DataType.cache) as T;
    }

    /**
     * 构建一个数据对象
     */
    export function createData<T extends IBaseData>(key: number): T {
        return getXGame().data.getData<T>(key, undefined) as T;
    }

    /**
     * 动态数据数据获取函数 
     */
    export function dynamicData<T extends IBaseData>(key: number): T {
        return getXGame().data.getData<T>(key, DataType.dynamic) as T;
    }

    /**
     * 存储数据获取函数
     */
    export function localData<T extends IBaseData>(key: number): T {
        return getXGame().data.getData<T>(key, DataType.local) as T;
    }

    /**
     * 清除缓存数据
     */
    export function clearCacheData(key: number) {
        return getXGame().data.clearData(key, DataType.cache);
    }

    /**
     * 清除动态数据
     */
    export function clearDynamicData(key: number) {
        return getXGame().data.clearData(key, DataType.cache);
    }

    /**
     * 清除本地数据
     */
    export function clearLocalData(key: number) {
        return getXGame().data.clearData(key, DataType.cache);
    }

    /**
     * 写入本地数据(默认延迟写入,不是必要情况下使用默认写入方式,避免平凡写入文件出现卡顿现象)
     */
    export function saveLocalData(immediately: boolean = false) {
        if (immediately) {
            getXGame().data.writeLocalData();
        }
        else {
            getXGame().data.delayWriteLocalData();
        }
    }

    /**
     * 派发系统事件
     * @param event 时间对象
     * @param upEvent 上游事件
     */
    export function dispatchSysEvent<T extends IEventData>(event: xSystem.EnumSysEvtKey | EnumSysEvtKey | T, upEvent?: IEventData): T {
        let serialID =  xgame.MathTools.getHashCode();
        if (typeof event == 'number') {
            let eventKey = xgame.EnumSysEvtKey[event] || xSystem.EnumSysEvtKey[event];
            let eventData: IEventData = { serialID: serialID, key: event };
            if (upEvent) {
                eventData.eventsCode = upEvent.eventsCode;
            }
            eventData.resultCode = 0;
            xgame.getXGame().system.emit(eventKey, eventData);
            xgame.getXGame().ui.emit(eventKey, eventData);
            return eventData as T;
        }
        else {
            let eventKey = xgame.EnumSysEvtKey[event.key] || xSystem.EnumSysEvtKey[event.key];
            event.serialID = serialID;
            if (upEvent) {
                event.eventsCode = upEvent.eventsCode;
            }
            event.resultCode = 0;
            xgame.getXGame().system.emit(eventKey, event);
            xgame.getXGame().ui.emit(eventKey, event);
            return event;
        }
    }

    /**
     * 异步派发系统事件 await 可等待时间回应
     * @param event 事件key
     * @param returnKey 等待返回key
     * @param data 提交数据
     * @param waitSecound 等待事件默认10秒，如果10秒没有等到自己的回应协议则返回
     */
    export function asyncDispatchSysEvent<T extends IEventData, K extends IEventData>(event: xSystem.EnumSysEvtKey | xgame.EnumSysEvtKey | T, returnKey: xSystem.EnumSysEvtKey | xgame.EnumSysEvtKey, waitSecound: number = 10): Promise<asyncEventResult<K>> {
        let self = this;
        return new Promise<asyncEventResult<K>>(function (resolve, reject) {

            let enumValueName = '';
            if (typeof event === 'number') {
                enumValueName = xgame.EnumSysEvtKey[event] || xSystem.EnumSysEvtKey[event];
            }
            else {
                enumValueName = xgame.EnumSysEvtKey[event.key] || xSystem.EnumSysEvtKey[event.key];
            }

            let returnEnumValueName = xgame.EnumSysEvtKey[returnKey] || xSystem.EnumSysEvtKey[returnKey];
            //超时设置
            let timeoutID = setTimeout(function () {
                xgame.openLog && console.error(`[asyncDispatchSysEvent] 10 秒没有回应，等待自动结束 key:${enumValueName} 等待Key:${returnEnumValueName}`);
                xgame.getXGame().system.off(returnEnumValueName, callback, self);
                resolve({ code: EnumAsyncEventResultKey.Error, msg: `timeout ${waitSecound}ms` });
            }, 1000 * waitSecound);

            function callback(rData: K) {
                clearTimeout(timeoutID);
                xgame.getXGame().system.off(returnEnumValueName, callback, self);
                resolve({ result: rData, code: EnumAsyncEventResultKey.OK });
            }

            xgame.getXGame().system.on(returnEnumValueName, callback, self);
            xgame.dispatchSysEvent(event);
        });
    }

    /**
     * 发送网路数据
     * @param event 时间对象
     * @param data 数据体 
     * @param isWaitCallBack 是否等待服务器回传数据 默认 等待
     */
    export function dispatchNetEvent<T extends xgame.socket.ISocketData>(key: xSystem.EnumNetEventkey, data: T = <T>{}, isWaitCallBack: boolean = false) {
        data = data ? data : <T>{};
        data.protoID = key;
        data.optHashCode = xgame.MathTools.getHashCode();
        xgame.getXGame().network.send(data, isWaitCallBack);
    }

    /**
     * 
     * @param key 音乐url路径
     * @param call 音乐播放唯一标识回调
     * @param loop 是否循环
     * @param vol 音量（0-1）
     * @param hashCode 
     */
    export function playAudio(key: string, call: (hashCode: number) => void = null, loop: boolean = false, vol: number = 1, hashCode: number = xgame.MathTools.getHashCode()) {
        if (key == "" || key == null)
            return;
        xgame.getXGame().audio.playAudio(key, call, loop, vol, hashCode);
    }


    /**
     * 移除指定的Action
     * @param action 指定的Action
     */
    export function removeTargetAction(action: cc.Action) {
        if (!action)
            return;
        let target = action.getOriginalTarget();
        if (!target
            || !target.isValid
            || cc.director.getActionManager().getNumberOfRunningActionsInTarget(target) == 0) {
            return;
        }
        target.stopAction(action);
    }

    /**
     * 重启游戏
     */
    export function reStart() {
        console.warn(`重新启动程序！native:${cc.sys.isNative}`);
        if (cc.sys.isNative) {
            cc.game.restart();
        } else if (cc.sys.isBrowser) {
            location.reload();
        }
    }
}
