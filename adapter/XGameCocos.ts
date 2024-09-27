/**
 * 合并命名空间
 * @param globalObjName window下对象名字
 * @param fixObj 
 */
function fixNameSpace(globalObjName: string, fixObj: any) {
    if (!window[globalObjName]) {
        window[globalObjName] = fixObj;
    }
    else {
        xgame.fixData(window[globalObjName], fixObj);
    }
}

/**
 * 监听cocos框架初始化完成，开始初始化游戏引擎框架
 * 游戏代码加载完成后记录时间
 */
cc.game.once(cc.game.EVENT_ENGINE_INITED, async () => {

    fixNameSpace('xgame', xgame);
    xgame.fixData(xgame['eventKey'], xgame.eventKey);
    xgame.fixData(xgame['platform'], xgame.platform);
    xgame.fixData(xgame['mgr'], xgame.mgr);
    xgame.fixData(xgame['WXTools'], xgame.WXTools);

    console.log(`挂载 xgame 模块成功！`);
    xgame.ccStartTime = xgame.getTimer();
    xgame.openLog && console.log(`[XGameCocos] : cocos 引擎初始化完成`);
    let beginTime = xgame.getTimer();
    xgame.openLog && console.log(`[XGameCocos] : 开始初始化 xgame`);
    xgame.getXGame().init();
    await xgame.getXGame().waitInit();
    xgame.openLog && console.log(`[XGameCocos] : xgame框架初始化完成 耗时:${xgame.getTimer() - beginTime} ms`);
});

