/**系统事件对象 */
namespace xgame {

    /**事件数据对象基类 */
    export interface IEventData extends IBaseData {
        //事件Key
        key: number,
        //事件码（一连串事件发生的时候可以通过事件码来判断同一个事儿）
        eventsCode?: number,
        //事件结果码
        resultCode?: number,
        //错误信息
        errMsg?: string,
    }

    export interface IResultData extends IBaseData {
        //事件结果码
        code: number,
        //错误信息
        errMsg?: string,
    }
}