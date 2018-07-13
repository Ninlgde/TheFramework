///<reference path='IState.ts'/>
///<reference path='IStateMachine.ts'/>
///<reference path="../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier"/>

module ninlgde {
    "use strict"

    export class StateMachine extends puremvc.Notifier implements IStateMachine {

        _TAG: string = "StateMachine";

        preState: IState = null

        curState: IState = null

        nextState: IState = null

        constructor() {
            super()
            // todo: log
        }

        destory(): void {

        }

        getPreState(): IState {
            return this.preState
        }

        getCurState(): IState {
            return this.curState
        }

        getNextState(): IState {
            return this.nextState
        }

        changeState(nextState: IState): void {
            // todo: log
            this.nextState = nextState

            if (this.curState != null) {
                this.curState.exit(this)
            }

            this.preState = this.curState
            this.curState = this.nextState
            this.nextState = null

            if (this.curState != null) {
                this.curState.enter(this)
            }
        }

        update(): void {
            if (this.curState == null) {
                return
            }

            var next = this.curState.generalCheck(this)
            if (next) {
                this.changeState(next)
            }

            this.curState.update(this)
        }
    }
}