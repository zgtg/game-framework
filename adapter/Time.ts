namespace xgame {

    export class TimeUitls {

        /**
         * 是否是同一天
         * @param timeA 时间A
         * @param timeB 时间B
         * @returns true 表示同一天 false 反之
         */
        public static isSameDay(timeA: number, timeB: number): boolean {
            let dataA = new Date(timeA);
            let dataB = new Date(timeB);
            return dataA.getFullYear() == dataB.getFullYear() &&
                dataA.getMonth() == dataB.getMonth() &&
                dataA.getDate() == dataB.getDate();
        }

        /**
         * 俩个时间之间有多少天
         * @param timeA 时间A
         * @param timeB 时间B
         * @returns true 表示天数差距
         */
        public static getDayCount(timeA: number, timeB: number): number {
            let dataA = new Date(timeA);
            let dataB = new Date(timeB);
            dataA.setHours(0);
            dataA.setMinutes(0);
            dataA.setSeconds(0);
            dataA.setMilliseconds(0);
            dataB.setHours(0);
            dataB.setMinutes(0);
            dataB.setSeconds(0);
            dataB.setMilliseconds(0);
            return (dataB.getTime() - dataA.getTime()) / (1000 * 3600 * 24);
        }

        /**
         * 获得两个时间之间完整的天数
         * @param timeA 
         * @param timeB 
         */
        public static getCompleteDaysBetweenTwoTimes(srcTimeA: number, srcTimeB: number): number {
            let timeA = TimeUitls.getNextDayTimeStamp(srcTimeA);
            let timeB = TimeUitls.getCurrentDayTimeStamp(srcTimeB);
            let days = (timeB - timeA) / (1000 * 3600 * 24);
            return days;
        }


        /**
         * 给定时间戳，获取该时间戳当天的凌晨时间
         */
        public static getCurrentDayTimeStamp(time: number) {
            let date = new Date(time);
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            let currentDayTime = date.getTime();
            return currentDayTime;
        }

        /**
         * 给定时间戳，获取该时间戳明天的凌晨时间
         */
        public static getNextDayTimeStamp(time: number) {
            let date = new Date(time);
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            let nextSatTime = date.getTime() + 24 * 3600 * 1000;
            return nextSatTime;
        }

        /**
         * 给定时间戳，获取该时间戳下一个周六的凌晨时间
         */
        public static getNextSatTimestamp(time: number) {
            let date = new Date(time);
            let days = 6 - date.getDay();
            if (days <= 0) {
                days += 7;
            }
            //获取今天凌晨0点时间
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            //0点时间 + 间隔天数 * 每天毫秒数
            let nextSatTime = date.getTime() + days * (24 * 3600 * 1000);
            return nextSatTime;
        }
    }

    /**
     * 引擎初始化时间
     */
    export let ccStartTime: number = 0;

    /**
     * 获取时间
     */
    export function getTimer(): number {
        return Date.now() - ccStartTime;
    }

    /**
     * 时间记录器
     */
    export class XGameTimer {

        private _timeArr: Array<number> = [];

        public constructor() {
            this._timeArr.push(Date.now());
        }

        public showTime() {
            let _now: number = Date.now();
            this._timeArr.push(_now);
            console.log(`[XGameTimer] : 当前:${_now}ms 距离上次:${_now - this._timeArr[this._timeArr.length - 2]}ms`);
        }

        public showDelay() {
            for (let index = 1; index < this._timeArr.length; index++) {
                console.log(`[XGameTimer] 延迟记录 (${index}):${this._timeArr[index] - this._timeArr[index - 1]}ms`);
            }
        }

    }
}