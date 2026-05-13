// ========================================
// EXECUTION RECORDER
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";
import { Trace } from "../runtime/tracer.js";

export const ExecutionRecorder = {

    record(event) {

        const entry = {
            timestamp: Date.now(),
            ...event
        };

        RuntimeStore.pushTrace(entry);

        if (event.type === "ERROR") {

            Trace.error(entry);
        }
    }
};