
module ninlgde.net {
    "use strict";

    export interface IConnectionHandler {
        onConnectionCreated(e)
        onConnectionClosed(e)
        onConnectionError(err)
        onMessage(data: any)
    }
}
