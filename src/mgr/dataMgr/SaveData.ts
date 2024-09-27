namespace xgame {

    /**
     * 存档数据
     */
    export interface SaveData {
        /** 数据版本 */
        saveVersionCode?: number,
        /** 数据体 */
        data: { [dataKey: string]: IBaseData },
    }
}