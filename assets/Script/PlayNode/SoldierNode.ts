// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SoldierNode extends cc.Component {

    @property(cc.Label)
    labelName: cc.Label = null;

    @property(cc.Label)
    labelReward: cc.Label = null;

    level: number = 1

    setSoldierLevel(level: number) {
        this.level = level
        this.labelName.string = level.toString()
    }

    upgradeSoldierLevel() {
        this.level += 1
        this.labelName.string = this.level.toString()
    }

    compareLevelWithOther(target: SoldierNode) {
        return this.level === target.level
    }

    setPosForIndex(index: number) {
        let x = (index % 3) * 200 + 100
        let y = 500 - Math.floor(index / 3) * 200
        this.node.setPosition(x, y)
    }
    destroySelf() {
        this.node.destroy()
    }


}
