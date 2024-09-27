namespace xgame {

    /**
     * 容器增加删除处理
     * 子类命名格式 className = IContainerHandler.replace('I',EnumViewType[x])
     *  export enum EnumViewType {
     *      Background = 0,
     *      Layer,
     *      Board,
     *      Tips,
     *      System,
     *      Debug
     *  }
     */
    export class ContainerHandler {

        /**
         * 获得在激活使用中的UI数量
         */
        public getActiveCount(): number { return 0 };

        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        onBeforeAdd(prefabUrl: string, data?: any): string { return prefabUrl; }

        /**
         * 移除前
         * @param uuid 移除对象的uuid
         */
        onBeforeRemove(uuid: string): void { }

        /**
         * 添加完成
         * @param uuid 新对象的uuid
         */
        onAdd(uuid: string, prefabUrl: string): void { }

        /**
         * 移除完成
         * @param uuid 移除对象的uuid
         */
        onRemove(uuid: string): void { }

        /**
         * 重置当前控制器
         */
        reset() { }
    }
}