// ========================================
// RUNTIME SANDBOX
// ========================================
//
// PURPOSE:
// Safe execution + isolated replay environment
// for debugging and experimentation.
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

export const RuntimeSandbox = {

    // ====================================
    // SAFE EXECUTION WRAPPER
    // ====================================

    run(label, fn) {

        const beforeState = RuntimeStore.export();

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "sandbox",
            message: `Sandbox run: ${label}`,
            internal: true
        });

        try {

            const result = fn();

            return {
                success: true,
                result
            };

        } catch (err) {

            Trace.log({
                type: EVENTS.ERROR,
                category: "sandbox",
                message: err.message,
                internal: true
            });

            return {
                success: false,
                error: err
            };

        } finally {

            // Optionally restore state if needed
            // RuntimeStore.import(beforeState);
        }
    },

    // ====================================
    // ISOLATED TRACE REPLAY
    // ====================================

    replay(traces, stepFn) {

        if (!Array.isArray(traces)) {
            return;
        }

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "sandbox",
            message: "Sandbox replay started",
            internal: true
        });

        traces.forEach((event, index) => {

            try {

                stepFn(event, index);

            } catch (err) {

                Trace.log({
                    type: EVENTS.ERROR,
                    category: "sandbox",
                    message: err.message,
                    internal: true
                });
            }
        });

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "sandbox",
            message: "Sandbox replay finished",
            internal: true
        });
    },

    // ====================================
    // STATE ISOLATION TEST
    // ====================================

    testIsolation(fn) {

        const snapshot = RuntimeStore.export();

        try {

            fn();

        } finally {

            RuntimeStore.import(snapshot);
        }
    }
};