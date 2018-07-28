module ninlgde {
    "use strict"

    export class EventCenter {

        _TAG: string = "EventCenter"

        private eventMap: collection.Map<string, Array<IEventListener>> = null//

        private static instance: EventCenter

        private constructor() {
            this.eventMap = new collection.HashMap<string, Array<IEventListener>>()
        }

        public static getInstance(): EventCenter {
            if (this.instance == null) {
                this.instance = new EventCenter()
            }
            return this.instance
        }

        public fireEvent(event: string, ...args: any[]) {
            let events: Array<IEventListener> = this.eventMap.get(event)
            if (events != null) {
                events.forEach((e)=> {
                    if (e) {
                        e.getHandler().apply(e.getScope(), args)
                    }
                })
            }
        }

        public registEventListener(event: string, handler: any, scope: any) {
            if (typeof event != "string" || typeof handler != "function") {
                log.error(this._TAG, "EventCenter listen error: eName: {0} handler: {1}", event, handler)
                return
            }
            let events: Array<IEventListener> = this.eventMap.get(event)
            if (events == null) {
                events = new Array<IEventListener>()
                this.eventMap.put(event, events)
            }
            let listener: IEventListener = new EventListener(handler, scope)
            events.push(listener)
        }

        public unregistEventListener(event: string, handler: any, scope: any) {
            let events: Array<IEventListener> = this.eventMap.get(event);
            if (events == null) {
                return;
            }
            let newEvents: Array<IEventListener> = events.filter((e) => {
                return e.getHandler() != handler || e.getScope() != scope
            });
            this.eventMap.put(event, newEvents);
            events = null;
        }

        public unregistScope(scope: any) {
            this.eventMap.forEach((event: string, events: Array<IEventListener>) => {
                let newEvents: Array<IEventListener> = events.filter((e) => {
                    return e.getScope() != scope
                })
                this.eventMap.put(event, newEvents)
            })
        }
    }
}