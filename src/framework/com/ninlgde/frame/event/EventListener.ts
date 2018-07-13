module ninlgde {
    "use strict"

    export interface IEventListener {
        /**
         * 获取原型
         */
        getScope(): any
        /**
         * 获取handler
         */
        getHandler(): any
    }

    export class EventListener implements IEventListener {

        private handler: any
        private scope: any

        constructor(handler, scope) {
            this.handler = handler
            this.scope = scope
        }

        public getScope(): any {
            return this.scope
        }

        public getHandler(): any {
            return this.handler
        }

    }
}