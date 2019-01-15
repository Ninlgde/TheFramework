module ninlgde.ui {
    "use strict";

    export enum LAYOUR {
        SENCE = 0,
        WINDOW,
        TOP,
        DEBUG
    }

    enum UI_LOAD_ERROR {
        COCOS_ERR = 0,
        TYPE_ERR
    }

    export class UIManager {

        _TAG: string = "UIManager"

        private static instance: UIManager = null

        private uiLayouts: Array<cc.Layout> = null;

        private conf: collection.Map<string, UIConfItem> = null

        private constructor() {

        }

        public static getInstance(): UIManager {
            return this.instance
        }

        public static create(): boolean {
            if (Assert.isFalse(this.instance == null)) {
                this.instance = new UIManager()
            }
            return true
        }

        public setLayouts(uiLayouts: Array<cc.Layout>) {
            this.uiLayouts = uiLayouts;
        }

        public loadConf(conf: collection.HashMap<string, UIConfItem>) {
            this.conf = conf
        }

        public showUI(name: string) {
            let uiitem : UIConfItem = this.conf.get(name);
            // 检查是否有这个ui的配置
            if (Assert.isTrue(uiitem == null, Utils.StringFormat("CANNOT FIND THE UI<{0}> CONFIG ITEM", name))) {
                return
            }
            
            this.loadCocosPrefab(uiitem.path).then((loadedResource: any)=> {
                //开始实例化预制资源
                var prefab = cc.instantiate(loadedResource);
                //将预制资源添加到父节点
                this.getLayer(uiitem.layer).addChild(prefab);
                // cc.director.getScene().addChild(prefab)
            }).catch((reason)=>{
                if (reason == UI_LOAD_ERROR.COCOS_ERR) {
                    ninlgde.logger.error(this._TAG,  '载入预制资源失败')
                } else if (reason == UI_LOAD_ERROR.TYPE_ERR) {
                    ninlgde.logger.error(this._TAG,  '你载入的不是预制资源!' ); 
                } else {
                    ninlgde.logger.error(this._TAG, "UNKNOW ERROR")
                }
            })
        }

        private getLayer(layout: LAYOUR): cc.Node {
            return this.uiLayouts[layout].node
        }

        private loadCocosPrefab(path) {
            return new Promise((resolve, reject)=>{
                //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
                cc.loader.loadRes(path, function(errorMessage,loadedResource){//检查资源加载
                    if( errorMessage ) { 
                        ninlgde.logger.error(this._TAG,  '载入预制资源失败, 原因:' + errorMessage ); 
                        reject(UI_LOAD_ERROR.COCOS_ERR)
                        return
                    }
                    if( !( loadedResource instanceof cc.Prefab ) ) { 
                        reject(UI_LOAD_ERROR.TYPE_ERR)
                        return
                    } 
                    resolve(loadedResource)
                });
            })
        }
    }
}