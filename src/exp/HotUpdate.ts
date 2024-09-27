/**
 * 热更新包装cocos
 */
namespace xgame {

    /**
     * 生成热更新
     */
    export class HotUpdate {

        /** 资源管理器 */
        //@ts-ignore
        private _jam: jsb.AssetsManager = null;

        /** 本地存档路径 */
        private _storagePath: string = null;

        /** 是否更新中 */
        _updating: boolean = false;

        /**
         * 热更新模块
         * @param projectMainfestPath 本地默认资源版本文件路径
         * @param version 本地包版本
         * @param clearNativeData 本地宝版本不同是否清除缓存资源
         */
        public constructor(projectMainfestPath: string) {

            if (projectMainfestPath == null && projectMainfestPath || projectMainfestPath == "") {
                console.error('本地清单文件地址错误 : ' + projectMainfestPath);
                return;
            }

            //先处理本地是否删除问题
            this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'xgameRemoteAsset');
            console.log(`[HotUpdate new] 本地热更新路径:${this._storagePath} `);
            console.log('远程资源下载到本地路径 : ' + this._storagePath);
            console.log('本地清单文件地址 : ' + projectMainfestPath);

            // 获取本地mainfest文件路径
            var url = projectMainfestPath;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._jam = new jsb.AssetsManager(url, this._storagePath, this.compareVersion);
            this._jam.setVerifyCallback(this.verifyCallback);
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                // Some Android device may slow down the download process when concurrent tasks is too much.
                // The value may not be accurate, please do more test and find what's most suitable for your game.
                this._jam.setMaxConcurrentTask(2);
            }
        }

        /**
         * 在热更新前先检查版本
         * 检查大版本是否变化，变化后清除本地更新资源
         * @param version 
         */
        public static checkPackageVersion(version: string): boolean {
            if (!cc.sys.isNative)
                return false;
            // 之前版本保存在 local Storage 中的版本号，如果没有认为是旧版本
            let nativeVersionKey = 'xgame_native_version';
            var previousVersion = cc.sys.localStorage.getItem(nativeVersionKey);
            let storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'xgameRemoteAsset');
            // game.currentVersion 为该版本的常量
            if (previousVersion != version) {
                // 热更新的储存路径，如果旧版本中有多个，可能需要记录在列表中，全部清理
                jsb.fileUtils.removeDirectory(storagePath);
                console.log(`[HotUpdate] 删除本地目录:${storagePath}`);
            }
            cc.sys.localStorage.setItem(nativeVersionKey, version);
            console.log(`[HotUpdate] 本地版本发生变化，清除本地下载缓存数据:${previousVersion} ${version} ${previousVersion != version}`);
            return previousVersion != version;
        }

        /**
         * 检查是否需要热更新
         */
        public async checkUpdate(): Promise<boolean> {

            if (this._updating) {
                console.log(`[HotUpdate] 已经在更新中 ...`);
                return true;
            }

            return new Promise<boolean>((resolve: (value?: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void) => {
                //更新回调
                let result = false;
                let checkCb = (event) => {
                    console.log('[HotUpdate] 检查更新回调 Code: ' + event.getEventCode());
                    switch (event.getEventCode()) {
                        case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                            console.error(`[HotUpdate] 未找到本地资源清单文件...`);
                            break;
                        case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                        case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                            console.error(`[HotUpdate] 下载远程清单文件失败...`);
                            break;
                        case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                            console.warn(`[HotUpdate] 已经是远程最新文件，无需更新...`);
                            break;
                        case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                            console.log(`[HotUpdate] 发现新资源，可以更新!`);
                            result = true;
                            break;
                        default:
                            return;
                    }

                    this._jam.setEventCallback(null);
                    this._updating = false;
                    resolve(result);
                }

                //未加载清单文件则开始加载清单文件
                if (!this._jam.getLocalManifest() || !this._jam.getLocalManifest().isLoaded()) {
                    console.error(`[HotUpdate] 清单文件加载失败 ...`);
                    resolve(result);
                    return;
                }

                console.log(`[HotUpdate] 开始检查更新文件...`);
                this._jam.setEventCallback(checkCb);
                this._jam.checkUpdate();
                this._updating = true;
            });
        }

        /**
         * 开始热更新
         * @param progressCall 更新进度回调
         * @return 更新结果
         */
        public async startHotUpdate(progressCall?: (ratio: number) => void): Promise<boolean> {
            if (this._updating) {
                console.log(`[HotUpdate] Checking or updating ...`);
                progressCall && progressCall(1);
                return false;
            }
            return new Promise<boolean>((resolve: (value?: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void) => {
                if (this._jam && !this._updating) {
                    let updateCb = (event) => {
                        var needRestart = false;
                        var failed = false;
                        switch (event.getEventCode()) {
                            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                                console.error(`[HotUpdate] 未找到本地资源清单文件...`);
                                failed = true;
                                break;
                            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                                console.log(`[HotUpdate] 进度:${event.getPercent()} 文件:${event.getPercentByFile()}`);
                                console.log(`[HotUpdate] 数量进度:${event.getDownloadedFiles() / event.getTotalFiles()}`);
                                console.log(`[HotUpdate] 大小进度:${event.getDownloadedBytes() / event.getTotalBytes()}`);
                                progressCall && progressCall(isNaN(event.getPercent()) ? 0 : event.getPercent());
                                var msg = event.getMessage();
                                if (msg) {
                                    console.log(`[HotUpdate] 更新 :${msg}`);
                                }
                                break;
                            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                                console.error(`[HotUpdate] 下载远程清单文件失败...`);
                                failed = true;
                                break;
                            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                                console.warn(`[HotUpdate] 已经是远程最新文件，无需更新...`);
                                failed = true;
                                break;
                            case jsb.EventAssetsManager.ERROR_UPDATING:
                                console.warn(`[HotUpdate] 错误更新 AssetId:${event.getAssetId()} info:${event.getMessage()}`);
                                break;
                            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                                console.warn(`[HotUpdate] 解压失败 info:${event.getMessage()}`);
                                break;
                            case jsb.EventAssetsManager.UPDATE_FINISHED:
                                console.warn(`[HotUpdate] 无需更新完成 : ${event.getMessage()}`);
                                needRestart = true;
                                break;
                            case jsb.EventAssetsManager.UPDATE_FAILED:
                                console.warn(`[HotUpdate] 更新失败 : ${event.getMessage()}`);
                                failed = true;
                                break;
                            default:
                                break;
                        }

                        if (failed) {
                            this._jam.setEventCallback(null);
                            this._updating = false;
                            resolve(false);
                        }
                        if (needRestart) {
                            this._jam.setEventCallback(null);
                            progressCall && progressCall(1);
                            this._updating = false;
                            resolve(true);
                        }
                    }

                    this._jam.setEventCallback(updateCb);
                    this._jam.update();
                    this._updating = true;
                }
                return true;
            });
        }

        /**
         * 版本比较函数 - 提供给cocos框架
         * @param versionA 
         * @param versionB 
         */
        private compareVersion(versionA: string, versionB: string) {
            // Setup your own version compare handler, versionA and B is versions in string
            // if the return value greater than 0, versionA is greater than B,
            // if the return value equals 0, versionA equals to B,
            // if the return value smaller than 0, versionA is smaller than B.
            cc.log(`[HotUpdate.compareVersion] 版本比较 版本 A : ${versionA} 版本 B : ${versionB}`);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || '0');
                isNaN(a) && (a = 0);
                isNaN(b) && (b = 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        }

        private verifyCallback(path: string, asset: any) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;

            try {
                //@ts-ignore
                let fileData: Uint8Array = jsb.fileUtils.getDataFromFile(path);
                let fileMD5Value = MD5(fileData);
                // console.log("[HotUpdate.verifyCallback] : MD5 " + expectedMD5 + '->' + fileMD5Value + " url:" + path);
                if (fileMD5Value == expectedMD5)
                    console.log(`[资源下载失败MD5] 校验成功 ${path}`);
                else {
                    console.error(`[资源下载失败MD5] 校验失败 ${path}`);
                }
                return fileMD5Value == expectedMD5;
            }
            catch (e) {
                return false;
            }
        }

        private clearLocalRes(nativeVersion: string): boolean {
            // 之前版本保存在 local Storage 中的版本号，如果没有认为是旧版本
            let nativeVersionKey = 'xgame_native_version';
            var previousVersion = cc.sys.localStorage.getItem(nativeVersionKey);
            // game.currentVersion 为该版本的常量
            if (previousVersion != nativeVersion) {
                // 热更新的储存路径，如果旧版本中有多个，可能需要记录在列表中，全部清理
                jsb.fileUtils.removeDirectory(this._storagePath);
                console.log(`[HotUpdate] 删除本地目录:${this._storagePath}`);
            }
            cc.sys.localStorage.setItem(nativeVersionKey, nativeVersion);
            console.log(`[HotUpdate] 本地版本发生变化，清除本地下载缓存数据:${previousVersion} ${nativeVersion}`);
            return previousVersion != nativeVersion;
        }

        public dispose() {
            console.warn(`销毁热更新对象!`);
            delete this._jam;
        }
    }

}