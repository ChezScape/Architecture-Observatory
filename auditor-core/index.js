// ========================================
// ARCHITECTURE OBSERVATORY
// CORE ORCHESTRATOR
// ========================================

import { CONFIG } from "./config/config.js";

import { Trace } from "./runtime/tracer.js";
import { RuntimeStore } from "./runtime/runtimeStore.js";
import { Bus } from "./runtime/bus.js";

import { EVENTS } from "./runtime/eventTypes.js";

export const Observatory = {

    started: false,

    engines: [],

    register(name, engine) {

        this.engines.push({
            name,
            engine
        });

        Trace.log({
            type: EVENTS.ENGINE_REGISTERED,
            source: "Observatory",
            message: `Registered engine: ${name}`
        });
    },

    start() {

        if (this.started) return;

        this.started = true;

        RuntimeStore.init();

        Bus.init();

        Trace.init();

        Trace.log({
            type: EVENTS.SYSTEM_BOOT,
            source: "Observatory",
            message: `${CONFIG.APP_NAME} starting`
        });

        for (const entry of this.engines) {

            try {

                entry.engine?.start?.();

                Trace.log({
                    type: EVENTS.ENGINE_STARTED,
                    source: entry.name,
                    message: "Engine started"
                });

            } catch (err) {

                Trace.error({
                    type: EVENTS.ENGINE_FAILURE,
                    source: entry.name,
                    message: err.message
                });
            }
        }

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            source: "Observatory",
            message: "All systems operational"
        });
    }
};