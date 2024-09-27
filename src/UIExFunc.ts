namespace xgame {

    /**
     * 显示一个View
     */
    export function addView<T extends xgame.IBaseData>(viewName: string | Object, data?: T, addOver?: (uuid: string) => void) {
        let type = typeof viewName;
        if (type != "string")
            viewName = xgame.getQualifiedClassName(viewName);
        return xgame.getXGame().ui.addView(xgame.mgr.UIMgr.defaultPath + viewName, data, addOver);
    }

    /**
     * 显示一个View
     */
    export async function asyncAddView<T extends xgame.IBaseData>(viewName: string | Object, data?: T): Promise<string> {
        return new Promise<string>(function (resolve, reject) {
            let addOver = (uuid: string) => {
                resolve(uuid);
            }
            addView(viewName, data, addOver);
        });
    }

    /**
     * 删除一个View
     */
    export function removeView(uuid: string): boolean {
        return xgame.getXGame().ui.removeView(uuid);
    }

    /**
         * 进入指定名字的scene
         * @param sceneName scene名字
         * @param enterOver 进入完成回调
         */
    export function enterScene(sceneName: string, enterOver?: () => void) {
        xgame.getXGame().ui.clearBoardAndTips();
        cc.director.loadScene(sceneName, enterOver);
    }

    /**
     * 是否有弹窗或tips
     */
    export function isHaveBoardOrTipsOrLayers(): boolean {
        return xgame.getXGame().ui.getBoardCount() > 0
            || xgame.getXGame().ui.getTipsCount() > 0
            || xgame.getXGame().ui.hasViewLayer();
    }

    /**
     * 设置图片精灵（安全）
     * @param sprite 
     * @param url 
     */
    export function setSpriteFrame(sprite: cc.Sprite, url: string) {
        if (!sprite || !url || url == "") {
            // console.error(`[xgame.UIExFunc.setSpriteFrame] 设置精灵为空，或者url不存在 url:${url}`);
            return;
        }

        if (url.substring(0, 4) == "http") {
            let texture2d = cc.loader.getRes(url);
            if (texture2d) {
                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                    sprite.spriteFrame = new cc.SpriteFrame(texture2d);
                }
            }
            else {
                (async () => {
                    let texture2d = await xgame.loadUrl<cc.Texture2D>(url);
                    if (sprite.isValid && sprite.node && sprite.node.isValid) {
                        sprite.spriteFrame = new cc.SpriteFrame(texture2d);
                    }
                })();
            }
        }
        else {
            let spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
            if (spriteFrame) {
                if (sprite.isValid && sprite.node && sprite.node.isValid) {
                    sprite.spriteFrame = spriteFrame;
                }
            }
            else {
                (async () => {
                    let spriteFrame = await xgame.loadRes<cc.SpriteFrame>(url, cc.SpriteFrame);
                    if (sprite.isValid && sprite.node && sprite.node.isValid) {
                        sprite.spriteFrame = spriteFrame;
                    }
                })();
            }
        }
    }


    /**
     * 获取图片精灵（安全）
     * @param sprite 
     * @param url 
     */
    export async function getSpriteFrame(url: string) {
        let res_spriteFrame: cc.SpriteFrame = null;
        if (!url || url == "") {
            // console.error(`[xgame.UIExFunc.setSpriteFrame] 设置精灵为空，或者url不存在 url:${url}`);
            return res_spriteFrame;
        }
        if (url.substring(0, 4) == "http") {
            let texture2d = cc.loader.getRes(url);
            if (texture2d) {
                res_spriteFrame = new cc.SpriteFrame(texture2d);
            } else {
                res_spriteFrame = new cc.SpriteFrame(await xgame.loadUrl<cc.Texture2D>(url));
            }
        } else {
            let spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
            if (spriteFrame) {
                res_spriteFrame = spriteFrame;
            } else {
                res_spriteFrame = await xgame.loadRes<cc.SpriteFrame>(url, cc.SpriteFrame);
            }
        }
        return res_spriteFrame;
    }

    /**
     * 添加节点
     * @param sprite 
     * @param url 
     */
    export function addPrefab(root: cc.Node, url: string) {
        if (!root || !url || url == "") {
            // console.error(`[xgame.UIExFunc.addPrefab] 设置精灵为空，或者url不存在 url:${url}`);
            return;
        }
        let node = cc.loader.getRes(url, cc.Prefab);
        if (node) {
            if (root.isValid) {
                root.addChild(cc.instantiate(node));
            }
        }
        else {
            (async () => {
                let node = await xgame.loadRes<cc.Prefab>(url, cc.Prefab);
                if (root.isValid) {
                    root.addChild(cc.instantiate(node));
                }
            })();
        }
    }

    export function destoryNodeChildrens(node: cc.Node) {
        if (node) {
            node.destroyAllChildren();
            node.removeAllChildren(true);
        }
    }
}
