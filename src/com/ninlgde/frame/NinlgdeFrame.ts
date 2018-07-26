///<reference path='../../../org/puremvc/typescript/multicore/patterns/facade/Facade.ts'/>

module ninlgde {
    "use strict";

    // 框架的log
    export var logger: Logger = null

    // pureMVC 的入口
    export var app: puremvc.IFacade = null
    
    export class GameFrame {

        private _TAG: string = "GameFrame"

        private GAME_NAME: string = null

        private static instance: GameFrame = null

        private constructor(game) {
            this.GAME_NAME = game
        }

        public static create(game): boolean {
            if (GameFrame.instance != null) {
                return false
            }
            GameFrame.instance = new GameFrame(game)
            GameFrame.instance.init()
            return true
        }

        public static getInstance(): GameFrame {
            return GameFrame.instance
        }

        /**
         * frame初始化
         * 初始化所有不需要coocs支持的模块
         */
        private init() {
            // 初始化框架log
            logger = new Logger(7)
            // 初始化pureMVC
            app = puremvc.Facade.getInstance(this.GAME_NAME)
            // 创建UImanager
            UIManager.create()

            ninlgde.logger.info(this._TAG, "Ninlgde Framework has initialized")
        }

        /**
         * frame start
         * GameMain的start里调用，用于启动framework
         */
        public start(): boolean {
            return true
        }

        public getGameName(): string {
            return this.GAME_NAME
        }
    }
}