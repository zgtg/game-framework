namespace xgame {
    //缓冲当前时间戳上的索引
    export interface HashCodeCache {
        time: number,
        index: number,
    }

    export interface IWidgetData {
        widgetNum?: number;
        item: any;
    }

    export interface IWidgetResult {
        index: number;
        item: any;
    }

    export class MathTools {

        static _hashCodeCache: HashCodeCache = { time: 0, index: 0 };

        /**
         * 获取hashCode唯一码
         */
        public static getHashCode(): number {
            let curTime: number = Date.now();
            let index = 0;
            if (MathTools._hashCodeCache.time == curTime) {
                index = MathTools._hashCodeCache.index + 1;
                MathTools._hashCodeCache.index++;
            }
            MathTools._hashCodeCache.time = curTime;
            MathTools._hashCodeCache.index = index;
            return parseInt(`${curTime}${index}`);
        }

        /**
         * 获取随机索引
         * @param arr 随机数组
         */
        public static getRandomIndex(arr: Array<any>): number {
            return Math.floor(Math.random() * arr.length);
        }

        /**
        * 不重复抽取
        * @param arr 随机数组
        */
        public static getRandomNoRepeat(arr: Array<any>, count: number): Array<any> {
            let result: Array<any> = [];
            let tempArr = [];
            for (const item of arr) {
                tempArr.push(item);
            }

            for (let index = 0; index < tempArr.length && index < count; index++) {
                let randomIndex = Math.floor(Math.random() * (arr.length - index) + index);

                let tmpItem = tempArr[randomIndex];
                result.push(tmpItem);

                let indexItem = tempArr[index];
                tempArr[index] = tmpItem;
                tempArr[randomIndex] = indexItem;
            }
            return result;
        }

        /**
         * 获取数组中随机值
         * @param arr 随机数组
         */
        public static getRandomItem<T>(arr: Array<T>): T {
            let index = Math.floor(Math.random() * arr.length);
            return arr[index];
        }

        /**
         * 获取对象中随机Key
         * @param arr 随机数组
         */
        public static getRandomValue<T>(obj: Object): T {
            let keys = Object.keys(obj);
            let index = Math.floor(Math.random() * keys.length);
            let objKey = keys[index];
            return obj[objKey];
        }

        /**
         * 获取a到b的随机值
         * @param arr 随机数组
         */
        public static getRandomBetweenInt(a: number, b: number): number {
            let value = Math.floor(Math.random() * (b - a) + a);
            return value;
        }

        /**
         * 获取a到b的随机值
         * @param arr 随机数组
         */
        public static getRandomBetweenFloat(a: number, b: number): number {
            let value = Math.random() * (b - a) + a;
            return value;
        }

        /**
         * 获取俩数之间的差值
         * @param a 左边界值
         * @param b 右边界值
         * @param ratio 差追比率
         */
        public static lerp(a: number, b: number, ratio: number): number {
            return (b - a) * ratio + a;
        }

        public static toChinesNum(section: number): string {
            let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
            let chnUnitChar = ["", "十", "百", "千"];
            let strIns = '', chnStr = '';
            let unitPos = 0;
            let zero = true;
            while (section > 0) {
                var v = section % 10;
                if (v === 0) {
                    if (!zero) {
                        zero = true;
                        chnStr = chnNumChar[v] + chnStr;
                    }
                } else {
                    zero = false;
                    strIns = chnNumChar[v];
                    //十一到十九的特殊处理
                    if (unitPos == 1 && section == 1) {
                        strIns = chnUnitChar[unitPos];
                    } else {
                        strIns += chnUnitChar[unitPos];
                    }
                    chnStr = strIns + chnStr;
                }
                unitPos++;
                section = Math.floor(section / 10);
            }
            return chnStr;
        }

        public static formatNumber(value: number | string): string {
            let unit = ["", "K", "M", "B", "T"];
            if (typeof value !== "number" || value <= 999) {
                return value.toString();
            }
            let index = 0;
            while (value >= 1000) {
                if (index >= unit.length - 1) {
                    break;
                }
                value /= 1000;
                index++;
            }

            // 防止四舍五入大于1000
            if (Number(value.toFixed(1)) >= 1000) {
                if (index < unit.length - 1) {
                    value /= 1000;
                    index++;
                }
            }

            return value.toFixed(1) + unit[index];
        }


        /**
     * 判断上一个时间与当前时间是否不为同一天
     * 返回true为不是同一天
     * @param lastTime 存入的时间
     */
        public static dataCopmareCHEN(lastTime: number): boolean {
            let curTime = new Date();
            let lasTime = new Date();
            lasTime.setTime(lastTime);
            return (curTime.getFullYear() != lasTime.getFullYear() || curTime.getMonth() != lasTime.getMonth() || curTime.getDate() != lasTime.getDate());
        }

        /**
      * 获取传入时间戳下一天零点的时间戳
      * @param currTimestamp 传入时间戳
      */
        public static nextDayTimestamp(currTimestamp: number): number {
            let nextDate = new Date(currTimestamp + 24 * 60 * 60 * 1000); //后一天
            return nextDate.setHours(0, 0, 0, 0);
        }

        /**
         * 获取两个时间戳之间相隔的天数
         * 返回true为不是同一天
         * @param lastTime 存入的时间
         */
        public static getDayCountBetweenTime(leftTime: number | Date, rightTime: number | Date): number {
            let left: Date = leftTime as Date;
            let right: Date = rightTime as Date;
            if (typeof (leftTime) == "number") {
                left = new Date(leftTime);
            }
            if (typeof (rightTime) == "number") {
                right = new Date(rightTime);
            }
            left.setHours(0, 0, 0, 0);
            right.setHours(0, 0, 0, 0);
            let result = Math.abs(right.getTime() - left.getTime()) / (1000 * 3600 * 24);
            return result;
        }

        /**
         *获取权重中的内容
         * @param items 权重对象
         */
        public static getWidgetItem(items: Array<IWidgetData>): IWidgetResult {
            if (!items || items.length == 0) {
                xgame.openLog && console.warn(`[权重计算参数错误] - 提供计算计算权重的容器为空！`);
                return null;
            }
            let tmpTotalCount: number = 0;
            for (let item of items) {
                let tmpWidgetNum: number = item.widgetNum != null ? item.widgetNum : 1;
                item.widgetNum = tmpWidgetNum;
                tmpTotalCount += tmpWidgetNum;
            }

            let random = Math.floor(Math.random() * Math.floor(tmpTotalCount));
            let curWidgetCount: number = 0;
            let index = 0;
            for (let item of items) {
                curWidgetCount += item.widgetNum;
                if (curWidgetCount > random) {
                    return { item: item.item, index: index };
                }
                index++;
            }
            return { item: items[items.length - 1].item, index: items.length - 1 };
        }

        /**
         *获取权重中的内容
         * @param items 权重对象
         */
        public static getWidgetItemArr(items: Array<number>): IWidgetResult {
            if (!items || items.length == 0) {
                xgame.openLog && console.warn(`[权重计算参数错误] - 提供计算计算权重的容器为空！`);
                return null;
            }
            let tmpTotalCount: number = 0;
            for (let widgetNum of items) {
                let tmpWidgetNum: number = (widgetNum !== null && widgetNum !== undefined) ? widgetNum : 0;
                widgetNum = tmpWidgetNum;
                tmpTotalCount += tmpWidgetNum;
            }

            let random = Math.floor(Math.random() * Math.floor(tmpTotalCount));
            let curWidgetCount: number = 0;
            let index = 0;
            for (let widgetNum of items) {
                curWidgetCount += widgetNum;
                if (curWidgetCount > random) {
                    return { item: widgetNum, index: index };
                }
                index++;
            }
            return { item: items[items.length - 1], index: items.length - 1 };
        }

        /**
         * 从二维数组中获取权重结果（item = [0], widget = [1]）
         * @param itemsArr 
         */
        public static getWidgetItemWithDoubleArr(itemsArr: Array<Array<number>>): IWidgetResult {
            let items: Array<IWidgetData> = [];
            for (const item of itemsArr) {
                items.push({ item: item[0], widgetNum: item[1] });
            }
            return this.getWidgetItem(items);
        }

        /**
         * 格式化数字，确定0，6位精确位数
         */
        public static zeroFormat(num: number): number {
            if (num >= -0.000001 && num <= 0.000001) {
                return 0;
            }
            return num;
        }

        /**保留numbe小数位数 */
        public static floorNum(num: number, index: number = 6) {
            var p: number = Math.pow(10, index);
            var result = Math.floor(num * p) / p;
            return result;
        }

        /**保留numbe小数位数 */
        public static roundNum(num: number, index: number = 6) {
            var p: number = Math.pow(10, index);
            var result = Math.round(num * p) / p;
            return result;
        }

        //获取uuid
        public static getUuid(): string {
            let uuid: string = "xxxxxxxxcxxxxl4xxxjyxxxdxxxxxxxxxxxx".replace(/[xy]/g, function (c: string | number) {
                var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
            uuid = xgame.NormalEncypt.encrypt(uuid, 'sjhp');
            let bufferUuid: ArrayBuffer = xgame.Base64Util.string2Uint8Array(uuid);
            uuid = xgame.Base64Util.encode(bufferUuid);
            return uuid;
        }

        public static matchAllNumbers(str: string): Array<number> {
            let matchStrList = str.match(/[1-9]\d*\.?\d*|0\.\d*[1-9]/g);
            if (!matchStrList || !matchStrList.length) {
                return [];
            }
            let array = matchStrList.map((matchStr: string) => +matchStr);
            return array;
        }

    }
}
