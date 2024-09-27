
namespace xgame.mgr {

    /**
     * UI管理器
     */
    export class UIMgr extends cc.EventTarget implements IMgr {

        /**默认的资源ui相对路径 */
        public static defaultPath: string = "prefab/ui/";

        isFinish: boolean;

        /**所有UI容器的管理器 */
        private _uiDict: { [uuid: number]: string } = {};

        //view的root对象
        private _viewRoot: UIContainer;

        /** 触摸主档层 */
        private _blockTouchLayer: UIContainer;
        private _blockCount: number = 0;

        private _containerHandlerDict: { [viewType: number]: ContainerHandler } = {};

        assetsHandle: UIAssetsHandle = null;

        /**
         * 异步初始化
         */
        public async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[UIMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            this.assetsHandle = new UIAssetsHandle();
            await this.assetsHandle.init();
            this.initUIContainer();
            this.initUIContainerHandler();
            this.reset();
            return this.isFinish = true;
        }

        start() {

        }

        private async awaitCanvasInit() {
            let index = 0;
            while (true) {
                await xgame.wait(16);
                if (cc.Canvas.instance != null) {
                    break;
                }
                xgame.openLog && console.log(`[读取cc.Canvas.instance] ... ${index++}次`);
            }
        }

        /**
         * 重置（清空所有的View）
         */
        public reset() {
            for (const uuid in this._uiDict) {
                if (this._uiDict.hasOwnProperty(uuid)) {
                    const tmpuuid = this._uiDict[uuid];
                    xgame.destoryNodeChildrens(this._viewRoot.getChildByUuid(tmpuuid));
                }
            }
            // this._blockTouchLayer.destroy();
            // this._blockCount = 0;
        }

        onUpdate(dt: XGameUpdateData): void {
            // let context = cc.sys['__audioSupport'].context;
            // if (context.state === 'suspended') {
            //     context.resume();
            //     xgame.openLog && console.log(context.state);
            // }
        }

        /**
         * 销毁
         */
        public dispose() {
            this.reset();
        }

        /**
         * 显示一个View
         * @param prefabUrl 预制体相对路径（不带后缀名）
         */
        public addView<T extends xgame.IBaseData>(prefabUrl: string, data?: T, addOver?: (uuid: string) => void) {
            if (prefabUrl.indexOf(`prefab/ui/`) == -1) {
                console.error(`[UIMgr addView] : ${prefabUrl} UI预制体需要放到 resource/prefab/ui/ 路径下`);
                addOver && addOver(null);
                return;
            }

            //处理预加载资源
            if (data) {
                if (!data.serialID)
                    data.serialID = xgame.MathTools.getHashCode();
                else {
                    xgame.openLog && console.warn(`[UIMgr.addView] 显示对象数据的serialID不需要提前赋值，确保数据类型只作为显示界面使用`);
                }
            }

            let viewName = prefabUrl.replace(UIMgr.defaultPath, '');
            let type: EnumViewType = EnumViewType.Background;
            let _viewType = this.getTypeByName(viewName);
            if (_viewType !== null)
                type = _viewType;
            prefabUrl = this._containerHandlerDict[type].onBeforeAdd(prefabUrl, data);
            if (prefabUrl) {
                this.retainBlockTouch();
                xgame.openLog && console.log(`[UIMgr.addView] retainBlockTouch:${prefabUrl} ${this._blockCount}`)
                this._addView(prefabUrl, data, (uuid: string) => {
                    this._containerHandlerDict[type].onAdd(uuid, prefabUrl);
                    addOver && addOver(uuid);
                    this.releaseBlockTouch();
                    xgame.openLog && console.log(`[UIMgr.addView] releaseBlockTouch:${prefabUrl} ${this._blockCount}`)

                });
            }
            else {
                addOver && addOver(null);
            }
        }

