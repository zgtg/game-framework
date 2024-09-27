namespace xgame {
    /**
     * 所有数据的基类
     */
    export interface IXGameBase {

        /**
         * 初始化接口
         */
        init(): Promise<boolean>;

        /**
         * 重置接口
         */
        reset(): void;

        /**
         * 销毁接口
         */
        dispose(): void;
    }
}