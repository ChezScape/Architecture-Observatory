import { installGlobalErrorBoundary } from "./errorBoundary.js";

import { installDOMInterceptor } from "./domInterceptor.js";

import { installEventInterceptor } from "./eventInterceptor.js";

import { installStateTracker } from "./stateTracker.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

export function installInstrumentation() {

    installGlobalErrorBoundary();

    installDOMInterceptor();

    installEventInterceptor();

    installStateTracker();

    Trace.log({
        type: EVENTS.SYSTEM_READY,
        category: "instrumentation",
        message: "Instrumentation installed"
    });
}