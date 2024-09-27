declare namespace xStatic {

    //excel枚举
    export enum EnumExcelKey { }

    //远程加载的excelkey数组
    export let remoteLoadExcel: Array<EnumExcelKey>;
}



//声明导出静态数据后的静态块
namespace xgame.mgr {

    export interface IExcelData {
        excelName: string,
        excelIndex: number,
    }

    type ExcelConfig = Array<SheetConfig>;
    type SheetConfig = Array<RowConfig> | {};
    type RowConfig = Array<number | string> | {} | [];

    export interface IExcelData {
        excelName: string,
        excelIndex: number,
    }


    export class StaticDataMgr implements IMgr {

        //横向属性值
        static landscape: string = "landscape";
        //纵向属性值
        static portrait: string = "portrait";

        isFinish: boolean;

        /**原始数据 */
        private _srcStaticData: Array<ExcelConfig> = [];

        onUpdate(dt: XGameUpdateData): void {

        }

        start() {

        }

        /**
        * 初始化接口
        */
        async init(): Promise<boolean> {
            if (this.isFinish) {
                console.warn(`[StaticDataMgr - init] : 不需要重复初始化`);
                return this.isFinish;
            }
            this.isFinish = true;
            return this.isFinish;
        }

        /**
         * 重置接口
         */
        reset(): void {

        }

        /**
         * 销毁接口
         */
        dispose(): void {

        }

        private async converData() {
            if (!xStatic) {
                xgame.openLog && console.log(`[StaticDataMgr] : 没找到 xStatic 模块，检查导出excel数据是否正确`);
                return;
            }
            let excelEnum = xStatic.EnumExcelKey;
            let excelEnumLen = Object.keys(excelEnum).length / 2;
            for (let index = 0; index < excelEnumLen; index++) {
                let sheetEnumObj = xStatic[`Enum${excelEnum[index]}`];
                let sheetEnumLen = Object.keys(sheetEnumObj).length / 2;
                for (let indey = 0; indey < sheetEnumLen; indey++) {
                    this._srcStaticData[index][indey] = this.converArrToObj(excelEnum[index], sheetEnumObj[indey], this._srcStaticData[index][indey]);
                }
            }
        }

        private converArrToObj(excelName: string, sheetName: string, sheet: SheetConfig): SheetConfig {
            let rows = sheet as Array<RowConfig>;
            sheet = {};
            let propertyKeyArr = xStatic[`${xgame.StringTools.lowerFirstChat(sheetName)}PropertyNames`];
            if (propertyKeyArr === undefined) {
                console.error(`[StaticDataMgr.converArrToObj] 配置表生成信息错误 excel:${excelName} sheet:${sheetName}`);
                return sheet;
            }
            let sheetType = xStatic[`${xgame.StringTools.lowerFirstChat(sheetName)}PropertyType`];
            //清空原来的数据
            for (let index = 0; index < rows.length; index++) {
                let propertyArr = rows[index];
                let tmpObj = {};
                let firstKey = 'id';
                for (let indey = 0; indey < propertyKeyArr.length; indey++) {
                    let propertyKey = propertyKeyArr[indey];
                    if (indey == 0)
                        firstKey = propertyKey;
                    tmpObj[propertyKey] = propertyArr[indey];
                }
                if (sheetType == StaticDataMgr.portrait)
                    sheet[`id_constlist`] = tmpObj;
                else {
                    if (sheet[`id_${tmpObj[firstKey]}`] != null) {
                        console.error(`[StaticDataMgr.converArrToObj] excel->${excelName} sheet->${sheetName} id->${tmpObj[firstKey]} 已存在，被 excel第${index}行数据覆盖`);
                    }
                    sheet[`id_${tmpObj[firstKey]}`] = tmpObj;
                }
            }
            return sheet;
        }

        /**
         * 异步初始化
         * @param remoteUrl 远程加载相对路径
         * @param remoteList:Array<number> 标记远程加载的配置表
         */
        public async loadJsonData(remoteUrl: string = null, remoteList: Array<string> = []) {
            if (!xStatic) {
                xgame.openLog && console.log(`[StaticDataMgr] : 没找到 xStatic 模块，检查导出excel数据是否正确`);
                return;
            }

            let excelEnum = xStatic.EnumExcelKey;
            let excelEnumLen = Object.keys(excelEnum).length / 2;
            let totalExcelArr = [];

            //格式化名字
            for (let index = 0; index < remoteList.length; index++) {
                let excelName = remoteList[index];
                excelName = excelName.toLowerCase().trim();
                excelName = excelName.replace('_', '');
                remoteList[index] = excelName;
            }
            let allBeginTime = Date.now();
            xgame.openLog &&console.log(`[解析配置开始] -> ${allBeginTime}`);
            let decodeTime = 0;
            for (let index = 0; index < excelEnumLen; index++) {
                let excelName = excelEnum[index] as string;
                excelName = excelName.toLowerCase().trim();
                excelName = excelName.replace('_', '');
                let jsonData = null;
                if (remoteUrl && remoteList.indexOf(excelName) != -1) {
                    jsonData = await loadUrl<cc.TextAsset>(`${remoteUrl}/xStatic/${excelName}.txt?t=${Date.now() % 1000 * 60 * 5}`, 'text');
                }
                if (!jsonData) {
                    let loadedResource = await loadRes<cc.TextAsset>(`xStatic/${excelName}`, cc.TextAsset);
                    if (loadedResource == null || loadedResource.text == null) {
                        console.error(`[StaticDtaMgr.loadJsonData] 检查 ${excelName}.txt 文件是否存在，或者cocos未刷新文件资源链表`);
                    }
                    else {
                        let beginTime = Date.now();
                        xgame.openLog &&console.log(`[解析配置开始] -> ${excelName} ${beginTime}`);
                        jsonData = JSON.parse(xgame.NormalEncypt.decrypt(loadedResource.text, "vL3XgvvEv28im"));
                        xgame.openLog && console.log(`[解析配置完成] -> ${excelName} ${Date.now() - beginTime} ms`);
                        decodeTime += Date.now() - beginTime;
                    }
                }
                totalExcelArr.push(jsonData);
            }
            xgame.openLog &&console.log(`[解析配置结束] -> ${Date.now() - allBeginTime} ms 解密时间: ${decodeTime} ms`);

            this._srcStaticData = totalExcelArr;
            await this.converData();
        }

        /**
         * 
         * @param excelEnum excel 枚举
         * @param sheetEnum sheet 枚举
         * @param key 数据唯一Key
         */
        public getConfig<T extends IBaseStaticData>(excelEnum: number, sheetEnum: number, key: number | string): T {
            let result: T = <T>{};
            let targetKey = `id_${key}`;
            result = this._srcStaticData[excelEnum][sheetEnum][targetKey];
            if (!result)
                xgame.openLog && console.log(`[StaticDataMgr - getConfig] 在 ${xStatic.EnumExcelKey[excelEnum]}->${xStatic.EnumExcelKey[sheetEnum]} 找不到 key为:${targetKey} 的数据!`);
            return result;
        }

        /**
         * 
         * @param excelEnum excel 枚举
         * @param sheetEnum sheet 枚举
         * @param key 数据唯一Key
         */
        public getSheet<T extends IBaseStaticData>(excelEnum: number, sheetEnum: number): { [key: string]: T } {
            let result = null;
            result = this._srcStaticData[excelEnum][sheetEnum];
            return result;
        }

        /**
         * getKey
         **/
        public getKey(id: string | number) {
            return `id_${id}`;
        }




    }
}
