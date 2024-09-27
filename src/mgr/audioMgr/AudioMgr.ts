namespace xgame.mgr {

    /**
     * 缓存当前播放情况
     */
    interface ICacleAudioPlaying {
        hashCode: number,
        key: string,
        onEnded?: () => void,
        audio: any,
        needResume: boolean,
    }

    /**
     * 游戏音乐控制器
     */
    export class AudioMgr implements IMgr {

        /**统一音频延迟播放时间差（毫秒） */
        static sameKeyDelayPlayTime: number = 50;

        /**记录缓存当前播放的音乐KEY，保证在一定阀值内不会重复播放同一音效而导致性能下降或崩溃 */
        _cacheAudioKey: { [key: string]: number } = {};

        isFinish: boolean;

        /** 缓存播放对象 */
        _wxAudioCache: Array<InnerAudioContext> = [];

        /** 缓存正在播放的音乐对象 */
        _wxPlayingCache: { [hashCode: number]: ICacleAudioPlaying } = {};

        /** 等待恢复对象 */
        _waitPlayInfo: { [hashCode: number]: string } = {};

        /**暂停记录KEY */
        _pauseCodeDict: { [hashCode: number]: boolean } = {};

        /**
         * 后台暂停KEY
         */
        private _backgroundPauseKey: number = null;
        //背景音乐key
        strMusicKey:string = null;
        // 音乐音量
        private _musicOpen: boolean = true;
        public get musicOpen(): boolean {
            return this._musicOpen;
        }
        public set musicOpen(value: boolean) {
            this._musicOpen = value;
            xgame.openLog && console.log(`[音量大小]---${this._musicEffecOpen}`);
            this.updateMusicOpen();

        }
        // 音效音量
        private _musicEffecOpen: boolean = true;
        public get musicEffecOpen(): boolean {
            return this._musicEffecOpen;
        }
        public set musicEffecOpen(value: boolean) {
            this._musicEffecOpen = value;
            xgame.openLog && console.log(`[音效大小]---${this._musicEffecOpen}`);
        }


        onUpdate(dt: XGameUpdateData): void {
        }

        start(): void {
        }

        async init(): Promise<boolean> {
            if (!xgame.getXGame().platform.isFinish)
                return false;
            xgame.getXGame().platform.platformObj.addOnShow(() => { this.resume(this._backgroundPauseKey) });
            xgame.getXGame().platform.platformObj.addOnHide(() => { this._backgroundPauseKey = this.pause() });
            // xgame.getXGame().platform.platformObj.onAudioInterruptionBegin(() => { this.resume() });
            // xgame.getXGame().platform.platformObj.onAudioInterruptionEnd(() => { this.pause() });
            return this.isFinish = true;
        }

        /**
         * 恢复音乐播放
         * @param hashCode 为null表示强制恢复音乐，会清除之前所有的暂停记录
         */
        public resume(hashCode: number = null) {
            xgame.openLog && console.log(`[AudioMgr.resume] : 回到游戏中... 恢复音乐`);

            if (hashCode != null) {
                if (!this._pauseCodeDict[hashCode]) {
                    return;
                }
                else {
                    delete this._pauseCodeDict[hashCode];
                }
            }
            else {
                this._pauseCodeDict = {};
            }

            xgame.openLog && console.log(`[AudioMgr.resume] 恢复背景音乐key:${JSON.stringify(this._pauseCodeDict)}`);

            if (Object.keys(this._pauseCodeDict).length > 0) {
                return;
            }

            if (!this._musicOpen)
                return;

            for (const key in this._waitPlayInfo) {
                const element: string = this._waitPlayInfo[key];
                this.playAudio(element, null, true, 1, parseInt(key));
                console.log("[AudioMgr.resume] 恢复音乐 =>",key);
                xgame.openLog && console.log(`[AudioMgr.resume] 恢复音乐 => ${element} hashCode:${parseInt(key)}`);
            }
            if (cc.sys.os == cc.sys.OS_IOS){
                cc.audioEngine.resumeAllEffects();
                if( !cc.audioEngine.isMusicPlaying() && this.strMusicKey){
                    //重新恢复背景音乐
                    let tmpAudio: cc.AudioClip = cc.loader.getRes(this.strMusicKey, cc.AudioClip);
                    cc.audioEngine.playMusic(tmpAudio,true);
                }
                
            }else if(cc.sys.os == cc.sys.OS_ANDROID){
                cc.audioEngine.resumeAll();
            }
            this._waitPlayInfo = {};
        }

        public pause(): number {
            xgame.openLog && console.log(`[AudioMgr.pause] : 游戏进入后台... 暂停音乐`);
            for (const key in this._wxPlayingCache) {
                const element: ICacleAudioPlaying = this._wxPlayingCache[key];
                this.stopAudio(element.hashCode);
                if (element.needResume) {
                    this._waitPlayInfo[element.hashCode] = element.key;
                }
                xgame.openLog && console.log(`[AudioMgr.pause] 停止音乐 => ${element.key} hashCode:${parseInt(key)}`);
            }
            let hashCodeKey = xgame.MathTools.getHashCode();
            this._pauseCodeDict[hashCodeKey] = true;
            
            if (cc.sys.os == cc.sys.OS_IOS){
                cc.audioEngine.pauseAllEffects();
                
                /** 暂停背景音乐 ,(由于调用 cc.audioEngine.pauseAll(),恢复播放时背景音乐有加速bug，所以需要停止音乐，恢复播放时重新播放，避免切回前台出现播放错乱) */
                if(cc.audioEngine.isMusicPlaying()){
                    cc.audioEngine.stopMusic();
                }
                
            }else if(cc.sys.os == cc.sys.OS_ANDROID){
                cc.audioEngine.pauseAll();
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME){

            }

           
            return hashCodeKey;
        }

      
        updateMusicOpen() {
            if (this._musicOpen)
                this.resume();
            else
                this.pause();
        }

        reset(): void {

        }

        dispose(): void {
            for (let cache in this._wxPlayingCache) {
                this._wxPlayingCache[cache].audio.destroy();
            }

            if (this._wxAudioCache.length > 0) {
                for (let index = 0; index < this._wxAudioCache.length; index++) {
                    this._wxAudioCache[index].destroy();
                }
            }
        }

        public stopMusic() {
            for (const key in this._wxPlayingCache) {
                const element: ICacleAudioPlaying = this._wxPlayingCache[key];
                this.stopAudio(element.hashCode);
            }
            cc.audioEngine.stopMusic();
        }

        public async playAudio(key: string, call: (hashCode: number) => void = null, loop: boolean = false, vol: number = 1, hashCode: number = xgame.MathTools.getHashCode()) {
            //处理音乐开关
            if (!this._musicOpen && loop) {
                this._waitPlayInfo[xgame.MathTools.getHashCode()] = key;
                return;
            }

            //处理音效
            if (!this._musicEffecOpen && !loop) {
                return;
            }

            if (!loop && this._cacheAudioKey[key] && Date.now() - this._cacheAudioKey[key] < AudioMgr.sameKeyDelayPlayTime) {
                xgame.openLog && console.warn(`[AudioMgr.playAudio] 在${Date.now() - this._cacheAudioKey[key]}毫秒之前有同一音频播放:${key}`);
                call && call(null);
                return;
            }
            this._cacheAudioKey[key] = Date.now();

            let tmpAudio: cc.AudioClip = cc.loader.getRes(key, cc.AudioClip);
            let useUrl = '';
            if (!tmpAudio) {
                xgame.loadRes<cc.AudioClip>(key, cc.AudioClip);
                useUrl = getAssetRemoteUrl(key);
            }
            else {
                useUrl = tmpAudio.nativeUrl;
            }

            // //处理失败情况
            // if (!tmpAudio) {
            //     console.error(`[AudioMgr.playAudioByCall] : 获取音乐失败 key : ${key}`);
            //     call && call(null);
            //     return;
            // }

            
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                // xgame.openLog && console.log(`[AudioMgr.playAudio] useUrl:${useUrl}`);
                hashCode = this._wxPlayAudio(key, useUrl, loop, vol, hashCode);
            }
            else {
                tmpAudio = await xgame.loadRes<cc.AudioClip>(key, cc.AudioClip);
                if(tmpAudio){
                    if (loop){
                        hashCode = cc.audioEngine.playMusic(tmpAudio, loop);
                        this.strMusicKey = key;
                    }
                    else{

                        if(cc.sys.os == cc.sys.OS_IOS){
                            hashCode = cc.audioEngine.playEffect(tmpAudio,loop);
                        }else{
                            hashCode = cc.audioEngine.play(tmpAudio, loop, vol);
                        }
                    }
                }else{
                    console.error("playAudio key load fail! key:",key);
                }
               
            }
            call && call(hashCode);
        }

        private _wxPlayAudio(key: string, url: string, loop: boolean = false, vol: number = 1, hashCode: number = xgame.MathTools.getHashCode()): number {
            if (url.indexOf('https://') == -1) {
                let srcUrl = url.replace(`.mp3`, '');
                let replaceUrl = url.replace(new RegExp(`/`, "g"), '-').replace(`.mp3`, '');
                url = `${wx.env.USER_DATA_PATH + '/gamecaches'}/${url}`;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                url = url.replace(srcUrl, replaceUrl);
            }
            xgame.openLog && console.log(`[AudioMgr._wxPlayAudio] : ${url}`);
            let audio = this._getWxCacheInnerAudioContext();
            audio.src = url;
            // audio.src = 'https://gamecdn.auvchat.com/res/gameRemoteRes/crimsonland/1.0.0//res/raw-assets/b6/b619ebc8-df86-49cb-978f-8972bcacc637.831f1.mp3';
            audio.loop = loop;
            audio.volume = vol;
            audio.play();
            let onEndedFun = () => {
                // xgame.openLog && console.log(`[AudioMgr._wxPlayingCache] 播放自然结束 ${url},hashCode = ${hashCode}`);
                let audioInfo = this._wxPlayingCache[hashCode];
                if (this._wxPlayingCache[hashCode])
                    delete this._wxPlayingCache[hashCode];
                if (audioInfo) {
                    audioInfo.audio.offEnded(audioInfo.onEnded);
                    this._cacheInnerAudioContext(audioInfo.audio);
                }

            };
            this._wxPlayingCache[hashCode] = {
                hashCode: hashCode,
                key: key,
                onEnded: onEndedFun,
                audio: audio,
                needResume: loop
            };
            // xgame.openLog && console.log(`[_wxPlayingCache] 启动播放完成 ${url} hashCode:${hashCode}`);
            audio.onEnded(onEndedFun);
            return hashCode;
        }

        private _getWxCacheInnerAudioContext(): InnerAudioContext {
            // xgame.openLog && console.log(`[AudioMgr._getWxCacheInnerAudioContext] 获取 缓存池数量: ${this._wxAudioCache.length} 播放中数量:${Object.keys(this._wxPlayingCache).length}`);
            // if (CC_QQPLAY) {
            //     if (this._wxAudioCache.length > 0) {
            //         let audioObj = this._wxAudioCache.pop();
            //         // audioObj.pause();
            //         return audioObj;
            //     }
            //     else {
            //         return wx.createInnerAudioContext();
            //     }
            // }
            //微信小游戏端使用缓存audio对象会导致从后台恢复后缓存对象原来的音乐继续播放问题
            if (cc.sys.platform === cc.sys.WECHAT_GAME)
                return wx.createInnerAudioContext();
        }

        private _cacheInnerAudioContext(audio: InnerAudioContext) {
            // xgame.openLog && console.log(`[AudioMgr._getWxCacheInnerAudioContext] 缓存 缓存池数量: ${this._wxAudioCache.length + 1} 播放中数量:${Object.keys(this._wxPlayingCache).length}`);
            // if (CC_QQPLAY)
            //     this._wxAudioCache.push(audio);
            //微信小游戏端使用缓存audio对象会导致从后台恢复后缓存对象原来的音乐继续播放问题
            if (cc.sys.platform === cc.sys.WECHAT_GAME)
                audio.destroy();
        }

        public stopAudio(hashCode: number) {
            // xgame.openLog && console.log(`[AudioMgr.stopAudio] 停止播放 ${hashCode}`);
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                if (this._wxPlayingCache[hashCode]) {
                    let audioCache: InnerAudioContext = this._wxPlayingCache[hashCode].audio;
                    if (audioCache) {
                        xgame.openLog && console.log(`[AudioMgr.stopAudio] - hashCode:${hashCode}`);
                        audioCache.pause();
                        this._cacheInnerAudioContext(this._wxPlayingCache[hashCode].audio);
                        delete this._wxPlayingCache[hashCode];
                    }
                }

            }
            else {
                cc.audioEngine.stop(hashCode);
            }
        }
    }
}