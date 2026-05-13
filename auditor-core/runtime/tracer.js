// ========================================
// CENTRAL TRACE ENGINE
// ========================================

import { RuntimeStore }
    from "./runtimeStore.js";

import { CONFIG }
    from "../config/config.js";

export const Trace = {

    enabled: true,

    init() {

        console.log(
            "[Trace] Initialised"
        );
    },

    log(payload = {}) {

        if (!this.enabled) return;

        const trace = {

            level: "info",

            timestamp: Date.now(),

            ...payload
        };

        RuntimeStore.pushTrace(trace);

        if (CONFIG.DEBUG.verboseTracing) {

            console.log(
                "[TRACE]",
                trace
            );
        }
    },

    warn(payload = {}) {

        const trace = {

            level: "warn",

            timestamp: Date.now(),

            ...payload
        };

        RuntimeStore.pushTrace(trace);

        console.warn(
            "[WARN]",
            trace
        );
    },

    error(payload = {}) {

        const trace = {

            level: "error",

            timestamp: Date.now(),

            ...payload
        };

        RuntimeStore.pushTrace(trace);

        console.error(
            "[ERROR]",
            trace
        );
    },

    getAll() {

        return RuntimeStore.getTraces();
    },

    clear() {

        RuntimeStore.clearTraces();
    }
};