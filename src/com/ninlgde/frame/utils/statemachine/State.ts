///<reference path='IState.ts'/>
///<reference path='IStateMachine.ts'/>

module ninlgde {
    "use strict"

    export class State implements IState {
        _TAG: string = "State"

        // private static instance = null

        stateId = 0
        generalCondition: any[] = null

        constructor(stateId) {
            this.stateId = stateId
            this.generalCondition = []

            // todo: log
        }

        init() {

            // todo: log
        }

        enter(machine: IStateMachine) {

            // todo: log
        }

        exit(machine: IStateMachine) {

            // todo: log
        }

        update(machine: IStateMachine) {
        }

        getStateID(): number {
            return this.stateId
        }

        // getSingleton(): IState {
            
        // }

        generalCheck(machine: IStateMachine): IState {
            this.generalCondition.forEach(g => {
                var next = g(machine)
                return next || null
            });
            return null
        }
    }
}