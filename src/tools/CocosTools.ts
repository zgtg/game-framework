namespace xgame {

    /**
     * 远程资源路径
     */
    export let REMOTE_URL = '';

    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    export async function loadDir<T extends cc.Asset>(resUrl: string, type?: typeof cc.Asset): Promise<T[]> {
        xgame.openLog && console.log(`[xgame.loadDir] : 加载 : ${resUrl}`);
        return new Promise<T[]>(function (resolve, reject) {
            let loadOver = (error: Error, resource: any[], urls: string[]) => {
                // xgame.openLog && console.log(`[xgame.loadDir] : loadOver ${resUrl} -> ${JSON.stringify(error)} ${urls}`);
                if (!error)
                    resolve(resource);
                else {
                    xgame.openLog && console.error(`[xgame.loadDir] : err load ${resUrl} -> ${JSON.stringify(urls)}`);
                    resolve(null);
                }
            }
            // xgame.openLog && console.log(`[xgame.loadDir] : loadDir加载 ${resUrl}`);
            let progressCall = (completedCount: number, totalCount: number, item: any) => {
                // xgame.openLog && console.log(`[xgame.loadDir] : loadDir加载 ${resUrl} progress:${completedCount}/${totalCount}`);
            }
            if (type) {
                cc.loader.loadResDir(resUrl, type, progressCall, loadOver);
            }
            else {
                cc.loader.loadResDir(resUrl, progressCall, loadOver);
            }
        });
    }

    export async function loadResWithCount<T extends cc.Asset>(resUrl: string, type?: typeof cc.Asset, count: number = 10): Promise<T> {
        let result: T = null;
        for (let index = 0; index < count && !result; index++) {
            result = await xgame.loadRes<T>(resUrl, type);
        }
        return result;
    }

    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    export async function loadRes<T extends cc.Asset>(resUrl: string, type?: typeof cc.Asset, call?: (data: T) => void): Promise<T> {
        xgame.openLog && console.log(`[xgame.loadRes] : 加载 : ${resUrl}`);
        let resData = null;
        if (type) {
            resData = cc.loader.getRes(resUrl, type);
        }
        if (resData) {
            call && call(resData);
            return resData;
        }

        return new Promise<T>(function (resolve, reject) {
            let loadOver = (errorMessage: Error, loadedResource: T) => {
                // xgame.openLog && console.log(`[xgame.loadRes] : loadOver ${resUrl} -> ${JSON.stringify(errorMessage)} ${loadedResource}`);
                if (!errorMessage) {
                    call && call(loadedResource);
                    resolve(loadedResource);
                }
                else {
                    xgame.openLog && console.error(`[xgame.loadRes] : err load ${resUrl} -> ${JSON.stringify(errorMessage)}`);
                    call && call(null);
                    resolve(null);
                }
            }
            // xgame.openLog && console.log(`[xgame.loadRes] : load加载 ${resUrl}`);
            let progressCall = (completedCount: number, totalCount: number, item: any) => {
                // xgame.openLog && console.log(`[xgame.loadRes] : load加载 ${resUrl} progress:${completedCount}/${totalCount}`);
            }
            if (type) {
                cc.loader.loadRes(resUrl, type, progressCall, loadOver);
            }
            else {
                cc.loader.loadRes(resUrl, progressCall, loadOver);
            }
        });
    }

    /**
     * 包装cocos加载资源为 await/async 方式
     * @param prefabUrl 资源url
     */
    export async function loadUrl<T extends cc.Asset | cc.Texture2D>(resUrl: string, type?: string): Promise<T> {
        xgame.openLog && console.log(`[xgame.loadUrl] : 远程加载 : ${resUrl}`);
        return new Promise<T>(function (resolve, reject) {
            let loadOver = (errorMessage: Error, loadedResource: T) => {
                if (!errorMessage)
                    resolve(loadedResource);
                else {
                    cc.error(JSON.stringify(errorMessage));
                    resolve(null);
                }
            }
            if (type)
                cc.loader.load({ url: resUrl, type: type }, loadOver);
            else
                cc.loader.load(resUrl, loadOver);

        });
    }

    /**
     * 等待指定时间（毫秒）
     * @param time 等待的时间（毫秒）
     */
    export async function wait(time: number = 1): Promise<null> {
        return new Promise<null>(function (resolve, reject) {
            setTimeout(() => {
                resolve(null);
            }, time);
        });
    }

    /**
     * 获取cocos资源的远程路径
     * @param key asset 的名字
     */
    export function getAssetRemoteUrl(key: string): string {
        // return new Promise<string>(function (resolve, reject) {
        //     let uuid = cc.loader['_getResUuid'](key, undefined, !0);
        //     cc['AssetLibrary'].queryAssetInfo(uuid, function (a: any, url: string, boolValue: boolean) {
        //         resolve(REMOTE_URL + url);
        //     });
        // });
        return REMOTE_URL + "/" + key + '.mp3';

    }

    // 震屏效果
    // 参数：duration 震屏时间
    export function shakeEffect(duration: number, shakeY: number = 10, node: cc.Node) {
        if (!node || !node.isValid)
            return;
        if (node.getNumberOfRunningActions() > 0) {
            return;
        }
        let sv = cc.v3(0, shakeY);
        node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (0 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (1 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (2 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (3 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (4 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (5 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (6 * 3) % 8)),
                    cc.moveBy(0.02, sv.rotate(Math.PI / 4 * (7 * 3) % 8)),
                )
            )
        );

        setTimeout(() => {
            if (node.isValid)
                node.stopAllActions();
            //this.followCom.node.setPosition(0, 0);
        }, duration * 1000);
    }

    /**
     * 指定锚点转换到世界坐标系
     * @param node 
     * @param anchor 
     */
    export function convertToWorldSpaceByAR(node: cc.Node, anchor: cc.Vec2 = cc.v2(0, 0)): cc.Vec2 {
        let worldPox: cc.Vec2 = node.convertToWorldSpaceAR(cc.v2(0, 0));
        anchor.x = node.anchorX - anchor.x;
        anchor.y = node.anchorY - anchor.y;
        worldPox.subSelf(cc.v2(node.width * anchor.x, node.height * anchor.y));
        return worldPox;
    }

    /**
     * 指定锚点转换到节点坐标系
     * @param node 
     * @param anchor 
     */
    export function convertToNodeSpaceByAR(node: cc.Node, worldPos: cc.Vec2, anchor: cc.Vec2 = cc.v2(0, 0)): cc.Vec2 {
        let nodePos: cc.Vec2 = node.convertToNodeSpaceAR(worldPos);
        anchor.x = node.anchorX - anchor.x;
        anchor.y = node.anchorY - anchor.y;
        nodePos.addSelf(cc.v2(node.width * anchor.x, node.height * anchor.y));
        return nodePos;
    }
}