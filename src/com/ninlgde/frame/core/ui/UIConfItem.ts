module ninlgde.ui {
    "use strict";

    export class UIConfItem {
        // 路径
        private _path: string = null
        // 类型----暂时还没想好
        private _type: any = null
        // 放到哪层
        private _layer: LAYOUR = null

        public constructor(path :string, type: any, layer: LAYOUR) {
            this._path = path
            this._type = type
            this._layer = layer
        }

        public get path() : string {
            return this._path
        }
        
        public get type() : any {
            return this._type
        }
        
        public get layer() : LAYOUR {
            return this._layer
        }
        
    }
}