module ninlgde {
    "use strict";
    
    export interface IStateMachine {
        
        changeState(nextState: IState)
    }
}