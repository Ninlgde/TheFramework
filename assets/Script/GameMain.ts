///<reference path='InitFrame.ts' />
/**
 * 游戏启动脚本
 * cocos creator enter
 */
const {ccclass, property} = cc._decorator;

import {GameConfig} from './Config/GameConfig'

export var UIManager = null

@ccclass
export default class GameMain extends cc.Component {

    _TAG: string = "GameMain"

    @property(cc.Layout)
    senceLayout: cc.Layout = null
    @property(cc.Layout)
    windowLayout: cc.Layout = null
    @property(cc.Layout)
    topLayout: cc.Layout = null
    @property(cc.Layout)
    debugLayout: cc.Layout = null

    @property(GameConfig)
    gameConfig: GameConfig = null

    constructor() {
        super()
    }

    start () {
        this.gameConfig = new GameConfig()
        // 创建游戏
        ngame.NGame.create()

        // init layouts
        let layouts = new Array<cc.Layout>()
        layouts.push(this.senceLayout)
        layouts.push(this.windowLayout)
        layouts.push(this.topLayout)
        layouts.push(this.debugLayout)
        ninlgde.ui.UIManager.getInstance().setLayouts(layouts)
        // 设置ui配置
        ninlgde.ui.UIManager.getInstance().loadConf(this.gameConfig.UIConfig)
        
        // start ninlgde framework
        ninlgde.GameFrame.getInstance().start()

        // let connect: WebSocket = new WebSocket("ws://127.0.0.1:8080/ws")
        
        // connect.onmessage = function (msg) {
        //     var line =  Date.now() + " " + msg.data;
        //     ninlgde.logger.info(this._TAG, that._TAG, "websocket msg: {0}", line)
        // };
        // connect.onopen = function() {
        //     connect.send("（cocos）:hhhhhhhhhhh")
        // }
        
        ninlgde.ui.UIManager.getInstance().showUI("UICocosLogo")
        ninlgde.ui.UIManager.getInstance().showUI("UIPlayNode")
    }
}
