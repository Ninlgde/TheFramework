import PlayNode from "./PlayNode";

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

    profit: number = 1
    //主控件
    playNode: PlayNode = null

    setSoldierLevel(level: number) {
        this.level = level
        this.profit = level
        this.labelName.string = level.toString()
        this.labelReward.string = "+" + this.profit
    }

    upgradeSoldierLevel() {
        this.level += 1
        this.profit = this.level
        this.labelReward.string = "+" + this.profit
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

    showProfit() {
        this.labelReward.node.active = true
        this.labelReward.node.y = 69
        let action = cc.moveTo(1, 0, 79)
        let callback = cc.callFunc(() => {
            this.labelReward.node.active = false
        })

        this.labelReward.node.runAction(cc.sequence(action, callback))
    }

    onLoad() {
        let node = cc.find("Canvas/sceneLayout/playNode")
        this.playNode = cc.find("Canvas/sceneLayout/playNode").getComponent(PlayNode)
        this.labelReward.node.active = false
        this.schedule(() => {
            this.playNode.changeMoney(this.profit)
            this.showProfit()
        }, 3, cc.macro.REPEAT_FOREVER)
    }




}
