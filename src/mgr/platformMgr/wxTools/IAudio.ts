namespace xgame {

    //播放完成回调
    export let sound_complete: string = "SOUND_COMPLETE";


    export abstract class IAudio extends cc.EventTarget {

        //启动游戏传入的url
        public abstract url: string;

        //播放音乐
        public abstract async play(playStartTime?: number, isLoop?: boolean, isSeek?: boolean): Promise<void>;

        //停止音乐
        public abstract async pause();

        //销毁
        public abstract async dispose();

    }
}

