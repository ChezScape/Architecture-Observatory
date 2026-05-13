// ========================================
// ARCHITECTURE OBSERVATORY
// ERROR BOUNDARY SYSTEM
// ========================================

import { Trace } from "./tracer.js";
import { EVENTS } from "./eventTypes.js";

export class ObservatoryError extends Error {

    constructor(message, meta = {}) {
        super(message);

        this.name = "ObservatoryError";
        this.meta = meta;
        this.timestamp = Date.now();
    }
}

export function safeExecute(label, fn, fallback = null) {

    try {

        return fn();

    } catch (error) {

        Trace.log({
            type: EVENTS.ERROR,
            label,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            timestamp: Date.now()
        });

        console.error(`[SAFE EXECUTE FAILED] ${label}`, error);

        return fallback;
    }
}

export async function safeExecuteAsync(label, fn, fallback = null) {

    try {

        return await fn();

    } catch (error) {

        Trace.log({
            type: EVENTS.ERROR,
            label,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            timestamp: Date.now()
        });

        console.error(`[SAFE EXECUTE ASYNC FAILED] ${label}`, error);

        return fallback;
    }
}

export function installGlobalErrorBoundary() {

    // =========================
    // WINDOW ERRORS
    // =========================

    window.addEventListener("error", (event) => {

        Trace.log({
            type: EVENTS.CRITICAL,
            category: "window_error",
            message: event.message,
            file: event.filename,
            line: event.lineno,
            column: event.colno,
            timestamp: Date.now()
        });

    });

    // =========================
    // PROMISE ERRORS
    // =========================

    window.addEventListener("unhandledrejection", (event) => {

        Trace.log({
            type: EVENTS.CRITICAL,
            category: "promise_rejection",
            reason: event.reason,
            timestamp: Date.now()
        });

    });

    console.log("Observatory Error Boundary Installed");
}