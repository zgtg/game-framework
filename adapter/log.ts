namespace xgame {

    /**log开关 */
    export let openLog: boolean = true;

    let FormatDate = function (date: Date, fmt) { //author: meizz   
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    // /**适配log输出 */
    // export function log(msg: any, ...subst: any[]) {
    //     console.log(msg, ...subst);
    // }

    // /**适配log输出 */
    // export function timeLog(msg: any, ...subst: any[]) {
    //     console.log(`[${FormatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S")}] ${msg}`, ...subst);
    // }

    // /**框架输出适配log输出 */
    // export function frameworkLog(msg: any, ...subst: any[]) {
    //     console.log(`[xgame] ${msg}`, ...subst);
    // }

    // /**适配error输出 */
    // export function error(msg: any, ...subst: any[]) {
    //     console.error(msg, ...subst);
    // }

    // /**适配warn输出 */
    // export function warn(msg: any, ...subst: any[]) {
    //     console.warn(msg, ...subst);
    // }

    // function toArray(argument) {
    //     let args = [];
    //     for (let i = 0; i < argument.length; i++) {
    //         args.push(argument[i]);
    //     }
    //     return args;
    // }

    // /**断言 */
    // export function assert(msg: any, ...subst: any[]) {
    //     if (console.assert) {
    //         console.assert.apply(console, toArray(arguments));
    //     } else {
    //         let args = toArray(arguments);
    //         if (!args[0]) {
    //             let args2 = [];
    //             for (let i = 1; i < args.length; i++) {
    //                 args2.push(args[i]);
    //             }
    //             console.error.apply(console, args2);
    //         }

    //     }
    // }
}