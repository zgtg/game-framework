namespace xgame.mgr {
    /**
     * UI资源管理器
     */
    export class UIAssetsMgr extends cc.EventTarget implements IMgr {
        isFinish: boolean;

        onUpdate(dt: XGameUpdateData): void {
        }

        start(): void {
        }
        async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[SystemMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            return this.isFinish = true;
        }

        static async loadRes(prefabUrl: string): Promise<cc.Prefab> {
            let loadedResource = await loadRes<cc.Prefab>(prefabUrl, cc.Prefab);
            return loadedResource;
        }

        static removeView(node: cc.Node) {
            node.destroy();
            cc.loader.releaseRes(`${xgame.mgr.UIMgr.defaultPath}${node.name}`, cc.Prefab);
            cc.loader.releaseResDir(`textures/autoResources/${node.name.toLocaleLowerCase()}`, cc.SpriteFrame);
            // let prefabUrl = `${xgame.mgr.UIMgr.defaultPath}${node.name}`;
            // let uuids = [
            //     "6a905180-3010-46a8-b904-64689b99f3ef",
            //     "f5981078-77bb-4ff5-a8d4-9c13e75478ff",
            //     "08239367-2517-4e1e-b77a-2101158405db",
            //     "f3f77813-5c3a-42f2-975d-9bb8d8d036ff",
            //     "4003a80e-06a6-47ea-a980-4f1bb2aa133b",
            //     "26384df7-408e-4ce5-8de8-c17939739182",
            //     "21c63689-c65f-4cbc-a0ad-9effdb8d2ce7",
            //     "e3214bba-15ec-43ec-8df5-0058d0fa7524",
            //     "8fefa5cc-84c3-4016-865c-1b2aa3ec5b69",
            //     "0bdccf1d-9a0c-4be2-b8f4-5114d1bbb819",
            //     "d1a07105-63af-473b-aa08-6ffd4ae758f8",
            //     "d41e99ca-f4be-4cd6-a7d2-4c126b78ad1b",
            //     "52d895b8-2d0d-44b8-ae74-4d7c606764f8",
            //     "14cdd936-8b08-456e-af51-4f318304e074",
            //     "e942162a-dcea-430b-9c38-e3836c6d936d",
            //     "87381bab-7116-4e9e-92af-e026c3e3c80f",
            //     "7538ee89-e49a-444a-8b05-4803b9612afc",
            //     "49f14108-566f-4408-a55f-088f8d7a3174",
            // ]
            // let filesDependsMap = {};
            // uuids.map((uuid: string)=>{
            //     let dependsKey = cc.loader["_getReferenceKey"](uuid);
            //     filesDependsMap[dependsKey] = true;
            // })
            // var deps = cc.loader.getDependsRecursively(prefabUrl);
            // deps = deps.filter((dependUuid: string) => {
            //     return filesDependsMap[dependUuid];
            // })
            // cc.loader.release(deps);
            // cc.loader.releaseRes(`${xgame.mgr.UIMgr.defaultPath}${node.name}`, cc.Prefab);
        }

        reset(): void {
        }

        dispose(): void {
        }
    }
}