///<reference path='extendsTS.ts' />

module ninlgde {
    "use strict";

    export enum LoggerLevel {
        NONE = 0,
        ERROR,
        WARN,
        INFO,
        DEBUG,
        count
    }

    const LEVEL_STR: string[] = ["", "ERROR", "WARN", "INFO", "DEBUG"]

    export class Logger {

        /**
         * 1 1 1 1 = 15
         * ^ ^ ^ ^
         * | | | |
         * | | | +--- error 是否输出
         * | | +----- warn 是否输出
         * | +------- info 是否输出
         * +--------- debug 是否输出
         */
        level: number = 0
        themodule: string = ""

        /**
         * 初始化日志和所属模块
         * @param level 
         * @param themodule 
         */
        constructor(level: number, themodule: string = "FRAME") {
            this.level = level
            this.themodule = themodule
        }

        private print(level: number, tag: string, format: string, ...args:any[]): void {
            let levelStr = LEVEL_STR[level]

            let content: string = args.length == 0 ? format : Utils.StringFormat.apply(null, [format].concat(args))

            let time: string = Utils.DateFormat(new Date(), "MM-dd hh:mm:ss.S")

            let totalFrames = cc.director.getTotalFrames()

            let result: string = Utils.StringFormat("[NINLGDE LOG][{0}][{1}--{2}]=>[TAG:{3}][{4}] {5}", 
                                                    this.themodule, time, totalFrames, tag, levelStr, content)
            cc.log(result)
        }

        public error(tag: string, format: string, ...args:any[]): void {
            if ((this.level & 1 << LoggerLevel.ERROR) == 0) {
                this.print.apply(this, [LoggerLevel.ERROR, tag, format].concat(args))
            }
        }

        public warn(tag: string, format: string, ...args:any[]): void {
            if ((this.level & 1 << LoggerLevel.WARN) == 0) {
                this.print.apply(this, [LoggerLevel.WARN, tag, format].concat(args))
            }
        }

        public info(tag: string, format: string, ...args:any[]): void {
            if ((this.level & 1 << LoggerLevel.INFO) == 0) {
                this.print.apply(this, [LoggerLevel.INFO, tag, format].concat(args))
            }
        }

        public debug(tag: string, format: string, ...args:any[]): void {
            if ((this.level & 1 << LoggerLevel.DEBUG) == 0) {
                this.print.apply(this, [LoggerLevel.DEBUG, tag, format].concat(args))
            }
        }
    }
}