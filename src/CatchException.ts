namespace xgame {

     /**
     * 系统错误码
     */
      export enum EErrorCode {
        null,//没有错误
        levelLimit,//等级限制
        mythEquipLimit,//神话装备限制
        extractLevelLimit,//萃取等级限制
        extractEquipLimit,//萃取装备限制
        extractQualityLimit,//萃取品质限制
        extractUniqueLimit,//萃取已经完成限制
        refineLevelLimit,//洗练等级限制
    }

    export interface ICatchError<T> {
        res: T,
        err?: xgame.EErrorCode,
        msg?: string,
    }
}