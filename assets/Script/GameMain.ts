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
        ninlgde.UIManager.getInstance().setLayouts(layouts)
        // 设置ui配置
        ninlgde.UIManager.getInstance().loadConf(this.gameConfig.UIConfig)
        
        // start ninlgde framework
        ninlgde.GameFrame.getInstance().start()

        let a = true

        new Promise((resolve, rejecct)=> {
            ninlgde.logger.info(this._TAG, ''+1)
            resolve()
            ninlgde.logger.info(this._TAG, ''+2)
            rejecct()
            ninlgde.logger.info(this._TAG, ''+3)
            resolve()
            ninlgde.logger.info(this._TAG, ''+4)
        }).then(()=>{
            ninlgde.logger.info(this._TAG, 'then1')
        }).then(()=>{
            ninlgde.logger.info(this._TAG, 'then2')
        }).then(()=>{
            ninlgde.logger.info(this._TAG, 'then3')
        }).catch(()=>{
            ninlgde.logger.info(this._TAG, 'catch')
        })

        // let connect: WebSocket = new WebSocket("ws://127.0.0.1:8080/ws")
        
        // connect.onmessage = function (msg) {
        //     var line =  Date.now() + " " + msg.data;
        //     ninlgde.logger.info(this._TAG, that._TAG, "websocket msg: {0}", line)
        // };
        // connect.onopen = function() {
        //     connect.send("（cocos）:hhhhhhhhhhh")
        // }
        var that = this

        var node = this.node
        new Promise((resolve, reject)=>{
            //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
            cc.loader.loadRes("Prefab/cocoslogo.prefab", function(errorMessage,loadedResource){//检查资源加载
                if( errorMessage ) { 
                    ninlgde.logger.info(this._TAG,  '载入预制资源失败, 原因:' + errorMessage ); 
                    reject(1)
                    return
                }
                if( !( loadedResource instanceof cc.Prefab ) ) { 
                    ninlgde.logger.info(this._TAG,  '你载入的不是预制资源!' ); 
                    reject(2)
                    return
                } 
                resolve(loadedResource)
            });
        }).then((loadedResource: any)=> {
            //开始实例化预制资源
            var TipBoxPrefab = cc.instantiate(loadedResource);
            //将预制资源添加到父节点
             node.addChild(TipBoxPrefab);
        }).catch((reason)=>{
            if (reason == 1) {
                ninlgde.logger.info(this._TAG, "hhhhhh")
            } else if (reason == 2) {
                ninlgde.logger.info(this._TAG, "131231")
            } else {
                ninlgde.logger.info(this._TAG, "abdcccc")
            }
        })

    }
}
