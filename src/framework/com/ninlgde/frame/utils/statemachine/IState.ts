module ninlgde {
    "use strict"

    export interface IState {

        stateId: number

        init()

        enter(machine: IStateMachine)

        exit(machine: IStateMachine)

        update(machine: IStateMachine)

        getStateID(): number

        generalCheck(machine: IStateMachine): IState
    }
}