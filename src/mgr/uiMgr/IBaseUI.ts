namespace xgame {

    /**
     * UI组件的渲染层级类型
     */
    export enum EnumBaseUIZIndexType {
        auto,   //自动,后入最高
        top     //最高
    }

    /**
     * UI组件相关配置
     */
    export interface IBaseUIConfig {
        zIndexType: EnumBaseUIZIndexType,
        /** 当前Layer层是否启用压栈策略 (默认启用) */
        notRecordLayer: boolean, 
    }

    /**
     * UI容器
     */
    export interface IBaseUI {

        register: RegisterHelper;
        /**处理显示view时候携带的数据 */
        showViewData: any;
        /** 是否动态层 */
        isDynamic: boolean;

        config: IBaseUIConfig;

        /** 刷新渲染层级 */
        refreshZIndex();
        onLoad(): void;
        start(): void;
        update(dt: Number): void;
        lateUpdate(): void;
        onDestroy(): void;
        onEnable(): void;
        onDisable(): void;
        dispose(): void;
        /**注册事件回调 */
        onGetRegisters(): Array<IRegisteredInfo>;
        /**子节点注册事件注册事件回调 */
        onGetChildRegisters(): Array<IRegisteredInfo>;
        /** 
         * 统一返回
         * @returns 是否处理了此事件，处理后不会继续向下传递
         */
        onBack(): boolean;
    }
}