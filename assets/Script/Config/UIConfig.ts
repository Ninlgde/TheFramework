// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class UIConfig extends cc.Component {

    UI_PATH = "Prefab/ui/"

    @property
    _conf: ninlgde.collection.HashMap<string, ninlgde.ui.UIConfItem> = null

    public constructor() {
        super()
        this._conf = new ninlgde.collection.HashMap<string, ninlgde.ui.UIConfItem>()
        this._conf.put('UISplash',              new ninlgde.ui.UIConfItem(this.UI_PATH + "UISplash.prefab", null, ninlgde.ui.LAYOUR.SENCE))
        this._conf.put('UIHall',                new ninlgde.ui.UIConfItem(this.UI_PATH + "UIHall.prefab", null, ninlgde.ui.LAYOUR.SENCE))
        this._conf.put('UIGame',                new ninlgde.ui.UIConfItem(this.UI_PATH + "UIGame.prefab", null, ninlgde.ui.LAYOUR.SENCE))

        // test ui
        this._conf.put('UICocosLogo',           new ninlgde.ui.UIConfItem('Prefab/cocoslogo.prefab', null, ninlgde.ui.LAYOUR.DEBUG))
    }

    public get config(): ninlgde.collection.HashMap<string, ninlgde.ui.UIConfItem>  {
        return this._conf
    }
}
