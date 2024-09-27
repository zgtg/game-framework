namespace xgame {

    /**记录显示view信息 */
    interface LayerInfoStack {
        prefabUrl: string,
        data: any,
    }

    /**
     * 容器增加删除处理
     */
    export class LayerContainerHandler extends ContainerHandler {

        /**当前压栈 */
        private _layerStack: Array<LayerInfoStack> = [];

        /**当前ui的UUID */
        private _curUUID: string = undefined;
        public get curUUID() : string {
            return this._curUUID;
        }
        private _curPrefabUrl: string = undefined;

        private _isLoading: boolean = false;
        private _loadingPrefabUrl: string = undefined;

        reset() {
        }

        /**
         * 添加前
         * @param uuid 新对象的uuid
         */
        onBeforeAdd(prefabUrl: string, data?: any): string {
            if (this._isLoading) {
                console.error(`[LayerContainerHandler onBeforeAdd] : 页面 ${this._loadingPrefabUrl} 在加载中,需等待加载完成后再加载新界面`);
                return null;
            }
            this._loadingPrefabUrl = prefabUrl;
            this._isLoading = true;
            return prefabUrl;
        }

        /**
         * 添加完成
         * @param uuid 新对象的uuid
         */
        async onAdd(uuid: string, prefabUrl: string): Promise<void> {
            this._isLoading = false;
            this._loadingPrefabUrl = null;
            let lastUUID = this._curUUID;
            let lastPrefabUrl = this._curPrefabUrl;
            if (lastUUID != null && lastPrefabUrl != null) {
                let viewCom: xgame.IBaseUI = xgame.getXGame().ui.getView(lastUUID);
                if(!viewCom.config.notRecordLayer) {
                    this._layerStack.push({ prefabUrl: lastPrefabUrl, data: viewCom.showViewData });
                }
                await xgame.getXGame().ui.disposeLayer();
            }
            this._curUUID = uuid;
            this._curPrefabUrl = prefabUrl;

        }

        /**
         * 移除完成
         * @param uuid 移除对象的uuid
         */
        onRemove(uuid: string): void {
            if (this._layerStack.length > 0) {
                let viewInfo = this._layerStack[this._layerStack.length - 1];
                xgame.getXGame().ui._addView(viewInfo.prefabUrl, viewInfo.data, (uuid: string) => {
                    this._curUUID = uuid;
                    this._curPrefabUrl = viewInfo.prefabUrl;
                });
                this._layerStack.length = this._layerStack.length - 1;
            }
            if (this._layerStack.length == 0) {
                this._curUUID = undefined;
                this._curPrefabUrl = undefined;
            }
        }

    }
}