        /**
         * 显示一个View
         * @param prefabUrl 预制体相对路径（不带后缀名）
         */
        public async _addView<T extends xgame.IBaseData>(prefabUrl: string, data?: T, addOver?: (uuid: string) => void): Promise<string> {
            //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
            let uiUUID: string = null;
            try {
                // let loadedResource = await loadRes<cc.Prefab>(prefabUrl, cc.Prefab);
                let loadedResource = await this.assetsHandle.loadRes(prefabUrl);
                //开始实例化预制资源(这是个实例化是我自己理解的，可能说的不正确)
                if (!loadedResource) {
                    isDebug && xgame.openLog && console.log(`[UIMgr - addView] - 添加View : ${prefabUrl} 失败,无法读取资源`);
                    if (addOver)
                        addOver(uiUUID);
                    return uiUUID;
                }
                xgame.openLog && console.log(`[UIMgr - addView] - 添加View 加载完成 : ${prefabUrl}`);
                var tmpUINode = cc.instantiate(loadedResource);
                for (var keyName in EnumViewType) {
                    if (EnumViewType.hasOwnProperty(keyName) && isNaN(parseInt(keyName))) {
                        if (tmpUINode.name.length > keyName.length && tmpUINode.name.substring(0, keyName.length) == keyName) {
                            let containerUUID = this._uiDict[EnumViewType[keyName]];
                            let baseCom: xgame.IBaseUI = tmpUINode.getComponent(loadedResource.name);
                            if (!baseCom) {
                                console.error(`[UIMgr - addView] - 添加View失败 url:${prefabUrl} name:${tmpUINode.name}`);
                                break;
                            }
                            //处理注册系统事件监听
                            // this.onAddRegisters(baseCom);
                            tmpUINode['_xgameUIType'] = EnumViewType[keyName];
                            baseCom.showViewData = data;
                            uiUUID = tmpUINode.uuid;
                            xgame.openLog && console.log(`[UIMgr - addView] - 添加到渲染节点 : ${tmpUINode.uuid}`);

                            /** 如果是动态层对象，加入动态层 */
                            if (baseCom.isDynamic) {
                                containerUUID = this._uiDict[EnumViewType.Dynamic];
                            }
                            this._viewRoot.getChildByUuid(containerUUID).addChild(tmpUINode);
                            this.refreshRanderZIndex(tmpUINode);
                            break;
                        }
                    }
                }
            } catch (error) {

            }
            if (addOver)
                addOver(uiUUID);
            return uiUUID;
        }

        public onAddRegisters(com: IBaseUI) {
            //处理注册系统事件监听
            let registeredInfos = com.onGetRegisters();
            registeredInfos = registeredInfos.concat(com.onGetChildRegisters());
            for (const registedInfo of registeredInfos) {
                this.on(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, registedInfo.target || com);
            }
        }

        /**
         * 使用View的 uuid移除指定view
         * @param uuid view唯一ID
         */
        public removeView(uuid: string): boolean {
            let type = undefined;

            let targetUINode = this._viewRoot.getChildByUuid(this._uiDict[EnumViewType.Dynamic]).getChildByUuid(uuid);
            if (targetUINode) {
                type = targetUINode['_xgameUIType'];
            }
            else {
                for (var key in EnumViewType) {
                    if (EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                        let containerUUID = this._uiDict[key];
                        let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                        let targetUINode = tmpContainer.getChildByUuid(uuid);
                        if (targetUINode) {
                            type = key;
                            break;
                        }

                    }
                }
            }

            if (type == undefined)
                return false;
            this._containerHandlerDict[type].onBeforeRemove(uuid);
            this._removeView(uuid);
            this._containerHandlerDict[type].onRemove(uuid);
            return true;
        }

        /**  */
        public async disposeLayer() {
            let layerContainerHandler: LayerContainerHandler = this._containerHandlerDict[EnumViewType.Layer] as LayerContainerHandler;
            if (!layerContainerHandler.curUUID) {
                return;
            }
            let tmpContainer = this._viewRoot.getChildByUuid(this._uiDict[EnumViewType.Layer]);
            let targetUINode = tmpContainer.getChildByUuid(layerContainerHandler.curUUID);
            if (!targetUINode) {
                return;
            }
            let baseCom: xgame.IBaseUI = targetUINode.getComponent(targetUINode.name);
            //有异步的需求
            await baseCom.dispose();
        }

        /** 获取当前的Layer */
        public getLayer(): xgame.IBaseUI {
            let layerContainerHandler: LayerContainerHandler = this._containerHandlerDict[EnumViewType.Layer] as LayerContainerHandler;
            if (!layerContainerHandler.curUUID) {
                return;
            }
            let tmpContainer = this._viewRoot.getChildByUuid(this._uiDict[EnumViewType.Layer]);
            let targetUINode = tmpContainer.getChildByUuid(layerContainerHandler.curUUID);
            if (!targetUINode) {
                return;
            }
            let baseCom: xgame.IBaseUI = targetUINode.getComponent(targetUINode.name);
            return baseCom;
        }

