namespace xgame {
    /**
     * 字符串处理工具
     */
    export class StringTools {

        // /**
        //  * 获取目标字符串
        //  * @param  {string} key 对应配置表key
        //  * @param  {any} ...args 要替换的位置字符串
        //  */
        // public static getStr(key: string, ...args) {
        //     if (args.length < 1)
        //         return;
        //     //读取配置表
        //     let returnValue: string = "";
        //     let keyObj = xgame.getXGame().staticDataMgr.easy.GlobalConfigCNTR.getDataByPK(key);
        //     return StringUtils.replaceCustomStr(keyObj.value, ...args);

        // }

        public static replaceCustomStr(str: string, args: Array<string | number> = []) {
            let returnValue: string = str;
            for (let idx = 0; idx < args.length; idx++) {
                returnValue = returnValue.replace("$" + idx, args[idx].toString());
            }
            return returnValue;
        }

        /**
         * 首字母大写
         */
        public static UpFirstChat(srcString: string): string {
            return srcString.substring(0, 1).toUpperCase() + srcString.substring(1);
        }

        /**
         * 首字母小写
         */
        public static lowerFirstChat(srcString: string): string {
            return srcString.substring(0, 1).toLowerCase() + srcString.substring(1);
        }


        public static pad(num: number, n: number): string {
            let tmpStr: string = num + "";
            let len = tmpStr.length;

            while (len < n) {
                tmpStr = "0" + tmpStr;
                len++;
            }
            return tmpStr;
        }

        /**从百分比中获取具体数值 */
        public static getStrNumber(strValue: string, baeeValue: number): number {

            let value: number = 0;
            if (strValue && strValue.indexOf("%") != -1) {
                value = Number(strValue.replace("%", ""));
                value = baeeValue * value * 0.01;
            }
            else
                value = Number(strValue);
            return value;
        }

        /**
         * 目标字符串是否为空字符串
         * @param {string} value 需要判定的字符串
         * @returns boolean 是否有效字符串
         */
        public static isNullStr(value: string): boolean {
            return !value || value == "";
        }

        /**将秒转换为 00:00:00 */
        public static setSecondToHourString(num: number): string {
            var hour: number = Math.floor(num / 3600);
            var min: number = Math.floor(num % 3600 / 60);
            var sed: number = Math.floor(num % 60);
            var hourStr: string = hour < 10 ? "0" + hour : "" + hour;
            var minStr: string = min < 10 ? "0" + min : "" + min;
            var sedStr: string = sed < 10 ? "0" + sed : "" + sed;
            return hourStr + ":" + minStr + ":" + sedStr;
        }

        /**将秒转换为 00:00 */
        public static setSecondToMinString(num: number): string {
            var min: number = Math.floor(num / 60);
            var sed: number = Math.floor(num % 60);
            var minStr: string = min < 10 ? "0" + min : "" + min;
            var sedStr: string = sed < 10 ? "0" + sed : "" + sed;
            return minStr + ":" + sedStr;
        }

        /**
         * 格式化时间戳
         * @param num 秒
         */
        public static formatTimestamp(num: number, maskMin: boolean = false, maskHour: boolean = false): string {
            var hour: number = Math.floor(num / 3600);
            var min: number = Math.floor(num % 3600 / 60);
            var sed: number = Math.floor(num % 60);

            if (maskHour) {
                min += 60 * hour;
            }
            if (maskMin) {
                sed += 60 * min;
            }

            var hourStr: string = `${hour < 10 ? "0" + hour : "" + hour}小时`;
            var minStr: string = `${min < 10 ? "0" + min : "" + min}分`;
            var sedStr: string = `${sed < 10 ? "0" + sed : "" + sed}秒`;

            let result = sedStr;
            if (!maskMin) {
                result = minStr + result;
            }
            if (!maskHour) {
                result = hourStr + result;
            }
            return result;
        }

        /**
         * 格式化时间戳
         * @param num 秒
         */
        public static formatTimestampWithGet(num: number, getConfig: {
            day?: boolean,       //天
            hour?: boolean,      //时
            min?: boolean,       //分
            sed?: boolean,       //秒
            millised?: boolean,    //毫秒
        }): string {

            let result: string = "";
            if (getConfig.day) {
                let dayNum = Math.floor(num / (3600 * 24 * 1000));
                if (dayNum != 0)
                    result += `${dayNum}日`;
                num -= dayNum * 3600 * 24 * 1000;
            }

            if (getConfig.hour) {
                let hourNum = Math.floor(num / (3600 * 1000));
                if (hourNum != 0)
                    result += `${hourNum < 10 ? "0" + hourNum : "" + hourNum}小时`;
                num -= hourNum * 3600 * 1000;
            }

            if (getConfig.min) {
                let minNum = Math.floor(num / (60 * 1000));
                if (minNum != 0)
                    result += `${minNum < 10 ? "0" + minNum : "" + minNum}分`;
                num -= minNum * 60 * 1000;
            }

            if (getConfig.sed) {
                let sedNum = Math.floor(num / (1000));
                if (sedNum != 0)
                    result += `${sedNum < 10 ? "0" + sedNum : "" + sedNum}秒`;
                num -= sedNum * 1000;
            }

            if (getConfig.millised) {
                let millisedNum = num;
                if (millisedNum < 10) {
                    result += "0";
                }
                if (millisedNum < 100) {
                    result += "0";
                }
                result += `${millisedNum}毫秒`;
            }


            if (result == "") {
                if (getConfig.millised) {
                    result = "少于1毫秒";
                }
                else if (getConfig.sed) {
                    result = "少于1秒";
                }
                else if (getConfig.min) {
                    result = "少于1分钟";
                }
                else if (getConfig.hour) {
                    result = "少于1小时";
                }
                else if (getConfig.day) {
                    result = "少于1天";
                }
                else {
                    result = "未知";
                }
            }
            return result;
        }

        /**
         * 修正指定位数，前置位缺少0补齐
         * @param value 
         * @param count 
         */
        public static preZeroFix(value: number, count: number) {
            var _a = (Array(count).join('0') + value).slice(-count);
            return _a;
        }
    }
}