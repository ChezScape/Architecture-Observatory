// ========================================
// FAILURE REPLAY DEBUGGER
// ========================================
//
// PURPOSE:
// Reconstructs failure timelines and
// replays execution leading to an error.
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

export const FailureReplayDebugger = {

    findFailures() {

        const traces = RuntimeStore.getTraces();

        return traces.filter(t =>
            t.type === "ERROR"
        );
    },

    reconstructFailure(errorEvent) {

        const traces = RuntimeStore.getTraces();

        const window = traces.filter(t => {

            return Math.abs(
                t.timestamp - errorEvent.timestamp
            ) < 2000;
        });

        return {
            error: errorEvent,
            context: window
        };
    },

    replayFailure(errorEvent, stepFn) {

        const context = this.reconstructFailure(errorEvent);

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "failure_debugger",
            message: "Failure replay started",
            internal: true
        });

        context.context.forEach((event, index) => {

            try {

                stepFn(event, index);

            } catch (err) {

                Trace.log({
                    type: EVENTS.ERROR,
                    category: "failure_debugger",
                    message: err.message,
                    internal: true
                });
            }
        });

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "failure_debugger",
            message: "Failure replay finished",
            internal: true
        });
    }
};