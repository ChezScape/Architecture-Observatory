import { installInstrumentation } from "./runtime/instrumentation.js";

import { startPipeline } from "./pipeline/instrumenter.js";

import { startLiveSystem } from "./output/liveSystem.js";

import { Trace } from "./runtime/tracer.js";

import { EVENTS } from "./runtime/eventTypes.js";

export const Observatory = {

    start() {

        Trace.log({
            type: EVENTS.SYSTEM_BOOT,
            category: "observatory",
            message: "Observatory starting"
        });

        installInstrumentation();

        startPipeline();

        startLiveSystem();

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "observatory",
            message: "Observatory started"
        });
    }
};