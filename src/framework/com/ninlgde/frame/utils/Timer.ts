module ninlgde {
    "use strict"

    // class TimerCallback {

    //     public scope: any
    //     public handler: any
    //     public interval: number
    //     public repeat: number
    //     public delay: number 

    //     constructor(scope, handler, interval, repeat, delay) {
    //         this.scope = scope
    //         this.handler = handler
    //         this.interval = interval
    //         this.repeat = repeat
    //         this.delay = delay
    //     }

    //     public called() {
    //         this.repeat --;
    //     }

    //     public isDead() {
    //         return this.repeat == 0 // 无穷次就是-1
    //     }
    // }

    export class Timer {
        // private static timerMap: datastruct.Map<any, datastruct.OrderedMap<any, TimerCallback>>

        // private static checkMap() {
        //     if (this.timerMap != null) {
        //         return
        //     }
        //     this.timerMap = new datastruct.OrderedMap<any, datastruct.OrderedMap<any, TimerCallback>>()
        // }

        // private static getCallbacks(scope) {
        //     this.checkMap()
        //     let callbacks = this.timerMap.get(scope)
        //     if (callbacks == null) {
        //         callbacks = new datastruct.OrderedMap<any, TimerCallback>()
        //         this.timerMap.put(scope, callbacks)
        //     }

        //     return callbacks
        // }

        public static setTimer(scope, handler, interval, repeat, delay) {
            let scheduler = cc.director.getScheduler()
            scheduler.schedule(handler, scope, interval, repeat, delay)
        }

        public static cancelTimer(scope, handler) {
            let scheduler = cc.director.getScheduler()
            scheduler.unschedule(handler, scope)
        }

        // public static setTimer(scope, handler, interval, repeat, delay) {
        //     let callbacks = this.getCallbacks(scope)
        //     let callback = new TimerCallback(scope, handler, interval, repeat, delay)
        //     let cb = () => {
        //         handler.call(scope)
        //         callback.called()
        //         if (!callback.isDead()) {
        //             var id = 0
        //             id = window.setInterval(()=>{
        //                 handler.call(scope)
        //                 callback.called()
        //                 if (callback.isDead()) {
        //                     window.clearInterval(id)
        //                 }
        //             })
        //             callbacks.
        //         }
        //     }
        //     window.setTimeout(cb, delay * 1000)
        // }

        // public static cancelTimer(scope, handler) {
            
        // }
    }
}