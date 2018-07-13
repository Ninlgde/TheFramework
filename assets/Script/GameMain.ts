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
    gameConfig: GameConfig

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
        ninlgde.UIManager.getInstance().setLayouts(layouts)
        // 设置ui配置
        ninlgde.UIManager.getInstance().loadConf(this.gameConfig.UIConfig)
        
        // start ninlgde framework
        ninlgde.GameFrame.getInstance().start()

        var that = this

        // let connect: WebSocket = new WebSocket("ws://127.0.0.1:8080/ws")
        
        // connect.onmessage = function (msg) {
        //     var line =  Date.now() + " " + msg.data;
        //     ninlgde.log.info(that._TAG, "websocket msg: {0}", line)
        // };
        // connect.onopen = function() {
        //     connect.send("（cocos）:hhhhhhhhhhh")
        // }
        


        var node = this.node
        //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
        cc.loader.loadRes("Prefab/cocoslogo.prefab", function(errorMessage,loadedResource){//检查资源加载
            if( errorMessage ) { 
                cc.log( '载入预制资源失败, 原因:' + errorMessage ); 
                return; 
            }
            if( !( loadedResource instanceof cc.Prefab ) ) { 
                cc.log( '你载入的不是预制资源!' ); 
                return; 
            } 
            //开始实例化预制资源
            var TipBoxPrefab = cc.instantiate(loadedResource);
        
            //将预制资源添加到父节点
             node.addChild(TipBoxPrefab);
        });

    }
}
