///<reference path="./ContainerHandler.ts" />
namespace xgame {

    /**
     * 容器增加删除处理
     */
    export class BoardContainerHandler extends ContainerHandler {

        private _addPrefabUrlDict: { [url: string]: boolean } = {};
        private _showBoardInfo: { [uuid: string]: string } = {};

        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        onBeforeAdd(prefabUrl: string, data?: any): string {
            if (this._addPrefabUrlDict.hasOwnProperty(prefabUrl)) {
                xgame.openLog && console.error(`[LayerContainerHandler onBeforeAdd] : 同一个界面同时只能加载一个，页面 ${prefabUrl} 在加载中,需等待加载完成后再加载新界面`);
                return null;
            }
            xgame.openLog && console.log(`[BoardContainerHandler.onBeforeAdd] ${prefabUrl}`);

            this._addPrefabUrlDict[prefabUrl] = true;
            return prefabUrl;
        }

        /**
         * 添加完成
         * @param uuid 
         * @param prefabUrl 
         */
        onAdd(uuid: string, prefabUrl: string) {
            this._showBoardInfo[uuid] = prefabUrl;
        }

        /**
         * 移除完成
         * @param uuid 新对象的uuid
         */
        onRemove(uuid: string): void {
            let prefabUrl = this._showBoardInfo[uuid];
            delete this._addPrefabUrlDict[prefabUrl];
            if (this.getActiveCount() <= 0)
                xgame.dispatchSysEvent(xgame.EnumSysEvtKey.ui_allboard_hide);
        }

        /**
         * 获得在激活使用中的UI数量
         */
        public getActiveCount(): number {
            return Object.keys(this._addPrefabUrlDict).length;
        }
    }
}