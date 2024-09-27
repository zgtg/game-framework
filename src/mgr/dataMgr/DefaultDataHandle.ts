namespace xgame {

    export type createFunc = () => IBaseData;
    export type levelUpFunc = (oldVersion: number, curVersion: number, data: IBaseData) => IBaseData;
    export class DataCreator {

        /**数组更快 */
        public _dataDefaultFunc: { [key: number]: createFunc } = {};
        /**数据修正绑定函数 */
        public _dataLevelUpFunc: { [key: number]: levelUpFunc } = {};

        /**
         * 
         * @param key 注册的key
         * @param func key对应的默认构造方法
         */
        public setRegister(key: number, func: createFunc) {
            let keyName = xgame.getXGame().data.getObjKeyName(key);
            this._dataDefaultFunc[keyName] = func;
        }

        /**
         * 
         * @param key 注册的key
         * @param func key对应的默认构造方法
         */
        public setLevelUpFunc(key: number, func: levelUpFunc) {
            let keyName = xgame.getXGame().data.getObjKeyName(key);
            this._dataLevelUpFunc[keyName] = func;
        }

        public levelUpData(key: number, oldVersion: number, curVersion: number, data: IBaseData): IBaseData {
            let keyName = xgame.getXGame().data.getObjKeyName(key);
            if (this._dataLevelUpFunc[keyName]) {
                return this._dataLevelUpFunc[keyName](oldVersion, curVersion, data);
            }
            return data;
        }

        /**
         * 获取一个指定key类型的对象
         * @param key 指定要构建对象的key
         */
        public getData(key: number): IBaseData {
            let result = undefined;
            let keyName = xgame.getXGame().data.getObjKeyName(key);
            if (this._dataDefaultFunc[keyName] === undefined)
                result = {};
            else
                result = this._dataDefaultFunc[keyName]();
            result.serialID = MathTools.getHashCode();
            return result;
        }

        public clear() {
            for (const key in this._dataDefaultFunc) {
                delete this._dataDefaultFunc[key];
            }
            this._dataDefaultFunc = [];
        }

    }

}