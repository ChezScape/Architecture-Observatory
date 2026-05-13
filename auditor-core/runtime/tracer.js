import { SETTINGS } from "../config/settings.js";

import { EVENTS, isValidEvent } from "./eventTypes.js";

import { Bus } from "./bus.js";

const traceStore = [];

export const Trace = {

    log(event = {}) {

        if (!SETTINGS.TRACE_ENABLED) {
            return;
        }

        if (!isValidEvent(event.type)) {

            console.warn("Invalid trace event", event.type);

            event.type = EVENTS.WARNING;
        }

        const payload = {
            timestamp: Date.now(),
            ...event
        };

        traceStore.push(payload);

        if (traceStore.length > SETTINGS.TRACE_LIMIT) {
            traceStore.shift();
        }

        Bus.emit(payload);

        RuntimeStore.pushTrace(payload);
        
        if (SETTINGS.VERBOSE_LOGGING) {
            console.log("[TRACE]", payload);
        }
    },

    get() {
        return traceStore;
    },

    clear() {
        traceStore.length = 0;
    }
};