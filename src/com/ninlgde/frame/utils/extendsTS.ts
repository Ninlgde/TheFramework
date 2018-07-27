module ninlgde {
    "use strict";
    
    export class Utils {
        public static StringFormat(fmt: string, ...args: any[]): string {
            if (args.length > 0) {
                if (args.length == 1 && typeof (args) == "object") {
                    for (let key in args) {
                        if (args[key] != undefined) {
                            let reg = new RegExp("\\{" + key + "\\}", "gm");
                            fmt = fmt.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (let i = 0; i < args.length; i++) {
                        if (args[i] != undefined) {
                            let reg = new RegExp("\\{" + i + "\\}", "gm");
                            fmt = fmt.replace(reg, args[i]);
                        }
                    }
                }
            }
            return fmt;
        }

        public static DateFormat(date: Date, fmt: string): string {
            var o = {
                "M+": date.getMonth() + 1,                      //月份
                "d+": date.getDate(),                           //日
                "h+": date.getHours(),                          //小时
                "m+": date.getMinutes(),                        //分
                "s+": date.getSeconds(),                        //秒
                "q+": Math.floor((date.getMonth() + 3) / 3),    //季度
                "S": ("000" + date.getMilliseconds()).substr((""+date.getMilliseconds()).length)                     //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    }
}