/**声明系统事件枚举 */
declare namespace xSystem {
    export enum EnumSysEvtKey {
        //网络连接
        none,
        //网络异常
        networkError,
        //网络停止
        networkClose,
    }

    /**
     * 系统数据枚举声明
     */
    export enum EnumSysDataKey {

    }
}

/**
 * 声明系统对象所在
 */
declare namespace xSystem.sys {
    let __test: boolean;
}

/**
 * 声明系统数据存放命名空间
 */
declare namespace xSysData {
    let __test: boolean;
}

/**
 * 声明系统框架命名空间
 */
declare namespace xSystem {
    /**占位标记，命名空间内如果没有任何对象（interface不算对象）则无法遍历命名空间 */
    let __testSubsystem: boolean;
}




/**
 * xSystem.sys 命名空间为子系统的系统对象命名，不可用于其他位置
 */
namespace xgame {

    /**
     * 枚举系统事件
     */
    export enum EnumSysEvtKey {
        //网络连接
        networkOpen,
        //网络异常
        networkError,
        //网络停止
        networkClose,

        /** 所有board都关闭 */
        ui_allboard_hide,
        /** 所有tips关闭 */
        ui_alltips_hide,
    }

    export interface IRegisteredInfo {
        /**事件枚举Key */
        key: xSystem.EnumSysEvtKey | EnumSysEvtKey,
        /**事件回调函数 */
        call: (evt: IEventData) => void;
        /** 调用对象 默认当前对象 */
        target?: any,
    }

    /**
     * 系统子类接口
     */
    export interface ISystem {

        /**系统启动时时间 */
        startTime: number;

        /**系统首次启动调用 */
        start(): void;

        /** 
         * 每次启动游戏都会调用（所有系统都已经初始化完成）
         * @param curTime 时间错
         */
        onInitSystem(): void;

        /** 
         * 游戏首次启动会调用（在 onInitSystem 之后调用）
         * @param curTime 时间错
         */
        onFirstInitSystem(): void;

        /** 
         * update调用钱会调用
         * @param curTime 时间错
         */
        onStartUpdate(curTime: number): void;

        /**
         * 更新
         * @param dt 
         */
        onUpdate(dt: XGameUpdateData): void;

        /** 注册系统事件回调 */
        onGetSysRegisters(): Array<IRegisteredInfo>;

        /** 销毁 */
        onDestroy();
    }
}