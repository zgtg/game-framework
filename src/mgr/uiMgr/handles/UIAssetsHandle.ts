namespace xgame {
    export enum IEnumUIResType {
        prefab, //预制体
        texture,//纹理
    }

    export interface TypeAssetsConfig {
        [EnumUIResType: number]: string[], //预制体UUID数组 纹理UUID数组
    }

    export interface UIAssetsConfig {
        [uiName: string]: TypeAssetsConfig,
    }
}

namespace xgame {

    /**
     * UI资源管理器
     */
    export class UIAssetsHandle {
        isFinish: boolean;

        assetsCfg: UIAssetsConfig = null;

        onUpdate(dt: XGameUpdateData): void {
        }

        start(): void {
        }

        async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[SystemMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }

            let staticJson = (await xgame.loadRes<cc.JsonAsset>('uiResConfig'))?.json;
            if (staticJson) {
                this.assetsCfg = staticJson as UIAssetsConfig;
            }
            else {
                console.warn("[UIAssetsHandle.init] 找不到UI资源信息配置：uiResConfig.json");
            }
            return this.isFinish = true;
        }

        async loadRes(prefabUrl: string): Promise<cc.Prefab> {
            let loadedResource = await loadRes<cc.Prefab>(prefabUrl, cc.Prefab);
            return loadedResource;
        }

        async removeView(nodeName: string) {
            if (!this.assetsCfg) {
                return;
            }
            cc.loader.releaseRes(`${xgame.mgr.UIMgr.defaultPath}${nodeName}`, cc.Prefab);
            let assetsCfg: xgame.TypeAssetsConfig = this.assetsCfg[nodeName.toLocaleLowerCase()] as xgame.TypeAssetsConfig;
            if (!assetsCfg) {
                console.log(`[UIAssetsHandle.removeView] 找不到 ${nodeName.toLocaleLowerCase()} 的资源信息配置`);
                return;
            }
            //先释放prefab引用的prefab资源
            assetsCfg[xgame.IEnumUIResType.prefab]?.map((uuid: string) => {
                cc.loader.release(uuid);
            })
            //再释放prefab引用的texture资源
            assetsCfg[xgame.IEnumUIResType.texture]?.map((uuid: string) => {
                cc.loader.release(uuid);
            })
        }

        reset(): void {
        }

        dispose(): void {
        }
    }
}