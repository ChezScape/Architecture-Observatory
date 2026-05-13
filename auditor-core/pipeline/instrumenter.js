import { Trace } from "../runtime/tracer.js";

import { EVENTS } from "../runtime/eventTypes.js";

export function startPipeline() {

    Trace.log({
        type: EVENTS.PIPELINE_START,
        message: "Pipeline started"
    });
}