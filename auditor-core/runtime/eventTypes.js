// ========================================
// ARCHITECTURE OBSERVATORY
// EVENT TYPE REGISTRY
// ========================================

export const EVENTS = Object.freeze({

    // =========================
    // DOM
    // =========================
    DOM_QUERY: "DOM_QUERY",
    DOM_MUTATION: "DOM_MUTATION",
    DOM_CREATE: "DOM_CREATE",
    DOM_REMOVE: "DOM_REMOVE",
    DOM_UPDATE: "DOM_UPDATE",

    // =========================
    // EVENTS
    // =========================
    CLICK: "CLICK",
    INPUT: "INPUT",
    CHANGE: "CHANGE",
    SUBMIT: "SUBMIT",
    KEYDOWN: "KEYDOWN",
    KEYUP: "KEYUP",
    MOUSEMOVE: "MOUSEMOVE",
    SCROLL: "SCROLL",

    // =========================
    // STATE
    // =========================
    STATE_CHANGE: "STATE_CHANGE",
    STATE_CREATE: "STATE_CREATE",
    STATE_DELETE: "STATE_DELETE",
    STATE_RESET: "STATE_RESET",

    // =========================
    // PIPELINE
    // =========================
    PIPELINE_START: "PIPELINE_START",
    PIPELINE_END: "PIPELINE_END",
    PIPELINE_STAGE: "PIPELINE_STAGE",

    // =========================
    // ANALYSIS
    // =========================
    ANALYSIS_START: "ANALYSIS_START",
    ANALYSIS_END: "ANALYSIS_END",
    COUPLING_DETECTED: "COUPLING_DETECTED",
    ANOMALY_DETECTED: "ANOMALY_DETECTED",
    ROOT_CAUSE_DETECTED: "ROOT_CAUSE_DETECTED",

    // =========================
    // PERFORMANCE
    // =========================
    FPS_DROP: "FPS_DROP",
    MEMORY_WARNING: "MEMORY_WARNING",
    LONG_TASK: "LONG_TASK",

    // =========================
    // RUNTIME
    // =========================
    TRACE: "TRACE",
    WARNING: "WARNING",
    ERROR: "ERROR",
    CRITICAL: "CRITICAL",

    // =========================
    // SYSTEM
    // =========================
    SYSTEM_BOOT: "SYSTEM_BOOT",
    SYSTEM_READY: "SYSTEM_READY",
    SYSTEM_SHUTDOWN: "SYSTEM_SHUTDOWN",

    // =========================
    // VIEWER
    // =========================
    VIEW_CHANGE: "VIEW_CHANGE",
    PANEL_OPEN: "PANEL_OPEN",
    PANEL_CLOSE: "PANEL_CLOSE",

    // =========================
    // BUILD
    // =========================
    BUILD_START: "BUILD_START",
    BUILD_COMPLETE: "BUILD_COMPLETE",
    BUNDLE_CREATED: "BUNDLE_CREATED"
});

export function isValidEvent(type) {
    return Object.values(EVENTS).includes(type);
}