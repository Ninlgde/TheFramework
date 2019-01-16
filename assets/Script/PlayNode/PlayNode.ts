import SoldierNode from "./SoldierNode";



const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayNode extends cc.Component {

    _TAG: string = "PlayNode"

    @property(cc.Label)
    labelMoney: cc.Label = null
    //触摸节点
    @property(cc.Node)
    touchNode: cc.Node = null

    //士兵预设
    @property(cc.Prefab)
    soldierPrefab: cc.Prefab = null

    //招募士兵按钮
    @property(cc.Button)
    btnRecruit: cc.Button = null

    money: number = 140;

    changeMoney(delt: number) {
        this.money += delt
    }

    //士兵列表
    soldiersList: { [key: number]: SoldierNode } = {}
    //已用士兵的位置,用于创建新士兵时算位置
    usedNodeIndexs: boolean[] = []

    //移动时临时创建的士兵节点
    tempSoldier: SoldierNode = null
    tempIndex: number = -1

    // onLoad () {}
    setLabelMoney() {
        this.labelMoney.string = "当前金币:" + this.money
    }

    //招募士兵按钮回调
    onBtnRecruit() {
        ninlgde.logger.debug(this._TAG, "onBtnRecruit");
        if (this.money < 20) {
            ninlgde.logger.info(this._TAG, "金币不足")
        } else {
            this.changeMoney(-20)
            this.createSolder()
        }

    }

    //创建新的基础士兵
    createSolder() {
        let index = this.getFreeIndex()
        if (index > 8) {
            ninlgde.logger.info(this._TAG, "士兵满了")
        } else {
            let soldierNode = cc.instantiate(this.soldierPrefab)
            this.soldiersList[index] = soldierNode.getComponent(SoldierNode)
            this.usedNodeIndexs[index] = true
            this.touchNode.addChild(soldierNode)

            this.soldiersList[index].setSoldierLevel(1)
            this.soldiersList[index].setPosForIndex(index)
        }
    }

    //获取可用空地,按顺序
    getFreeIndex() {
        let index = 0
        while (this.usedNodeIndexs[index]) {
            index++
        }
        return index
    }
    //把点击的位置转化为空地索引
    converPosToIndex(nowPoint: cc.Vec2): number {
        let clickPoint = this.touchNode.convertToNodeSpace(nowPoint)
        let x = Math.floor(clickPoint.x / 200)
        let y = Math.floor(3 - clickPoint.y / 200)
        return x + y * 3
    }
    //交换士兵位置
    changeSoldierNodeIndex(originalSoldier: SoldierNode, index: number) {
        let targetNode = this.soldiersList[index]

        if (targetNode) {
            //交换两个士兵处理
            targetNode.setPosForIndex(this.tempIndex)
            originalSoldier.setPosForIndex(index)

            this.soldiersList[index] = originalSoldier
            this.soldiersList[this.tempIndex] = targetNode
        } else {
            //交换士兵和空地
            originalSoldier.setPosForIndex(index)
            this.soldiersList[index] = originalSoldier
            this.soldiersList[this.tempIndex] = null
            this.usedNodeIndexs[index] = true
            this.usedNodeIndexs[this.tempIndex] = false
        }
    }
    //合并士兵(本函数直接合并不做校验了)
    combineSoldierNode(targetIndex: number) {
        this.clearSoldierByIndex(this.tempIndex)

        let targetNode = this.soldiersList[targetIndex]
        targetNode.upgradeSoldierLevel()
    }

    //通过索引清除士兵
    clearSoldierByIndex(index: number) {
        this.soldiersList[index].destroySelf()
        this.soldiersList[index] = null
        this.usedNodeIndexs[index] = false
    }

    //清除临时士兵
    clearTempSoldierNode() {
        this.tempIndex = -1
        this.tempSoldier.destroySelf()
        this.tempSoldier = null
    }

    figureTouchStart(event: cc.Event.EventTouch) {
        let index = this.converPosToIndex(event.getLocation())

        if (this.soldiersList[index]) {
            let tempNode = cc.instantiate(this.soldiersList[index].node)
            this.tempSoldier = tempNode.getComponent(SoldierNode)
            this.touchNode.addChild(tempNode)
            this.tempIndex = index
        }
    }

    figureTouchMoved(event: cc.Event.EventTouch) {
        if (this.tempSoldier) {
            this.tempSoldier.node.position = this.tempSoldier.node.position.addSelf(event.getDelta())
        }
    }

    figureTouchCancel(event: cc.Event.EventTouch) {
        if (this.tempSoldier) {
            this.clearTempSoldierNode()
        }
    }

    figureTouchEnded(event: cc.Event.EventTouch) {
        if (!this.tempSoldier) {
            return
        }
        let targetIndex = this.converPosToIndex(event.getLocation())
        let originalNSoldier = this.soldiersList[this.tempIndex]
        let targetSoldier = this.soldiersList[targetIndex]
        //如果索引一样则清除临时士兵后什么都不做
        if (targetIndex == this.tempIndex) {
            this.clearTempSoldierNode()
            return
        }
        //结束后判断有士兵则进行交换或者合并,没有直接换位
        if (targetSoldier && targetSoldier.compareLevelWithOther(originalNSoldier)) {
            this.combineSoldierNode(targetIndex)
        } else {
            this.changeSoldierNodeIndex(this.soldiersList[this.tempIndex], targetIndex)
        }
        this.clearTempSoldierNode()
    }

    start() {
        this.setLabelMoney()

        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.figureTouchStart, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.figureTouchMoved, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.figureTouchCancel, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.figureTouchEnded, this)
    }

    update(dt) {
        this.setLabelMoney()
    }

}
