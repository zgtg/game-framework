namespace xgame {

    enum EnumWxAudioState {
        None,
        PlayAcion,
        PauseAction,
        ResetAction,
        Playing,
        Stop,
        Pause,
    }



    //微信音乐播放对象包装
    export class WxAudio extends IAudio {

        static delayTimeList: Array<number> = [];
        static defaultAndroidDelayTime: number = 0.48;
        static defaultIOSDelayTime: number = 0.01;
        static curPlayCount: number = 0;
        //音乐播放的url地址
        url: string;
        audio: InnerAudioContext;
        pauseTimePoint: number;

        //调试变量
        isDebug: boolean = false;
        _tempStartPlayTime: number;

        loadFinishCall: () => void;

        public constructor(url: string) {
            super();
            this.audio = wx.createInnerAudioContext();
            this.audio.autoplay = false;
            this.audio.volume = 0;
            this.url = url;
            this.audio.src = this.url;

            // 监听音频播放事件
            this.onPlay = this.onPlay.bind(this);
            this.onCanplay = this.onCanplay.bind(this);
            this.onEnded = this.onEnded.bind(this);
            this.onError = this.onError.bind(this);
            this.onPause = this.onPause.bind(this);
            this.onSeeked = this.onSeeked.bind(this);
            this.onSeeking = this.onSeeking.bind(this);
            this.onStop = this.onStop.bind(this);
            this.onWaiting = this.onWaiting.bind(this);
            this.initCall();
        }

        public initCall() {
            this.audio.onPlay(this.onPlay);
            // this.audio.onCanplay(this.onCanplay);
            this.audio.onEnded(this.onEnded);
            this.audio.onError(this.onError);
            this.audio.onPause(this.onPause);
            this.audio.onSeeked(this.onSeeked);
            // this.audio.onSeeking(this.onSeeking);
            this.audio.onStop(this.onStop);
            // this.audio.onWaiting(this.onWaiting);
        }

        public dispose() {
            WxAudio.curPlayCount--;
            this.isDebug && xgame.openLog && console.log(`${this.getAudioInfo()} - dispose`);

            this.audio.pause();
            this.audio.offPlay(this.onPlay);
            // this.audio.offCanplay(this.onCanplay);
            this.audio.offEnded(this.onEnded);
            this.audio.offError(this.onError);
            this.audio.offPause(this.onPause);
            this.audio.offSeeked(this.onSeeked);
            // this.audio.offSeeking(this.onSeeking);
            this.audio.offStop(this.onStop);
            // this.audio.offWaiting(this.onWaiting);
            // this.audio.offTimeUpdate(this.onTimeUpdate);

            delete this.onPlay;
            delete this.onCanplay;
            delete this.onEnded;
            delete this.onError;
            delete this.onPause;
            delete this.onSeeked;
            delete this.onSeeking;
            delete this.onStop;
            delete this.onWaiting;
            this.audio.destroy();
            delete this.audio;
        }

        /**
         * 播放音乐，偏移n秒的位置开始播放
         * @param  {number} offsetTime
         */
        public async play(playStartTime: number = 0, isLoop: boolean = false, isSeek: boolean = false): Promise<void> {
            if (!this.audio) {
                this.isDebug && xgame.openLog && console.error(`${this.getAudioInfo()} - 播放失败，audio == null`);
                return;
            }
            WxAudio.curPlayCount++;
            if (isLoop)
                this.audio.loop = isLoop;

            new Promise<void>((resolve, reject) => {
                let srcV = this.audio.volume;
                let startTime = xgame.getTimer();
                let posTime = 0;
                let onError = (e: any) => {
                    this.isDebug && xgame.openLog && console.error(`${this.getAudioInfo()} onError  - url:${this.url} ${JSON.stringify(e)}`);
                    this.audio.offError(onError);
                    this.audio.offPlay(onPlay);
                    this.audio.offError(onError);

                    this.audio.onPlay(this.onPlay);
                    this.destroy();
                    resolve();
                }

                let onSeek = () => {
                    this.audio.volume = srcV;
                    this.audio.offSeeked(onSeek);
                    this.audio.onSeeked(this.onSeeked);
                    this.isDebug && xgame.openLog && console.log(`${this.getAudioInfo()} seek 播放延迟时间 - seekDelayTime:${xgame.getTimer() - startTime}`);
                }


                let onPlay = () => {
                    this.audio.offPlay(onPlay);
                    this.audio.onPlay(this.onPlay);
                    this.audio.offError(onError);
                    this.audio.onError(this.onError);

                    if (isSeek) {
                        this.audio.volume = 0;
                        // let addDelayTime = xgame.getXGame().versionMgr.isAndroid() ? WxAudio.defaultAndroidDelayTime : WxAudio.defaultIOSDelayTime;
                        let addDelayTime = true ? WxAudio.defaultAndroidDelayTime : WxAudio.defaultIOSDelayTime;
                        posTime = playStartTime + (xgame.getTimer() - startTime) * 0.001 + addDelayTime;
                        this.isDebug && xgame.openLog && console.log(`${this.getAudioInfo()} seek - fiexdTime:${(xgame.getTimer() - startTime)}`);
                        this.audio.onSeeked(onSeek);
                        this.audio.seek(posTime);
                    }
                    resolve();
                }

                this.audio.offPlay(this.onPlay);
                this.audio.onPlay(onPlay);
                this.audio.offError(this.onError);
                this.audio.onError(onError);
                if (isSeek)
                    this.audio.volume = 0;
                this.isDebug && xgame.openLog && console.log(`${this.getAudioInfo()} play`);
                this.audio.play();

            });

        }

        /**
         * 暂停
         * @param  {number} offsetTime
         */
        public pause() {
            this.audio.pause();
        }

        // 监听音频进入可以播放状态的事件
        private onCanplay() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onCanplay audioTime:${this.audio.currentTime} 延迟时间:${xgame.getTimer() * 0.001 - this._tempStartPlayTime}`);
        }

        private onPlay() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onPlay audioTime:${this.audio.currentTime} 延迟时间:${xgame.getTimer() * 0.001 - this._tempStartPlayTime}`);
        }

        // 监听音频暂停事件
        private onPause() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onPause audioTime:${this.audio.currentTime} 监听音频暂停事件`);
        }

        // 监听音频停止事件
        private onStop() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onStop audioTime:${this.audio.currentTime} 监听音频停止事件`);
        }

        // 监听音频自然播放至结束的事件
        private onEnded() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onEnded audioTime:${this.audio.currentTime} 监听音频自然播放至结束的事件`);
            this.emit(xgame.sound_complete);
        }

        // 监听音频播放进度更新事件
        private onTimeUpdate(value) {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onTimeUpdate audioTime:${this.audio.currentTime} 播放进度:${value}`);
        }

        // 监听音频播放错误事件
        private onError(e: any) {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onError audioTime:${this.audio.currentTime} 监听音频播放错误事件:${e}`);
            this.destroy();
        }

        // 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
        private onWaiting() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + ` onWaiting audioTime:${this.audio.currentTime} 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发`);
        }

        // 监听音频进行跳转操作的事件
        private onSeeking() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + `onSeeking audioTime:${this.audio.currentTime} 延迟时间:${xgame.getTimer() * 0.001 - this._tempStartPlayTime}`);
        }

        // 监听音频完成跳转操作的事件
        private onSeeked() {
            this.isDebug && xgame.openLog && console.log(this.getAudioInfo() + `onSeeked audioTime:${this.audio.currentTime} 延迟时间:${xgame.getTimer() * 0.001 - this._tempStartPlayTime}`);
        }

        public getAudioInfo(): string {
            return `[WxAudio] ${WxAudio.curPlayCount} - audioUrl:${this.url}`
        }

        public destroy() {
            this.isDebug && xgame.openLog && console.log(`${this.getAudioInfo()} - destroy`);
            if (this.audio) {
                this.dispose();
            }
        }

    }
}