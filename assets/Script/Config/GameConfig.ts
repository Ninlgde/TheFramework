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

import { UIConfig } from "./UIConfig"

@ccclass
export class GameConfig extends cc.Component {

    @property
    public text: string = 'hello';

    @property(UIConfig)
    private uiconfig: UIConfig

    public get UIConfig() {
        if (this.uiconfig == null) {
            this.uiconfig = new UIConfig()
        }
        return this.uiconfig.config
    }

}
