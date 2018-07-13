///<reference path='../frame/utils/Logger.ts'/>
module ngame {
    "use strict";

    // game的log
    export var log: ninlgde.Logger = null

    export class NGame {

        private _TAG: string = "NGame"

        private static instance: NGame = null

        private constructor() {
        }

        public static create(): boolean {
            if (NGame.instance != null) {
                return false
            }
            NGame.instance = new NGame()
            NGame.instance.init()
            return true
        }

        public static getInstance(): NGame {
            return NGame.instance
        }

        /**
         * frame初始化
         * 初始化所有不需要coocs支持的模块
         */
        private init() {
            // 初始化框架log
            log = new ninlgde.Logger(7, "NGAME")

            log.info(this._TAG, "Ninlgde Game has initialized")
        }

    }
}