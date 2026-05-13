// ========================================
// GLOBAL CONFIGURATION
// ========================================

export const CONFIG = {

    APP_NAME:
        "Architecture Observatory",

    VERSION:
        "V9",

    MODE:
        "runtime",

    MOBILE_MODE:
        /Android|iPhone|iPad/i
            .test(navigator.userAgent),

    TRACE_LIMIT:
        5000,

    SNAPSHOT_LIMIT:
        50,

    PERFORMANCE: {

        reasoningInterval: 4000,

        consciousnessInterval: 5000,

        autopilotInterval: 3000,

        timelineRefresh: 1000
    },

    FEATURES: {

        AI: true,

        SANDBOX: true,

        ANALYSIS: true,

        PORTABLE_RUNTIME: true,

        LIVE_GRAPH: true,

        AUTONOMOUS_DEBUGGING: true
    },

    UI: {

        animations: true,

        blurEffects: true,

        runtimeHUD: true
    },

    DEBUG: {

        verboseTracing: true,

        showWarnings: true
    }
};