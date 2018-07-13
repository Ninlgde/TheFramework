module ninlgde {
    "use strict";

    enum LAYOUR {
        SENCE = 0,
        WINDOW,
        TOP,
        DEBUG
    }

    export class UIManager {
        private static instance: UIManager = null

        private uiLayouts: Array<cc.Layout> = null;

        private conf: {} = null

        private constructor() {

        }

        public static getInstance(): UIManager {
            return this.instance
        }

        public static create(): boolean {
            if (Assert.isFalse(this.instance == null)) {
                this.instance = new UIManager()
            }
            return true
        }

        public setLayouts(uiLayouts: Array<cc.Layout>) {
            this.uiLayouts = uiLayouts;
        }

        public loadConf(conf: Object) {
            this.conf = conf
        }
    }
}