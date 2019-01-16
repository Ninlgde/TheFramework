module ninlgde.net {

    export enum ResponseType  {
        TEXT	    = 'text',
        ARRAYBUFFER = 'arraybuffer',
        BLOB        = 'blob',
        DOCUMENT 	= 'document',
        JSON 		= 'json',
    }
    
    export class HTTP {
        public static sendRequest(url: string, params: any, method: string, responseType: string, timeout: number): Promise<any> {
            return new Promise((resolve, reject)=>{
                let xhr = new XMLHttpRequest()
                
                xhr.responseType = responseType && ResponseType[responseType] ? ResponseType[responseType] : 'text'
                xhr.timeout = timeout || 0;

                let formdata = this.parseParams(params)

                method = method || 'GET'

                xhr.onreadystatechange = function () {
                    let rdata = {
                        response : xhr.response,
                        readyState : xhr.readyState,
                        status : xhr.status
                    }
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        resolve(rdata)
                        return
                    }
                    reject(rdata)
                };
                xhr.open(method, url, true);
                xhr.send(formdata);
            })
        }

        public static parseParams(params: any) {
            let result = ''
            if (typeof params == 'object') {
                for (let k in params) {
                    let v = params[k]
                    if (Assert.isFalse(typeof v == 'string', 'value must be string')) {
                        result += k + '=' + params
                    }
                }
            } else if (typeof params == 'string') {
                result = params
            } else {
                Assert.isTrue(true, 'params type error')
            }
            return result
        }
    }
}