// ========================================
// GLOBAL CONFIG
// ========================================

export const CONFIG = {

    APP_NAME: "Architecture Observatory",

    VERSION: "V10",

    MODE: "runtime",

    TRACE_LIMIT: 5000,

    SNAPSHOT_LIMIT: 50,

    DEBUG: true,

    MOBILE: /Android|iPhone|iPad/i.test(navigator.userAgent),

    FEATURES: {
        SANDBOX: true,
        ANALYSIS: true,
        PORTABLE: true,
        UI: true
    }
};