        /**
         * 清除指定View类型 只能处理 { board tips }
         * @param type 指定view类型
         */
        public clearBoardAndTips() {
            this._clearContainer(EnumViewType.Board);
            this._clearContainer(EnumViewType.Tips);
        }

        /**
         * 清除指定容器
         * @param type 指定view类型
         */
        private _clearContainer(type: EnumViewType) {
            this._containerHandlerDict[type].reset();
            let containerUUID = this._uiDict[type];
            let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
            let childs = tmpContainer.children;
            for (const child of childs) {
                if (child) {
                    this._removeView(child.uuid);
                }
            }
        }

        /**
         * 获取容器
         * @param type 指定view类型
         */
        public getContainer(type: EnumViewType) {
            let containerUUID = this._uiDict[type];
            let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
            return tmpContainer;
        }

        /**
         * 使用View的 uuid移除指定view
         * @param uuid view唯一ID
         */
        public _removeView(uuid: string) {
            for (var key in EnumViewType) {
                if (EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                    let containerUUID = this._uiDict[key];
                    let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                    let targetUINode = tmpContainer.getChildByUuid(uuid);
                    if (targetUINode) {
                        let baseCom: xgame.IBaseUI = targetUINode.getComponent(targetUINode.name);
                        targetUINode.destroy();
                        this.assetsHandle.removeView(targetUINode.name);
                        break;
                    }
                }
            }
        }

        /**
         * 根据类型获得展示的view
         * @param uuid view唯一ID
         */
        public getViewNamesByType(type: EnumViewType): Array<string> {
            let result: Array<string> = [];
            if (EnumViewType.hasOwnProperty(type) && !isNaN(type)) {
                let containerUUID = this._uiDict[type];
                let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                let childs = tmpContainer.children;
                for (const child of childs) {
                    result.push(child.name);
                }
            }
            return result;
        }

        /**
         * 更具名称获得展示的view的数量
         * @param uuid view唯一ID
         */
        public getViewCountByName(viewName: string | Object): number {
            let result = 0;
            let type = typeof viewName;
            if (type != "string")
                viewName = xgame.getQualifiedClassName(viewName);
            let viewType = this.getTypeByName(viewName.toString());
            if (viewType !== null) {
                let containerUUID = this._uiDict[viewType];
                let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                let childs = tmpContainer.children;
                for (const child of childs) {
                    if (child.name == viewName)
                        result++;
                }
            }
            return result;
        }

        public onRemoveRegisters(com: IBaseUI) {
            //处理注册系统事件监听
            let registeredInfos = com.onGetRegisters();
            registeredInfos = registeredInfos.concat(com.onGetChildRegisters());
            for (const registedInfo of registeredInfos) {
                this.off(xgame.EnumSysEvtKey[registedInfo.key] || xSystem.EnumSysEvtKey[registedInfo.key], registedInfo.call, registedInfo.target || com);
            }
        }

        /**获取指定id的View */
        public getView<T extends xgame.IBaseUI>(uuid: string): T {
            let result: T;
            for (var key in EnumViewType) {
                if (EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                    let containerUUID = this._uiDict[key];
                    let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                    let targetUINode = tmpContainer.getChildByUuid(uuid);
                    if (targetUINode) {
                        result = targetUINode.getComponent(targetUINode.name) as T;
                        break;
                    }
                }
            }
            return result;
        }

        /**
         * 初始化UI布局的容器
         * @param canvas 指定一个canvas
         */
        private initUIContainer() {
            if (this._viewRoot != null) {
                isDebug && xgame.openLog && console.log(`[UIMgr - u initUIContainer] - 初始化失败：_viewRoot 已经初始化过，不需要继续初始化`);
                return;
            }

            /** 加入全局渲染层 */
            this._viewRoot = new UIContainer();
            cc.game.addPersistRootNode(this._viewRoot);
            for (var key in EnumViewType) {
                if (EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                    let tmpContainer = new UIContainer();
                    this._uiDict[key] = tmpContainer.uuid;
                    this._viewRoot.addChild(tmpContainer, parseInt(key), EnumViewType[key]);
                }
            }

            /** 加入全局触摸屏蔽层 */
            this._blockTouchLayer = new UIContainer();
            this._blockTouchLayer.addComponent<cc.BlockInputEvents>(cc.BlockInputEvents);
            cc.game.addPersistRootNode(this._blockTouchLayer);
            this._blockCount = 0;
            this.updateBlockTouch();
        }

        /** 添加阻挡 */
        public retainBlockTouch() {
            this._blockCount++;
            this.updateBlockTouch();
        }

