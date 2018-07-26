module ninlgde {
    "use strict";

    export class Assert {
        /**
         * 不该是true
         * @param tf 
         * @param msg 
         */
        public static isTrue(tf: boolean, msg?: string): boolean {
            Assert.log(!tf, msg)
            return tf;
        }

        /**
         * 不该是false
         * @param tf 
         * @param msg 
         */
        public static isFalse(tf: boolean, msg?: string): boolean {
            Assert.log(tf, msg)
            return tf
        }

        private static log(tf: boolean, msg?: string): void {
            if (tf) {
                return
            }

            ninlgde.logger.error("ASSERT FAILED!", msg ? `message: ${msg}` : "")
        }
    }
}