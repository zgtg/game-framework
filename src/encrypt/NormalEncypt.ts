
namespace xgame {
    /**
     * 普通加密
     */
    export class NormalEncypt {

        public static encrypt(content: string, password: string) {
            let newstr = "";
            let passwordLen = password.length;
            for (let i = 0; i < content.length; i += passwordLen) {
                for (let y = 0; y < passwordLen && i + y < content.length; y++) {
                    newstr += String.fromCharCode(content.charCodeAt(i + y) ^ password.charCodeAt(y));
                }
            }
            return newstr;
        }

        public static decrypt(content: string, password: string) {
            let newstr = "";
            let passwordLen = password.length;
            for (let i = 0; i < content.length; i += passwordLen) {
                for (let y = 0; y < passwordLen && i + y < content.length; y++) {
                    newstr += String.fromCharCode(content.charCodeAt(i + y) ^ password.charCodeAt(y));
                }
            }
            return newstr;
        }

        /**
         * 获得已加密字段
         * @param data 数据包
         * @param key 作用字段
         * @retrun value 值
         */
        public static getEncryptValue(data: any, key: string): { value: any, isErr: boolean } {
            let srcValue = data[key];
            if (srcValue === null || srcValue === undefined) {
                return { value: srcValue, isErr: false };
            }
            let encryptValue: string = data[`___${key}`];
            let keys = ['b', 'o', 'x', 'h', 'e', 'r', 'o'].reverse();
            if (encryptValue === null || encryptValue === undefined) {
                encryptValue = data[`___${key}`] = this.encrypt(srcValue.toString(), keys.join(''));
            }
            let decryptValue = this.decrypt(encryptValue, keys.join(''));
            let isErr = srcValue.toString() != decryptValue;
            return { value: Number(decryptValue), isErr: isErr };
        }

        /**
         * 设置已加密字段
         * @param data 数据包
         * @param key 作用字段
         * @param value 值
         */
        public static setEncryptValue(data: any, key: string, value: any): boolean {
            let keys = ['b', 'o', 'x', 'h', 'e', 'r', 'o'].reverse();
            let isErr = data[key] && data[`___${key}`] && (data[key].toString() != this.decrypt(data[`___${key}`], keys.join('')));
            if (!isErr) {
                data[key] = value;
            }
            data[`___${key}`] = this.encrypt(value.toString(), keys.join(''));
            return isErr;
        }
    }
}