        /** 释放阻挡 */
        public releaseBlockTouch() {
            this._blockCount--;
            this.updateBlockTouch();
        }

        private updateBlockTouch() {
            if (this._blockCount > 0)
                this._blockTouchLayer.active = true;
            else {
                this._blockTouchLayer.active = false;
                this._blockCount = 0;
            }
        }

        /**
         * 初始化UI 容器handler
         */
        private initUIContainerHandler() {
            for (var key in EnumViewType) {
                if (EnumViewType.hasOwnProperty(key) && isNaN(parseInt(key))) {
                    let handlerClassObj = getDefinitionByName(`xgame.${key}ContainerHandler`);
                    if (!handlerClassObj)
                        handlerClassObj = getDefinitionByName(`xgame.ContainerHandler`);
                    this._containerHandlerDict[EnumViewType[key]] = new handlerClassObj();
                }
            }
        }

        private refreshRanderZIndex(targetUINode: cc.Node) {
            let baseCom: xgame.IBaseUI = targetUINode.getComponent(targetUINode.name);
            let maxZIndex = targetUINode.zIndex;
            let tmpContainer = targetUINode.parent;
            if (baseCom.config && baseCom.config.zIndexType == EnumBaseUIZIndexType.top) {
                tmpContainer.children.forEach((value: cc.Node, index: number, array: cc.Node[]) => {
                    maxZIndex = maxZIndex < value.zIndex ? value.zIndex : maxZIndex;
                }, this);
                targetUINode.zIndex = maxZIndex + 1;
            }
        }

        /**
         * 刷新指定uuid baseUI的渲染顺序
         * @param uuid 
         */
        public refreshZIndexByUUID(uuid: string) {
            let tmpContainer = this.getContainerByBaseUIUuid(uuid);
            let targetUINode = tmpContainer.getChildByUuid(uuid);
            if (targetUINode) {
                this.refreshRanderZIndex(targetUINode);
            }
        }

        /**
         * 获取指定uuid的容器对象
         * @param uuid baseUI的uuid
         */
        private getContainerByBaseUIUuid(uuid: string): cc.Node {
            for (var key in EnumViewType) {
                if (EnumViewType.hasOwnProperty(key) && !isNaN(parseInt(key))) {
                    let containerUUID = this._uiDict[key];
                    let tmpContainer = this._viewRoot.getChildByUuid(containerUUID);
                    let targetUINode = tmpContainer.getChildByUuid(uuid);
                    if (targetUINode) {
                        return tmpContainer;
                    }
                }
            }
            return null;
        }

        /**
         * 更具名字获得类型
         * @param viewName ui名字
         */
        private getTypeByName(viewName: string): EnumViewType {
            let type: EnumViewType = null;
            for (var enumValue in EnumViewType) {
                if (EnumViewType.hasOwnProperty(enumValue) && !isNaN(parseInt(enumValue))) {
                    let tmpTypeName = EnumViewType[enumValue];
                    if (viewName.substring(0, tmpTypeName.length) == tmpTypeName) {
                        type = EnumViewType[tmpTypeName];
                        break;
                    }
                }
            }
            return type;
        }

        /**
         * 获得弹出窗口数量
         */
        public getBoardCount(): number {
            return this._containerHandlerDict[xgame.EnumViewType.Board].getActiveCount();
        }

        /**
         * 获得tips提示窗口数量
         */
        public getTipsCount(): number {
            return this._containerHandlerDict[xgame.EnumViewType.Tips].getActiveCount();
        }

        /**
         * 根据类型获得窗口数量
         */
        public getViewCountByType(type: xgame.EnumViewType): number {
            return this._containerHandlerDict[type].getActiveCount();
        }

        public hasViewLayer(): boolean {
            let layerContainer: LayerContainerHandler = this._containerHandlerDict[xgame.EnumViewType.Layer] as LayerContainerHandler;
            return !!(layerContainer.curUUID);
        }

        /**
         * 关闭顶层UI
         * @returns 是否成功返回
         */
        public closeTopLevelView(): boolean {
            let typeNodes = this._viewRoot.children;
            for (let index = typeNodes.length - 1; index >= 0; index--) {
                let typeChilds = typeNodes[index].children;
                for (let indey = typeChilds.length - 1; indey >= 0; indey--) {
                    let viewNode = typeChilds[indey];
                    let baseCom: xgame.IBaseUI = viewNode.getComponent(viewNode.name);
                    if (baseCom) {
                        if (baseCom.onBack()) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }
}